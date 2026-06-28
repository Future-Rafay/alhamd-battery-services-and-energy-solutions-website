import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto brand-blue-gradient rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center gap-6 relative overflow-hidden ">


                <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
                    <span className="text-accent-yellow font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
                        Get Started Today
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl !text-white">
                        Ready to Secure Your Power Backup?
                    </h2>
                    <p className="text-white/70 text-xs sm:text-base leading-relaxed">
                        Visit our Saudabad storefront in Karachi or request a booking online. We assist with custom sizing, official brand warranty setup, and fast technician dispatch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <Link href="/contact" className="bg-accent-orange hover:bg-accent-orange/90 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-accent-orange/20 transition-smooth text-xs sm:text-sm inline-block">
                            Consult an Expert
                        </Link>
                        <Link href="/services" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold px-8 py-3.5 rounded-lg backdrop-blur-sm transition-smooth text-xs sm:text-sm inline-block">
                            Book a Service
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}