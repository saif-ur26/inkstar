# Supabase Storage Setup for Product Images

## Overview

The app now supports uploading product images directly from your device. Images are stored in Supabase Storage.

## Quick Setup (5 Minutes)

### Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://app.supabase.com/project/gvxlgvshygzuxefpbmxs
2. Click **Storage** in the left sidebar
3. Click **New Bucket**
4. Enter bucket name: `product-images`
5. Make it **Public** (check the box)
6. Click **Create Bucket**

### Step 2: Set Up Storage Policies

1. Click on the `product-images` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. Choose **For full customization**

#### Policy 1: Public Read Access
```sql
-- Name: Public can view product images
-- Operation: SELECT
-- Policy:
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');
```

#### Policy 2: Authenticated Upload
```sql
-- Name: Authenticated users can upload
-- Operation: INSERT
-- Policy:
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');
```

#### Policy 3: Authenticated Delete
```sql
-- Name: Authenticated users can delete
-- Operation: DELETE
-- Policy:
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
```

### Step 3: Test Upload

1. Go to your admin panel: `/admin/products`
2. Click **Add Product**
3. Drag and drop an image or click to select
4. Image should upload successfully!

## Features

✅ **Drag & Drop**: Drag images directly into the upload area
✅ **Multiple Images**: Upload up to 5 images per product
✅ **Image Preview**: See thumbnails before saving
✅ **Main Image**: First image is automatically set as main
✅ **File Validation**: Only images up to 5MB
✅ **Progress Feedback**: Loading states and success messages

## Without Supabase Storage

If you haven't set up Supabase Storage yet:

- ✅ Image upload still works
- ⚠️ Images are temporary (lost on refresh)
- ⚠️ Warning message shown
- 💡 Set up storage for permanent images

## Image Management

### Upload Images
1. Click **Add Product** or **Edit Product**
2. Drag images or click upload area
3. Select one or multiple images
4. Images upload automatically

### Remove Images
1. Hover over image thumbnail
2. Click the **X** button
3. Image removed from product

### Reorder Images
- First image is the main product image
- Drag to reorder (coming soon)

## File Requirements

- **Format**: PNG, JPG, GIF, WebP
- **Size**: Maximum 5MB per image
- **Quantity**: Up to 5 images per product
- **Dimensions**: Any (recommended: 800x800px or larger)

## Storage Limits

### Supabase Free Tier
- **Storage**: 1GB
- **Bandwidth**: 2GB/month
- **File uploads**: Unlimited

### Recommendations
- Optimize images before upload
- Use WebP format for smaller files
- Resize large images to 1200x1200px max

## Image Optimization Tips

### Before Upload
1. **Resize**: Use 800x800px to 1200x1200px
2. **Compress**: Use tools like TinyPNG
3. **Format**: WebP for best compression
4. **Quality**: 80-85% is usually sufficient

### Tools
- **Online**: TinyPNG, Squoosh.app
- **Desktop**: ImageOptim (Mac), FileOptimizer (Windows)
- **Bulk**: Use image processing scripts

## Troubleshooting

### Upload Fails

**Issue**: "Failed to upload images"
**Solutions**:
- Check Supabase Storage is set up
- Verify bucket name is `product-images`
- Check storage policies are correct
- Ensure file is under 5MB
- Try different image format

### Images Not Showing

**Issue**: Uploaded images don't display
**Solutions**:
- Check bucket is set to **Public**
- Verify public read policy exists
- Check browser console for errors
- Try refreshing the page

### Slow Uploads

**Issue**: Images take long to upload
**Solutions**:
- Compress images before upload
- Check internet connection
- Upload fewer images at once
- Resize images to smaller dimensions

### Storage Full

**Issue**: "Storage limit exceeded"
**Solutions**:
- Delete unused images from Storage
- Upgrade Supabase plan
- Optimize existing images
- Use external CDN for images

## Advanced: Custom Storage Location

To use a different storage provider:

1. Update `src/components/admin/ImageUpload.tsx`
2. Replace `uploadToSupabase` function
3. Implement your storage API
4. Update image URLs accordingly

## Security Best Practices

1. **Validate Files**: Only allow image types
2. **Size Limits**: Enforce maximum file size
3. **Scan Files**: Consider virus scanning for production
4. **Rate Limiting**: Limit uploads per user
5. **Authentication**: Require login for uploads

## Monitoring

### Check Storage Usage
1. Go to Supabase Dashboard
2. Click **Storage**
3. View usage statistics
4. Monitor bandwidth

### Clean Up Unused Images
```sql
-- Find images not referenced in products
SELECT * FROM storage.objects 
WHERE bucket_id = 'product-images'
AND name NOT IN (
  SELECT unnest(images) FROM products
);
```

## Migration from URLs

If you have existing products with image URLs:

1. Products with URLs will continue to work
2. New products use uploaded images
3. Edit existing products to upload new images
4. Old URLs can be replaced gradually

## Next Steps

1. ✅ Set up Supabase Storage bucket
2. ✅ Configure storage policies
3. ✅ Test image upload
4. 📸 Upload product images
5. 🎨 Optimize images for web

---

**Your image upload system is ready!** 📸

Upload product images directly from your device with drag & drop support.
