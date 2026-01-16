import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is properly configured
export const isSupabaseConfigured =
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
    categories: {
        id: string;
        name: string;
        slug: string;
        created_at: string;
    };
    subcategories: {
        id: string;
        name: string;
        slug: string;
        parent_id: string;
        created_at: string;
    };
    products: {
        id: string;
        name: string;
        category_id: string;
        subcategory_id: string;
        description: string;
        images: string[];
        base_price: number;
        price_unit: string;
        customization_options: any;
        is_active: boolean;
        created_at: string;
    };
    inquiries: {
        id: string;
        product_id: string;
        product_name: string;
        customer_phone: string;
        quantity: number;
        customizations: string;
        status: string;
        created_at: string;
    };
};
