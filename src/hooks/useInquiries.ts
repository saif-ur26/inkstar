import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Inquiry } from '@/data/mockData';

export function useInquiries() {
    return useQuery({
        queryKey: ['inquiries'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('inquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Inquiry[];
        },
    });
}

export function useCreateInquiry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
            const { data, error } = await supabase
                .from('inquiries')
                .insert([{ ...inquiry, status: 'new' }])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
}

export function useUpdateInquiryStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const { data, error } = await supabase
                .from('inquiries')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
}
