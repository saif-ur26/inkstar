import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product, products as mockProducts } from '@/data/mockData';

// Helper function to transform database snake_case to camelCase
function transformProduct(dbProduct: any): Product {
    return {
        id: dbProduct.id,
        name: dbProduct.name,
        description: dbProduct.description,
        categoryId: dbProduct.category_id,
        subcategoryId: dbProduct.subcategory_id,
        basePrice: parseFloat(dbProduct.base_price),
        priceUnit: dbProduct.price_unit,
        images: dbProduct.images || [],
        customizationOptions: dbProduct.customization_options || [],
        isActive: dbProduct.is_active,
        createdAt: dbProduct.created_at,
    };
}

export function useProducts(activeOnly = true) {
    return useQuery({
        queryKey: ['products', activeOnly],
        queryFn: async () => {
            // Use mock data if Supabase is not configured
            if (!isSupabaseConfigured) {
                console.warn('⚠️ Supabase not configured. Using mock data. See QUICKSTART.md to set up Supabase.');
                return mockProducts.filter(p => !activeOnly || p.isActive);
            }

            let query = supabase.from('products').select('*').order('created_at', { ascending: false });

            if (activeOnly) {
                query = query.eq('is_active', true);
            }

            const { data, error } = await query;
            if (error) {
                console.error('Fetch products error:', error);
                throw error;
            }
            return data.map(transformProduct);
        },
    });
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            // Use mock data if Supabase is not configured
            if (!isSupabaseConfigured) {
                console.warn('⚠️ Supabase not configured. Using mock data. See QUICKSTART.md to set up Supabase.');
                return mockProducts.find(p => p.id === id) || null;
            }

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) {
                console.error('Error fetching product:', error);
                throw error;
            }
            return data ? transformProduct(data) : null;
        },
        enabled: !!id,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: Omit<Product, 'id' | 'createdAt'>) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot create products with mock data. Please set up Supabase to enable product creation.');
            }

            // Transform camelCase to snake_case for database
            const dbProduct = {
                name: product.name,
                description: product.description,
                category_id: product.categoryId,
                subcategory_id: product.subcategoryId,
                base_price: product.basePrice,
                price_unit: product.priceUnit,
                images: product.images,
                customization_options: product.customizationOptions,
                is_active: product.isActive,
            };

            const { data, error } = await supabase
                .from('products')
                .insert([dbProduct])
                .select()
                .single();

            if (error) {
                console.error('Create product error:', error);
                throw error;
            }

            // Transform snake_case back to camelCase
            return {
                id: data.id,
                name: data.name,
                description: data.description,
                categoryId: data.category_id,
                subcategoryId: data.subcategory_id,
                basePrice: data.base_price,
                priceUnit: data.price_unit,
                images: data.images,
                customizationOptions: data.customization_options,
                isActive: data.is_active,
                createdAt: data.created_at,
            } as Product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...product }: Partial<Product> & { id: string }) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot update products with mock data. Please set up Supabase to enable editing.');
            }

            // Transform camelCase to snake_case for database
            const dbProduct: any = {};
            if (product.name !== undefined) dbProduct.name = product.name;
            if (product.description !== undefined) dbProduct.description = product.description;
            if (product.categoryId !== undefined) dbProduct.category_id = product.categoryId;
            if (product.subcategoryId !== undefined) dbProduct.subcategory_id = product.subcategoryId;
            if (product.basePrice !== undefined) dbProduct.base_price = product.basePrice;
            if (product.priceUnit !== undefined) dbProduct.price_unit = product.priceUnit;
            if (product.images !== undefined) dbProduct.images = product.images;
            if (product.customizationOptions !== undefined) dbProduct.customization_options = product.customizationOptions;
            if (product.isActive !== undefined) dbProduct.is_active = product.isActive;

            const { data, error } = await supabase
                .from('products')
                .update(dbProduct)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Update product error:', error);
                throw error;
            }
            return transformProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            if (!isSupabaseConfigured) {
                throw new Error('Cannot delete products with mock data. Please set up Supabase to enable deletion.');
            }

            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
