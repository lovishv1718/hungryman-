interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  bgImage?: string;
}

export default function PageHero({ title, subtitle, description, bgImage }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5 bg-black/40">
      {bgImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${bgImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </>
      )}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-warm-orange/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
          {subtitle}
        </span>
        <h1 className="font-kanit text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white mb-6 leading-[0.9] tracking-tighter">
          {title}
        </h1>
        <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-2xl mt-6">
          {description}
        </p>
      </div>
    </section>
  );
}
