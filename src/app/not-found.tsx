import Link from 'next/link'
import { ArrowRight, Home, ShieldAlert } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Page Not Found | Alhamd Battery Services',
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md w-full bg-white border border-slate-200/60 p-8 rounded-2xl shadow-sm flex flex-col items-center gap-6">
        {/* Visual Icon */}
        <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-accent-orange" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent-orange">Error Code: 404</span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary leading-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full border-t border-slate-100 pt-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full bg-primary hover:bg-primary/95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center'
            )}
          >
            <Home className="w-4 h-4 mr-1.5" /> Return Home
          </Link>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full border-primary text-primary font-bold text-xs sm:text-sm flex items-center justify-center'
            )}
          >
            Explore Catalog <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

