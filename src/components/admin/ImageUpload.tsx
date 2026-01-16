import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const uploadToSupabase = async (file: File): Promise<string> => {
        if (!isSupabaseConfigured) {
            throw new Error('Supabase not configured');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                // Check if bucket doesn't exist
                if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('not found') || uploadError.message.includes('does not exist')) {
                    throw new Error('Storage bucket "product-images" not found. Please create it in Supabase Dashboard → Storage. See SUPABASE_STORAGE_SETUP.md for instructions.');
                }
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error: any) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleFileSelect = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        if (images.length + files.length > maxImages) {
            toast.error(`Maximum ${maxImages} images allowed`);
            return;
        }

        setUploading(true);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    throw new Error(`${file.name} is not an image`);
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`${file.name} is too large (max 5MB)`);
                }

                if (isSupabaseConfigured) {
                    try {
                        return await uploadToSupabase(file);
                    } catch (uploadError: any) {
                        // If storage bucket doesn't exist, fall back to local preview
                        if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
                            console.warn('Storage bucket not found, using local preview');
                            toast.warning('Storage bucket not set up. Using temporary preview. See SUPABASE_STORAGE_SETUP.md');
                            return URL.createObjectURL(file);
                        }
                        throw uploadError;
                    }
                } else {
                    // Fallback: Create local object URL for preview
                    return URL.createObjectURL(file);
                }
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            onChange([...images, ...uploadedUrls]);

            if (!isSupabaseConfigured) {
                toast.warning('Supabase not configured. Images are temporary and will be lost on refresh.');
            } else {
                toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
            }
        } catch (error: any) {
            console.error('File select error:', error);
            toast.error(error.message || 'Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                    dragActive ? 'border-primary bg-primary/5' : 'border-border',
                    uploading && 'opacity-50 pointer-events-none'
                )}
            >
                <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    disabled={uploading || images.length >= maxImages}
                />

                <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div>
                        <p className="font-medium">
                            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF up to 5MB ({images.length}/{maxImages} images)
                        </p>
                    </div>
                </label>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative group aspect-square">
                            <img
                                src={url}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg border"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                    Main
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!isSupabaseConfigured && images.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-medium">Temporary Images</p>
                        <p>Set up Supabase Storage to persist images permanently. See QUICKSTART.md</p>
                    </div>
                </div>
            )}
        </div>
    );
}
