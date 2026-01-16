import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Plus, Minus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useCreateInquiry } from '@/hooks/useInquiries';
import { ProductCard } from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { WHATSAPP_CONFIG, getWhatsAppUrl } from '@/config/whatsapp';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || '');
  const { data: allProducts } = useProducts(true);
  const { data: categories } = useCategories();
  const createInquiry = useCreateInquiry();

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const category = categories?.find((c) => c.id === product?.categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === product?.subcategoryId);

  // Get related products from the same category
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts) return [];
    return allProducts
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  const calculatedPrice = useMemo(() => {
    if (!product) return 0;

    let price = product.basePrice;

    // Add customization modifiers
    Object.entries(selectedOptions).forEach(([optionName, optionIndex]) => {
      const option = product.customizationOptions.find((o: any) => o.name === optionName);
      if (option && option.options[optionIndex]) {
        price += option.options[optionIndex].priceModifier;
      }
    });

    return price;
  }, [product, selectedOptions]);

  const handleWhatsAppClick = () => {
    if (!product) return;

    const customizations = Object.entries(selectedOptions)
      .map(([optionName, optionIndex]) => {
        const option = product.customizationOptions.find((o: any) => o.name === optionName);
        return `  • ${optionName}: ${option?.options[optionIndex]?.label || 'Default'}`;
      })
      .join('\n');

    const pricePerPiece = calculatedPrice;
    const totalPrice = calculatedPrice * quantity;

    const message =
      `${WHATSAPP_CONFIG.greeting}\n\n` +
      `I'm interested in ordering:\n\n` +
      `📦 *Product:* ${product.name}\n` +
      `📊 *Quantity:* ${quantity} ${quantity === 1 ? 'piece' : 'pieces'}\n` +
      `💰 *Price per piece:* ₹${pricePerPiece}\n` +
      `💵 *Total Price:* ₹${totalPrice}\n` +
      `${customizations ? `\n🎨 *Customizations:*\n${customizations}\n` : ''}` +
      `\nPlease confirm availability and delivery details.\n\n` +
      `Thank you!`;

    window.open(getWhatsAppUrl(message), '_blank');
  };

  const handleInquiry = async () => {
    if (!product) return;
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    const customizations = Object.entries(selectedOptions)
      .map(([optionName, optionIndex]) => {
        const option = product.customizationOptions.find((o: any) => o.name === optionName);
        return `${optionName}: ${option?.options[optionIndex]?.label || 'Default'}`;
      })
      .join(', ');

    try {
      await createInquiry.mutateAsync({
        productId: product.id,
        productName: product.name,
        customerPhone: phoneNumber,
        quantity,
        customizations,
      });
      toast.success('Inquiry submitted! We will contact you soon.');
      setPhoneNumber('');
    } catch (error) {
      toast.error('Failed to submit inquiry');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button asChild className="mt-4">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  to={`/products?category=${category.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            {subcategory && (
              <>
                <Link
                  to={`/products?category=${category.id}&subcategory=${subcategory.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {subcategory.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <AnimatedSection animation="slide-right">
            <div className="space-y-4">
              <div className="relative bg-muted rounded-xl overflow-hidden p-6">
                <div className="aspect-square max-w-sm mx-auto">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors p-2 bg-muted',
                        currentImageIndex === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      )}
                    >
                      <img src={image} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-3">
                  {category && (
                    <Badge variant="default" className="text-xs">
                      {category.name}
                    </Badge>
                  )}
                  {subcategory && (
                    <Badge variant="secondary" className="text-xs">
                      {subcategory.name}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                <p className="mt-3 text-muted-foreground">{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">₹{calculatedPrice}</span>
                <span className="text-lg text-muted-foreground">{product.priceUnit}</span>
              </div>

              {/* Customization Options */}
              {product.customizationOptions && product.customizationOptions.length > 0 && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold">Customize Your Order</h3>

                    {product.customizationOptions.map((option: any) => (
                      <div key={option.name}>
                        <Label className="mb-2 block">{option.name}</Label>
                        <RadioGroup
                          value={String(selectedOptions[option.name] ?? 0)}
                          onValueChange={(value) =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [option.name]: parseInt(value),
                            }))
                          }
                          className="grid grid-cols-2 gap-2"
                        >
                          {option.options.map((opt: any, index: number) => (
                            <Label
                              key={index}
                              htmlFor={`${option.name}-${index}`}
                              className={cn(
                                'flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors',
                                (selectedOptions[option.name] ?? 0) === index
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-muted-foreground'
                              )}
                            >
                              <RadioGroupItem
                                value={String(index)}
                                id={`${option.name}-${index}`}
                                className="sr-only"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{opt.label}</p>
                                {opt.priceModifier !== 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    {opt.priceModifier > 0 ? '+' : ''}₹{opt.priceModifier}
                                  </p>
                                )}
                              </div>
                              {(selectedOptions[option.name] ?? 0) === index && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </Label>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Quantity */}
              <div>
                <Label className="mb-2 block">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <Label className="mb-2 block">Your Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Total */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{calculatedPrice * quantity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Final price may vary based on custom requirements
                </p>
              </div>

              {/* CTA */}
              <div className="space-y-2">
                <Button size="lg" className="w-full" onClick={handleInquiry}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Submit Inquiry
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={handleWhatsAppClick}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order on WhatsApp
                </Button>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">More from {category?.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Other products you might like
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/products?category=${product.categoryId}`}>
                    View All
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct, index) => (
                <AnimatedSection key={relatedProduct.id} animation="fade-up" delay={index * 100}>
                  <ProductCard product={relatedProduct} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
