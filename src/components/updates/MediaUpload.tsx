import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, Video, X, Loader2, Smile } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GifPicker from "./GifPicker";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

interface MediaUploadProps {
  userId: string;
  onMediaSelect: (url: string, type: 'image' | 'video' | 'gif') => void;
  onMediaClear: () => void;
  selectedMedia: { url: string; type: 'image' | 'video' | 'gif' } | null;
  disabled?: boolean;
}

const MediaUpload = ({ userId, onMediaSelect, onMediaClear, selectedMedia, disabled }: MediaUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [gifPickerOpen, setGifPickerOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File, type: 'image' | 'video') => {
    const maxSize = type === 'image' ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    const allowedTypes = type === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_VIDEO_TYPES;

    if (!allowedTypes.includes(file.type)) {
      toast.error(`Invalid ${type} type. Please use ${type === 'image' ? 'JPG, PNG, WebP, or GIF' : 'MP4, WebM, or MOV'}.`);
      return;
    }

    if (file.size > maxSize) {
      toast.error(`${type === 'image' ? 'Image' : 'Video'} too large. Max size is ${type === 'image' ? '5MB' : '50MB'}.`);
      return;
    }

    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('post-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error('Upload failed. Please try again.');
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('post-media')
        .getPublicUrl(data.path);

      onMediaSelect(publicUrl, type);
      toast.success(`${type === 'image' ? 'Image' : 'Video'} added!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, 'image');
    }
    e.target.value = '';
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, 'video');
    }
    e.target.value = '';
  };

  const handleGifSelect = (url: string) => {
    onMediaSelect(url, 'gif');
    toast.success('GIF added!');
  };

  return (
    <div className="space-y-3">
      {/* Media Preview */}
      {selectedMedia && (
        <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 bg-card/50">
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full shadow-lg"
            onClick={onMediaClear}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {selectedMedia.type === 'video' ? (
            <video
              src={selectedMedia.url}
              controls
              className="w-full max-h-[300px] object-contain"
            />
          ) : (
            <img
              src={selectedMedia.url}
              alt="Selected media"
              className="w-full max-h-[300px] object-contain"
            />
          )}
        </div>
      )}

      {/* Upload Buttons */}
      {!selectedMedia && (
        <div className="flex items-center gap-2 flex-wrap">
          <input
            ref={imageInputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(',')}
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept={ALLOWED_VIDEO_TYPES.join(',')}
            onChange={handleVideoChange}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => imageInputRef.current?.click()}
            disabled={disabled || uploading}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Image className="h-4 w-4 mr-2" />
            )}
            Photo
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => videoInputRef.current?.click()}
            disabled={disabled || uploading}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Video className="h-4 w-4 mr-2" />
            )}
            Video
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setGifPickerOpen(true)}
            disabled={disabled || uploading}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
          >
            <Smile className="h-4 w-4 mr-2" />
            GIF
          </Button>

          <GifPicker
            open={gifPickerOpen}
            onOpenChange={setGifPickerOpen}
            onSelectGif={handleGifSelect}
          />
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
