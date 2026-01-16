# Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your INK Star application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: INK Star
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Wait for the project to be created (takes ~2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` file
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- `categories` table
- `subcategories` table
- `products` table
- `inquiries` table
- Row Level Security policies
- Indexes for performance

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to Settings > API
2. Copy the following:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - Anon/Public key (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Seed Initial Data (Optional)

You can manually add categories and products through the admin panel, or use the Supabase dashboard:

### Add Categories via SQL:

```sql
-- Insert categories
INSERT INTO categories (name, slug) VALUES
  ('Bags', 'bags'),
  ('Stationery', 'stationery'),
  ('Boxes', 'boxes'),
  ('Specialty', 'specialty');

-- Get category IDs and insert subcategories
INSERT INTO subcategories (name, slug, parent_id) VALUES
  ('Polythene Bags', 'polythene-bags', (SELECT id FROM categories WHERE slug = 'bags')),
  ('Paper Bags', 'paper-bags', (SELECT id FROM categories WHERE slug = 'bags')),
  ('Visiting Cards', 'visiting-cards', (SELECT id FROM categories WHERE slug = 'stationery')),
  ('Bill Books', 'bill-books', (SELECT id FROM categories WHERE slug = 'stationery'));
```

## Step 6: Run the Application

```bash
npm install
npm run dev
```

## Features Implemented

### Frontend (Public)
- ✅ Product catalog with filtering by category/subcategory
- ✅ Product search functionality
- ✅ Product detail pages with customization options
- ✅ Inquiry submission form
- ✅ WhatsApp integration for orders
- ✅ Responsive design

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Product management (CRUD operations)
- ✅ Category & subcategory management
- ✅ Inquiry management with status tracking
- ✅ Toggle product active/inactive status

### Backend (Supabase)
- ✅ PostgreSQL database
- ✅ Row Level Security (RLS) policies
- ✅ Public read access for active products
- ✅ Public inquiry submission
- ✅ Admin authentication support

## Admin Panel Access

Navigate to `/admin` to access the admin panel. 

**Note:** Currently, the admin panel is accessible without authentication. To add authentication:

1. Enable Email/Password auth in Supabase Dashboard > Authentication > Providers
2. Create admin users in Supabase Dashboard > Authentication > Users
3. Update the RLS policies to check for authenticated users
4. Implement login functionality in `/admin/login`

## Database Structure

### Categories
- id (UUID)
- name (TEXT)
- slug (TEXT)
- created_at (TIMESTAMP)

### Subcategories
- id (UUID)
- name (TEXT)
- slug (TEXT)
- parent_id (UUID) → references categories
- created_at (TIMESTAMP)

### Products
- id (UUID)
- name (TEXT)
- category_id (UUID) → references categories
- subcategory_id (UUID) → references subcategories
- description (TEXT)
- images (TEXT[])
- base_price (DECIMAL)
- price_unit (TEXT)
- customization_options (JSONB)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)

### Inquiries
- id (UUID)
- product_id (UUID) → references products
- product_name (TEXT)
- customer_phone (TEXT)
- quantity (INTEGER)
- customizations (TEXT)
- status (TEXT) - 'new', 'contacted', 'completed'
- created_at (TIMESTAMP)

## Troubleshooting

### "Failed to fetch" errors
- Check that your `.env` file has the correct Supabase URL and key
- Verify that the Supabase project is running
- Check browser console for CORS errors

### Products not showing
- Ensure products have `is_active = true`
- Check that categories and subcategories are properly linked
- Verify RLS policies are set up correctly

### Can't create products in admin
- Check that the authenticated user has proper permissions
- Verify the RLS policies allow INSERT operations
- Check browser console for detailed error messages

## Next Steps

1. **Add Authentication**: Implement proper admin authentication
2. **Image Upload**: Integrate Supabase Storage for product images
3. **Email Notifications**: Set up email alerts for new inquiries
4. **Analytics**: Add tracking for popular products and conversion rates
5. **Payment Integration**: Add payment gateway for online orders

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review the application logs in browser console
- Check Supabase dashboard logs for backend errors
