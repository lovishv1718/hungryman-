import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import PageHero from '../components/PageHero';

const getOpacityRange = (index: number, length: number, fadeTime = 0.04) => {
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

interface StudioChapter {
  src: string;
  chapter: string;
  title: string;
  desc: string;
  w: number;
  h: number;
}

const studioChapters: StudioChapter[] = [
  { src: '/image 2.webp', chapter: '01', title: 'The Collaboration', desc: 'Backstage discussions aligning creative direction directly with artists to translate sonic notes into visual definitions.', w: 490, h: 731 },
  { src: '/image 4.webp', chapter: '02', title: 'The Capture', desc: 'Outdoors production moments capturing raw photography, atmospheric lighting elements, and BTS frames.', w: 1301, h: 1209 },
  { src: '/image 5.webp', chapter: '03', title: 'The Digital Work', desc: 'Manipulation and layout composition at the digital workstation, mapping out graphic variables.', w: 1177, h: 1337 },
  { src: '/image 1.webp', chapter: '04', title: 'The Edit Closeup', desc: 'Precision color grading and detailed visual balancing to craft high-impact textures and gradients.', w: 490, h: 744 },
  { src: '/image 3.webp', chapter: '05', title: 'The Review Room', desc: 'Team review environments comparing compositions on reference monitors to certify output impact.', w: 488, h: 730 },
];

function StudioChaptersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        studioChapters.length - 1,
        Math.floor(latest * studioChapters.length)
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-transparent">
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center px-6 md:px-12 relative z-10">
          
          {/* Big Visual Left (Fades inside the loop) */}
          <div className="md:col-span-8 flex justify-center relative w-full h-[50vh] md:h-[70vh]">
            {studioChapters.map((chapter, index) => {
              const opacityRange = getOpacityRange(index, studioChapters.length, 0.04);
              const opacity = useTransform(
                scrollYProgress, 
                opacityRange.input, 
                opacityRange.output
              );
              
              return (
                <motion.div 
                  key={index}
                  style={{ opacity }}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center bg-transparent pointer-events-none ${
                    activeIndex === index ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] h-[50vh] md:h-[70vh] overflow-hidden rounded-xl border border-white/5 shadow-2xl bg-black flex items-center justify-center">
                    <motion.img 
                      src={chapter.src} 
                      alt={chapter.title} 
                      width={chapter.w}
                      height={chapter.h}
                      loading="lazy"
                      className="w-full h-full object-contain filter brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Text Content Right (Animated via AnimatePresence keying on activeIndex) */}
          <div className="md:col-span-4 relative w-full flex flex-col justify-center min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col items-start text-left w-full"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-warm-orange font-semibold mb-2">
                  CHAPTER {studioChapters[activeIndex].chapter} / 05
                </span>
                
                <h3 className="font-kanit text-3xl md:text-5xl font-black uppercase text-white mb-6 leading-tight tracking-tight">
                  {studioChapters[activeIndex].title}
                </h3>
                
                <p className="font-sans text-sm md:text-base text-soft-cream-dim leading-relaxed font-light">
                  {studioChapters[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Subtle camera viewfinders */}
        <div className="absolute bottom-8 left-8 z-30 pointer-events-none hidden md:block">
          <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">REC MODE // ISO 1200 // WB 4300K</span>
        </div>
        <div className="absolute bottom-8 right-8 z-30 pointer-events-none hidden md:block">
          <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">HUNGRYMAN DESIGNS VISUAL LAB</span>
        </div>

      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="HUNGRYMAN PRODUCTIONS." 
        subtitle="THE CREATIVE LAB" 
        description="A Punjab-based creative powerhouse. We believe visuals and conversations have the power to define cultural longevity."
      />

      {/* Mission & Philosophy */}
      <section className="py-32 bg-transparent relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-6 block">
            MISSION & PHILOSOPHY
          </span>
          <p className="font-serif italic text-3xl md:text-5xl text-white/95 leading-snug mb-8">
            "We don't build temporary assets. We construct cultural monuments that define generations of artists."
          </p>
          <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Located in Mohali, Punjab, Hungry Productions operates at the intersection of authentic photography, advanced digital workflow design, and editorial storytelling. We bring Punjabi stardom to global billboards with raw, uncompromising vision.
          </p>
        </div>
      </section>

      {/* Ecosystem Detail */}
      <section className="py-32 bg-black/20 backdrop-blur-sm relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <a 
              href="https://www.instagram.com/hungrymandesigns" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/5 flex flex-col justify-between h-full hover:border-white/10 transition-all duration-300 group cursor-pointer no-underline"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-serif italic text-5xl text-white/10 block leading-none">01</span>
                  <div className="flex-shrink-0 p-2 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-lg group-hover:border-white/20 transition-all duration-300">
                    <img 
                      src="/logo_designs.webp" 
                      alt="Hungryman Designs Logo" 
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-warm-orange transition-colors duration-300">
                  HUNGRYMAN DESIGNS
                </h3>
                <p className="font-sans text-sm text-soft-cream-dim leading-relaxed font-light">
                  Our graphics lab focused entirely on official music posters, album covers, and artist visual identity. We work directly with artists to translate sonic notes into static artwork optimized for print and streaming platforms.
                </p>
              </div>
            </a>
            
            <a 
              href="https://www.youtube.com/@hunggrytalks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/5 flex flex-col justify-between h-full hover:border-white/10 transition-all duration-300 group cursor-pointer no-underline"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-serif italic text-5xl text-white/10 block leading-none">02</span>
                  <div className="flex-shrink-0 p-2 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-lg group-hover:border-white/20 transition-all duration-300">
                    <img 
                      src="/logo_talks.webp" 
                      alt="Hungry Talks Logo" 
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-warm-orange transition-colors duration-300">
                  HUNGRY TALKS
                </h3>
                <p className="font-sans text-sm text-soft-cream-dim leading-relaxed font-light">
                  Our audio-visual podcast studio hosting in-depth conversations with directors, singers, songwriters, and label executives. We preserve the stories, values, and blueprints that are building Punjabi culture today.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Inside the Studio sticky scroll chapters */}
      <section id="studio" className="bg-transparent relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block text-left">
            REAL ATMOSPHERE
          </span>
          <h2 className="font-kanit text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-none tracking-tight text-left">
            WHERE VISUALS EVOLVE <br />
            INTO CULTURAL MOMENTS
          </h2>
        </div>

        <StudioChaptersSection />
      </section>

      {/* Future Vision */}
      <section className="py-32 bg-transparent relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
            FUTURE VISION
          </span>
          <h2 className="font-kanit text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-none tracking-tight">
            THE NEXT MOVEMENT
          </h2>
          <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mb-10">
            As the Punjabi music ecosystem expands worldwide, our studio is expanding the frontiers of creative direction, typography, and narrative capture. The future is built here.
          </p>
          <div className="font-mono text-xs text-white/40 uppercase tracking-[0.25em]">
            HUNGRYMAN PRODUCTIONS // EST. 2023 // MOHALI, PUNJAB
          </div>
        </div>
      </section>
    </>
  );
}
