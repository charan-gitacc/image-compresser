import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadPreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export default function ImageUploadPreview({ files, onRemoveFile }: ImageUploadPreviewProps) {
  if (files.length === 0) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl shadow-blue border border-blue-100/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <ImageIcon className="text-blue-500 mr-3" size={24} />
            Uploaded Images ({files.length})
          </h3>
          <p className="text-gray-500 mt-1">Preview your images before compression</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={imageUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(imageUrl)}
                    />
                  </div>
                  <Button
                    onClick={() => onRemoveFile(index)}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 p-0 bg-red-500 hover:bg-red-600"
                  >
                    <X size={14} />
                  </Button>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}