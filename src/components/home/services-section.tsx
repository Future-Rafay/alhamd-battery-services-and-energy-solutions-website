'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Service } from '@/types'
import { SERVICES } from '@/lib/constants'
import { ServiceRequestForm } from '@/components/forms/service-request-form'
import Link from 'next/link'

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasCMSServices = services && services.length > 0
  const servicesList = hasCMSServices ? services : SERVICES

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  // Get service image by slug mapping
  const getServiceImage = (slug?: string) => {
    switch (slug?.toLowerCase()) {
      case 'solar-installation':
        return '/services/solar-installation.png'
      case 'solar-cleaning':
      case 'solar-cleaning-maintenance':
        return '/services/solar-cleaning.png'
      case 'battery-replacement':
      case 'battery-replacement-maintenance':
        return '/services/battery-replacement.png'
      case 'ups-inverter':
      case 'ups-inverter-service':
        return '/services/ups-inverter.png'
      case 'energy-consultation':
      case 'energy-consultation-service':
        return '/services/energy-consultation.png'
      case 'electrical-wiring':
      case 'electrical-wiring-service':
        return '/services/electrical-wiring.png'
      default:
        return '/services/solar-installation.png'
    }
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Our Services
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Expert Energy & Support Services
          </h2>
      <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            From installation to cleaning and periodic backups, we ensure your solar systems and batteries deliver uninterrupted power.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const imageSrc = getServiceImage(service.slug)
            return (
              <Card
                key={service.slug}
                className="group border border-slate-200/60 rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-smooth flex flex-col h-full bg-slate-50/20"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={service.name}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-60" />
                </div>
                <CardContent className="p-6 flex flex-col justify-between items-start gap-5 flex-grow">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading font-bold text-lg sm:text-xl !text-primary group-hover:text-accent-orange transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => handleRequestService(service.name)}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold transition-smooth shadow-sm group-hover:bg-accent-orange text-xs sm:text-sm mt-auto"
                  >
                    Request Booking
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
         {/* button  */}
        <div className='flex items-center justify-center'>
          <Link
            href="/services"
            className="mt-8 px-10 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-primary hover:bg-white hover:text-primary"
          >
            View Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Service Booking Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-h-[92dvh] max-w-[480px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 sm:max-w-[600px] sm:p-6">
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
      </div>
    </section>
  )
}
