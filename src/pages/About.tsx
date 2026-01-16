import { Target, Users, Leaf, Award, Clock, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';

const timeline = [
  {
    year: '2014',
    title: 'Foundation',
    description: 'INK Star Printing was established with a vision to provide quality printing solutions.',
  },
  {
    year: '2016',
    title: 'Expansion',
    description: 'Added packaging solutions and expanded machinery to serve more clients.',
  },
  {
    year: '2018',
    title: 'Digital Printing',
    description: 'Introduced state-of-the-art digital printing technology for faster turnaround.',
  },
  {
    year: '2020',
    title: 'Sustainability Focus',
    description: 'Launched eco-friendly product lines including paper and jute bags.',
  },
  {
    year: '2022',
    title: 'Specialty Products',
    description: 'Expanded into metal visiting cards and premium specialty items.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    description: 'Launched online catalog for seamless customer experience.',
  },
];

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on quality. Every product goes through rigorous quality checks.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'We understand deadlines and ensure your orders are delivered on time, every time.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We work closely with you to meet your exact needs.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We offer eco-friendly options and continuously work to reduce our environmental impact.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We stay updated with the latest technology to offer cutting-edge printing solutions.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Attention to detail in every project ensures perfect results for your brand.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Your Trusted Partner in Printing Excellence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Over 10 years of delivering premium printing and packaging solutions with commitment to quality and sustainability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-right">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50" />
                <div className="relative z-10 text-center p-8">
                  <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-4xl">IS</span>
                  </div>
                  <h3 className="text-2xl font-bold">INK Star Printing</h3>
                  <p className="text-muted-foreground">Est. 2014</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={200}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  INK Star Printing is a trusted partner for premium printing and packaging solutions. 
                  With over 10 years of industry experience, the company delivers customized bags, 
                  business stationery, packaging boxes, and digital printing services under one roof.
                </p>
                <p>
                  Powered by modern machinery, skilled craftsmanship, and a commitment to quality and 
                  timely delivery, INK Star Printing helps brands create a strong professional presence.
                </p>
                <p>
                  Whether you're a small business looking for visiting cards or a large enterprise 
                  needing bulk packaging solutions, we have the expertise and capacity to deliver 
                  exceptional results.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <p className="text-3xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at INK Star Printing.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} animation="fade-up" delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A decade of growth, innovation, and commitment to excellence.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <AnimatedSection
                key={item.year}
                animation={index % 2 === 0 ? 'slide-right' : 'slide-left'}
                delay={index * 100}
              >
                <div className="flex gap-4 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">{item.year}</span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
