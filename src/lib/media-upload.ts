import { supabase } from "@/integrations/supabase/client";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

export interface UploadResult {
  url: string;
  error?: string;
}

/**
 * Upload an image to Supabase Storage
 */
export const uploadImage = async (file: File, userId: string): Promise<UploadResult> => {
  try {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { url: '', error: 'Invalid image type. Please use JPG, PNG, WebP, or GIF.' };
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return { url: '', error: 'Image too large. Maximum size is 5MB.' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('post-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      // Provide more specific error messages
      if (error.message?.includes('Bucket not found')) {
        return { url: '', error: 'Storage bucket not configured. Please contact admin.' };
      }
      return { url: '', error: `Upload failed: ${error.message || 'Please try again.'}` };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('post-media')
      .getPublicUrl(data.path);

    return { url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { url: '', error: `Upload failed: ${errorMessage}` };
  }
};

/**
 * Upload a video to Supabase Storage
 */
export const uploadVideo = async (file: File, userId: string): Promise<UploadResult> => {
  try {
    // Validate file type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      return { url: '', error: 'Invalid video type. Please use MP4, WebM, or MOV.' };
    }

    // Validate file size
    if (file.size > MAX_VIDEO_SIZE) {
      return { url: '', error: 'Video too large. Maximum size is 50MB.' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('post-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: '', error: 'Failed to upload video. Please try again.' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('post-media')
      .getPublicUrl(data.path);

    return { url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { url: '', error: 'Failed to upload video. Please try again.' };
  }
};

/**
 * Delete media from Supabase Storage
 */
export const deleteMedia = async (url: string): Promise<boolean> => {
  try {
    // Extract path from URL
    const urlParts = url.split('/post-media/');
    if (urlParts.length < 2) return false;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('post-media')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};
