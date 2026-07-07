'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, BatteryCharging } from 'lucide-react'

const products = [
  { src: '/images/aokly-5.12kw.jpeg', name: 'Aokly 5.12 kWh', desc: 'IP54 wall-mounted lithium battery with built-in WiFi, smart BMS, and hybrid inverter compatibility.' },
  { src: '/images/aokly-10.24kw.jpeg', name: 'Aokly 10.24 kWh', desc: 'IP32 wall-mounted lithium battery for homes, offices, and commercial backup needs.' },
  { src: '/images/aokly-15.36kw.jpeg', name: 'Aokly 15.36 kWh', desc: 'Ground-mounted lithium battery with Smart BMS protection, long backup time, and high cycle life.' },
  { src: '/images/mountrex-5.12kw.jpeg', name: 'Mountrex 5.12 kWh', desc: 'Wall-mounted LiFePO4 battery with 6000+ cycle messaging, built-in WiFi, and smart BMS protection.' },
]

export function AoklyMountrexShowcase() {
  const [active, setActive] = useState(0)
  const product = products[active]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % products.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="py-16 px-4 brand-blue-gradient lg:py-14">
      <div className="max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1 w-fit">
              Lithium Battery Showcase
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl !text-white leading-tight">
              Smart &amp; Reliable Power Storage Solutions
            </h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              Explore wall-mounted and ground-mounted lithium battery options shown. The range highlights LiFePO4 technology, Smart BMS protection, WiFi monitoring, inverter compatibility, and clean backup power for residential and commercial use.
            </p>
          </div>

          <Link
            href="/products?category=lithium-ion-battery"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-white/10 bg-accent-orange px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:bg-white hover:text-primary"
          >
            View Lithium Batteries
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <div className="relative aspect-square bg-transparent lg:aspect-[4/3]">
            <Image
              src={product.src}
              alt={`${product.name} lithium battery product image`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw "
              className="object-contain shadow-sm shadow-white rounded-2xl" 
            />
          </div>
          {/* <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <BatteryCharging className="h-4 w-4 text-accent-orange" />
              <h3 className="font-heading font-bold text-lg !text-primary">{product.name}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{product.desc}</p>
            <div className="flex gap-2">
              {products.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Show ${item.name}`}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-smooth ${index === active ? 'w-8 bg-accent-orange' : 'w-2.5 bg-slate-200 hover:bg-primary/30'}`}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
