import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCategories } from '@/hooks/useCategories';

interface CategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryChange: (subcategoryId: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryFilterProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(selectedCategory);
  const { data: categories, isLoading } = useCategories();

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategoryChange(null);
      onSubcategoryChange(null);
      setExpandedCategory(null);
    } else {
      onCategoryChange(categoryId);
      onSubcategoryChange(null);
      setExpandedCategory(categoryId);
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      onSubcategoryChange(null);
    } else {
      onSubcategoryChange(subcategoryId);
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (!categories) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Categories</h3>
        {(selectedCategory || selectedSubcategory) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(null);
              onSubcategoryChange(null);
              setExpandedCategory(null);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {categories.map((category) => (
        <div key={category.id} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              "w-full flex items-center justify-between p-3 text-left transition-colors",
              selectedCategory === category.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            <span className="font-medium">{category.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {category.subcategories.length}
              </Badge>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedCategory === category.id && "rotate-180"
                )}
              />
            </div>
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              expandedCategory === category.id ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="p-2 pt-0 space-y-1">
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                    selectedSubcategory === subcategory.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
