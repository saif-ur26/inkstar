# INK Star - Printing & Packaging E-Commerce Platform

A modern, full-stack e-commerce platform for printing and packaging products, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Customer-Facing Features
- 🛍️ Product catalog with advanced filtering (category, subcategory, search)
- 🔍 Product detail pages with customization options
- 💰 Dynamic pricing based on customizations
- 📱 WhatsApp integration for quick orders
- 📝 Inquiry submission system
- 🎨 Responsive design with smooth animations
- 🌓 Dark/Light mode support

### Admin Panel Features
- 📊 Dashboard with real-time statistics
- ✏️ Product management (Create, Read, Update, Delete)
- 🏷️ Category and subcategory management
- 📬 Inquiry management with status tracking
- 👁️ Toggle product visibility (active/inactive)
- 🎯 Intuitive UI for managing all aspects

### Backend (Supabase)
- 🗄️ PostgreSQL database
- 🔒 Row Level Security (RLS) policies
- 🚀 Real-time data synchronization
- 📡 RESTful API via Supabase client
- 🔐 Authentication ready

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd delightful-design-engine-434ada56-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   
   Quick steps:
   - Create a Supabase project
   - Run `supabase-schema.sql` in SQL Editor
   - (Optional) Run `migrate-mock-data.sql` for sample data
   - Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel components
│   │   ├── AdminLayout.tsx
│   │   ├── ProductsManager.tsx
│   │   ├── ProductDialog.tsx
│   │   ├── CategoriesManager.tsx
│   │   └── InquiriesManager.tsx
│   ├── layout/             # Layout components
│   ├── products/           # Product-related components
│   │   ├── ProductCard.tsx
│   │   └── CategoryFilter.tsx
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
│   ├── useProducts.ts
│   ├── useCategories.ts
│   └── useInquiries.ts
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   └── utils.ts           # Utility functions
├── pages/
│   ├── admin/             # Admin pages
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── Categories.tsx
│   │   ├── Inquiries.tsx
│   │   └── Login.tsx
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── About.tsx
│   └── Contact.tsx
└── data/
    └── mockData.ts        # TypeScript interfaces
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Database Schema

### Tables

**categories**
- id (UUID, Primary Key)
- name (TEXT)
- slug (TEXT, Unique)
- created_at (TIMESTAMP)

**subcategories**
- id (UUID, Primary Key)
- name (TEXT)
- slug (TEXT)
- parent_id (UUID, Foreign Key → categories)
- created_at (TIMESTAMP)

**products**
- id (UUID, Primary Key)
- name (TEXT)
- category_id (UUID, Foreign Key → categories)
- subcategory_id (UUID, Foreign Key → subcategories)
- description (TEXT)
- images (TEXT[])
- base_price (DECIMAL)
- price_unit (TEXT)
- customization_options (JSONB)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)

**inquiries**
- id (UUID, Primary Key)
- product_id (UUID, Foreign Key → products)
- product_name (TEXT)
- customer_phone (TEXT)
- quantity (INTEGER)
- customizations (TEXT)
- status (TEXT: 'new', 'contacted', 'completed')
- created_at (TIMESTAMP)

## Admin Panel

Access the admin panel at `/admin`

**Current Features:**
- Dashboard with statistics
- Product CRUD operations
- Category management
- Inquiry tracking

**Note:** Authentication is not yet implemented. To add it:
1. Enable auth in Supabase dashboard
2. Update RLS policies
3. Implement login at `/admin/login`

## API Integration

The app uses TanStack Query for data fetching with custom hooks:

```typescript
// Fetch products
const { data: products } = useProducts(activeOnly);

// Create product
const createProduct = useCreateProduct();
await createProduct.mutateAsync(productData);

// Update product
const updateProduct = useUpdateProduct();
await updateProduct.mutateAsync({ id, ...updates });
```

## Customization

### Adding New Product Fields

1. Update database schema in Supabase
2. Update TypeScript interfaces in `src/data/mockData.ts`
3. Update forms in `src/components/admin/ProductDialog.tsx`
4. Update display in product components

### Styling

The project uses Tailwind CSS with shadcn/ui components. Customize:
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables
- Component-level styling with Tailwind classes

## Deployment

### Deploy to Vercel/Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder

3. Set environment variables in your hosting platform

### Deploy to Lovable

Simply push to your repository and Lovable will auto-deploy.

## Troubleshooting

**Products not loading?**
- Check `.env` file has correct Supabase credentials
- Verify Supabase project is running
- Check browser console for errors

**Can't create products?**
- Verify database schema is set up correctly
- Check RLS policies in Supabase
- Ensure all required fields are filled

**Images not showing?**
- Update image URLs in products
- Consider integrating Supabase Storage for uploads

## Future Enhancements

- [ ] Admin authentication
- [ ] Image upload with Supabase Storage
- [ ] Email notifications for inquiries
- [ ] Order management system
- [ ] Payment gateway integration
- [ ] Customer accounts
- [ ] Product reviews and ratings
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] SEO optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions:
- Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for backend setup
- Review Supabase documentation
- Check browser console for errors
- Review Supabase dashboard logs

---

Built with ❤️ using React, TypeScript, and Supabase
