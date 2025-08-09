import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
  onDownload: () => void;
}

export default function ImageModal({ isOpen, onClose, imageUrl, imageName, onDownload }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{imageName}</h3>
          <div className="flex items-center space-x-2">
            {imageName.includes('(Compressed)') && (
              <Button
                onClick={onDownload}
                size="sm"
                className="bg-blue-gradient text-white hover:opacity-90"
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <img 
            src={imageUrl}
            alt={imageName}
            className="w-full h-auto max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}