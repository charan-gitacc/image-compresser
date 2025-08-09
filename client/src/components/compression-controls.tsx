import { Settings, Lightbulb, Combine } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { CompressionSettings } from "./image-compressor";

interface CompressionControlsProps {
  settings: CompressionSettings;
  onSettingsChange: (settings: Partial<CompressionSettings>) => void;
  onCompress: () => void;
  isCompressing: boolean;
  fileCount: number;
}

export default function CompressionControls({
  settings,
  onSettingsChange,
  onCompress,
  isCompressing,
  fileCount
}: CompressionControlsProps) {

  const formatButtons = [
    { key: 'jpeg' as const, label: 'JPEG' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-blue border border-blue-100/50 sticky top-24">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Settings className="text-blue-500 mr-3" size={24} />
            Compression Settings
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Compression Mode Toggle */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-3">Compression Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSettingsChange({ useTargetSize: false })}
                className={`p-3 text-sm border-2 rounded-lg font-medium transition-all duration-200 ${
                  !settings.useTargetSize
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                Quality Mode
              </button>
              <button
                onClick={() => onSettingsChange({ useTargetSize: true })}
                className={`p-3 text-sm border-2 rounded-lg font-medium transition-all duration-200 ${
                  settings.useTargetSize
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                Target Size
              </button>
            </div>
          </div>

          {!settings.useTargetSize ? (
            // Quality Slider
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Quality</label>
                <span className="text-sm text-blue-600 font-semibold">{settings.quality}%</span>
              </div>
              <div className="relative">
                <Slider
                  value={[settings.quality]}
                  onValueChange={(value) => onSettingsChange({ quality: value[0] })}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Smaller Size</span>
                  <span>Better Quality</span>
                </div>
              </div>
            </div>
          ) : (
            // Target Size Slider
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Target Size</label>
                <span className="text-sm text-blue-600 font-semibold">{settings.targetSizeKB} KB</span>
              </div>
              <div className="relative">
                <Slider
                  value={[settings.targetSizeKB || 100]}
                  onValueChange={(value) => onSettingsChange({ targetSizeKB: value[0] })}
                  max={2000}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>5 KB</span>
                  <span>2000 KB</span>
                </div>
              </div>
            </div>
          )}
          

          
          {/* Advanced Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Advanced Options</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="preserveExif"
                  checked={settings.preserveExif}
                  onCheckedChange={(checked) => onSettingsChange({ preserveExif: !!checked })}
                />
                <label htmlFor="preserveExif" className="text-sm text-gray-600">
                  Preserve EXIF data
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="progressive"
                  checked={settings.progressive}
                  onCheckedChange={(checked) => onSettingsChange({ progressive: !!checked })}
                />
                <label htmlFor="progressive" className="text-sm text-gray-600">
                  Progressive JPEG
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoOrientation"
                  checked={settings.autoOrientation}
                  onCheckedChange={(checked) => onSettingsChange({ autoOrientation: !!checked })}
                />
                <label htmlFor="autoOrientation" className="text-sm text-gray-600">
                  Auto orientation
                </label>
              </div>
            </div>
          </div>
          
          {/* Combine Button */}
          <div className="pt-4 border-t border-gray-100">
            <Button
              onClick={onCompress}
              disabled={fileCount === 0 || isCompressing}
              className="w-full bg-blue-gradient text-white py-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Combine className="mr-2" size={16} />
              {isCompressing ? 'Compressing...' : 'Compress Images'}
            </Button>
            {fileCount > 0 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {fileCount} {fileCount === 1 ? 'image' : 'images'} ready for compression
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Tips Card */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="text-yellow-500 mr-2" size={20} />
          Pro Tips
        </h4>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <svg className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{settings.useTargetSize ? 'Target size mode automatically finds the best quality for your desired file size' : 'For web use, 80% quality usually provides the best balance'}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>WebP format offers superior compression for modern browsers</span>
          </li>
          <li className="flex items-start">
            <svg className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{settings.useTargetSize ? 'Try different target sizes: 100KB for web, 50KB for emails' : 'Enable progressive JPEG for better perceived loading'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
