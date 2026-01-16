import { useProducts } from '@/hooks/useProducts';
import { useInquiries } from '@/hooks/useInquiries';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, MessageSquare, Tags, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { data: products } = useProducts(false);
  const { data: inquiries } = useInquiries();
  const { data: categories } = useCategories();

  const stats = [
    {
      title: 'Total Products',
      value: products?.length || 0,
      icon: Package,
      description: `${products?.filter(p => p.isActive).length || 0} active`,
    },
    {
      title: 'New Inquiries',
      value: inquiries?.filter(i => i.status === 'new').length || 0,
      icon: MessageSquare,
      description: `${inquiries?.length || 0} total`,
    },
    {
      title: 'Categories',
      value: categories?.length || 0,
      icon: Tags,
      description: `${categories?.reduce((acc, c) => acc + c.subcategories.length, 0) || 0} subcategories`,
    },
    {
      title: 'Completed Orders',
      value: inquiries?.filter(i => i.status === 'completed').length || 0,
      icon: TrendingUp,
      description: 'This month',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inquiries?.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{inquiry.productName}</p>
                    <p className="text-xs text-muted-foreground">{inquiry.customerPhone}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded">{inquiry.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {products?.filter(p => p.isActive).slice(0, 5).map((product) => (
                <div key={product.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{product.basePrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
