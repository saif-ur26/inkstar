import { Link } from 'react-router-dom';
import { MessageCircle, Eye, Tag } from 'lucide-react';
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
      `Hello,\n\nI want information about:\n\nProduct: ${product.name}\nQuantity: [Please specify]\n\nThank you!`
    );
    const phoneNumber = '919182573606'; // Your WhatsApp business number
    window.open(`https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {category && (
            <Badge
              variant="default"
              className="text-xs bg-primary/90 backdrop-blur-sm"
            >
              <Tag className="h-3 w-3 mr-1" />
              {category.name}
            </Badge>
          )}
          {subcategory && (
            <Badge
              variant="secondary"
              className="text-xs bg-card/90 backdrop-blur-sm"
            >
              {subcategory.name}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex-1 p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem] sm:min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 sm:mt-3">
          <span className="text-base sm:text-xl font-bold text-primary">₹{product.basePrice}</span>
          <span className="text-xs sm:text-sm text-muted-foreground ml-1">/{product.priceUnit}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 gap-2 flex-col sm:flex-row">
        <Button variant="outline" size="sm" className="w-full sm:flex-1" asChild>
          <Link to={`/products/${product.id}`}>
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">View</span>
          </Link>
        </Button>
        <Button size="sm" className="w-full sm:flex-1" onClick={handleWhatsAppClick}>
          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Order</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
