import { Link } from 'react-router-dom';
import { MessageCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/data/mockData';
import { categories } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const category = categories.find(c => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(s => s.id === product.subcategoryId);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi INK Star, I'm interested in ${product.name}.\n\nQuantity: ___\nCustomization: ___`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {subcategory && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm"
          >
            {subcategory.name}
          </Badge>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3">
          <span className="text-xl font-bold text-primary">₹{product.basePrice}</span>
          <span className="text-sm text-muted-foreground ml-1">{product.priceUnit}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/products/${product.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
        <Button className="flex-1" onClick={handleWhatsAppClick}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Order
        </Button>
      </CardFooter>
    </Card>
  );
}
