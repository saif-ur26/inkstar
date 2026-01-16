import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Category, Subcategory, categories as mockCategories } from '@/data/mockData';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            // Use mock data if Supabase is not configured
            if (!isSupabaseConfigured) {
                console.warn('⚠️ Supabase not configured. Using mock data. See QUICKSTART.md to set up Supabase.');
                return mockCategories;
            }

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
            if (!isSupabaseConfigured) {
                throw new Error('Cannot create categories with mock data. Please set up Supabase.');
            }

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

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...category }: Partial<Category> & { id: string }) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot update categories with mock data. Please set up Supabase.');
            }

            const { data, error } = await supabase
                .from('categories')
                .update(category)
                .eq('id', id)
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

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot delete categories with mock data. Please set up Supabase.');
            }

            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useCreateSubcategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subcategory: Omit<Subcategory, 'id'>) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot create subcategories with mock data. Please set up Supabase.');
            }

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

export function useUpdateSubcategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...subcategory }: Partial<Subcategory> & { id: string }) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot update subcategories with mock data. Please set up Supabase.');
            }

            const { data, error } = await supabase
                .from('subcategories')
                .update(subcategory)
                .eq('id', id)
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

export function useDeleteSubcategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot delete subcategories with mock data. Please set up Supabase.');
            }

            const { error } = await supabase
                .from('subcategories')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
