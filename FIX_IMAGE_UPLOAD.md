# Fix Image Upload 400 Error

## The Problem

You're seeing this error:
```
Failed to load resource: the server responded with a status of 400
```

This means the Supabase Storage bucket `product-images` doesn't exist yet.

## Quick Fix (2 Minutes)

### Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://app.supabase.com/project/gvxlgvshygzuxefpbmxs
2. Click **Storage** in the left sidebar
3. Click **New Bucket** button
4. Enter these details:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Check this box (IMPORTANT!)
   - **File size limit**: 5MB (optional)
   - **Allowed MIME types**: Leave empty or add: `image/*`
5. Click **Create Bucket**

### Step 2: Set Up Policies

1. Click on the `product-images` bucket you just created
2. Click the **Policies** tab
3. Click **New Policy** button
4. Click **For full customization**

#### Add These 4 Policies:

**Policy 1: Public Read**
- Name: `Public can view product images`
- Allowed operation: `SELECT`
- Target roles: `public`
- Policy definition:
```sql
bucket_id = 'product-images'
```

**Policy 2: Authenticated Upload**
- Name: `Authenticated users can upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- Policy definition:
```sql
bucket_id = 'product-images'
```

**Policy 3: Authenticated Update**
- Name: `Authenticated users can update`
- Allowed operation: `UPDATE`
- Target roles: `authenticated`
- Policy definition:
```sql
bucket_id = 'product-images'
```

**Policy 4: Authenticated Delete**
- Name: `Authenticated users can delete`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- Policy definition:
```sql
bucket_id = 'product-images'
```

### Step 3: Test Upload

1. Go back to your app: `/admin/products`
2. Click **Add Product** or **Edit** a product
3. Try uploading an image
4. Should work now! ✅

## Alternative: Use SQL (Advanced)

If you prefer SQL, you can run `supabase-storage-setup.sql` in the SQL Editor.

**Note**: The bucket itself must still be created via the Dashboard UI.

## Verify It's Working

After setup, you should see:
- ✅ Images upload successfully
- ✅ No 400 errors in console
- ✅ Success toast message
- ✅ Image thumbnails appear
- ✅ Images persist after refresh

## Temporary Workaround

Until you set up storage, the app will:
- ✅ Still allow image selection
- ✅ Show image previews
- ⚠️ Images are temporary (lost on refresh)
- ⚠️ Warning message shown

## Troubleshooting

### Still Getting 400 Error?

**Check:**
1. Bucket name is exactly `product-images` (no spaces, lowercase)
2. Bucket is marked as **Public**
3. All 4 policies are created
4. You're logged into Supabase (for upload)
5. Refresh your app page

### Images Upload But Don't Show?

**Check:**
1. Bucket is **Public** (very important!)
2. Public read policy exists
3. Image URLs are correct
4. Browser console for errors

### Can't Create Bucket?

**Solutions:**
1. Check you're on the correct project
2. Verify you have admin access
3. Try different browser
4. Check Supabase status page

## What Each Policy Does

- **Public Read**: Anyone can view images (needed for product pages)
- **Authenticated Upload**: Logged-in users can upload (admin panel)
- **Authenticated Update**: Logged-in users can replace images
- **Authenticated Delete**: Logged-in users can remove images

## Security Notes

- Public bucket = anyone can view images (this is what you want for products)
- Only authenticated users can upload/modify
- File size limited to 5MB
- Only image files accepted

## Next Steps

After fixing:
1. ✅ Upload product images
2. ✅ Test on public site
3. ✅ Verify images persist
4. 📸 Add images to all products

---

**Follow these steps and your image upload will work perfectly!** 📸✨
