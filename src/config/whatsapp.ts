// WhatsApp Business Configuration
// Update this with your actual WhatsApp Business number

export const WHATSAPP_CONFIG = {
    // Format: country code + number (no spaces, no + sign)
    // Example for India: '919876543210'
    // Example for US: '11234567890'
    businessNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919182573606',

    // Business name to show in messages
    businessName: 'INK Star',

    // Default greeting message
    greeting: 'Hello INK Star! 👋',
};

// Helper function to format WhatsApp URL using official API format
export function getWhatsAppUrl(message: string): string {
    // Use proper URL encoding for the message
    const encodedMessage = encodeURIComponent(message);

    // Use the official WhatsApp API format
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_CONFIG.businessNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
}
