// WhatsApp Business Configuration
// Update this with your actual WhatsApp Business number

export const WHATSAPP_CONFIG = {
    // Format: country code + number (no spaces, no + sign)
    // Example for India: '919876543210'
    // Example for US: '11234567890'
    businessNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',

    // Business name to show in messages
    businessName: 'INK Star',

    // Default greeting message
    greeting: 'Hello INK Star! 👋',
};

// Helper function to format WhatsApp URL
export function getWhatsAppUrl(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;
}
