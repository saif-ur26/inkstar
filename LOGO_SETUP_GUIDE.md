# Logo Setup Guide - INK Star Website

## 📍 Where to Place Your Logo

Your logo files should be placed in the `public` folder:

```
delightful-design-engine-434ada56-main/
└── public/
    ├── logo.png          ← Main logo (required)
    ├── logo-white.png    ← White version for dark backgrounds (optional)
    └── favicon.ico       ← Browser tab icon (optional)
```

## 🖼️ Logo Requirements

### Main Logo (`logo.png`)

**Recommended Specifications:**
- **Format**: PNG with transparent background
- **Size**: 200x200px to 400x400px (square or horizontal)
- **File Size**: Under 100KB
- **Background**: Transparent (PNG)
- **Colors**: Your brand colors

**Aspect Ratios:**
- **Square**: 1:1 (e.g., 200x200px) - Best for icon-style logos
- **Horizontal**: 3:1 or 4:1 (e.g., 300x100px) - Best for text-based logos
- **Vertical**: Not recommended for header

### Favicon (`favicon.ico`)

**Specifications:**
- **Format**: ICO or PNG
- **Size**: 32x32px or 64x64px
- **File Size**: Under 10KB

## 📥 How to Add Your Logo

### Step 1: Prepare Your Logo

1. **Export from design software** (Photoshop, Illustrator, Canva, etc.)
2. **Save as PNG** with transparent background
3. **Optimize file size** using tools like:
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/

### Step 2: Add Logo to Public Folder

**Option A: Using File Explorer (Windows)**
```
1. Navigate to: C:\Users\warri\OneDrive\Desktop\delightful-design-engine-434ada56-main\delightful-design-engine-434ada56-main\public
2. Copy your logo.png file into this folder
3. Rename it to exactly: logo.png
```

**Option B: Using Command Line**
```bash
# Navigate to public folder
cd delightful-design-engine-434ada56-main/public

# Copy your logo (replace path with your logo location)
copy "C:\path\to\your\logo.png" logo.png
```

### Step 3: Verify Logo Appears

1. **Restart dev server** (if running):
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Open browser** and go to: http://localhost:5173

3. **Check header** - Your logo should appear in the top-left corner

4. **If logo doesn't appear**:
   - Check file name is exactly `logo.png` (case-sensitive)
   - Check file is in the `public` folder
   - Clear browser cache (Ctrl+F5)
   - Check browser console for errors

## 🎨 Logo Display Behavior

### Current Implementation:

```tsx
<img 
  src="/logo.png" 
  alt="INK Star Logo" 
  className="h-10 w-10 sm:h-12 sm:w-12"
/>
```

### Sizes:
- **Mobile**: 40x40px (h-10 w-10)
- **Desktop**: 48x48px (h-12 w-12)

### Fallback:
- If logo image fails to load, shows "IS" text logo
- Automatic fallback, no manual intervention needed

## 🔧 Customization Options

### Change Logo Size

Edit `src/components/layout/Header.tsx`:

```tsx
// Make logo larger
className="h-12 w-12 sm:h-16 sm:w-16"

// Make logo smaller
className="h-8 w-8 sm:h-10 sm:w-10"

// For horizontal logos (wider than tall)
className="h-10 w-auto sm:h-12"
```

### Use Different Logo for Dark Mode

```tsx
<img 
  src="/logo.png" 
  alt="INK Star Logo" 
  className="h-10 w-10 sm:h-12 sm:w-12 dark:hidden"
/>
<img 
  src="/logo-white.png" 
  alt="INK Star Logo" 
  className="h-10 w-10 sm:h-12 sm:w-12 hidden dark:block"
/>
```

### Remove Text Next to Logo

Edit `src/components/layout/Header.tsx`, remove this section:

```tsx
<div className="hidden sm:block">
  <p className="font-bold text-foreground leading-tight">INK Star</p>
  <p className="text-xs text-muted-foreground leading-tight">Printers & Packaging</p>
</div>
```

### Add Hover Effect

```tsx
<img 
  src="/logo.png" 
  alt="INK Star Logo" 
  className="h-10 w-10 sm:h-12 sm:w-12 transition-transform hover:scale-110"
/>
```

## 🎯 Logo Design Tips

### Do's:
✅ Use high-resolution images (at least 200x200px)
✅ Keep file size under 100KB
✅ Use transparent background (PNG)
✅ Test on both light and dark backgrounds
✅ Ensure logo is readable at small sizes
✅ Use consistent branding colors

### Don'ts:
❌ Don't use JPEG (no transparency)
❌ Don't use extremely large files (>500KB)
❌ Don't use low-resolution images
❌ Don't use complex designs that don't scale well
❌ Don't forget to optimize file size

## 🆓 Free Logo Resources

### Create a Logo:
- **Canva**: https://canva.com/ (Free templates)
- **LogoMakr**: https://logomakr.com/ (Free logo maker)
- **Hatchful**: https://hatchful.shopify.com/ (Free by Shopify)

### Find Icons:
- **Flaticon**: https://flaticon.com/
- **Icons8**: https://icons8.com/
- **Noun Project**: https://thenounproject.com/

### Optimize Images:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

## 🔍 Troubleshooting

### Logo Not Showing?

**Problem**: Logo doesn't appear in header
**Solutions**:
1. Check file name is exactly `logo.png` (lowercase)
2. Verify file is in `public` folder
3. Clear browser cache (Ctrl+F5)
4. Check browser console for 404 errors
5. Restart dev server

### Logo Too Large/Small?

**Problem**: Logo size doesn't look right
**Solution**: Edit className in Header.tsx:
```tsx
// Adjust these values
className="h-10 w-10 sm:h-12 sm:w-12"
```

### Logo Pixelated?

**Problem**: Logo looks blurry or pixelated
**Solutions**:
1. Use higher resolution image (at least 200x200px)
2. Export as PNG, not JPEG
3. Use vector format if possible (SVG)

### Logo Has White Background?

**Problem**: Logo shows white box around it
**Solutions**:
1. Re-export as PNG with transparency
2. Use image editing software to remove background
3. Use remove.bg: https://remove.bg/

## 📱 Favicon Setup

### Add Favicon (Browser Tab Icon)

1. **Create favicon**:
   - Use https://favicon.io/
   - Upload your logo
   - Download generated files

2. **Add to public folder**:
   ```
   public/
   ├── favicon.ico
   ├── favicon-16x16.png
   ├── favicon-32x32.png
   └── apple-touch-icon.png
   ```

3. **Update index.html** (if needed):
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   ```

## 🚀 Production Checklist

Before deploying:
- [ ] Logo file is optimized (under 100KB)
- [ ] Logo displays correctly on all pages
- [ ] Logo is readable at all sizes
- [ ] Favicon is added
- [ ] Logo works on mobile devices
- [ ] Logo has proper alt text for accessibility
- [ ] Logo loads quickly (no delays)

## 📝 Current Logo Configuration

**File Location**: `public/logo.png`
**Display Size**: 40x40px (mobile), 48x48px (desktop)
**Format**: PNG with transparency
**Fallback**: "IS" text logo if image fails
**Alt Text**: "INK Star Logo"

## 🎨 Example Logo Sizes

For reference, here are common logo dimensions:

| Type | Size | Use Case |
|------|------|----------|
| Square | 200x200px | Icon-style logos |
| Square | 400x400px | High-res icon logos |
| Horizontal | 300x100px | Text-based logos |
| Horizontal | 600x200px | High-res text logos |
| Favicon | 32x32px | Browser tab icon |
| Favicon | 64x64px | High-res tab icon |

---

**Your logo is now ready to use!** 🎉

Simply place your `logo.png` file in the `public` folder and it will automatically appear in the header.

**Need help?** Check the troubleshooting section above or verify your file is in the correct location.
