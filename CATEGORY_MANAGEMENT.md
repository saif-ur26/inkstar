# Category Management System

## Overview
Complete category and subcategory management system with CRUD operations in the admin panel.

## Features Implemented

### 1. Admin Categories Page (`/admin/categories`)
- View all categories and their subcategories
- Add, edit, and delete categories
- Add, edit, and delete subcategories
- Organized card-based layout

### 2. Category Operations
- **Create Category**: Add new product categories
- **Edit Category**: Update category names
- **Delete Category**: Remove categories (with confirmation)
  - Warning: Deletes all subcategories and affects products

### 3. Subcategory Operations
- **Create Subcategory**: Add subcategories under any category
- **Edit Subcategory**: Update subcategory names
- **Delete Subcategory**: Remove subcategories (with confirmation)
  - Warning: Affects products in that subcategory

### 4. Product Card Enhancement
- Shows **Category Badge** (primary color with icon)
- Shows **Subcategory Badge** (secondary color)
- Both badges displayed on product image
- Helps users quickly identify product categories

## How to Use

### Access Category Management
1. Go to Admin Panel: `/admin`
2. Click "Categories" in the sidebar
3. You'll see all categories with their subcategories

### Add a Category
1. Click "Add Category" button
2. Enter category name (e.g., "Business Cards")
3. Click "Create"

### Add a Subcategory
1. Find the category you want to add to
2. Click "Add Subcategory" button on that category card
3. Enter subcategory name (e.g., "Premium Cards")
4. Click "Create"

### Edit Category/Subcategory
1. Click the edit icon (pencil) next to the item
2. Update the name
3. Click "Update"

### Delete Category/Subcategory
1. Click the delete icon (trash) next to the item
2. Confirm the deletion
3. Item will be removed

## Product Display

### Product Cards Now Show:
- **Category Badge**: Top-left corner with primary color and tag icon
- **Subcategory Badge**: Below category badge with secondary color
- Both badges have backdrop blur for better visibility

### Example:
```
┌─────────────────────┐
│ 🏷️ Business Cards  │ ← Category Badge
│ Premium Cards       │ ← Subcategory Badge
│                     │
│   [Product Image]   │
│                     │
└─────────────────────┘
```

## Database Structure

### Categories Table
- `id`: UUID (primary key)
- `name`: Text (category name)

### Subcategories Table
- `id`: UUID (primary key)
- `name`: Text (subcategory name)
- `parent_id`: UUID (references categories.id)

### Products Table
- `category_id`: UUID (references categories.id)
- `subcategory_id`: UUID (references subcategories.id)

## API Hooks

### Available Hooks:
- `useCategories()` - Fetch all categories with subcategories
- `useCreateCategory()` - Create new category
- `useUpdateCategory()` - Update category
- `useDeleteCategory()` - Delete category
- `useCreateSubcategory()` - Create new subcategory
- `useUpdateSubcategory()` - Update subcategory
- `useDeleteSubcategory()` - Delete subcategory

## Important Notes

1. **Supabase Required**: Category management requires Supabase to be configured
2. **Cascade Deletes**: Deleting a category will affect all its subcategories and products
3. **Confirmation Dialogs**: All delete operations require confirmation
4. **Real-time Updates**: Changes reflect immediately across the application
5. **Mock Data Fallback**: If Supabase is not configured, mock data is used (read-only)

## Navigation

Admin Panel Sidebar:
- Dashboard
- Products
- **Categories** ← New!
- Pricing
- Inquiries

## Visual Improvements

### Product Cards:
- Category badge with icon for better recognition
- Stacked badges for category hierarchy
- Backdrop blur for better readability
- Hover effects maintained

### Admin Interface:
- Clean card-based layout
- Intuitive add/edit/delete buttons
- Nested subcategory display
- Empty state with helpful message
