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
import { useCreateSubcategory, useUpdateSubcategory } from '@/hooks/useCategories';
import { toast } from 'sonner';
import type { Subcategory } from '@/data/mockData';

interface SubcategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    subcategory?: Subcategory | null;
    categoryId: string;
}

interface SubcategoryFormData {
    name: string;
}

export function SubcategoryDialog({
    open,
    onOpenChange,
    subcategory,
    categoryId,
}: SubcategoryDialogProps) {
    const createSubcategory = useCreateSubcategory();
    const updateSubcategory = useUpdateSubcategory();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubcategoryFormData>();

    useEffect(() => {
        if (subcategory) {
            reset({ name: subcategory.name });
        } else {
            reset({ name: '' });
        }
    }, [subcategory, reset]);

    const onSubmit = async (data: SubcategoryFormData) => {
        try {
            if (subcategory) {
                await updateSubcategory.mutateAsync({ id: subcategory.id, name: data.name });
                toast.success('Subcategory updated successfully');
            } else {
                await createSubcategory.mutateAsync({
                    name: data.name,
                    parent_id: categoryId,
                });
                toast.success('Subcategory created successfully');
            }
            onOpenChange(false);
            reset();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save subcategory');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {subcategory ? 'Edit Subcategory' : 'Add Subcategory'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Subcategory Name</Label>
                        <Input
                            id="name"
                            {...register('name', { required: 'Subcategory name is required' })}
                            placeholder="e.g., Premium Cards"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createSubcategory.isPending || updateSubcategory.isPending}
                        >
                            {subcategory ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
