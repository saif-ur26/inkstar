# Assets Guide - INK Star Website

This guide explains how to upload and manage images, logos, and other assets for your website.

## 📁 Asset Structure

```
public/
├── logo.png              # Main company logo (recommended: 200x60px)
├── logo-white.png        # White version for dark backgrounds
├── favicon.ico           # Browser tab icon (32x32px)
├── hero-bg.jpg           # Hero section background (1920x1080px)
└── images/
    ├── products/         # Product images
    ├── categories/       # Category images
    └── testimonials/     # Client/testimonial images
```

## 🖼️ Image Requirements

### Logo
- **Format**: PNG with transparent background
- **Size**: 200x60px (or maintain 3:1 aspect ratio)
- **File size**: < 50KB
- **Location**: `public/logo.png`

### Product Images
- **Format**: JPG or PNG
- **Size**: 800x800px (square, 1:1 aspect ratio)
- **File size**: < 200KB per image
- **Location**: Upload to Supabase Storage (see below)

### Category Images
- **Format**: JPG or PNG
- **Size**: 1200x675px (16:9 aspect ratio)
- **File size**: < 300KB
- **Location**: Upload to Supabase Storage

### Hero/Banner Images
- **Format**: JPG
- **Size**: 1920x1080px (16:9 aspect ratio)
- **File size**: < 500KB
- **Location**: `public/hero-bg.jpg`

## 📤 How to Upload Assets

### Option 1: Local Assets (Logo, Favicon, Static Images)

1. Place files in the `public/` folder
2. Reference them in code using `/filename.ext`

Example:
```tsx
<img src="/logo.png" alt="INK Star Logo" />
```

### Option 2: Supabase Storage (Product Images, Dynamic Content)

#### Step 1: Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Select the `product-images` bucket

#### Step 2: Upload Images
1. Click **Upload file** button
2. Select your image(s)
3. Images will be uploaded to the bucket

#### Step 3: Get Image URL
After upload, you'll get a public URL like:
```
https://[project-id].supabase.co/storage/v1/object/public/product-images/[filename]
```

#### Step 4: Use in Admin Panel
1. Go to Admin Panel → Products
2. Click "Add Product" or edit existing product
3. In the Image Upload section:
   - Drag and drop images, OR
   - Click to browse and select images
4. Images will automatically upload to Supabase Storage

## 🎨 Image Optimization Tips

### Before Uploading:
1. **Compress images**: Use tools like TinyPNG, ImageOptim, or Squoosh
2. **Correct dimensions**: Resize to recommended sizes
3. **Format selection**:
   - Use PNG for logos and graphics with transparency
   - Use JPG for photos and complex images
   - Use WebP for best compression (if supported)

### Recommended Tools:
- **TinyPNG**: https://tinypng.com/ (Free compression)
- **Squoosh**: https://squoosh.app/ (Advanced compression)
- **Canva**: https://canva.com/ (Design and resize)
- **Remove.bg**: https://remove.bg/ (Background removal)

## 🔄 Updating Assets

### Update Logo:
1. Replace `public/logo.png` with new file
2. Keep the same filename
3. Clear browser cache (Ctrl+F5)

### Update Product Images:
1. Go to Admin Panel
2. Edit the product
3. Remove old image
4. Upload new image
5. Save changes

### Update Favicon:
1. Generate favicon using https://favicon.io/
2. Replace `public/favicon.ico`
3. Clear browser cache

## 📱 Responsive Images

The website automatically handles responsive images. Just upload high-quality images and the system will:
- Display appropriate sizes for different devices
- Lazy load images for better performance
- Optimize loading with modern formats

## 🎯 Best Practices

### DO:
✅ Use consistent image dimensions within each category
✅ Compress images before uploading
✅ Use descriptive filenames (e.g., `paper-bag-brown-500.jpg`)
✅ Keep file sizes under recommended limits
✅ Use high-quality, well-lit product photos
✅ Maintain consistent branding across all images

### DON'T:
❌ Upload extremely large files (> 1MB)
❌ Use spaces in filenames (use hyphens instead)
❌ Upload images with watermarks
❌ Use low-resolution or blurry images
❌ Mix different aspect ratios for products

## 🔐 Supabase Storage Setup

If you haven't set up Supabase Storage yet:

1. **Create Storage Bucket**:
```sql
-- Run in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);
```

2. **Set Storage Policies**:
```sql
-- Allow public read access
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow public upload (for development)
CREATE POLICY "Public can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');
```

3. **Update .env file**:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📞 Need Help?

If you encounter issues:
1. Check file size and format
2. Verify Supabase credentials in `.env`
3. Check browser console for errors
4. Ensure storage policies are set correctly

## 🎨 Design Resources

### Free Stock Photos:
- Unsplash: https://unsplash.com/
- Pexels: https://pexels.com/
- Pixabay: https://pixabay.com/

### Icon Resources:
- Lucide Icons: https://lucide.dev/ (Already integrated)
- Heroicons: https://heroicons.com/
- Font Awesome: https://fontawesome.com/

### Color Palette:
The website uses a customizable theme. Current colors:
- Primary: Customizable via Tailwind config
- Accent: Complementary color
- Background: Light/Dark mode support

To change colors, edit `tailwind.config.js`.

---

**Last Updated**: January 2026
**Version**: 1.0
