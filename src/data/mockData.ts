// Mock data for the INK Star catalog

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface CustomizationOption {
  name: string;
  options: { label: string; priceModifier: number }[];
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  images: string[];
  basePrice: number;
  priceUnit: 'per piece' | 'per 100' | 'per kg' | 'per set';
  customizationOptions: CustomizationOption[];
  isActive: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  customerPhone: string;
  quantity: number;
  customizations: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bags',
    slug: 'bags',
    subcategories: [
      { id: '1-1', name: 'Polythene Bags', slug: 'polythene-bags', parentId: '1' },
      { id: '1-2', name: 'Carry Bags', slug: 'carry-bags', parentId: '1' },
      { id: '1-3', name: 'Cloth Bags', slug: 'cloth-bags', parentId: '1' },
      { id: '1-4', name: 'Paper Bags', slug: 'paper-bags', parentId: '1' },
      { id: '1-5', name: 'Jute Bags', slug: 'jute-bags', parentId: '1' },
      { id: '1-6', name: 'Rice Sacks', slug: 'rice-sacks', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Stationery',
    slug: 'stationery',
    subcategories: [
      { id: '2-1', name: 'Visiting Cards', slug: 'visiting-cards', parentId: '2' },
      { id: '2-2', name: 'Bill Books', slug: 'bill-books', parentId: '2' },
      { id: '2-3', name: 'Stickers & Labels', slug: 'stickers-labels', parentId: '2' },
      { id: '2-4', name: 'Catalogues & Brochures', slug: 'catalogues-brochures', parentId: '2' },
      { id: '2-5', name: 'Pamphlets', slug: 'pamphlets', parentId: '2' },
      { id: '2-6', name: 'Calendars', slug: 'calendars', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Boxes',
    slug: 'boxes',
    subcategories: [
      { id: '3-1', name: 'Cake Boxes', slug: 'cake-boxes', parentId: '3' },
      { id: '3-2', name: 'Paper Pouches', slug: 'paper-pouches', parentId: '3' },
      { id: '3-3', name: 'Packaging Boxes', slug: 'packaging-boxes', parentId: '3' },
    ],
  },
  {
    id: '4',
    name: 'Specialty',
    slug: 'specialty',
    subcategories: [
      { id: '4-1', name: 'Metal Visiting Cards', slug: 'metal-visiting-cards', parentId: '4' },
      { id: '4-2', name: 'Transparent PVC Cards', slug: 'transparent-pvc-cards', parentId: '4' },
    ],
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Polythene Carry Bag',
    categoryId: '1',
    subcategoryId: '1-1',
    description: 'High-quality polythene bags perfect for retail stores. Available in multiple sizes and thicknesses. Custom printing available.',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    basePrice: 250,
    priceUnit: 'per kg',
    customizationOptions: [
      {
        name: 'Size',
        options: [
          { label: 'Small (8x10")', priceModifier: 0 },
          { label: 'Medium (12x16")', priceModifier: 20 },
          { label: 'Large (16x20")', priceModifier: 40 },
        ],
      },
      {
        name: 'Printing',
        options: [
          { label: 'No Print', priceModifier: 0 },
          { label: '1 Color', priceModifier: 30 },
          { label: '2 Colors', priceModifier: 50 },
          { label: 'Full Color', priceModifier: 80 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'p2',
    name: 'Eco-Friendly Paper Bag',
    categoryId: '1',
    subcategoryId: '1-4',
    description: 'Sustainable kraft paper bags with reinforced handles. Perfect for boutiques and eco-conscious brands.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    basePrice: 15,
    priceUnit: 'per piece',
    customizationOptions: [
      {
        name: 'Size',
        options: [
          { label: 'Small', priceModifier: 0 },
          { label: 'Medium', priceModifier: 5 },
          { label: 'Large', priceModifier: 10 },
        ],
      },
      {
        name: 'Handle Type',
        options: [
          { label: 'Twisted Paper', priceModifier: 0 },
          { label: 'Flat Paper', priceModifier: 2 },
          { label: 'Ribbon', priceModifier: 8 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'p3',
    name: 'Premium Visiting Cards',
    categoryId: '2',
    subcategoryId: '2-1',
    description: 'Professional visiting cards with premium finish. Multiple paper options and finishes available.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    basePrice: 350,
    priceUnit: 'per 100',
    customizationOptions: [
      {
        name: 'Paper Type',
        options: [
          { label: 'Matt Lamination', priceModifier: 0 },
          { label: 'Glossy Lamination', priceModifier: 50 },
          { label: 'Textured', priceModifier: 100 },
          { label: 'Premium Cotton', priceModifier: 200 },
        ],
      },
      {
        name: 'Special Effects',
        options: [
          { label: 'None', priceModifier: 0 },
          { label: 'Spot UV', priceModifier: 150 },
          { label: 'Foil Stamping', priceModifier: 250 },
          { label: 'Embossing', priceModifier: 200 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-02-01',
  },
  {
    id: 'p4',
    name: 'Custom Bill Book',
    categoryId: '2',
    subcategoryId: '2-2',
    description: 'Customized bill books with company branding. Available in duplicate and triplicate formats.',
    images: ['/placeholder.svg'],
    basePrice: 180,
    priceUnit: 'per set',
    customizationOptions: [
      {
        name: 'Pages',
        options: [
          { label: '50 Sets', priceModifier: 0 },
          { label: '100 Sets', priceModifier: 100 },
          { label: '200 Sets', priceModifier: 180 },
        ],
      },
      {
        name: 'Copy Type',
        options: [
          { label: 'Duplicate (2 copies)', priceModifier: 0 },
          { label: 'Triplicate (3 copies)', priceModifier: 60 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-02-10',
  },
  {
    id: 'p5',
    name: 'Premium Cake Box',
    categoryId: '3',
    subcategoryId: '3-1',
    description: 'Elegant cake boxes with window display. Perfect for bakeries and cake shops.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    basePrice: 45,
    priceUnit: 'per piece',
    customizationOptions: [
      {
        name: 'Size',
        options: [
          { label: '6 inch', priceModifier: 0 },
          { label: '8 inch', priceModifier: 15 },
          { label: '10 inch', priceModifier: 30 },
          { label: '12 inch', priceModifier: 50 },
        ],
      },
      {
        name: 'Window',
        options: [
          { label: 'No Window', priceModifier: 0 },
          { label: 'Clear Window', priceModifier: 10 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-02-15',
  },
  {
    id: 'p6',
    name: 'Metal Visiting Card',
    categoryId: '4',
    subcategoryId: '4-1',
    description: 'Premium metal visiting cards that make a lasting impression. Available in gold, silver, and black finishes.',
    images: ['/placeholder.svg'],
    basePrice: 150,
    priceUnit: 'per piece',
    customizationOptions: [
      {
        name: 'Metal Finish',
        options: [
          { label: 'Silver', priceModifier: 0 },
          { label: 'Gold', priceModifier: 50 },
          { label: 'Black', priceModifier: 30 },
          { label: 'Rose Gold', priceModifier: 60 },
        ],
      },
      {
        name: 'Engraving',
        options: [
          { label: 'Laser Cut', priceModifier: 0 },
          { label: 'Deep Engraving', priceModifier: 80 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-03-01',
  },
  {
    id: 'p7',
    name: 'Jute Shopping Bag',
    categoryId: '1',
    subcategoryId: '1-5',
    description: 'Eco-friendly jute bags with custom printing. Durable and reusable, perfect for sustainable branding.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    basePrice: 85,
    priceUnit: 'per piece',
    customizationOptions: [
      {
        name: 'Size',
        options: [
          { label: 'Small', priceModifier: 0 },
          { label: 'Medium', priceModifier: 25 },
          { label: 'Large', priceModifier: 45 },
        ],
      },
      {
        name: 'Printing',
        options: [
          { label: 'Screen Print', priceModifier: 0 },
          { label: 'Full Color Print', priceModifier: 40 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-03-10',
  },
  {
    id: 'p8',
    name: 'Product Catalogue',
    categoryId: '2',
    subcategoryId: '2-4',
    description: 'Professional product catalogues with high-quality printing. Perfect binding or saddle stitch available.',
    images: ['/placeholder.svg'],
    basePrice: 120,
    priceUnit: 'per piece',
    customizationOptions: [
      {
        name: 'Pages',
        options: [
          { label: '8 Pages', priceModifier: 0 },
          { label: '16 Pages', priceModifier: 80 },
          { label: '24 Pages', priceModifier: 150 },
          { label: '32 Pages', priceModifier: 220 },
        ],
      },
      {
        name: 'Binding',
        options: [
          { label: 'Saddle Stitch', priceModifier: 0 },
          { label: 'Perfect Binding', priceModifier: 60 },
        ],
      },
    ],
    isActive: true,
    createdAt: '2024-03-15',
  },
];

export const inquiries: Inquiry[] = [
  {
    id: 'inq1',
    productId: 'p1',
    productName: 'Premium Polythene Carry Bag',
    customerPhone: '+91 98765 43210',
    quantity: 50,
    customizations: 'Medium size, 2 Colors printing',
    createdAt: '2024-03-20 10:30 AM',
    status: 'new',
  },
  {
    id: 'inq2',
    productId: 'p3',
    productName: 'Premium Visiting Cards',
    customerPhone: '+91 87654 32109',
    quantity: 500,
    customizations: 'Glossy Lamination, Spot UV',
    createdAt: '2024-03-19 02:15 PM',
    status: 'contacted',
  },
  {
    id: 'inq3',
    productId: 'p6',
    productName: 'Metal Visiting Card',
    customerPhone: '+91 76543 21098',
    quantity: 100,
    customizations: 'Gold finish, Deep Engraving',
    createdAt: '2024-03-18 11:45 AM',
    status: 'completed',
  },
];

export const stats = {
  totalProducts: products.length,
  activeProducts: products.filter(p => p.isActive).length,
  totalCategories: categories.length,
  totalInquiries: inquiries.length,
  newInquiries: inquiries.filter(i => i.status === 'new').length,
};
