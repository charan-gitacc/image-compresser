import { useState } from "react";
import UploadArea from "./upload-area";
import CompressionControls from "./compression-controls";
import ImagePreview from "./image-preview";
import ImageUploadPreview from "./image-upload-preview";
import { useImageCompression } from "@/hooks/use-image-compression";

export interface CompressionSettings {
  quality: number;
  format: 'jpeg';
  preserveExif: boolean;
  progressive: boolean;
  autoOrientation: boolean;
  targetSizeKB?: number;
  useTargetSize: boolean;
}

export interface CompressedImage {
  original: File;
  originalUrl: string;
  compressedBlob: Blob;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export default function ImageCompressor() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    format: 'jpeg',
    preserveExif: false,
    progressive: false,
    autoOrientation: true,
    targetSizeKB: 100,
    useTargetSize: false,
  });

  const {
    compressedImages,
    isCompressing,
    progress,
    compressImages,
    downloadImage,
    downloadAll,
  } = useImageCompression();

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompress = async () => {
    if (uploadedFiles.length > 0) {
      await compressImages(uploadedFiles, settings);
    }
  };

  const handleSettingsChange = (newSettings: Partial<CompressionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    // Auto-compress when quality or target size changes and files are uploaded
    if ((newSettings.quality || newSettings.targetSizeKB || newSettings.useTargetSize !== undefined) && 
        uploadedFiles.length > 0 && !isCompressing) {
      const updatedSettings = { ...settings, ...newSettings };
      setTimeout(() => compressImages(uploadedFiles, updatedSettings), 300);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Upload and Preview Section */}
      <div className="lg:col-span-2">
        {compressedImages.length > 0 ? (
          <ImagePreview 
            compressedImages={compressedImages}
            onDownload={downloadImage}
            onDownloadAll={downloadAll}
          />
        ) : (
          <>
            <ImageUploadPreview 
              files={uploadedFiles}
              onRemoveFile={handleRemoveFile}
            />
            
            <div className={uploadedFiles.length > 0 ? "mt-6" : ""}>
              <UploadArea 
                onFilesSelected={handleFilesSelected}
                isCompressing={isCompressing}
                progress={progress}
              />
            </div>
          </>
        )}
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-1">
        <CompressionControls
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onCompress={handleCompress}
          isCompressing={isCompressing}
          fileCount={uploadedFiles.length}
        />
      </div>
    </div>
  );
}
