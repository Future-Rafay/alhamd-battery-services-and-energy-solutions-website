'use client'

import { useState } from 'react'
import { Sun, Droplet, BatteryCharging, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Service } from '@/types'
import { SERVICES } from '@/lib/constants'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

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

  // Get icon component by string name
  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'sun':
        return Sun
      case 'droplet':
      case 'clean':
        return Droplet
      case 'battery':
      case 'battery-charging':
        return BatteryCharging
      default:
        return Wrench
    }
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Our Services
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Expert Energy & Support Services
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            From installation to cleaning and periodic backups, we ensure your solar systems and batteries deliver uninterrupted power.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const IconComponent = getIcon(service.icon)
            return (
              <Card
                key={service.slug}
                className="group border border-slate-200/60 rounded-xl hover:border-primary/20 hover:shadow-md transition-smooth flex flex-col h-full bg-slate-50/50"
              >
                <CardContent className="p-8 flex flex-col justify-between items-start gap-6 flex-grow">
                  <div className="flex flex-col gap-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/10 group-hover:bg-accent-orange transition-smooth">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading font-bold text-xl !text-primary">
                        {service.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleRequestService(service.name)}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold transition-smooth shadow-sm group-hover:bg-accent-orange text-xs sm:text-sm"
                  >
                    Request Booking
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Service Booking Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[480px] sm:max-w-[600px] w-[95vw] rounded-xl p-6 bg-white border border-slate-250">
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
