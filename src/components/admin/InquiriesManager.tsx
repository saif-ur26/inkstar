import { useInquiries, useUpdateInquiryStatus } from '@/hooks/useInquiries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone } from 'lucide-react';
import { toast } from 'sonner';

export function InquiriesManager() {
    const { data: inquiries, isLoading } = useInquiries();
    const updateStatus = useUpdateInquiryStatus();

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateStatus.mutateAsync({ id, status });
            toast.success('Status updated');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    const statusColors = {
        new: 'default',
        contacted: 'secondary',
        completed: 'outline',
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Inquiries</h2>

            <div className="grid gap-4">
                {inquiries?.map((inquiry) => (
                    <Card key={inquiry.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold">{inquiry.productName}</h3>
                                        <Badge variant={statusColors[inquiry.status as keyof typeof statusColors] as any}>
                                            {inquiry.status}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {inquiry.customerPhone}
                                        </p>
                                        <p>Quantity: {inquiry.quantity}</p>
                                        {inquiry.customizations && (
                                            <p className="text-xs">Customizations: {inquiry.customizations}</p>
                                        )}
                                        <p className="text-xs">{inquiry.createdAt}</p>
                                    </div>
                                </div>
                                <div className="w-40">
                                    <Select
                                        value={inquiry.status}
                                        onValueChange={(status) => handleStatusChange(inquiry.id, status)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
