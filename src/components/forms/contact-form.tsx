'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactInput } from '@/lib/validations/contact'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactInput) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      reset()
    } catch (error: any) {
      console.error('Contact Form error:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Failed to submit form. Please check your connection.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center text-center gap-3">
        <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
        <h4 className="font-heading font-bold text-lg">Message Sent Successfully!</h4>
        <p className="text-xs sm:text-sm text-green-700 leading-relaxed max-w-sm">
          Thank you for reaching out to Alhamd Battery Services. One of our store representatives will contact you shortly.
        </p>
        <Button
          onClick={() => setStatus('idle')}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Error state alert */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <span className="font-bold">Submission Failed:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-slate-700 font-bold text-xs sm:text-sm">
          Your Name <span className="text-accent-orange">*</span>
        </Label>
        <Input
          id="name"
          placeholder="e.g. Muhammad Salman"
          {...register('name')}
          className={`bg-white border-slate-200 focus-visible:ring-primary ${
            errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.name && <span className="text-xs text-red-650 font-semibold">{errors.name.message}</span>}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone" className="text-slate-700 font-bold text-xs sm:text-sm">
          Mobile Number <span className="text-accent-orange">*</span>
        </Label>
        <Input
          id="phone"
          placeholder="e.g. 03222592589"
          {...register('phone')}
          className={`bg-white border-slate-200 focus-visible:ring-primary ${
            errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.phone && <span className="text-xs text-red-650 font-semibold">{errors.phone.message}</span>}
        <span className="text-[10px] text-slate-400 font-medium">Use a valid Pakistani mobile number to receive replies.</span>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" className="text-slate-700 font-bold text-xs sm:text-sm">
          Message <span className="text-accent-orange">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Describe your inquiry (UPS battery query, solar sizing request, etc.)"
          {...register('message')}
          className={`bg-white border-slate-200 focus-visible:ring-primary resize-none ${
            errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          disabled={status === 'loading'}
        />
        {errors.message && <span className="text-xs text-red-650 font-semibold">{errors.message.message}</span>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold shadow-md h-11"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
