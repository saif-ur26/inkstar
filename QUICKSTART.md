# Quick Start Guide

Get your INK Star application running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (2 min)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - Project name: `ink-star`
   - Database password: (create a strong password)
   - Region: (choose closest to you)
4. Wait ~2 minutes for project creation

## Step 3: Create Database (1 min)

1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy ALL content from `supabase-schema.sql` file
4. Paste into the editor
5. Click "Run" button

## Step 4: Add Sample Data (Optional - 30 sec)

1. In SQL Editor, click "New Query"
2. Copy ALL content from `migrate-mock-data.sql` file
3. Paste and click "Run"

## Step 5: Configure App (30 sec)

1. In Supabase dashboard, go to Settings → API
2. Copy:
   - Project URL
   - Anon/Public key

3. Create `.env` file in project root:
```bash
VITE_SUPABASE_URL=paste-your-project-url-here
VITE_SUPABASE_ANON_KEY=paste-your-anon-key-here
```

## Step 6: Run the App (30 sec)

```bash
npm run dev
```

Open browser to `http://localhost:5173`

## You're Done! 🎉

### What to Try:

**Public Site:**
- Browse products at `/products`
- Click on a product to see details
- Try filtering by category
- Submit an inquiry

**Admin Panel:**
- Go to `/admin`
- View dashboard statistics
- Add a new product
- Manage categories
- Check inquiries

## Next Steps

1. **Add Your Products**: Go to `/admin/products` and click "Add Product"
2. **Customize Categories**: Go to `/admin/categories` to add your categories
3. **Update Branding**: Edit colors in `tailwind.config.ts`
4. **Add Images**: Replace `/placeholder.svg` with real product images

## Need Help?

- Check `SUPABASE_SETUP.md` for detailed setup instructions
- Check `README.md` for full documentation
- Look at browser console for errors
- Check Supabase dashboard logs

## Common Issues

**"Failed to fetch" error?**
- Double-check your `.env` file has correct URL and key
- Make sure Supabase project is running (check dashboard)

**No products showing?**
- Run the `migrate-mock-data.sql` script
- Or add products manually via admin panel

**Can't access admin?**
- Just navigate to `/admin` - no login required yet
- Authentication can be added later

---

Happy building! 🚀
