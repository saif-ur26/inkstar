import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3X3, List, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { data: products, isLoading: productsLoading } = useProducts(true);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');

  const handleCategoryChange = (categoryId: string | null) => {
    if (categoryId) {
      searchParams.set('category', categoryId);
    } else {
      searchParams.delete('category');
    }
    searchParams.delete('subcategory');
    setSearchParams(searchParams);
  };

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    if (subcategoryId) {
      searchParams.set('subcategory', subcategoryId);
    } else {
      searchParams.delete('subcategory');
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      if (!product.isActive) return false;

      if (selectedCategory && product.categoryId !== selectedCategory) {
        return false;
      }

      if (selectedSubcategory && product.subcategoryId !== selectedSubcategory) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery]);

  const activeCategory = categories?.find((c) => c.id === selectedCategory);
  const activeSubcategory = activeCategory?.subcategories.find((s) => s.id === selectedSubcategory);

  if (productsLoading || categoriesLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading products...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 lg:py-12 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Our Products</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse our complete range of printing and packaging solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    onCategoryChange={(id) => {
                      handleCategoryChange(id);
                      if (!id) setMobileFilterOpen(false);
                    }}
                    onSubcategoryChange={(id) => {
                      handleSubcategoryChange(id);
                      setMobileFilterOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {(selectedCategory || selectedSubcategory || searchQuery) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeCategory && (
              <Badge variant="secondary" className="gap-1">
                {activeCategory.name}
                <button onClick={() => handleCategoryChange(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeSubcategory && (
              <Badge variant="secondary" className="gap-1">
                {activeSubcategory.name}
                <button onClick={() => handleSubcategoryChange(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={handleCategoryChange}
                onSubcategoryChange={handleSubcategoryChange}
              />
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <AnimatedSection key={product.id} animation="fade-up" delay={index * 50}>
                    <ProductCard product={product} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
