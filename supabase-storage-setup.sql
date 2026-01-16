-- Supabase Storage Setup for Product Images
-- Run this in Supabase SQL Editor to set up image storage

-- IMPORTANT: First create the bucket via Dashboard:
-- 1. Go to Storage → New Bucket
-- 2. Name: product-images
-- 3. Check "Public bucket"
-- 4. Click Create

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload product images" ON storage.objects;

-- Set up storage policies for the product-images bucket

-- Policy 1: Allow public to view/download images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Policy 2: Allow ANYONE to upload images (for admin panel without auth)
-- Note: In production, you should require authentication
CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

-- Policy 3: Allow anyone to update images
CREATE POLICY "Anyone can update product images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'product-images');

-- Policy 4: Allow anyone to delete images
CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'product-images');

-- Done! Policies created successfully
-- You can verify them in the Supabase Dashboard → Storage → product-images → Policies

-- SECURITY NOTE:
-- These policies allow public upload for development/testing.
-- For production, change TO public to TO authenticated and implement proper authentication.
