import { useState } from "react";
import { compressImage, downloadBlob } from "@/lib/image-utils";
import { compressToTargetSize } from "@/lib/target-size-compression";
import type { CompressionSettings, CompressedImage } from "@/components/image-compressor";

export function useImageCompression() {
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const compressImages = async (files: File[], settings: CompressionSettings) => {
    setIsCompressing(true);
    setProgress(0);
    setCompressedImages([]);

    const results: CompressedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const originalUrl = URL.createObjectURL(file);
        
        let compressedBlob: Blob;
        if (settings.useTargetSize && settings.targetSizeKB) {
          const result = await compressToTargetSize(file, settings.targetSizeKB, settings.format);
          compressedBlob = result.blob;
        } else {
          compressedBlob = await compressImage(file, settings);
        }
        
        const compressedUrl = URL.createObjectURL(compressedBlob);
        const compressionRatio = ((file.size - compressedBlob.size) / file.size) * 100;

        const result: CompressedImage = {
          original: file,
          originalUrl,
          compressedBlob,
          compressedUrl,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          compressionRatio,
        };

        results.push(result);
        setCompressedImages([...results]);
        
        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }

    setIsCompressing(false);
  };

  const downloadImage = (image: CompressedImage) => {
    const filename = `compressed_${image.original.name.replace(/\.[^/.]+$/, '')}.${
      image.compressedBlob.type.split('/')[1]
    }`;
    downloadBlob(image.compressedBlob, filename);
  };

  const downloadAll = () => {
    compressedImages.forEach((image, index) => {
      setTimeout(() => {
        downloadImage(image);
      }, index * 100); // Stagger downloads to avoid browser blocking
    });
  };

  return {
    compressedImages,
    isCompressing,
    progress,
    compressImages,
    downloadImage,
    downloadAll,
  };
}
