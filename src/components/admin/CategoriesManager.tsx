import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategories, useCreateCategory, useCreateSubcategory } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export function CategoriesManager() {
    const { data: categories, isLoading } = useCategories();
    const createCategory = useCreateCategory();
    const createSubcategory = useCreateSubcategory();
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategorySlug, setSubcategorySlug] = useState('');

    const handleCreateCategory = async () => {
        try {
            await createCategory.mutateAsync({ name: categoryName, slug: categorySlug });
            toast.success('Category created');
            setCategoryDialogOpen(false);
            setCategoryName('');
            setCategorySlug('');
        } catch (error) {
            toast.error('Failed to create category');
        }
    };

    const handleCreateSubcategory = async () => {
        try {
            await createSubcategory.mutateAsync({
                name: subcategoryName,
                slug: subcategorySlug,
                parentId: selectedCategoryId,
            });
            toast.success('Subcategory created');
            setSubcategoryDialogOpen(false);
            setSubcategoryName('');
            setSubcategorySlug('');
        } catch (error) {
            toast.error('Failed to create subcategory');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Categories</h2>
                <Button onClick={() => setCategoryDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </div>

            <div className="grid gap-4">
                {categories?.map((category) => (
                    <Card key={category.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>{category.name}</CardTitle>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedCategoryId(category.id);
                                        setSubcategoryDialogOpen(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Subcategory
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {category.subcategories.map((sub) => (
                                    <div key={sub.id} className="px-3 py-1 bg-muted rounded-full text-sm">
                                        {sub.name}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} />
                        </div>
                        <Button onClick={handleCreateCategory}>Create</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={subcategoryDialogOpen} onOpenChange={setSubcategoryDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Subcategory</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input value={subcategorySlug} onChange={(e) => setSubcategorySlug(e.target.value)} />
                        </div>
                        <Button onClick={handleCreateSubcategory}>Create</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
