'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceRequestSchema, ServiceRequestInput } from '@/lib/validations/service-request'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

interface ServiceRequestFormProps {
  defaultService?: string
  onSuccess?: () => void
}

export function ServiceRequestForm({ defaultService = '', onSuccess }: ServiceRequestFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      service: defaultService,
      name: '',
      phone: '',
      address: '',
      message: '',
    },
  })

  // Register select manually since Select is a custom component
  React.useEffect(() => {
    register('service')
    if (defaultService) {
      setValue('service', defaultService)
    }
  }, [register, defaultService, setValue])

  const onSubmit = async (data: ServiceRequestInput) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong. Please check inputs.')
      }

      setStatus('success')
      reset()
      if (onSuccess) {
        // Delay closing modal so user can see success state
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (error: any) {
      console.error('Service request error:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Failed to request service. Please verify address details.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center text-center gap-3 py-10">
        <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
        <h4 className="font-heading font-bold text-lg">Booking Submitted!</h4>
        <p className="text-xs sm:text-sm text-green-700 leading-relaxed max-w-sm">
          Your service booking has been registered. We will call you within 2 hours to confirm details and dispatch technicians.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg flex items-start gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-red-650 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Error:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* Service Dropdown */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="service" className="text-slate-700 font-bold text-xs">
          Select Service <span className="text-accent-orange">*</span>
        </Label>
        <Select
          defaultValue={defaultService}
          onValueChange={(val) => setValue('service', val || '')}
          disabled={status === 'loading'}
        >
          <SelectTrigger className="bg-white border-slate-200 focus:ring-primary text-xs sm:text-sm">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-slate-200 text-xs sm:text-sm">
            {SERVICES.map((s) => (
              <SelectItem key={s.slug} value={s.name} className="hover:bg-slate-100 cursor-pointer">
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <span className="text-xs text-red-650 font-semibold">{errors.service.message}</span>}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-slate-700 font-bold text-xs">
          Your Name <span className="text-accent-orange">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Muhammad Salman"
          {...register('name')}
          className={`bg-white border-slate-200 text-xs sm:text-sm focus-visible:ring-primary ${
            errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.name && <span className="text-xs text-red-650 font-semibold">{errors.name.message}</span>}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone" className="text-slate-700 font-bold text-xs">
          Mobile Number <span className="text-accent-orange">*</span>
        </Label>
        <Input
          id="phone"
          placeholder="03222592589"
          {...register('phone')}
          className={`bg-white border-slate-200 text-xs sm:text-sm focus-visible:ring-primary ${
            errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.phone && <span className="text-xs text-red-650 font-semibold">{errors.phone.message}</span>}
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address" className="text-slate-700 font-bold text-xs">
          Address (Karachi Limits Only) <span className="text-accent-orange">*</span>
        </Label>
        <Input
          id="address"
          placeholder="e.g. Shop No. 12, Saudabad, Karachi"
          {...register('address')}
          className={`bg-white border-slate-200 text-xs sm:text-sm focus-visible:ring-primary ${
            errors.address ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.address && <span className="text-xs text-red-650 font-semibold">{errors.address.message}</span>}
        <span className="text-[9px] text-slate-400 font-medium">Must contain "Karachi" to validate booking request limits.</span>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" className="text-slate-700 font-bold text-xs">
          Instructions (Optional)
        </Label>
        <Textarea
          id="message"
          rows={3}
          placeholder="Specific timing request, solar capacity details, etc."
          {...register('message')}
          className="bg-white border-slate-200 text-xs sm:text-sm focus-visible:ring-primary resize-none"
          disabled={status === 'loading'}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold shadow-md h-10 mt-2 text-xs sm:text-sm"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
          </>
        ) : (
          'Book Service Now'
        )}
      </Button>
    </form>
  )
}
