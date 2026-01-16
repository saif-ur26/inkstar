import { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    useCategories,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
    useCreateSubcategory,
    useUpdateSubcategory,
    useDeleteSubcategory,
} from '@/hooks/useCategories';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { CategoryDialog } from '@/components/admin/CategoryDialog';
import { SubcategoryDialog } from '@/components/admin/SubcategoryDialog';
import { SupabaseWarning } from '@/components/SupabaseWarning';
import { toast } from 'sonner';
import type { Category, Subcategory } from '@/data/mockData';

export default function CategoriesPage() {
    const { data: categories, isLoading } = useCategories();
    const deleteCategory = useDeleteCategory();
    const deleteSubcategory = useDeleteSubcategory();

    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryDialogOpen(true);
    };

    const handleAddSubcategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setEditingSubcategory(null);
        setSubcategoryDialogOpen(true);
    };

    const handleEditSubcategory = (subcategory: Subcategory) => {
        setEditingSubcategory(subcategory);
        setSubcategoryDialogOpen(true);
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Are you sure? This will also delete all subcategories and products in this category.')) {
            return;
        }

        try {
            await deleteCategory.mutateAsync(id);
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const handleDeleteSubcategory = async (id: string) => {
        if (!confirm('Are you sure? This will also affect products in this subcategory.')) {
            return;
        }

        try {
            await deleteSubcategory.mutateAsync(id);
            toast.success('Subcategory deleted successfully');
        } catch (error) {
            toast.error('Failed to delete subcategory');
        }
    };

    if (isLoading) {
        return (
            <AdminAuth>
                <div className="text-center py-12">Loading categories...</div>
            </AdminAuth>
        );
    }

    return (
        <AdminAuth>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">Categories & Subcategories</h2>
                    <Button onClick={() => {
                        setEditingCategory(null);
                        setCategoryDialogOpen(true);
                    }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                    </Button>
                </div>

                <SupabaseWarning />

                <div className="grid gap-6">
                    {categories?.map((category) => (
                        <Card key={category.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FolderTree className="h-5 w-5 text-primary" />
                                        <CardTitle>{category.name}</CardTitle>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAddSubcategory(category.id)}
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add Subcategory
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditCategory(category)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {category.subcategories.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No subcategories yet</p>
                                ) : (
                                    <div className="grid gap-2">
                                        {category.subcategories.map((subcategory) => (
                                            <div
                                                key={subcategory.id}
                                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                            >
                                                <span className="text-sm font-medium">{subcategory.name}</span>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditSubcategory(subcategory)}
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteSubcategory(subcategory.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {categories?.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <FolderTree className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Start by creating your first category
                            </p>
                            <Button onClick={() => setCategoryDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Category
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <CategoryDialog
                    open={categoryDialogOpen}
                    onOpenChange={setCategoryDialogOpen}
                    category={editingCategory}
                />

                <SubcategoryDialog
                    open={subcategoryDialogOpen}
                    onOpenChange={setSubcategoryDialogOpen}
                    subcategory={editingSubcategory}
                    categoryId={selectedCategoryId || editingSubcategory?.parent_id || ''}
                />
            </div>
        </AdminAuth>
    );
}
