'use client'

import React, { useState } from 'react'
import { Sun, Droplet, BatteryCharging, Wrench, Calendar, MapPin, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ServiceRequestForm } from '@/components/forms/service-request-form'
import { SERVICES } from '@/lib/constants'

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'solar-installation':
        return Sun
      case 'solar-cleaning':
        return Droplet
      case 'battery-replacement':
        return BatteryCharging
      default:
        return Wrench
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Expert Support
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Our Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.
          </p>
        </div>
      </section>

      {/* Services List Details */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {SERVICES.map((service, idx) => {
            const Icon = getIcon(service.slug)
            return (
              <div
                key={service.slug}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm"
              >
                {/* Visual Icon Column */}
                <div className="md:col-span-3 flex justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/10">
                    <Icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Text description column */}
                <div className="md:col-span-6 flex flex-col gap-3">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-primary">
                    {service.name}
                  </h3>
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                    {service.fullDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-slate-500 text-xs font-medium">
                    <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                    <span>Available Location: Karachi Only</span>
                  </div>
                </div>

                {/* CTA Column */}
                <div className="md:col-span-3 flex justify-center md:justify-end w-full">
                  <Button
                    onClick={() => handleRequestService(service.name)}
                    className="w-full md:w-auto bg-accent-orange hover:bg-accent-orange/95 text-white font-extrabold px-6"
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
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Reliable Maintenance Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl text-left mt-4">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">Response Time</h4>
                <p className="text-xs text-slate-400 mt-0.5">We respond within 2 hours to confirm bookings.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">Original Spares</h4>
                <p className="text-xs text-slate-400 mt-0.5">Only original branded cables, fuses, and spares used.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">Karachi Focus</h4>
                <p className="text-xs text-slate-400 mt-0.5">Dedicated service team for all town subdistricts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[480px] w-[95vw] rounded-xl p-6 bg-white border border-slate-200 shadow-xl">
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
  )
}
