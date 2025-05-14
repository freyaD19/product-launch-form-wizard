
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  title: string;
  maxImages?: number;
  required?: boolean;
  onChange?: (files: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  maxImages = 5,
  required = false,
  onChange,
}) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    if (images.length + e.target.files.length > maxImages) {
      toast({
        title: "上传数量超出限制",
        description: `最多只能上传${maxImages}张图片`,
        variant: "destructive",
      });
      return;
    }

    const newImages = [...images];
    
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result.toString());
          setImages([...newImages]);
          onChange?.(newImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onChange?.(newImages);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
        <p className="text-sm font-medium mb-1">{title}</p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="relative w-32 h-32 border rounded-md overflow-hidden group"
          >
            <img 
              src={img} 
              alt={`Uploaded ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <label 
            className={cn(
              "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md cursor-pointer",
              "hover:border-blue-500 hover:bg-blue-50 transition-colors"
            )}
          >
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden"
              onChange={handleImageUpload}
            />
            <Plus className="mb-1 text-gray-400" />
            <span className="text-xs text-gray-500">上传图片</span>
          </label>
        )}
      </div>
      
      <p className="text-xs text-gray-500">
        {`支持jpg、png、gif格式，最多${maxImages}张图片，单张大小不超过2MB`}
      </p>
    </div>
  );
};

export default ImageUploader;
