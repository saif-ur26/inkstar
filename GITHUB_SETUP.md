# GitHub Setup Guide

## Quick Connect to GitHub

Your local Git repository is ready! Follow these steps to connect to GitHub:

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ink-star-ecommerce` (or your choice)
3. Description: "INK Star - Printing & Packaging E-Commerce Platform"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Connect Your Local Repository

**Option A: Use the PowerShell Script (Easiest)**
```powershell
.\connect-github.ps1
```
Then follow the prompts.

**Option B: Manual Commands**
```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Authenticate

When you push, you'll be prompted to authenticate. You can use:
- **Personal Access Token** (Recommended)
- **GitHub Desktop**
- **SSH Key**

#### Creating a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "INK Star Project"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

### Current Git Configuration

```
User: INK-Star-Admin
Email: admin@inkstar.com
Branch: master (will be renamed to main)
```

### Verify Connection

After connecting, verify with:
```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (push)
```

### Push Your Code

```bash
git push -u origin main
```

### Update Git User (Optional)

If you want to use your personal name/email:
```bash
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

## Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Error: "Authentication failed"**
- Make sure you're using a Personal Access Token, not your password
- GitHub no longer accepts password authentication

**Error: "Repository not found"**
- Check the repository URL is correct
- Make sure the repository exists on GitHub
- Verify you have access to the repository

## What's Included in This Commit

✅ Complete Supabase backend integration
✅ Admin panel with full CRUD operations
✅ Product catalog with filtering
✅ Inquiry management system
✅ All documentation files
✅ Database schema and migration scripts

## Next Steps After Pushing

1. Set up Supabase (see SUPABASE_SETUP.md)
2. Configure environment variables
3. Deploy to Vercel/Netlify (see DEPLOYMENT_CHECKLIST.md)
4. Add your products and categories

---

Need help? Check the other documentation files:
- `README.md` - Full project documentation
- `QUICKSTART.md` - 5-minute setup guide
- `SUPABASE_SETUP.md` - Backend setup
- `DEPLOYMENT_CHECKLIST.md` - Deployment guide
