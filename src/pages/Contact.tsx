import { Phone, MapPin, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 95500 43174',
    description: 'Mon-Sat, 9AM to 7PM',
    link: 'tel:+919550043174',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'INK Star Printers & Plastic Machinery',
    description: 'Hyderabad, Telangana',
    address: 'Location: 17.332395, 78.491131',
    link: 'https://www.google.com/maps/search/17.332395,+78.491131?entry=tts',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Monday - Saturday',
    description: '9:00 AM - 7:00 PM',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+91 95500 43174',
    description: 'Quick response via WhatsApp',
    link: 'https://wa.me/919550043174',
  },
];

export default function Contact() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi INK Star, I'm interested in your printing services. Please share more details.");
    window.open(`https://wa.me/919550043174?text=${message}`, '_blank');
  };

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/17.332395,+78.491131?entry=tts', '_blank');
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Get in Touch with INK Star
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Have a project in mind? We'd love to hear from you. Reach out via phone or WhatsApp for quick assistance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {contactInfo.map((item, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-foreground font-medium mb-1">{item.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  {item.address && (
                    <p className="text-xs text-muted-foreground mt-1">{item.address}</p>
                  )}
                  {item.link && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0 h-auto text-primary"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      {item.title === 'Address' ? 'View on Map' : item.title === 'WhatsApp' ? 'Open WhatsApp' : 'Call Now'}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 sm:p-8 text-center">
              <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Quick Response via WhatsApp</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Get instant quotes and answers to your questions. We're just a message away!
              </p>
              <Button size="lg" className="w-full sm:w-auto" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Google Maps */}
        <AnimatedSection animation="fade-up" delay={600}>
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=17.332395,78.491131&hl=en&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INK Star Location"
                  className="absolute inset-0"
                />
                <Button
                  className="absolute bottom-4 right-4 shadow-lg"
                  onClick={handleMapClick}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Open in Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </Layout>
  );
}
