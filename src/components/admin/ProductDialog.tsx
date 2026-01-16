import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories } from '@/hooks/useCategories';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function ProductDialog({ open, onOpenChange, product }: any) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const { data: categories } = useCategories();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const [customOptions, setCustomOptions] = useState<any[]>([]);

    const selectedCategory = watch('categoryId');

    useEffect(() => {
        if (product) {
            reset(product);
            setCustomOptions(product.customizationOptions || []);
        } else {
            reset({
                name: '',
                description: '',
                basePrice: 0,
                priceUnit: 'per piece',
                images: [],
                isActive: true,
            });
            setCustomOptions([]);
        }
    }, [product, reset]);

    const onSubmit = async (data: any) => {
        try {
            const productData = {
                ...data,
                basePrice: parseFloat(data.basePrice),
                customizationOptions: customOptions,
                images: data.images ? data.images.split(',').map((s: string) => s.trim()) : [],
            };

            if (product) {
                await updateProduct.mutateAsync({ id: product.id, ...productData });
                toast.success('Product updated');
            } else {
                await createProduct.mutateAsync(productData);
                toast.success('Product created');
            }
            onOpenChange(false);
        } catch (error) {
            toast.error('Failed to save product');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input {...register('name', { required: true })} />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea {...register('description')} rows={3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={(v) => setValue('categoryId', v)} defaultValue={product?.categoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Subcategory</Label>
                            <Select onValueChange={(v) => setValue('subcategoryId', v)} defaultValue={product?.subcategoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories
                                        ?.find((c) => c.id === selectedCategory)
                                        ?.subcategories.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Base Price</Label>
                            <Input type="number" step="0.01" {...register('basePrice', { required: true })} />
                        </div>

                        <div>
                            <Label>Price Unit</Label>
                            <Select onValueChange={(v) => setValue('priceUnit', v)} defaultValue={product?.priceUnit || 'per piece'}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="per piece">Per Piece</SelectItem>
                                    <SelectItem value="per 100">Per 100</SelectItem>
                                    <SelectItem value="per kg">Per KG</SelectItem>
                                    <SelectItem value="per set">Per Set</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label>Images (comma-separated URLs)</Label>
                        <Input {...register('images')} placeholder="/placeholder.svg, /image2.jpg" />
                    </div>

                    <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {product ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
