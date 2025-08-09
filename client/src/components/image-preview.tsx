import { useState } from "react";
import { Download, X, Image as ImageIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageModal from "./image-modal";
import type { CompressedImage } from "./image-compressor";

interface ImagePreviewProps {
  compressedImages: CompressedImage[];
  onDownload: (image: CompressedImage) => void;
  onDownloadAll: () => void;
}

export default function ImagePreview({ compressedImages, onDownload, onDownloadAll }: ImagePreviewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ url: string; name: string; type: 'original' | 'compressed' } | null>(null);

  if (compressedImages.length === 0) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const openModal = (url: string, name: string, type: 'original' | 'compressed') => {
    setModalImage({ url, name, type });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  const handleModalDownload = () => {
    if (modalImage?.type === 'compressed') {
      onDownload(selectedImage);
    }
    closeModal();
  };

  const selectedImage = compressedImages[selectedImageIndex];

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-blue border border-blue-100/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
            <span className="flex items-center">
              <ImageIcon className="text-blue-500 mr-3" size={24} />
              Preview & Compare
            </span>
            <div className="flex items-center space-x-2">
              {compressedImages.length > 1 && (
                <div className="flex space-x-1">
                  {compressedImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              {compressedImages.length > 1 && (
                <Button
                  onClick={onDownloadAll}
                  size="sm"
                  className="bg-blue-gradient text-white hover:opacity-90"
                >
                  <Download size={14} className="mr-1" />
                  All
                </Button>
              )}
            </div>
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-700">Original</h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {formatFileSize(selectedImage.originalSize)}
                </span>
              </div>
              <div className="relative group cursor-pointer">
                <img 
                  src={selectedImage.originalUrl}
                  alt="Original image"
                  className="w-full h-48 object-cover rounded-lg border"
                  onClick={() => openModal(selectedImage.originalUrl, `${selectedImage.original.name} (Original)`, 'original')}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={24} />
                </div>
              </div>
            </div>
            
            {/* Compressed Image */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-700">Compressed</h4>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {formatFileSize(selectedImage.compressedSize)}
                </span>
              </div>
              <div className="relative group cursor-pointer">
                <img 
                  src={selectedImage.compressedUrl}
                  alt="Compressed image"
                  className="w-full h-48 object-cover rounded-lg border"
                  onClick={() => openModal(selectedImage.compressedUrl, `${selectedImage.original.name} (Compressed)`, 'compressed')}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={24} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Compression Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {Math.round(selectedImage.compressionRatio)}% size reduction
                  </p>
                  <p className="text-sm text-gray-600">
                    Saved {formatFileSize(selectedImage.originalSize - selectedImage.compressedSize)}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onDownload(selectedImage)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <Download className="mr-2" size={16} />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageUrl={modalImage?.url || ''}
        imageName={modalImage?.name || ''}
        onDownload={handleModalDownload}
      />
    </div>
  );
}
