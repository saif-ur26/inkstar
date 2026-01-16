# WhatsApp Integration Setup

## Overview

The app now includes WhatsApp integration that allows customers to directly message you with pre-filled product details and pricing.

## Features

✅ **Pre-filled Messages**: Product name, quantity, price per piece, and total price
✅ **Customization Details**: All selected options included
✅ **Professional Format**: Clean, emoji-enhanced message format
✅ **Direct Link**: Opens WhatsApp with message ready to send

## Setup Your WhatsApp Number

### Step 1: Update .env File

Open `.env` and update the WhatsApp number:

```env
VITE_WHATSAPP_NUMBER=919876543210
```

**Format**: `CountryCode + PhoneNumber` (no spaces, no + sign)

**Examples**:
- India: `919876543210`
- US: `11234567890`
- UK: `447123456789`
- UAE: `971501234567`

### Step 2: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Message Format

When customers click "Order on WhatsApp", they'll see:

```
Hello INK Star! 👋

I'm interested in ordering:

📦 *Product:* Premium Visiting Cards
📊 *Quantity:* 100 pieces
💰 *Price per piece:* ₹3.50
💵 *Total Price:* ₹350

🎨 *Customizations:*
  • Paper Type: Glossy Lamination
  • Special Effects: Spot UV

Please confirm availability and delivery details.

Thank you!
```

## Pricing Display

### Per Piece Pricing
- All prices shown as "₹X per piece"
- Total calculated automatically
- Customization costs included in per-piece price

### Example:
- Base Price: ₹300 per 100 = ₹3.00 per piece
- Customization: +₹50 per 100 = +₹0.50 per piece
- **Final: ₹3.50 per piece**
- **Total for 100: ₹350**

## Customization

### Change Business Name

Edit `src/config/whatsapp.ts`:

```typescript
export const WHATSAPP_CONFIG = {
  businessNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',
  businessName: 'Your Business Name', // Change this
  greeting: 'Hello Your Business! 👋', // Change this
};
```

### Modify Message Template

Edit the `handleWhatsAppClick` function in `src/pages/ProductDetail.tsx`:

```typescript
const message =
  `${WHATSAPP_CONFIG.greeting}\n\n` +
  `I'm interested in ordering:\n\n` +
  // Customize your message here
  `📦 *Product:* ${product.name}\n` +
  // ... rest of message
```

## Testing

1. **Test with Your Number**:
   - Add your WhatsApp number to `.env`
   - Browse to a product page
   - Click "Order on WhatsApp"
   - Verify message opens correctly

2. **Test Message Format**:
   - Check all product details are included
   - Verify pricing calculations
   - Confirm customizations appear

3. **Test on Mobile**:
   - WhatsApp app should open automatically
   - Message should be pre-filled
   - Ready to send

## Troubleshooting

### WhatsApp Not Opening?

**Issue**: Link doesn't open WhatsApp
**Solution**: 
- Check number format (no spaces, no +)
- Verify WhatsApp is installed
- Try on mobile device

### Wrong Number?

**Issue**: Opens wrong WhatsApp number
**Solution**:
- Update `VITE_WHATSAPP_NUMBER` in `.env`
- Restart dev server
- Clear browser cache

### Message Not Pre-filled?

**Issue**: WhatsApp opens but message is empty
**Solution**:
- Check browser console for errors
- Verify `getWhatsAppUrl` function is working
- Test on different browser

### Price Not Showing?

**Issue**: Price shows as ₹0 or incorrect
**Solution**:
- Check product has `basePrice` set
- Verify customization `priceModifier` values
- Check `calculatedPrice` calculation

## WhatsApp Business API (Optional)

For advanced features like:
- Automated responses
- Message templates
- Analytics
- Multiple agents

Consider upgrading to **WhatsApp Business API**:
1. Visit: https://business.whatsapp.com
2. Apply for Business API
3. Integrate with your backend

## Best Practices

1. **Response Time**: Reply to WhatsApp messages within 24 hours
2. **Professional**: Keep responses professional and helpful
3. **Availability**: Set business hours expectations
4. **Follow-up**: Send order confirmations via WhatsApp
5. **Catalog**: Consider WhatsApp Business Catalog feature

## Support

For issues:
- Check browser console for errors
- Verify `.env` configuration
- Test on different devices
- Check WhatsApp is installed and updated

---

**Your WhatsApp integration is ready!** 📱

Customers can now directly message you with product details and pricing.
