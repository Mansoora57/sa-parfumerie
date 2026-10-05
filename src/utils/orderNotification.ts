import { CustomerOrder } from '../types';

export const DEFAULT_ADMIN_PHONE_RAW = '03173025999';
export const DEFAULT_ADMIN_PHONE_INTL = '+92 317 3025999';
export const DEFAULT_ADMIN_WHATSAPP_NUMBER = '923173025999';

/**
 * Formats a clean, high-luxury order receipt text for SMS and WhatsApp
 */
export const formatOrderAlertMessage = (order: CustomerOrder): string => {
  const itemsList = order.items
    .map(
      (it, i) =>
        `${i + 1}. *${it.fragrance.name}* (${it.selectedVolume})\n   • Qty: ${it.quantity} | Rate: ₨ ${it.pricePKR.toLocaleString()}${
          it.customEngraving ? `\n   • 🖋️ Engraved: "${it.customEngraving}"` : ''
        }`
    )
    .join('\n');

  return `👑 *NEW PERFUME ORDER ALERT!*
🏛️ *SHAHZEIN•A PARFUMERIE (ONLINE FLAGSHIP)*
━━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* ${order.orderNumber}
📅 *Date:* ${order.date}

👤 *PATRON / CUSTOMER:*
• *Name:* ${order.customer.fullName}
• *Mobile:* ${order.customer.phone}
• *Email:* ${order.customer.email}
• *City:* ${order.customer.city}
• *Address:* ${order.customer.address}
${order.customer.notes ? `• *Special Notes:* ${order.customer.notes}\n` : ''}
🛍️ *ORDERED ITEMS:*
${itemsList}

💰 *PAYMENT & BILL:*
• *Subtotal:* ₨ ${order.subtotalPKR.toLocaleString()}
• *Delivery:* Complimentary Royal White Glove
• *Grand Total:* *₨ ${order.totalPKR.toLocaleString()}*
• *Method:* ${order.paymentMethod}
• *Status:* ${order.paymentStatus}
• *Tracking No:* ${order.trackingCode}
━━━━━━━━━━━━━━━━━━━━━
✨ _Please verify and dispatch this order from the fragrance vault._`;
};

/**
 * Generates direct WhatsApp click-to-chat URL for Admin (03173025999)
 */
export const getWhatsAppAlertUrl = (
  order: CustomerOrder,
  whatsappNumber: string = DEFAULT_ADMIN_WHATSAPP_NUMBER
): string => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const text = formatOrderAlertMessage(order);
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(text)}`;
};

/**
 * Generates direct native SMS dispatch URL for Admin (03173025999)
 */
export const getSmsAlertUrl = (
  order: CustomerOrder,
  phoneNumber: string = '+923173025999'
): string => {
  const text = formatOrderAlertMessage(order);
  // iOS and Android compatible SMS schema
  return `sms:${phoneNumber}?body=${encodeURIComponent(text)}`;
};

/**
 * Generates direct WhatsApp chat URL to reply to the Customer
 */
export const getCustomerWhatsAppUrl = (order: CustomerOrder): string => {
  const cleaned = order.customer.phone.replace(/[^0-9]/g, '');
  let formatted = cleaned;
  if (formatted.startsWith('0')) {
    formatted = '92' + formatted.slice(1);
  } else if (!formatted.startsWith('92') && formatted.length === 10) {
    formatted = '92' + formatted;
  }

  const text = `Assalam-o-Alaikum ${order.customer.fullName},\n\nThank you for choosing *SHAHZEIN•A PARFUMERIE*.\n\nYour order *${order.orderNumber}* for *₨ ${order.totalPKR.toLocaleString()}* has been confirmed and is being hand-bottled & wax-sealed in our fragrance vault.\n\n📦 *Tracking Code:* ${order.trackingCode}\n🚚 *Delivery:* Complimentary Royal White Glove Courier\n\nFor any bespoke requests, feel free to message us here!\n\nWarm regards,\n*SHAHZEIN•A PARFUMERIE Flagship*`;
  return `https://api.whatsapp.com/send?phone=${formatted}&text=${encodeURIComponent(text)}`;
};
