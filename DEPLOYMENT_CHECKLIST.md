# Deployment Checklist

Use this checklist before deploying your INK Star application to production.

## Pre-Deployment

### Database Setup
- [ ] Supabase project created
- [ ] Database schema applied (`supabase-schema.sql`)
- [ ] Sample data loaded (optional - `migrate-mock-data.sql`)
- [ ] RLS policies verified and working
- [ ] Database indexes created

### Environment Configuration
- [ ] `.env` file configured with production Supabase credentials
- [ ] Environment variables set in hosting platform
- [ ] API keys secured (never commit to git)

### Content
- [ ] Categories and subcategories added
- [ ] Products added with proper details
- [ ] Product images uploaded (replace `/placeholder.svg`)
- [ ] Product descriptions reviewed
- [ ] Pricing verified

### Testing
- [ ] All pages load without errors
- [ ] Product filtering works
- [ ] Product search works
- [ ] Inquiry submission works
- [ ] Admin panel accessible
- [ ] Product CRUD operations work
- [ ] Category management works
- [ ] Inquiry status updates work
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing completed

### Security
- [ ] Admin authentication implemented (recommended)
- [ ] RLS policies reviewed
- [ ] API keys not exposed in client code
- [ ] CORS settings configured in Supabase
- [ ] Rate limiting considered

### Performance
- [ ] Images optimized
- [ ] Build size checked (`npm run build`)
- [ ] Lighthouse score reviewed
- [ ] Database queries optimized
- [ ] Caching strategy implemented

### SEO & Meta
- [ ] Page titles updated
- [ ] Meta descriptions added
- [ ] Open Graph tags configured
- [ ] Favicon added
- [ ] Sitemap generated
- [ ] robots.txt configured

## Deployment Steps

### Option 1: Vercel

1. **Connect Repository**
   ```bash
   # Push to GitHub if not already
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Verify Deployment**
   - [ ] Site loads correctly
   - [ ] Products display
   - [ ] Admin panel works
   - [ ] Forms submit successfully

### Option 2: Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop `dist` folder
   - Or connect GitHub repository
   - Add environment variables in Site Settings

3. **Configure Redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Option 3: Custom Server

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder to server**

3. **Configure web server** (nginx example):
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     root /path/to/dist;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

## Post-Deployment

### Verification
- [ ] Visit production URL
- [ ] Test all major features
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Verify analytics tracking (if implemented)

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up Supabase alerts
- [ ] Monitor database performance

### Documentation
- [ ] Update README with production URL
- [ ] Document any custom configurations
- [ ] Create user guide for admin panel
- [ ] Document API endpoints (if any)

### Backup
- [ ] Database backup configured in Supabase
- [ ] Code repository backed up
- [ ] Environment variables documented securely

## Optional Enhancements

### Before Launch
- [ ] Add admin authentication
- [ ] Implement image upload to Supabase Storage
- [ ] Add email notifications for inquiries
- [ ] Set up custom domain
- [ ] Add SSL certificate
- [ ] Configure CDN for images

### After Launch
- [ ] Set up Google Analytics
- [ ] Add customer reviews
- [ ] Implement order tracking
- [ ] Add payment gateway
- [ ] Create customer accounts
- [ ] Add wishlist feature
- [ ] Implement email marketing

## Rollback Plan

If something goes wrong:

1. **Revert to Previous Version**
   - Vercel/Netlify: Use dashboard to rollback
   - Custom: Restore previous `dist` folder

2. **Database Issues**
   - Restore from Supabase backup
   - Check Supabase dashboard logs

3. **Emergency Contacts**
   - Document who to contact for issues
   - Keep Supabase credentials secure but accessible

## Success Criteria

Your deployment is successful when:
- [ ] All pages load without errors
- [ ] Products are visible and filterable
- [ ] Inquiries can be submitted
- [ ] Admin panel is functional
- [ ] Site is responsive on all devices
- [ ] Performance is acceptable (< 3s load time)
- [ ] No console errors

## Next Steps After Deployment

1. **Monitor for 24 hours**
   - Check error logs
   - Monitor user behavior
   - Watch for performance issues

2. **Gather Feedback**
   - Test with real users
   - Collect improvement suggestions
   - Track conversion rates

3. **Iterate**
   - Fix any issues found
   - Implement user feedback
   - Optimize based on analytics

---

Good luck with your deployment! 🚀
