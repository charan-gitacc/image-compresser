import type { CompressionSettings } from "@/components/image-compressor";

export async function compressImage(file: File, settings: CompressionSettings): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Calculate scaling factor - never upscale, only downscale or keep original
        let scaleFactor = 1.0;
        
        if (settings.quality < 85) {
          // More aggressive scaling for lower quality (JPEG only)
          scaleFactor = 0.5 + (settings.quality / 100) * 0.4; // Range: 0.5 to 0.9
        }
        
        const newWidth = Math.floor(img.width * scaleFactor);
        const newHeight = Math.floor(img.height * scaleFactor);
        
        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // JPEG compression settings
        const mimeType = 'image/jpeg';
        const quality = Math.max(0.05, Math.min(0.95, settings.quality / 100));

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              resolve(blob);
            } else if (blob) {
              // If compressed size is not smaller, try more aggressive compression
              const aggressiveQuality = Math.max(0.05, quality * 0.5);
              canvas.toBlob(
                (aggressiveBlob) => {
                  if (aggressiveBlob && aggressiveBlob.size < file.size) {
                    resolve(aggressiveBlob);
                  } else {
                    resolve(blob); // Fallback to original attempt
                  }
                },
                mimeType,
                aggressiveQuality
              );
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          mimeType,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
