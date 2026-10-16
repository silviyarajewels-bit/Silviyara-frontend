import { WHATSAPP_NUMBER } from '@/lib/constants';
import { IcWhatsApp } from '@/lib/icons';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      title="Order on WhatsApp"
    >
      <IcWhatsApp />
    </a>
  );
}
