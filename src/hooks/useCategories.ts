import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Category, Subcategory } from '@/data/mockData';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data: categories, error: catError } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (catError) throw catError;

            const { data: subcategories, error: subError } = await supabase
                .from('subcategories')
                .select('*')
                .order('name');

            if (subError) throw subError;

            return categories.map(cat => ({
                ...cat,
                subcategories: subcategories.filter(sub => sub.parent_id === cat.id),
            })) as Category[];
        },
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (category: Omit<Category, 'id' | 'subcategories'>) => {
            const { data, error } = await supabase
                .from('categories')
                .insert([category])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

export function useCreateSubcategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subcategory: Omit<Subcategory, 'id'>) => {
            const { data, error } = await supabase
                .from('subcategories')
                .insert([subcategory])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}
