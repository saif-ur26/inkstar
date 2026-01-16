# WhatsApp API Integration Update

## Changes Made

Updated all WhatsApp links to use the official WhatsApp API format with pre-filled messages containing product details.

### New URL Format
```
https://api.whatsapp.com/send/?phone=919182573606&text=MESSAGE&type=phone_number&app_absent=0
```

### Updated Files

1. **src/config/whatsapp.ts**
   - Updated `getWhatsAppUrl()` function to use official API format
   - Changed default phone number to `919182573606`
   - Added `type=phone_number&app_absent=0` parameters

2. **src/pages/ProductDetail.tsx**
   - WhatsApp messages now include:
     - Product name
     - Quantity
     - Price per piece
     - Total price
     - Customization options (if selected)

3. **src/pages/Contact.tsx**
   - Updated WhatsApp link with proper API format
   - Pre-filled message: "Hello, I want information about your products"

4. **src/components/products/ProductCard.tsx**
   - WhatsApp button now includes product name in message
   - Uses phone number: `919182573606`
   - Message format: "Hello, I want information about: Product: [Name], Quantity: [Please specify]"

## Message Format Examples

### Product Detail Page
```
Hello INK Star! 👋

I'm interested in ordering:

📦 Product: Business Cards
📊 Quantity: 100 pieces
💰 Price per piece: ₹5
💵 Total Price: ₹500

🎨 Customizations:
  • Size: Standard
  • Finish: Glossy

Please confirm availability and delivery details.

Thank you!
```

### Product Card
```
Hello,

I want information about:

Product: Business Cards
Quantity: [Please specify]

Thank you!
```

### Contact Page
```
Hello,

I want information about your products and services.

Thank you!
```

## Testing

All WhatsApp links will now:
- Open WhatsApp directly (app or web)
- Pre-fill the message with product details
- Include the correct phone number (919182573606)
- Work on both mobile and desktop

## Phone Number Configuration

To change the WhatsApp business number, update the `.env` file:
```
VITE_WHATSAPP_NUMBER=919182573606
```
