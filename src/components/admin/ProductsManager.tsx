import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useProducts, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductDialog } from './ProductDialog';
import { SupabaseWarning } from '@/components/SupabaseWarning';
import { toast } from 'sonner';

export function ProductsManager() {
    const { data: products, isLoading } = useProducts(false);
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            await updateProduct.mutateAsync({ id, is_active: !isActive });
            toast.success(`Product ${!isActive ? 'activated' : 'deactivated'}`);
        } catch (error: any) {
            console.error('Toggle active error:', error);
            toast.error(error.message || 'Failed to update product');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteProduct.mutateAsync(id);
            toast.success('Product deleted');
        } catch (error: any) {
            console.error('Delete error:', error);
            toast.error(error.message || 'Failed to delete product');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products</h2>
                <Button onClick={() => { setEditingProduct(null); setDialogOpen(true); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>

            <SupabaseWarning />

            <div className="grid gap-4">
                {products?.map((product) => (
                    <Card key={product.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <img
                                    src={product.images[0] || '/placeholder.svg'}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold">{product.name}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge variant={product.isActive ? 'default' : 'secondary'}>
                                                    {product.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                                <Badge variant="outline">₹{product.basePrice}</Badge>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleToggleActive(product.id, product.isActive)}
                                            >
                                                {product.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => { setEditingProduct(product); setDialogOpen(true); }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <ProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={editingProduct}
            />
        </div>
    );
}
