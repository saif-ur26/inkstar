import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Package, Printer, Award, Clock, CheckCircle, Star, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ProductCard } from '@/components/products/ProductCard';
import { products, categories } from '@/data/mockData';
import { useProducts } from '@/hooks/useProducts';
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
    const { data: productsData } = useProducts(true);
    const featuredProducts = (productsData || products).filter(p => p.isActive).slice(0, 6);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [productStartIndex, setProductStartIndex] = useState(0);

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

    const nextProducts = () => {
        setProductStartIndex((prev) => (prev + 3) % featuredProducts.length);
    };

    const prevProducts = () => {
        setProductStartIndex((prev) => (prev - 3 + featuredProducts.length) % featuredProducts.length);
    };

    const visibleProducts = [
        featuredProducts[productStartIndex],
        featuredProducts[(productStartIndex + 1) % featuredProducts.length],
        featuredProducts[(productStartIndex + 2) % featuredProducts.length],
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <AnimatedSection animation="slide-right">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-pulse">
                                ✨ Premium Printing & Packaging
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                                INK Star Printers & <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold">Plastic Machinery</span>
                            </h1>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
                                Premium Printing & Packaging Solutions with Quality, Speed & Sustainability.
                                Your trusted partner for all printing needs.
                            </p>
                            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all" asChild>
                                    <Link to="/products">
                                        View Products
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="group" onClick={handleWhatsAppClick}>
                                    <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    WhatsApp Order
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {stats.map((stat, index) => (
                                    <AnimatedSection key={stat.label} animation="fade-up" delay={index * 100}>
                                        <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
                                            <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Animated Visual Showcase - Hidden on Mobile */}
                        <AnimatedSection animation="slide-left" delay={200} className="hidden lg:block">
                            <div className="relative">
                                {/* Main animated container */}
                                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 dark:from-orange-950 dark:via-orange-900 dark:to-orange-800 overflow-hidden shadow-2xl">
                                    {/* Animated background waves */}
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
                                        <div className="absolute top-0 left-0 w-full h-full">
                                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                                            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                                        </div>
                                    </div>

                                    {/* Floating geometric shapes */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Large circle */}
                                        <div
                                            className="absolute w-64 h-64 rounded-full border-4 border-primary/30"
                                            style={{
                                                animation: 'float 8s ease-in-out infinite',
                                            }}
                                        />

                                        {/* Medium circle */}
                                        <div
                                            className="absolute w-48 h-48 rounded-full border-4 border-accent/30"
                                            style={{
                                                animation: 'float 6s ease-in-out infinite reverse',
                                                animationDelay: '1s'
                                            }}
                                        />

                                        {/* Small circle */}
                                        <div
                                            className="absolute w-32 h-32 rounded-full border-4 border-primary/40"
                                            style={{
                                                animation: 'float 7s ease-in-out infinite',
                                                animationDelay: '2s'
                                            }}
                                        />

                                        {/* Rotating squares */}
                                        <div
                                            className="absolute w-40 h-40 border-4 border-accent/20 rotate-45"
                                            style={{
                                                animation: 'spin 20s linear infinite',
                                            }}
                                        />

                                        <div
                                            className="absolute w-56 h-56 border-4 border-primary/20 rotate-12"
                                            style={{
                                                animation: 'spin 25s linear infinite reverse',
                                            }}
                                        />
                                    </div>

                                    {/* Center content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center z-10 p-8">
                                            <div
                                                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl mb-6"
                                                style={{
                                                    animation: 'float 4s ease-in-out infinite, pulse 3s ease-in-out infinite',
                                                }}
                                            >
                                                <Package className="w-16 h-16 text-white" />
                                            </div>

                                            <h3
                                                className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
                                                style={{
                                                    animation: 'fade-in-up 1s ease-out',
                                                }}
                                            >
                                                Premium Quality
                                            </h3>

                                            <p
                                                className="text-lg text-gray-700 dark:text-gray-300 max-w-xs mx-auto"
                                                style={{
                                                    animation: 'fade-in-up 1s ease-out 0.2s backwards',
                                                }}
                                            >
                                                Printing & Packaging Solutions
                                            </p>

                                            <div
                                                className="mt-6 flex items-center justify-center gap-2"
                                                style={{
                                                    animation: 'fade-in-up 1s ease-out 0.4s backwards',
                                                }}
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating particles */}
                                    <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDuration: '3s' }} />
                                    <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                                    <div className="absolute bottom-16 left-20 w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
                                    <div className="absolute bottom-24 right-12 w-3 h-3 rounded-full bg-accent/40 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />

                                    {/* Corner decorations */}
                                    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/30 rounded-tl-3xl" />
                                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-accent/30 rounded-br-3xl" />
                                </div>

                                {/* Outer glow effects */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 sm:py-12 lg:py-16 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why Choose INK Star?</h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            We combine experience, technology, and dedication to deliver exceptional printing solutions.
                        </p>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {features.map((feature, index) => (
                            <AnimatedSection key={feature.title} animation="fade-up" delay={index * 100}>
                                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-primary/20 hover:-translate-y-1 group">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                            <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Carousel */}
            <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary/5 to-accent/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Our Clients Say</h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Trusted by businesses across India for quality printing solutions.
                        </p>
                    </AnimatedSection>

                    <div className="max-w-3xl mx-auto relative">
                        <Card className="overflow-hidden">
                            <CardContent className="p-6 sm:p-8 lg:p-12">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex gap-1 mb-3 sm:mb-4">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="text-base sm:text-lg text-foreground mb-4 sm:mb-6 italic">
                                        "{testimonials[currentTestimonial].text}"
                                    </p>
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base text-foreground">{testimonials[currentTestimonial].name}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonials[currentTestimonial].company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dots indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`h-2 rounded-full transition-all ${index === currentTestimonial ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Product Categories</h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore our wide range of printing and packaging solutions.
                        </p>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {categories.map((category, index) => (
                            <AnimatedSection key={category.id} animation="scale" delay={index * 100}>
                                <Link to={`/products?category=${category.id}`}>
                                    <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer group">
                                        <CardContent className="p-4 sm:p-6">
                                            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                                                <Package className="h-10 w-10 sm:h-12 sm:w-12 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                                            </div>
                                            <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                {category.subcategories.length} subcategories
                                            </p>
                                            <ul className="mt-2 sm:mt-3 space-y-1">
                                                {category.subcategories.slice(0, 3).map((sub) => (
                                                    <li key={sub.id} className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                                        <span className="line-clamp-1">{sub.name}</span>
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

            {/* Featured Products Carousel */}
            <section className="py-8 sm:py-12 lg:py-16 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Products</h2>
                            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-muted-foreground">
                                Our most popular printing solutions.
                            </p>
                        </div>
                        <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                            <Link to="/products">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </AnimatedSection>

                    <div className="relative">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {visibleProducts.map((product, index) => (
                                <AnimatedSection key={product.id} animation="fade-up" delay={index * 100}>
                                    <ProductCard product={product} />
                                </AnimatedSection>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevProducts}
                                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextProducts}
                                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 text-center sm:hidden">
                        <Button size="sm" asChild>
                            <Link to="/products">
                                View All Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <AnimatedSection className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg opacity-90">
                            Get in touch with us today and let's create something amazing together.
                            Custom quotes available for bulk orders.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all" onClick={handleWhatsAppClick}>
                                <MessageCircle className="mr-2 h-5 w-5" />
                                WhatsApp Now
                            </Button>
                            <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10 backdrop-blur-sm" asChild>
                                <Link to="/contact">
                                    Contact Us
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </Layout>
    );
}
