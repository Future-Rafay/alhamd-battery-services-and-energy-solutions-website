'use client'

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
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.002 14.124.975 11.514.975c-5.445 0-9.87 4.374-9.875 9.805-.002 1.777.472 3.509 1.373 5.039L2.009 21.95l6.638-1.796zm12.39-7.234c-.308-.154-1.82-.9-2.102-1.002-.281-.103-.486-.155-.69.154-.205.31-.795.998-.973 1.203-.18.205-.359.23-.667.077-.307-.155-1.3-.48-2.477-1.532-.915-.817-1.533-1.828-1.712-2.136-.18-.309-.02-.476.135-.63.139-.14.308-.359.462-.538.154-.18.206-.307.308-.513.102-.206.051-.385-.026-.539-.077-.154-.69-1.666-.945-2.28-.248-.598-.5-.517-.69-.527-.179-.009-.385-.01-.59-.01-.205 0-.538.077-.82.384-.282.308-1.077 1.051-1.077 2.561 0 1.51 1.099 2.972 1.253 3.178.154.205 2.162 3.303 5.238 4.63.732.316 1.302.505 1.748.647.736.234 1.407.2 1.937.121.59-.088 1.82-.744 2.077-1.46.256-.718.256-1.334.18-1.462-.077-.128-.282-.205-.59-.359z" />
      </svg>
    </a>
  )
}
