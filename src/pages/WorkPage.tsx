import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HlsVideoBackground from '../components/HlsVideoBackground';
import PageHero from '../components/PageHero';
import { TabbedBeforeAfterSlider } from '../components/BeforeAfterSlider';
import CountingStat from '../components/CountingStat';

const getOpacityRange = (index: number, length: number, fadeTime = 0.05) => {
  const start = index / length;
  const end = (index + 1) / length;

  if (index === 0) {
    return {
      input: [0, end - fadeTime, end],
      output: [1, 1, 0]
    };
  } else if (index === length - 1) {
    return {
      input: [start, start + fadeTime, 1.0],
      output: [0, 1, 1]
    };
  } else {
    return {
      input: [start, start + fadeTime, end - fadeTime, end],
      output: [0, 1, 1, 0]
    };
  }
};

interface FeaturedPoster {
  src: string;
  title: string;
  category: string;
  artist: string;
  year: string;
  video?: string;
  w: number;
  h: number;
}

const featuredPosters: FeaturedPoster[] = [
  { src: '/poster 1.webp', title: 'Diljit Dosanjh — Born to Shine', category: 'Official Tour Visuals', artist: 'DILJIT DOSANJH', year: '2024', w: 872, h: 863 },
  { src: '/poster 3.webp', title: 'Karan Aujla — Making Memories', category: 'Album Cover & Visual Identity', artist: 'KARAN AUJLA', year: '2023', w: 682, h: 824 },
  { src: '/poster 5.webp', title: 'Amrit Maan — Babiha', category: 'Cinematic Campaign Poster', artist: 'AMRIT MAAN', year: '2023', w: 866, h: 868 },
  { src: '/poster 7.webp', title: 'Prabh Gill — Editorial Art', category: 'Single Artwork', artist: 'PRABH GILL', year: '2024', w: 700, h: 868 },
];

function FeaturedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        featuredPosters.length - 1,
        Math.floor(latest * featuredPosters.length)
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 md:px-12 relative z-10">
          
          {/* Visual Left (Fades inside the loop) */}
          <div className="md:col-span-7 flex justify-center relative w-full h-[60vh] md:h-[80vh]">
            {featuredPosters.map((poster, index) => {
              const start = index / featuredPosters.length;
              const end = (index + 1) / featuredPosters.length;
              
              const opacityRange = getOpacityRange(index, featuredPosters.length, 0.05);
              const opacity = useTransform(
                scrollYProgress, 
                opacityRange.input, 
                opacityRange.output
              );
              
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1.0, 1.08]
              );

              return (
                <motion.div 
                  key={index}
                  style={{ opacity }}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center bg-transparent pointer-events-none ${
                    activeIndex === index ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <div className="relative w-full max-w-[450px] md:max-w-none aspect-[3/4] h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    {poster.video ? (
                      <HlsVideoBackground 
                        src={poster.video}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.img 
                        style={{ scale }}
                        src={poster.src} 
                        alt={poster.title} 
                        width={poster.w}
                        height={poster.h}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    
                    <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                      CAM_0{index + 1} // RAW_ASSET
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Text Metadata Right (Animated via AnimatePresence using activeIndex) */}
          <div className="md:col-span-5 relative w-full flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col items-start text-left w-full"
              >
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-bold mb-4 block">
                  {featuredPosters[activeIndex].category}
                </span>
                
                <span className="font-serif italic text-4xl text-white/40 block mb-2 font-normal">
                  0{activeIndex + 1} / 04
                </span>
                
                <h3 className="font-kanit text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-tight tracking-tight">
                  {featuredPosters[activeIndex].artist}
                </h3>
                
                <p className="font-sans text-sm md:text-base text-soft-cream-dim leading-relaxed font-light mb-8 max-w-sm">
                  A cinematic campaign visual designed for maximum cultural impact, blending authentic Punjabi visual aesthetics with modern design workflows.
                </p>
                
                <div className="flex items-center gap-6 border-t border-white/10 pt-6 w-full text-xs font-mono tracking-widest text-white/60">
                  <div>
                    <span className="text-[10px] text-white/35 block uppercase mb-1">Year</span>
                    {featuredPosters[activeIndex].year}
                  </div>
                  <div>
                    <span className="text-[10px] text-white/35 block uppercase mb-1">Studio</span>
                    HUNGRYMAN B-A
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="absolute top-8 left-8 z-30 pointer-events-none hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">LIVE RECORD</span>
        </div>
        <div className="absolute top-8 right-8 z-30 pointer-events-none hidden md:block">
          <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">TC 00:28:43:02</span>
        </div>
        
      </div>
    </div>
  );
}

interface HallOfFameItem {
  artist: string;
  project: string;
  type: string;
  year: string;
  img: string;
  badge: string;
  w: number;
  h: number;
}

const hallOfFameItems: HallOfFameItem[] = [
  { artist: 'Diljit Dosanjh', project: 'Born to Shine Tour', type: 'Poster Project', year: '2024', img: '/poster 1.webp', badge: 'CAMPAIGN', w: 872, h: 863 },
  { artist: 'Jass Manak', project: 'Exclusive Album Interview', type: 'Podcast Guest', year: '2024', img: '/guest_jass_manak.webp', badge: 'INTERVIEW', w: 1024, h: 1024 },
  { artist: 'Karan Aujla', project: 'Making Memories Album Cover', type: 'Creative Collaboration', year: '2023', img: '/poster 3.webp', badge: 'COVER_ART', w: 682, h: 824 },
  { artist: 'Roop Sharma', project: 'Cinematic Visuals & Grading', type: 'Podcast Guest', year: '2023', img: '/guest_roop_sharma.webp', badge: 'PRODUCTION', w: 1024, h: 1024 },
  { artist: 'Amrit Maan', project: 'Babiha Single Campaign', type: 'Poster Project', year: '2023', img: '/poster 5.webp', badge: 'CAMPAIGN', w: 866, h: 868 },
  { artist: 'Gurinder Gill', project: 'Billboard Charts Stardom Special', type: 'Podcast Guest', year: '2024', img: '/guest_gurinder_gill.webp', badge: 'INTERVIEW', w: 1024, h: 1024 }
];

export default function WorkPage() {
  return (
    <>
      <PageHero 
        title="DESIGNED FOR IMPACT." 
        subtitle="FEATURED CAMPAIGNS" 
        description="We craft the visual languages that define Punjabi stardom. From official world tour visuals to record-breaking album compositions."
      />
      
      {/* Featured Work (Sticky scroll container) */}
      <FeaturedWorkSection />

      {/* Before/After reveal */}
      <section className="py-32 bg-transparent relative border-t border-white/5">
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

      {/* Client Results & Outcomes */}
      <section id="credibility" className="relative py-28 flex flex-col justify-center items-center bg-black/20 border-t border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-orange/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-between items-center text-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 w-full mb-20">
            {[
              { targetValue: 200, label: 'POSTERS CREATED', suffix: '+' },
              { targetValue: 24, label: 'SUBSCRIBERS', suffix: 'K+' },
              { targetValue: 1300, label: 'VIDEOS PUBLISHED', suffix: '+' },
              { targetValue: 100, label: 'ARTISTS WORKED WITH', suffix: '+' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.15 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="font-kanit text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none select-none">
                  <CountingStat value={stat.targetValue} suffix={stat.suffix} />
                </span>
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-[#8E8E93] font-bold mt-4 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="max-w-xl border-t border-white/5 pt-10"
          >
            <p className="font-sans text-sm md:text-base leading-relaxed text-soft-cream-dim font-light tracking-wide">
              Trusted by artists, creators and storytellers across Punjab.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Connections section */}
      <section id="connections" className="py-32 bg-transparent border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
                CREDIBILITY
              </span>
              <h2 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-6">
                TRUSTED BY THE <br />
                PUNJABI MUSIC ELITE
              </h2>
              <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light mb-8">
                From underground visual concepts to mainstream billboard blockbusters. We collaborate directly with artists, directors, and label management to craft high-impact branding.
              </p>
              
              <div className="flex flex-col gap-4">
                {[
                  'Direct artist branding & consultations',
                  'High-res master files optimized for printing & streaming platforms',
                  'Consistent art direction matching video styling & themes'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded-full bg-warm-orange/10 text-warm-orange mt-0.5">
                      <ChevronRight size={14} />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-soft-cream/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-2xl overflow-hidden liquid-glass p-2.5 shadow-2xl">
                <img 
                  src="/image 4.webp" 
                  width={1301}
                  height={1209}
                  loading="lazy"
                  alt="BTS Studio setup" 
                  className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute bottom-6 left-6 z-20 px-3 py-1.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-white/90">
                  CAMERA SET_B // ON LOCATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Collaboration (Hall of Fame) */}
      <section id="trust" className="py-32 bg-transparent relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col mb-24 max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block text-left">
              PARTNERSHIPS
            </span>
            <h2 className="font-kanit text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none text-left">
              BUILT WITH<br />ARTISTS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {hallOfFameItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl cursor-pointer"
              >
                <img 
                  src={item.img} 
                  alt={item.artist} 
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-105 group-hover:brightness-95 transition-all duration-[1000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.type}
                  </span>
                  <h4 className="font-kanit text-xl font-black text-white uppercase tracking-wider mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {item.artist}
                  </h4>
                  <p className="font-sans text-[10px] text-white/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {item.project} // {item.year}
                  </p>
                </div>
                
                <div className="absolute top-4 right-4 z-20 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white/40 bg-black/40 backdrop-blur-md uppercase">
                  {item.badge}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full text-center max-w-4xl mx-auto border-t border-white/5 pt-20"
          >
            <blockquote className="font-serif italic text-4xl md:text-6xl text-white/95 leading-tight mb-8">
              "Hungry Productions helped bring our vision to life."
            </blockquote>
            <cite className="font-mono text-xs uppercase tracking-[0.2em] text-warm-orange font-bold not-italic">
              — JASS MANAK / ARTIST & COLLABORATOR
            </cite>
          </motion.div>
        </div>
      </section>
    </>
  );
}
