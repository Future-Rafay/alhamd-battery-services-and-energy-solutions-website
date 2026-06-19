'use client'

import { FaWhatsapp } from "react-icons/fa"

interface WhatsAppFloatProps {
  number?: string
  businessName?: string
}

export function WhatsAppFloat({ 
  number = '+923121141703', 
  businessName = 'Alhamd Battery Services' 
}: WhatsAppFloatProps) {
  // Format phone number by removing spaces, dashes and plus
  const formattedNumber = number.replace(/[^\d+]/g, '')
  const message = encodeURIComponent(`Hi! I am visiting your website (${businessName}) and would like to inquire about battery/solar solutions.`)
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 whatsapp-pulse focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      aria-label="Contact Alhamd Battery Services on WhatsApp"
      title="Chat on WhatsApp"
    >
     <FaWhatsapp  className="w-10 h-10"/>
    </a>
  )
}
