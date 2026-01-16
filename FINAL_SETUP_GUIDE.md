# Final Setup Guide - Fix All Errors

## Current Errors & Solutions

### Error 1: Storage RLS Policy (400/406)
```
new row violates row-level security policy
```

**Solution**: Run the updated storage setup SQL

### Error 2: Product Query (406)
```
Failed to load resource: 406
```

**Solution**: Already fixed in code (using `.maybeSingle()`)

## Complete Setup Steps

### Step 1: Database Schema (Required)

1. Go to Supabase Dashboard → SQL Editor
2. Copy ALL content from `supabase-schema.sql`
3. Paste and click **Run**
4. Should see "Success. No rows returned"

### Step 2: Sample Data (Optional but Recommended)

1. In SQL Editor, click **New Query**
2. Copy ALL content from `migrate-mock-data.sql`
3. Paste and click **Run**
4. Should create 4 categories, 17 subcategories, 8 products, 3 inquiries

### Step 3: Storage Bucket (Required for Images)

1. Go to **Storage** in left sidebar
2. Click **New Bucket**
3. Settings:
   - Name: `product-images`
   - Public: ✅ **CHECK THIS BOX**
   - File size limit: 5MB
4. Click **Create Bucket**

### Step 4: Storage Policies (Required for Images)

1. In SQL Editor, click **New Query**
2. Copy ALL content from `supabase-storage-setup.sql`
3. Paste and click **Run**
4. Should create 4 policies successfully

### Step 5: Verify Setup

1. **Check Tables**:
   - Go to Table Editor
   - Should see: categories, subcategories, products, inquiries

2. **Check Storage**:
   - Go to Storage
   - Should see: product-images bucket (with green "Public" badge)

3. **Check Policies**:
   - Click on product-images bucket
   - Click Policies tab
   - Should see 4 policies

### Step 6: Restart App

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

## Verification Checklist

After setup, verify everything works:

- [ ] App loads without errors
- [ ] No warning banner in admin panel
- [ ] Can view products on public site
- [ ] Can create new product in admin
- [ ] Can upload images
- [ ] Can edit products
- [ ] Can delete products
- [ ] Can toggle product active/inactive
- [ ] Images persist after refresh

## Troubleshooting

### Still Seeing RLS Error?

**Check:**
1. Storage bucket is **Public** (very important!)
2. All 4 storage policies are created
3. Policy names match exactly
4. Bucket name is exactly `product-images`

**Fix:**
- Delete all storage policies
- Re-run `supabase-storage-setup.sql`
- Refresh app

### Still Seeing 406 Error?

**Check:**
1. Database schema is created
2. Products table exists
3. Sample data is loaded
4. `.env` has correct credentials

**Fix:**
- Re-run `supabase-schema.sql`
- Re-run `migrate-mock-data.sql`
- Restart dev server

### Images Not Uploading?

**Check:**
1. Bucket exists and is Public
2. Storage policies allow public insert
3. File is under 5MB
4. File is an image type

**Fix:**
- Verify bucket settings
- Check browser console for specific error
- Try smaller image file

### Products Not Showing?

**Check:**
1. Sample data is loaded
2. Products have `is_active = true`
3. No console errors

**Fix:**
- Run `migrate-mock-data.sql`
- Check Table Editor → products
- Verify data exists

## Security Note

The current storage policies allow **public upload** for development ease.

**For Production:**
1. Change policies from `TO public` to `TO authenticated`
2. Implement admin authentication
3. Require login for admin panel

## What Each File Does

- **`supabase-schema.sql`**: Creates database tables and RLS policies
- **`migrate-mock-data.sql`**: Adds sample products and categories
- **`supabase-storage-setup.sql`**: Sets up image storage policies
- **`.env`**: Contains your Supabase credentials

## Quick Test

After setup, test these:

1. **Public Site**:
   - Go to `/products`
   - Should see 8 products
   - Click on a product
   - Should see details and images

2. **Admin Panel**:
   - Go to `/admin`
   - No warning banner
   - Click "Add Product"
   - Upload an image
   - Fill form and save
   - Product should appear in list

3. **Edit/Delete**:
   - Click edit on a product
   - Change something
   - Save - should update
   - Click delete
   - Confirm - should remove

## Common Mistakes

1. ❌ Forgetting to make bucket **Public**
2. ❌ Not running all SQL scripts
3. ❌ Wrong bucket name (must be `product-images`)
4. ❌ Not restarting dev server after changes
5. ❌ Missing `.env` credentials

## Success Indicators

You'll know it's working when:

✅ No errors in browser console
✅ No warning banner in admin
✅ Products load from Supabase
✅ Images upload successfully
✅ CRUD operations work
✅ Data persists after refresh

## Need Help?

1. Check browser console for specific errors
2. Check Supabase Dashboard logs
3. Verify each step was completed
4. Try the Quick Test above
5. Review error messages carefully

---

**Follow these steps in order and everything will work!** 🚀

Your app will have:
- ✅ Full database backend
- ✅ Image upload and storage
- ✅ Complete admin panel
- ✅ Product management
- ✅ Category management
- ✅ Inquiry tracking
