'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, CheckCircle, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ServiceRequestForm } from '@/components/forms/service-request-form'
import { Service } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface ServicesClientProps {
  services?: Service[]
}

export function ServicesClient({ services }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const servicesList = services || []

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  const getServiceImage = (service: Service) => {
    if (service.image) {
      try {
        return urlFor(service.image).width(600).height(400).quality(85).url()
      } catch (error) {
        console.error('Failed to get Sanity image URL:', error)
      }
    }
    return ''
  }

  return (
    <>
      {/* Services List Details */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {servicesList.map((service) => {
            const imageSrc = getServiceImage(service)
            return (
              <div
                key={service.slug}
                className="bg-white border border-slate-200/60 rounded-2xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center shadow-sm hover:shadow-md transition-smooth group"
              >
                {/* Visual Image Column */}
                <div className="md:col-span-4 flex justify-center w-full">
                  <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden shadow-sm bg-slate-100">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={service.name}
                        fill
                        sizes="(max-w-768px) 100vw, 250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-semibold text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Text description column */}
                <div className="md:col-span-5 flex flex-col gap-2.5">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl !text-primary group-hover:text-accent-orange transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.fullDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-slate-500 text-xs font-semibold">
                    <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                    <span>Available Location: Karachi Only</span>
                  </div>
                </div>

                {/* CTA Column */}
                <div className="md:col-span-3 flex justify-center md:justify-end w-full">
                  <Button
                    onClick={() => handleRequestService(service.name)}
                    className="w-full md:w-auto bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-extrabold px-6 py-5 transition-smooth"
                  >
                    Request Booking
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Trust factors panel */}
      <section className="brand-blue-gradient text-white py-20 px-4 relative overflow-hidden">
        {/* Decorative background accents */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent-yellow/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-accent-orange/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-10 relative z-10">
          <div className="flex flex-col items-center gap-3">
            <span className="text-accent-yellow font-bold text-xs uppercase tracking-wider">
              Service Guarantee
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl !text-white">
              Reliable Maintenance Services
            </h2>
            <p className="text-white/70 text-xs sm:text-sm max-w-xl">
              Our dedicated service team ensures your solar and energy systems perform at peak efficiency with genuine parts and fast response.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl text-left">
            <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl p-5 flex gap-4 hover:bg-white/[0.12] transition-smooth group">
              <div className="w-10 h-10 rounded-lg bg-accent-yellow/15 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-accent-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base !text-white group-hover:text-accent-yellow transition-colors">Response Time</h4>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">We respond within 2 hours to confirm bookings.</p>
              </div>
            </div>
            <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl p-5 flex gap-4 hover:bg-white/[0.12] transition-smooth group">
              <div className="w-10 h-10 rounded-lg bg-accent-yellow/15 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-accent-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base !text-white group-hover:text-accent-yellow transition-colors">Original Spares</h4>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">Only original branded cables, fuses, and spares used.</p>
              </div>
            </div>
            <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl p-5 flex gap-4 hover:bg-white/[0.12] transition-smooth group">
              <div className="w-10 h-10 rounded-lg bg-accent-yellow/15 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-accent-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base !text-white group-hover:text-accent-yellow transition-colors">Karachi Focus</h4>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">Dedicated service team for all town subdistricts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[92dvh] max-w-[480px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl sm:max-w-[600px] sm:p-6">
          <DialogHeader className="text-left border-b border-slate-100 pb-3">
            <DialogTitle className="font-heading font-bold text-xl text-primary flex items-center gap-2">
              <Wrench className="w-5 h-5 text-accent-orange" /> Request Booking
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Fill in the form below. We will call you within 2 hours to confirm your request.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <ServiceRequestForm 
              defaultService={selectedService} 
              onSuccess={() => setIsModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
