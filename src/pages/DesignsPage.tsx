import { motion } from 'framer-motion';
import { Layers, Camera } from 'lucide-react';
import PageHero from '../components/PageHero';
import { TabbedBeforeAfterSlider } from '../components/BeforeAfterSlider';

const allDesigns = [
  { src: '/poster 1.webp', title: 'Parmish Verma — Born to Shine', category: 'Official Tour Visuals', year: '2024', w: 872, h: 863 },
  { src: '/poster 2.webp', title: 'Diljit Dosanjh — Live in UK', category: 'Concert Creative', year: '2024', w: 695, h: 868 },
  { src: '/karan_aujla.jpeg', title: 'Karan Aujla — Making Memories', category: 'Album Cover Art', year: '2023', w: 1080, h: 1350 },
  { src: '/poster 4.webp', title: 'Karan Aujla — Street Art Promo', category: 'Artist Branding', year: '2023', w: 662, h: 870 },
  { src: '/khan_bhaini2.jpeg', title: 'Khan Bhaini — Babiha Campaign', category: 'Cinematic Poster', year: '2023', w: 1074, h: 1600 },
  { src: '/poster 6.webp', title: 'Amrit Maan — Babiha Alt Cover', category: 'Release Creative', year: '2023', w: 871, h: 865 },
  { src: '/poster 7.webp', title: 'Prabh Gill — Editorial Art', category: 'Single Artwork', year: '2024', w: 700, h: 868 },
  { src: '/poster 8.webp', title: 'Prabh Gill — Visual Identity', category: 'Motion Poster Graphic', year: '2024', w: 865, h: 872 }
];

export default function DesignsPage() {
  return (
    <>
      <PageHero 
        title="HUNGRYMAN DESIGNS." 
        subtitle="SERVICES & PORTFOLIO" 
        description="Precision artwork composing key cultural assets. We manage the release pipeline from raw photography assets to global billboards."
      />

      {/* Services category list */}
      <section id="services" className="py-32 bg-black/20 border-b border-white/5 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4">
                OUR EXPERTISE
              </span>
              <h2 className="font-kanit text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-8">
                CRAFTING THE <br />
                VISUAL LANGUAGE OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-orange to-cinematic-gold">
                  PUNJABI STARDOM
                </span>
              </h2>
              <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-sm">
                We design visuals that build brands and release momentum. Our studio operates with authentic workflow designs to establish visual identity across printing and digital streaming.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border-b border-white/10 pb-12 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-kanit text-xl font-bold uppercase text-white">01 / CREATIVE DESIGN</span>
                  <Layers size={18} className="text-warm-orange" />
                </div>
                <p className="text-xs text-soft-cream-dim leading-relaxed mb-6 font-light max-w-lg">
                  Specializing in campaign graphics, single covers, and motion designs built for high-performance releases.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['Poster Design', 'Album Covers', 'Motion Posters', 'Studio Branding', 'Social Creatives'].map((service, index) => (
                    <span key={index} className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/5 px-3 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="border-b border-white/10 pb-12 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-kanit text-xl font-bold uppercase text-white">02 / PRODUCTION SERVICES</span>
                  <Camera size={18} className="text-warm-orange" />
                </div>
                <p className="text-xs text-soft-cream-dim leading-relaxed mb-6 font-light max-w-lg">
                  Behind-the-scenes, celebrity, and promotional shoot management backed by professional cameras and custom studio setups.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {['Celebrity Shoots', 'Artist Shoots', 'Promotional Shoots', 'BTS Coverage', 'Cinematic Direction'].map((service, index) => (
                    <span key={index} className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/5 px-3 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Portfolio Grid */}
      <section className="py-32 bg-transparent relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white leading-tight">
              CAMPAIGN ARCHIVE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allDesigns.map((design, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl cursor-pointer"
              >
                <img 
                  src={design.src} 
                  alt={design.title} 
                  width={design.w}
                  height={design.h}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-1 block">
                    {design.category}
                  </span>
                  <h3 className="font-kanit text-lg font-black text-white uppercase tracking-wider mb-1 leading-tight">
                    {design.title}
                  </h3>
                  <span className="font-sans text-[9px] text-white/40 uppercase tracking-widest">
                    Released: {design.year}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white/40 bg-black/40 backdrop-blur-md uppercase">
                  RAW_ASSET
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After reveal */}
      <section className="py-32 bg-transparent relative border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              THE TRANSFORMATION
            </span>
            <h2 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-4">
              FROM RAW MOMENT TO <br />
              ICONIC VISUAL
            </h2>
            <p className="font-sans text-soft-cream-dim text-xs md:text-sm leading-relaxed font-light">
              Interactive transformation reveal. Drag the divider to see how raw photography and studio edits evolve into high-impact Punjabi music visuals.
            </p>
          </div>

          <TabbedBeforeAfterSlider />
        </div>
      </section>

      {/* Timeline process */}
      <section id="process" className="py-32 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-28">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              OUR PIPELINE
            </span>
            <h2 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-4">
              THE ROAD TO THE RELEASE
            </h2>
          </div>

          <div className="relative border-l border-white/10 pl-6 md:pl-12 max-w-4xl mx-auto">
            {[
              { num: "01. IDEA DEVELOPMENT", desc: "Listening to the song scratch, dissecting the lyrics, and drafting creative visual concepts that represent the emotional core of the release." },
              { num: "02. PRODUCTION SHOOT", desc: "Setting up reference lighting, custom cameras, and directing celebrity photoshoot moments to capture raw assets." },
              { num: "03. DIGITAL EDITING", desc: "Color matching, background manipulations, and aligning details in our studio workflow environment to establish solid baseline visual designs." },
              { num: "04. POSTER DESIGN", desc: "Integrating cinematic typography, movie title cards, sponsor credits, and visual hierarchy elements into a premium composition." },
              { num: "05. CINEMATIC FINISH", desc: "Applying film grain, lighting leaks, texture layers, and studio color grading to output the final iconic master file." },
              { num: "06. GLOBAL RELEASE", desc: "Publishing assets to platforms, Spotify banners, billboards, and artist socials, making cultural impact in the Punjabi music market." }
            ].map((step, idx) => (
              <div key={idx} className="relative mb-16 last:mb-0">
                <span className={`absolute left-[-31px] md:left-[-55px] top-1.5 w-4 h-4 rounded-full bg-warm-orange border-4 border-black ${idx === 0 ? 'animate-pulse' : ''}`} />
                <h3 className="font-kanit text-lg md:text-xl font-bold uppercase text-white mb-2">{step.num}</h3>
                <p className="font-sans text-xs md:text-sm text-soft-cream-dim leading-relaxed font-light max-w-xl">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
