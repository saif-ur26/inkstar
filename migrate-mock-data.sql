-- Migration script to populate Supabase with mock data
-- Run this in Supabase SQL Editor after creating the schema

-- Insert Categories
INSERT INTO categories (id, name, slug) VALUES
  ('1', 'Bags', 'bags'),
  ('2', 'Stationery', 'stationery'),
  ('3', 'Boxes', 'boxes'),
  ('4', 'Specialty', 'specialty');

-- Insert Subcategories
INSERT INTO subcategories (id, name, slug, parent_id) VALUES
  ('1-1', 'Polythene Bags', 'polythene-bags', '1'),
  ('1-2', 'Carry Bags', 'carry-bags', '1'),
  ('1-3', 'Cloth Bags', 'cloth-bags', '1'),
  ('1-4', 'Paper Bags', 'paper-bags', '1'),
  ('1-5', 'Jute Bags', 'jute-bags', '1'),
  ('1-6', 'Rice Sacks', 'rice-sacks', '1'),
  ('2-1', 'Visiting Cards', 'visiting-cards', '2'),
  ('2-2', 'Bill Books', 'bill-books', '2'),
  ('2-3', 'Stickers & Labels', 'stickers-labels', '2'),
  ('2-4', 'Catalogues & Brochures', 'catalogues-brochures', '2'),
  ('2-5', 'Pamphlets', 'pamphlets', '2'),
  ('2-6', 'Calendars', 'calendars', '2'),
  ('3-1', 'Cake Boxes', 'cake-boxes', '3'),
  ('3-2', 'Paper Pouches', 'paper-pouches', '3'),
  ('3-3', 'Packaging Boxes', 'packaging-boxes', '3'),
  ('4-1', 'Metal Visiting Cards', 'metal-visiting-cards', '4'),
  ('4-2', 'Transparent PVC Cards', 'transparent-pvc-cards', '4');

-- Insert Products
INSERT INTO products (id, name, category_id, subcategory_id, description, images, base_price, price_unit, customization_options, is_active) VALUES
  ('p1', 'Premium Polythene Carry Bag', '1', '1-1', 
   'High-quality polythene bags perfect for retail stores. Available in multiple sizes and thicknesses. Custom printing available.',
   ARRAY['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
   250, 'per kg',
   '[
     {"name": "Size", "options": [
       {"label": "Small (8x10\")", "priceModifier": 0},
       {"label": "Medium (12x16\")", "priceModifier": 20},
       {"label": "Large (16x20\")", "priceModifier": 40}
     ]},
     {"name": "Printing", "options": [
       {"label": "No Print", "priceModifier": 0},
       {"label": "1 Color", "priceModifier": 30},
       {"label": "2 Colors", "priceModifier": 50},
       {"label": "Full Color", "priceModifier": 80}
     ]}
   ]'::jsonb,
   true),
   
  ('p2', 'Eco-Friendly Paper Bag', '1', '1-4',
   'Sustainable kraft paper bags with reinforced handles. Perfect for boutiques and eco-conscious brands.',
   ARRAY['/placeholder.svg', '/placeholder.svg'],
   15, 'per piece',
   '[
     {"name": "Size", "options": [
       {"label": "Small", "priceModifier": 0},
       {"label": "Medium", "priceModifier": 5},
       {"label": "Large", "priceModifier": 10}
     ]},
     {"name": "Handle Type", "options": [
       {"label": "Twisted Paper", "priceModifier": 0},
       {"label": "Flat Paper", "priceModifier": 2},
       {"label": "Ribbon", "priceModifier": 8}
     ]}
   ]'::jsonb,
   true),
   
  ('p3', 'Premium Visiting Cards', '2', '2-1',
   'Professional visiting cards with premium finish. Multiple paper options and finishes available.',
   ARRAY['/placeholder.svg', '/placeholder.svg'],
   350, 'per 100',
   '[
     {"name": "Paper Type", "options": [
       {"label": "Matt Lamination", "priceModifier": 0},
       {"label": "Glossy Lamination", "priceModifier": 50},
       {"label": "Textured", "priceModifier": 100},
       {"label": "Premium Cotton", "priceModifier": 200}
     ]},
     {"name": "Special Effects", "options": [
       {"label": "None", "priceModifier": 0},
       {"label": "Spot UV", "priceModifier": 150},
       {"label": "Foil Stamping", "priceModifier": 250},
       {"label": "Embossing", "priceModifier": 200}
     ]}
   ]'::jsonb,
   true),
   
  ('p4', 'Custom Bill Book', '2', '2-2',
   'Customized bill books with company branding. Available in duplicate and triplicate formats.',
   ARRAY['/placeholder.svg'],
   180, 'per set',
   '[
     {"name": "Pages", "options": [
       {"label": "50 Sets", "priceModifier": 0},
       {"label": "100 Sets", "priceModifier": 100},
       {"label": "200 Sets", "priceModifier": 180}
     ]},
     {"name": "Copy Type", "options": [
       {"label": "Duplicate (2 copies)", "priceModifier": 0},
       {"label": "Triplicate (3 copies)", "priceModifier": 60}
     ]}
   ]'::jsonb,
   true),
   
  ('p5', 'Premium Cake Box', '3', '3-1',
   'Elegant cake boxes with window display. Perfect for bakeries and cake shops.',
   ARRAY['/placeholder.svg', '/placeholder.svg'],
   45, 'per piece',
   '[
     {"name": "Size", "options": [
       {"label": "6 inch", "priceModifier": 0},
       {"label": "8 inch", "priceModifier": 15},
       {"label": "10 inch", "priceModifier": 30},
       {"label": "12 inch", "priceModifier": 50}
     ]},
     {"name": "Window", "options": [
       {"label": "No Window", "priceModifier": 0},
       {"label": "Clear Window", "priceModifier": 10}
     ]}
   ]'::jsonb,
   true),
   
  ('p6', 'Metal Visiting Card', '4', '4-1',
   'Premium metal visiting cards that make a lasting impression. Available in gold, silver, and black finishes.',
   ARRAY['/placeholder.svg'],
   150, 'per piece',
   '[
     {"name": "Metal Finish", "options": [
       {"label": "Silver", "priceModifier": 0},
       {"label": "Gold", "priceModifier": 50},
       {"label": "Black", "priceModifier": 30},
       {"label": "Rose Gold", "priceModifier": 60}
     ]},
     {"name": "Engraving", "options": [
       {"label": "Laser Cut", "priceModifier": 0},
       {"label": "Deep Engraving", "priceModifier": 80}
     ]}
   ]'::jsonb,
   true),
   
  ('p7', 'Jute Shopping Bag', '1', '1-5',
   'Eco-friendly jute bags with custom printing. Durable and reusable, perfect for sustainable branding.',
   ARRAY['/placeholder.svg', '/placeholder.svg'],
   85, 'per piece',
   '[
     {"name": "Size", "options": [
       {"label": "Small", "priceModifier": 0},
       {"label": "Medium", "priceModifier": 25},
       {"label": "Large", "priceModifier": 45}
     ]},
     {"name": "Printing", "options": [
       {"label": "Screen Print", "priceModifier": 0},
       {"label": "Full Color Print", "priceModifier": 40}
     ]}
   ]'::jsonb,
   true),
   
  ('p8', 'Product Catalogue', '2', '2-4',
   'Professional product catalogues with high-quality printing. Perfect binding or saddle stitch available.',
   ARRAY['/placeholder.svg'],
   120, 'per piece',
   '[
     {"name": "Pages", "options": [
       {"label": "8 Pages", "priceModifier": 0},
       {"label": "16 Pages", "priceModifier": 80},
       {"label": "24 Pages", "priceModifier": 150},
       {"label": "32 Pages", "priceModifier": 220}
     ]},
     {"name": "Binding", "options": [
       {"label": "Saddle Stitch", "priceModifier": 0},
       {"label": "Perfect Binding", "priceModifier": 60}
     ]}
   ]'::jsonb,
   true);

-- Insert Sample Inquiries
INSERT INTO inquiries (id, product_id, product_name, customer_phone, quantity, customizations, status) VALUES
  ('inq1', 'p1', 'Premium Polythene Carry Bag', '+91 98765 43210', 50, 'Medium size, 2 Colors printing', 'new'),
  ('inq2', 'p3', 'Premium Visiting Cards', '+91 87654 32109', 500, 'Glossy Lamination, Spot UV', 'contacted'),
  ('inq3', 'p6', 'Metal Visiting Card', '+91 76543 21098', 100, 'Gold finish, Deep Engraving', 'completed');
