import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategories';
import { toast } from 'sonner';
import type { Category } from '@/data/mockData';

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
}

interface CategoryFormData {
    name: string;
}

export function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>();

    useEffect(() => {
        if (category) {
            reset({ name: category.name });
        } else {
            reset({ name: '' });
        }
    }, [category, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (category) {
                await updateCategory.mutateAsync({ id: category.id, name: data.name });
                toast.success('Category updated successfully');
            } else {
                await createCategory.mutateAsync({ name: data.name });
                toast.success('Category created successfully');
            }
            onOpenChange(false);
            reset();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save category');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            {...register('name', { required: 'Category name is required' })}
                            placeholder="e.g., Business Cards"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createCategory.isPending || updateCategory.isPending}>
                            {category ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
