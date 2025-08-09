import type { CompressionSettings } from "@/components/image-compressor";

export async function compressToTargetSize(
  file: File, 
  targetSizeKB: number, 
  format: 'jpeg' = 'jpeg'
): Promise<{ blob: Blob; finalQuality: number }> {
  const targetSizeBytes = targetSizeKB * 1024;
  
  // Always ensure we compress smaller than original
  const maxTargetSize = Math.min(targetSizeBytes, file.size * 0.95);
  
  // Binary search for the right quality level for JPEG
  let minQuality = 1;
  let maxQuality = 95;
  let bestBlob: Blob | null = null;
  let bestQuality = 50;
  let attempts = 0;
  
  // Try up to 15 iterations to find the best quality
  while (minQuality <= maxQuality && attempts < 15) {
    const currentQuality = Math.floor((minQuality + maxQuality) / 2);
    const compressedBlob = await compressWithQualityAndScaling(file, currentQuality);
    attempts++;
    
    if (compressedBlob.size <= maxTargetSize) {
      // Size is good, try higher quality
      bestBlob = compressedBlob;
      bestQuality = currentQuality;
      minQuality = currentQuality + 1;
    } else {
      // Size too large, try lower quality
      maxQuality = currentQuality - 1;
    }
    
    // If we're very close to target, stop
    const sizeDifference = Math.abs(compressedBlob.size - targetSizeBytes) / targetSizeBytes;
    if (sizeDifference < 0.05) {
      bestBlob = compressedBlob;
      bestQuality = currentQuality;
      break;
    }
  }
  
  // Fallback with very aggressive compression if needed
  if (!bestBlob || bestBlob.size > maxTargetSize) {
    bestBlob = await compressWithQualityAndScaling(file, 5);
    bestQuality = 5;
  }
  
  return { blob: bestBlob, finalQuality: bestQuality };
}

async function compressWithQualityAndScaling(
  file: File, 
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Aggressive scaling for very low quality
        let scaleFactor = 1.0;
        if (quality < 30) {
          scaleFactor = 0.4 + (quality / 100) * 0.4; // Range: 0.4 to 0.8
        } else if (quality < 60) {
          scaleFactor = 0.6 + (quality / 100) * 0.3; // Range: 0.6 to 0.9
        } else {
          scaleFactor = 0.8 + (quality / 100) * 0.2; // Range: 0.8 to 1.0
        }
        
        const newWidth = Math.floor(img.width * scaleFactor);
        const newHeight = Math.floor(img.height * scaleFactor);
        
        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const compressionQuality = Math.max(0.01, Math.min(0.98, quality / 100));

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          compressionQuality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

