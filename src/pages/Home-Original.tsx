import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Package, Printer, Award, Clock, CheckCircle, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ProductCard } from '@/components/products/ProductCard';
import { products, categories } from '@/data/mockData';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: Package,
    title: 'Complete Solutions',
    description: 'From bags to stationery, boxes to specialty items - all under one roof.',
  },
  {
    icon: Printer,
    title: 'Modern Machinery',
    description: 'State-of-the-art printing equipment for superior quality output.',
  },
  {
    icon: Award,
    title: '10+ Years Experience',
    description: 'Trusted by hundreds of businesses for their printing needs.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'We understand deadlines and ensure on-time delivery, every time.',
  },
];

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Package, value: '10K+', label: 'Products Delivered' },
  { icon: Star, value: '4.9/5', label: 'Customer Rating' },
  { icon: Zap, value: '24/7', label: 'Support Available' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'Kumar Enterprises',
    text: 'INK Star has been our go-to partner for all printing needs. Quality and service are exceptional!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    company: 'Sharma Retail',
    text: 'Fast delivery, competitive prices, and excellent customer support. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    company: 'Patel Industries',
    text: 'The customization options are amazing. They always deliver exactly what we need.',
    rating: 5,
  },
];

export default function Home() {
  const featuredProducts = products.filter(p => p.isActive).slice(0, 6);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi INK Star, I'm interested in your printing services. Please share more details.");
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-right">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Premium Printing & Packaging
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                INK Star Printers & Plastic Machinery
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Premium Printing & Packaging Solutions with Quality, Speed & Sustainability.
                Your trusted partner for all printing needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    View Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={handleWhatsAppClick}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Order
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={200}>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {categories.slice(0, 4).map((category, index) => (
                      <div
                        key={category.id}
                        className="bg-card rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Package className="h-8 w-8 text-primary mb-2" />
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.subcategories.length} items
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/40 rounded-full blur-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose INK Star?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine experience, technology, and dedication to deliver exceptional printing solutions.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} animation="fade-up" delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Product Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of printing and packaging solutions.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <AnimatedSection key={category.id} animation="scale" delay={index * 100}>
                <Link to={`/products?category=${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                        <Package className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.subcategories.length} subcategories
                      </p>
                      <ul className="mt-3 space-y-1">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <li key={sub.id} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {sub.name}
                          </li>
                        ))}
                        {category.subcategories.length > 3 && (
                          <li className="text-xs text-primary font-medium">
                            +{category.subcategories.length - 3} more
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Our most popular printing solutions.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.id} animation="fade-up" delay={index * 100}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="mt-4 text-lg opacity-90">
              Get in touch with us today and let's create something amazing together.
              Custom quotes available for bulk orders.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
