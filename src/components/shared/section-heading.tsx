
interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${centered ? 'items-center text-center max-w-2xl mx-auto' : 'items-start text-left'}`}>
      {badge && (
        <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-l-4 border-accent-orange pl-3">
          {badge}
        </span>
      )}
      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
