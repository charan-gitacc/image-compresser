import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, FolderOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  isCompressing: boolean;
  progress: number;
}

export default function UploadArea({ onFilesSelected, isCompressing, progress }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg'].includes(file.type) &&
      file.size <= 10 * 1024 * 1024 // 10MB limit
    );
    
    if (imageFiles.length > 0) {
      onFilesSelected(imageFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const getBorderColor = () => {
    if (isDragReject) return 'border-red-300';
    if (isDragAccept) return 'border-green-300';
    if (isDragActive) return 'border-blue-400';
    return 'border-blue-200';
  };

  const getBackgroundColor = () => {
    if (isDragReject) return 'bg-red-50';
    if (isDragAccept) return 'bg-green-50';
    if (isDragActive) return 'bg-blue-100';
    return 'bg-gradient-to-br from-blue-50/50 to-white';
  };

  return (
    <div className="bg-white rounded-2xl shadow-blue border border-blue-100/50 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <CloudUpload className="text-blue-500 mr-3" size={24} />
          Upload & Compress
        </h3>
        <p className="text-gray-500 mt-1">Drag and drop your images or click to browse</p>
      </div>
      
      <div className="p-8">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed ${getBorderColor()} rounded-xl ${getBackgroundColor()} p-12 text-center hover:border-blue-300 transition-all duration-300 cursor-pointer`}
        >
          <input {...getInputProps()} />
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-gradient rounded-2xl mx-auto flex items-center justify-center mb-4">
              <CloudUpload className="text-white text-2xl" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              {isDragActive ? 'Drop images here' : 'Drop images here'}
            </h4>
            <p className="text-gray-500 mb-4">or click to browse from your device</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400 mb-6">
            <span className="bg-gray-100 px-2 py-1 rounded-full">JPEG/JPG</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">Max 10MB</span>
          </div>
          
          <button 
            type="button"
            className="bg-blue-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <FolderOpen className="inline mr-2" size={16} />
            Choose Files
          </button>
        </div>
        
        {isCompressing && (
          <div className="mt-6">
            <Progress value={progress} className="h-2 mb-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Compressing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
