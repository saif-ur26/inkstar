-- Migration script to populate Supabase with mock data
-- Run this in Supabase SQL Editor after creating the schema

-- Insert Categories (using gen_random_uuid() for proper UUID generation)
INSERT INTO categories (id, name, slug) VALUES
  (gen_random_uuid(), 'Bags', 'bags'),
  (gen_random_uuid(), 'Stationery', 'stationery'),
  (gen_random_uuid(), 'Boxes', 'boxes'),
  (gen_random_uuid(), 'Specialty', 'specialty');

-- Store category IDs in variables for reference
DO $$
DECLARE
  bags_id UUID;
  stationery_id UUID;
  boxes_id UUID;
  specialty_id UUID;
  
  polythene_id UUID;
  paper_bags_id UUID;
  jute_id UUID;
  visiting_cards_id UUID;
  bill_books_id UUID;
  catalogues_id UUID;
  cake_boxes_id UUID;
  metal_cards_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO bags_id FROM categories WHERE slug = 'bags';
  SELECT id INTO stationery_id FROM categories WHERE slug = 'stationery';
  SELECT id INTO boxes_id FROM categories WHERE slug = 'boxes';
  SELECT id INTO specialty_id FROM categories WHERE slug = 'specialty';

  -- Insert Subcategories
  INSERT INTO subcategories (id, name, slug, parent_id) VALUES
    (gen_random_uuid(), 'Polythene Bags', 'polythene-bags', bags_id),
    (gen_random_uuid(), 'Carry Bags', 'carry-bags', bags_id),
    (gen_random_uuid(), 'Cloth Bags', 'cloth-bags', bags_id),
    (gen_random_uuid(), 'Paper Bags', 'paper-bags', bags_id),
    (gen_random_uuid(), 'Jute Bags', 'jute-bags', bags_id),
    (gen_random_uuid(), 'Rice Sacks', 'rice-sacks', bags_id),
    (gen_random_uuid(), 'Visiting Cards', 'visiting-cards', stationery_id),
    (gen_random_uuid(), 'Bill Books', 'bill-books', stationery_id),
    (gen_random_uuid(), 'Stickers & Labels', 'stickers-labels', stationery_id),
    (gen_random_uuid(), 'Catalogues & Brochures', 'catalogues-brochures', stationery_id),
    (gen_random_uuid(), 'Pamphlets', 'pamphlets', stationery_id),
    (gen_random_uuid(), 'Calendars', 'calendars', stationery_id),
    (gen_random_uuid(), 'Cake Boxes', 'cake-boxes', boxes_id),
    (gen_random_uuid(), 'Paper Pouches', 'paper-pouches', boxes_id),
    (gen_random_uuid(), 'Packaging Boxes', 'packaging-boxes', boxes_id),
    (gen_random_uuid(), 'Metal Visiting Cards', 'metal-visiting-cards', specialty_id),
    (gen_random_uuid(), 'Transparent PVC Cards', 'transparent-pvc-cards', specialty_id);

  -- Get subcategory IDs for products
  SELECT id INTO polythene_id FROM subcategories WHERE slug = 'polythene-bags';
  SELECT id INTO paper_bags_id FROM subcategories WHERE slug = 'paper-bags';
  SELECT id INTO jute_id FROM subcategories WHERE slug = 'jute-bags';
  SELECT id INTO visiting_cards_id FROM subcategories WHERE slug = 'visiting-cards';
  SELECT id INTO bill_books_id FROM subcategories WHERE slug = 'bill-books';
  SELECT id INTO catalogues_id FROM subcategories WHERE slug = 'catalogues-brochures';
  SELECT id INTO cake_boxes_id FROM subcategories WHERE slug = 'cake-boxes';
  SELECT id INTO metal_cards_id FROM subcategories WHERE slug = 'metal-visiting-cards';

  -- Insert Products
  INSERT INTO products (name, category_id, subcategory_id, description, images, base_price, price_unit, customization_options, is_active) VALUES
    ('Premium Polythene Carry Bag', bags_id, polythene_id,
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
     
    ('Eco-Friendly Paper Bag', bags_id, paper_bags_id,
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
     
    ('Premium Visiting Cards', stationery_id, visiting_cards_id,
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
     
    ('Custom Bill Book', stationery_id, bill_books_id,
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
     
    ('Premium Cake Box', boxes_id, cake_boxes_id,
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
     
    ('Metal Visiting Card', specialty_id, metal_cards_id,
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
     
    ('Jute Shopping Bag', bags_id, jute_id,
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
     
    ('Product Catalogue', stationery_id, catalogues_id,
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

  -- Insert Sample Inquiries (using product IDs from inserted products)
  INSERT INTO inquiries (product_id, product_name, customer_phone, quantity, customizations, status)
  SELECT 
    id,
    name,
    '+91 98765 43210',
    50,
    'Medium size, 2 Colors printing',
    'new'
  FROM products WHERE name = 'Premium Polythene Carry Bag'
  LIMIT 1;

  INSERT INTO inquiries (product_id, product_name, customer_phone, quantity, customizations, status)
  SELECT 
    id,
    name,
    '+91 87654 32109',
    500,
    'Glossy Lamination, Spot UV',
    'contacted'
  FROM products WHERE name = 'Premium Visiting Cards'
  LIMIT 1;

  INSERT INTO inquiries (product_id, product_name, customer_phone, quantity, customizations, status)
  SELECT 
    id,
    name,
    '+91 76543 21098',
    100,
    'Gold finish, Deep Engraving',
    'completed'
  FROM products WHERE name = 'Metal Visiting Card'
  LIMIT 1;

END $$;
