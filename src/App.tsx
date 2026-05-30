import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'framer-motion';
import gsap from 'gsap';
import Lenis from 'lenis';
import { 
  ArrowUpRight, 
  Camera, 
  Layers,
  ChevronRight,
  Monitor,
  Menu,
  X
} from 'lucide-react';
import HlsVideoBackground from './components/HlsVideoBackground';

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

// ==========================================
// 1. STICKY FEATURED WORK SUBCOMPONENT
// ==========================================
interface FeaturedPoster {
  src: string;
  title: string;
  category: string;
  artist: string;
  year: string;
  video?: string;
}

const featuredPosters: FeaturedPoster[] = [
  { src: '/poster 1.png', title: 'Diljit Dosanjh — Born to Shine', category: 'Official Tour Visuals', artist: 'DILJIT DOSANJH', year: '2024', video: '/hungryman_video.mp4' },
  { src: '/poster 3.png', title: 'Karan Aujla — Making Memories', category: 'Album Cover & Visual Identity', artist: 'KARAN AUJLA', year: '2023', video: 'https://test-streams.mux.dev/x36xhg/playlist.m3u8' },
  { src: '/poster 5.png', title: 'Amrit Maan — Babiha', category: 'Cinematic Campaign Poster', artist: 'AMRIT MAAN', year: '2023' },
  { src: '/poster 7.png', title: 'Prabh Gill — Editorial Art', category: 'Single Artwork', artist: 'PRABH GILL', year: '2024' },
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
              
              // Custom hooks for animations inside the sticky scroll frame
              // Slow opacity fade-in / fade-out
              const opacityRange = getOpacityRange(index, featuredPosters.length, 0.05);
              const opacity = useTransform(
                scrollYProgress, 
                opacityRange.input, 
                opacityRange.output
              );
              
              // Slow scale zoom from 1.0 to 1.08
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
                    {/* Slow scale zoom animation or video loop */}
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
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    
                    {/* Technical details badge */}
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

        {/* Cinematic Camera Frame Markers on Sticky Container */}
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

// ==========================================
// 2. STICKY BTS STUDIO CHAPTERS SUBCOMPONENT
// ==========================================
interface StudioChapter {
  src: string;
  chapter: string;
  title: string;
  desc: string;
}

const studioChapters: StudioChapter[] = [
  { src: '/image 2.png', chapter: '01', title: 'The Collaboration', desc: 'Backstage discussions aligning creative direction directly with artists to translate sonic notes into visual definitions.' },
  { src: '/image 4.png', chapter: '02', title: 'The Capture', desc: 'Outdoors production moments capturing raw photography, atmospheric lighting elements, and BTS frames.' },
  { src: '/image 5.png', chapter: '03', title: 'The Digital Work', desc: 'Manipulation and layout composition at the digital workstation, mapping out graphic variables.' },
  { src: '/image 1.png', chapter: '04', title: 'The Edit Closeup', desc: 'Precision color grading and detailed visual balancing to craft high-impact textures and gradients.' },
  { src: '/image 3.png', chapter: '05', title: 'The Review Room', desc: 'Team review environments comparing compositions on reference monitors to certify output impact.' },
];

interface HallOfFameItem {
  artist: string;
  project: string;
  type: string;
  year: string;
  img: string;
  badge: string;
}

const hallOfFameItems: HallOfFameItem[] = [
  { artist: 'Diljit Dosanjh', project: 'Born to Shine Tour', type: 'Poster Project', year: '2024', img: '/poster 1.png', badge: 'CAMPAIGN' },
  { artist: 'Jass Manak', project: 'Exclusive Album Interview', type: 'Podcast Guest', year: '2024', img: '/guest_jass_manak.png', badge: 'INTERVIEW' },
  { artist: 'Karan Aujla', project: 'Making Memories Album Cover', type: 'Creative Collaboration', year: '2023', img: '/poster 3.png', badge: 'COVER_ART' },
  { artist: 'Roop Sharma', project: 'Cinematic Visuals & Grading', type: 'Podcast Guest', year: '2023', img: '/guest_roop_sharma.png', badge: 'PRODUCTION' },
  { artist: 'Amrit Maan', project: 'Babiha Single Campaign', type: 'Poster Project', year: '2023', img: '/poster 5.png', badge: 'CAMPAIGN' },
  { artist: 'Gurinder Gill', project: 'Billboard Charts Stardom Special', type: 'Podcast Guest', year: '2024', img: '/guest_gurinder_gill.png', badge: 'INTERVIEW' }
];

interface AccordionColumnItem {
  num: string;
  title: string;
  subtitle: string;
  bg: string;
  bottomContent?: React.ReactNode;
}

const accordionColumns: AccordionColumnItem[] = [
  { 
    num: "01", 
    title: "DESIGNS", 
    subtitle: "POSTER DESIGN", 
    bg: "/assets/col_designs.png",
    bottomContent: (
      <p className="column-bottom-text">
        <strong>LEGEND</strong>
        JOURNEY CONTINUES
      </p>
    )
  },
  { 
    num: "02", 
    title: "TALKS", 
    subtitle: "PODCASTS", 
    bg: "/assets/col_talks.png" 
  },
  { 
    num: "03", 
    title: "EDITING", 
    subtitle: "STORYTELLING", 
    bg: "/assets/col_editing.png" 
  },
  { 
    num: "04", 
    title: "PRODUCTION", 
    subtitle: "CINEMATIC VISUALS", 
    bg: "/assets/col_production.png" 
  },
  { 
    num: "05", 
    title: "ARTISTS", 
    subtitle: "CULTURE", 
    bg: "/assets/col_artists.png",
    bottomContent: (
      <blockquote className="column-bottom-quote">
        Real Stories.<br />
        Real People.<br />
        Real Impact.
      </blockquote>
    )
  }
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
              const start = index / studioChapters.length;
              const end = (index + 1) / studioChapters.length;

              // Animations
              const opacityRange = getOpacityRange(index, studioChapters.length, 0.04);
              const opacity = useTransform(
                scrollYProgress, 
                opacityRange.input, 
                opacityRange.output
              );
              
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1.0, 1.06]
              );

              return (
                <motion.div 
                  key={index}
                  style={{ opacity }}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center bg-transparent pointer-events-none ${
                    activeIndex === index ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] h-[50vh] md:h-[70vh] overflow-hidden rounded-xl border border-white/5 shadow-2xl bg-black">
                    <motion.img 
                      style={{ scale }}
                      src={chapter.src} 
                      alt={chapter.title} 
                      className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

// ==========================================
// AUDIO WAVEFORM COMPONENT
// ==========================================
function AudioWaveform({ active }: { active: boolean }) {
  const barCount = 40;
  return (
    <div className="flex items-end justify-center gap-[3px] h-16 w-full max-w-[320px] mx-auto px-4 relative">
      {[...Array(barCount)].map((_, i) => {
        const baseHeight = 15 + Math.random() * 40;
        return (
          <motion.div
            key={i}
            animate={
              active
                ? {
                    height: [
                      `${baseHeight * 0.3}px`,
                      `${baseHeight * 1.1}px`,
                      `${baseHeight * 0.5}px`,
                      `${baseHeight * 1.3}px`,
                      `${baseHeight * 0.3}px`,
                    ],
                  }
                : {
                    height: "4px",
                  }
            }
            transition={{
              duration: 1.2 + Math.random() * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.02,
            }}
            className="w-[3px] bg-gradient-to-t from-warm-orange to-warm-orange-muted rounded-full shadow-[0_0_8px_rgba(255,92,31,0.3)] opacity-85"
            style={{
              height: active ? undefined : "4px",
            }}
          />
        );
      })}
    </div>
  );
}

// ==========================================
// SCROLL COUNTING STAT COMPONENT
// ==========================================
function CountingStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// ==========================================
// REUSABLE COMPONENTS & HELPERS
// ==========================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function BeforeAfterSlider({ 
  beforeSrc, 
  afterSrc, 
  beforeLabel = "Raw Studio Capture", 
  afterLabel = "Final Graded Poster" 
}: BeforeAfterSliderProps) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderProgress = useRef(50);
  const isDragging = useRef(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    gsap.to(sliderProgress, {
      current: percentage,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setSliderPos(sliderProgress.current);
      }
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div 
      ref={sliderContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-ew-resize select-none"
    >
      {/* BEFORE LAYER (Raw Photography) */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
        <img 
          src={beforeSrc} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-6 left-6 z-20 px-3 py-1.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-white/90 uppercase">
          {beforeLabel}
        </div>
      </div>

      {/* AFTER LAYER (Final Graded Poster Artwork) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img 
          src={afterSrc} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ width: sliderContainerRef.current?.getBoundingClientRect().width || '100%', maxWidth: 'none' }}
        />
        <div className="absolute bottom-6 right-6 z-20 px-3 py-1.5 rounded bg-warm-orange/80 backdrop-blur-md border border-warm-orange/20 text-[9px] font-mono tracking-widest text-white uppercase">
          {afterLabel}
        </div>
      </div>

      {/* SLIDER DIVISION BAR */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-warm-orange/60 pointer-events-none z-30 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <div className="w-10 h-10 rounded-full bg-black border border-warm-orange text-white flex items-center justify-center shadow-2xl">
          <Monitor size={13} className="text-warm-orange" />
        </div>
      </div>
    </div>
  );
}

function TabbedBeforeAfterSlider() {
  const transformationProjects = [
    { id: 'diljit', label: 'DILJIT TOUR POSTER', before: '/image 1.png', after: '/poster 1.png', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster' },
    { id: 'aujla', label: 'KARAN AUJLA ALBUM', before: '/image 3.png', after: '/poster 3.png', beforeLabel: 'Concept Composite', afterLabel: 'Album Cover Art' },
    { id: 'studio', label: 'STUDIO COLOR GRADING', before: '/image 4.png', after: '/image 5.png', beforeLabel: 'Log Profile Camera Raw', afterLabel: 'Final Graded Visual Lab' }
  ];
  const [activeTab, setActiveTab] = useState('diljit');
  const currentProj = transformationProjects.find(p => p.id === activeTab) || transformationProjects[0];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-wrap gap-2 justify-center mb-8 border border-white/10 rounded-full p-1 bg-black/40 backdrop-blur-md">
        {transformationProjects.map(proj => (
          <button
            key={proj.id}
            onClick={() => setActiveTab(proj.id)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === proj.id 
                ? 'bg-warm-orange text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {proj.label}
          </button>
        ))}
      </div>
      <BeforeAfterSlider 
        key={activeTab} 
        beforeSrc={currentProj.before} 
        afterSrc={currentProj.after} 
        beforeLabel={currentProj.beforeLabel} 
        afterLabel={currentProj.afterLabel} 
      />
    </div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  bgImage?: string;
}

function PageHero({ title, subtitle, description, bgImage }: PageHeroProps) {
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

function FeaturedWorkPreview() {
  const previewPosters = [
    { src: '/poster 1.png', artist: 'DILJIT DOSANJH', category: 'Official Tour Visuals', year: '2024' },
    { src: '/poster 3.png', artist: 'KARAN AUJLA', category: 'Album Cover & Visual Identity', year: '2023' },
    { src: '/poster 5.png', artist: 'AMRIT MAAN', category: 'Cinematic Campaign Poster', year: '2023' }
  ];

  return (
    <section className="py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              WORK PREVIEW
            </span>
            <h2 className="font-kanit text-4xl md:text-6xl font-black uppercase text-white leading-none tracking-tight">
              FEATURED CAMPAIGNS
            </h2>
          </div>
          <Link 
            to="/work" 
            className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white font-bold hover:text-warm-orange transition-colors duration-300 group/btn"
          >
            <span>View Full Portfolio</span>
            <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPosters.map((poster, index) => (
            <Link 
              to="/work" 
              key={index} 
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl cursor-pointer"
            >
              <img 
                src={poster.src} 
                alt={poster.artist} 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">
                  {poster.category}
                </span>
                <h3 className="font-kanit text-2xl font-black text-white uppercase tracking-wider mb-2 leading-none">
                  {poster.artist}
                </h3>
                <span className="font-sans text-[10px] text-white/50 uppercase tracking-widest">
                  Year: {poster.year}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20 border border-white/10 px-2.5 py-1 rounded text-[8px] font-mono tracking-widest text-white/40 bg-black/40 backdrop-blur-md uppercase">
                CAMPAIGN
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTalksPreview() {
  return (
    <section className="py-32 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              <img 
                src="/guest_jass_manak.png" 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                alt="Jass Manak Spotlight" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">
                  SPOTLIGHT INTERVIEW
                </span>
                <h4 className="font-kanit text-2xl font-black text-white uppercase tracking-wider leading-none">
                  JASS MANAK
                </h4>
              </div>
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-white/90 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                TALKS // FEATURED
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              TALKS PREVIEW
            </span>
            <h3 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight leading-tight">
              CONVERSATIONS THAT <br />SHAPE CULTURE
            </h3>
            <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light mb-8 max-w-xl">
              Step inside the studio. Listen to deep-dive conversations with artists, directors, and cultural innovators who are shifting the landscape of Punjabi music worldwide.
            </p>
            <div className="flex items-center gap-8 border-l border-white/10 pl-6 mb-8">
              <div>
                <span className="font-kanit text-3xl font-black text-white leading-none">24K+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mt-1">Subscribers</span>
              </div>
              <div>
                <span className="font-kanit text-3xl font-black text-white leading-none">1300+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mt-1">Episodes</span>
              </div>
            </div>
            <Link 
              to="/talks" 
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white font-bold hover:text-warm-orange transition-colors duration-300 group/btn"
            >
              <span>Explore All Episodes</span>
              <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// PAGE COMPONENTS
// ==========================================

function HomePage() {
  const handleColumnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const col = e.currentTarget;
    const bg = col.querySelector('.column-bg') as HTMLDivElement;
    if (!bg) return;
    const rect = col.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) - 0.5;
    const relY = ((e.clientY - rect.top) / rect.height) - 0.5;
    const moveX = relX * 25;
    const moveY = relY * 25;
    bg.style.setProperty('--move-x', `${moveX}px`);
    bg.style.setProperty('--move-y', `${moveY}px`);
    bg.style.setProperty('--bg-scale', `1.12`);
    bg.style.setProperty('--bg-transition', `0.1s ease-out`);
  };

  const handleColumnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const col = e.currentTarget;
    const bg = col.querySelector('.column-bg') as HTMLDivElement;
    if (!bg) return;
    bg.style.setProperty('--move-x', `0px`);
    bg.style.setProperty('--move-y', `0px`);
    bg.style.setProperty('--bg-scale', `1.0`);
    bg.style.setProperty('--bg-transition', `0.8s cubic-bezier(0.25, 1, 0.3, 1)`);
  };

  const handleColumnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const col = e.currentTarget;
    const bg = col.querySelector('.column-bg') as HTMLDivElement;
    if (!bg) return;
    bg.style.setProperty('--bg-scale', `1.12`);
    bg.style.setProperty('--bg-transition', `0.8s cubic-bezier(0.25, 1, 0.3, 1)`);
  };

  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section id="hero" className="relative w-full h-screen overflow-hidden flex items-stretch bg-transparent">
        <div className="vignette-overlay" />
        <div className="accordion-stage">
          {accordionColumns.map((col, index) => (
            <div 
              key={index} 
              className="accordion-column cursor-hover"
              onMouseMove={handleColumnMouseMove}
              onMouseLeave={handleColumnMouseLeave}
              onMouseEnter={handleColumnMouseEnter}
              onClick={() => {
                if (index === 0) navigate('/work');
                else if (index === 1) navigate('/talks');
                else if (index === 4) navigate('/about');
                else navigate('/designs');
              }}
            >
              <div className="column-bg-wrapper">
                <div className="column-bg" style={{ backgroundImage: `url('${col.bg}')` }} />
                <div className="column-bg-overlay" />
              </div>
              
              <div className="column-content-top">
                <span className="column-num">{col.num}</span>
                <h2 className="column-title">{col.title}</h2>
                <span className="column-subtitle">{col.subtitle}</span>
                <div className="column-line" />
              </div>
              
              {col.bottomContent && (
                <div className="column-content-bottom">
                  {col.bottomContent}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="centerpiece">
          <div className="title-container">
            <h1 className="title-we-create">WE CREATE</h1>
            <div className="title-culture">CULTURE</div>
          </div>
          <div className="centerpiece-subtext">
            <span>POSTERS.</span>
            <span className="subtext-dot">•</span>
            <span>PODCASTS.</span>
            <span className="subtext-dot">•</span>
            <span>PRODUCTION.</span>
          </div>
          
          <Link 
            to="/work"
            className="enter-btn cursor-hover"
            id="enter-studio"
          >
            <span className="enter-btn-small">ENTER</span>
            <span className="enter-btn-bold">THE STUDIO</span>
            <span className="enter-btn-arrow">&#x2192;</span>
          </Link>

          <div className="scroll-indicator">
            <span className="scroll-text">SCROLL TO EXPLORE</span>
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section id="ecosystem" className="relative py-32 flex flex-col justify-between bg-transparent overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-warm-orange/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl mx-auto mb-36"
          >
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              OUR ECOSYSTEM
            </span>
            <h2 className="font-kanit text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white mb-6 leading-[0.9] tracking-tighter">
              TWO WORLDS.<br />ONE VISION.
            </h2>
            <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mt-6">
              Hungry Productions combines visual storytelling and meaningful conversations to build culture that lasts.
            </p>
          </motion.div>

          {/* Division 1: HUNGRYMAN DESIGNS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-44">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex justify-center w-full"
            >
              <div className="relative w-full aspect-[4/5] max-w-xl p-6 md:p-8 bg-zinc-950/20 rounded-3xl border border-white/5 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-warm-orange/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative w-full h-full grid grid-cols-12 grid-rows-12 gap-3 md:gap-4">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-7 row-span-8 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img src="/poster 2.png" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" alt="Album Cover Campaign" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-6 col-start-8 row-start-2 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img src="/poster 4.png" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" alt="Artist Visual Branding" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-5 col-start-2 row-start-9 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img src="/poster 6.png" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" alt="Cinematic Movie Poster" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-5 col-start-8 row-start-8 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img src="/poster 8.png" className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" alt="Motion Graphics Poster" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-start"
            >
              <span className="font-serif italic text-6xl md:text-8xl text-white/5 leading-none mb-4 select-none">01</span>
              <h3 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tight leading-none">
                HUNGRYMAN <span className="text-warm-orange">DESIGNS</span>
              </h3>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#8E8E93] font-semibold mb-8">
                Visuals that build artists.
              </p>
              
              <ul className="flex flex-col gap-4 mb-10 w-full border-l border-white/5 pl-6">
                {['Poster Design', 'Album Covers', 'Artist Branding', 'Motion Graphics'].map((service, idx) => (
                  <li key={idx} className="flex items-center gap-4 group/item cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/designs"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white font-bold hover:text-warm-orange transition-colors duration-300 group/btn"
              >
                <span>Explore Designs</span>
                <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Division 2: HUNGRY TALKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:order-1 order-2 flex flex-col items-start"
            >
              <span className="font-serif italic text-6xl md:text-8xl text-white/5 leading-none mb-4 select-none">02</span>
              <h3 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tight leading-none">
                HUNGRY <span className="text-warm-orange">TALKS</span>
              </h3>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#8E8E93] font-semibold mb-8">
                Conversations that inspire.
              </p>
              
              <ul className="flex flex-col gap-4 mb-10 w-full border-l border-white/5 pl-6">
                {['Podcasts', 'Interviews', 'Industry Talks', 'Storytelling'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 group/item cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/talks"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white font-bold hover:text-warm-orange transition-colors duration-300 group/btn"
              >
                <span>Watch Episodes</span>
                <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 lg:order-2 order-1 flex justify-center w-full"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group cursor-pointer">
                <img 
                  src="/hungry_talks_studio.png" 
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                  alt="Hungry Talks Podcast Studio" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-white/90 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  STUDIO_SET_B // LIVE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK PREVIEW */}
      <FeaturedWorkPreview />

      {/* FEATURED TALKS PREVIEW */}
      <FeaturedTalksPreview />
    </>
  );
}

function WorkPage() {
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
                <img src="/image 4.png" alt="BTS Studio setup" className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-700" />
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

function DesignsPage() {
  const allDesigns = [
    { src: '/poster 1.png', title: 'Diljit Dosanjh — Born to Shine', category: 'Official Tour Visuals', year: '2024' },
    { src: '/poster 2.png', title: 'Diljit Dosanjh — Live in UK', category: 'Concert Creative', year: '2024' },
    { src: '/poster 3.png', title: 'Karan Aujla — Making Memories', category: 'Album Cover Art', year: '2023' },
    { src: '/poster 4.png', title: 'Karan Aujla — Street Art Promo', category: 'Artist Branding', year: '2023' },
    { src: '/poster 5.png', title: 'Amrit Maan — Babiha Campaign', category: 'Cinematic Poster', year: '2023' },
    { src: '/poster 6.png', title: 'Amrit Maan — Babiha Alt Cover', category: 'Release Creative', year: '2023' },
    { src: '/poster 7.png', title: 'Prabh Gill — Editorial Art', category: 'Single Artwork', year: '2024' },
    { src: '/poster 8.png', title: 'Prabh Gill — Visual Identity', category: 'Motion Poster Graphic', year: '2024' }
  ];

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

function TalksPage() {
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && activeEpisode !== null) {
      const audioUrls = [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Episode 42 teaser
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Episode 41 teaser
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'  // Episode 40 teaser
      ];
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new window.Audio(audioUrls[activeEpisode]);
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch((err) => console.log("Playback error: ", err));
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, activeEpisode]);

  return (
    <>
      <section 
        className="relative pt-40 pb-24 overflow-hidden border-b border-white/5" 
        style={{ backgroundImage: "url('/studio_wood_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl text-left">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
                HUNGRY TALKS
              </span>
              <h1 className="font-kanit text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] tracking-tighter">
                CONVERSATIONS<br />THAT SHAPE CULTURE.
              </h1>
            </div>

            <div className="flex items-center gap-8 border-l border-white/10 pl-8 h-fit self-start md:self-end">
              <div>
                <span className="font-kanit text-4xl md:text-5xl font-black text-white leading-none">24K+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mt-1">Subscribers</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <span className="font-kanit text-4xl md:text-5xl font-black text-white leading-none">1300+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mt-1">Episodes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Grid */}
      <section className="py-24 bg-transparent relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20">
            {[
              {
                guest: 'Jass Manak',
                title: 'The New Wave of Punjabi Sound & Global Streaming Hits',
                duration: '42:15',
                img: '/guest_jass_manak.png',
                chapter: 'EPISODE 42'
              },
              {
                guest: 'Roop Sharma',
                title: 'Directors\' Vision: How Editing and Styling Crafts Culture',
                duration: '38:40',
                img: '/guest_roop_sharma.png',
                chapter: 'EPISODE 41'
              },
              {
                guest: 'Gurinder Gill',
                title: 'Bridging the Gap: Underground Punjabi Music to Billboard Stars',
                duration: '51:10',
                img: '/guest_gurinder_gill.png',
                chapter: 'EPISODE 40'
              }
            ].map((ep, idx) => {
              const isActive = activeEpisode === idx && isPlaying;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/40 hover:border-warm-orange/20 transition-all duration-500 p-4 relative"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 shadow-lg bg-black">
                      <img 
                        src={ep.img} 
                        alt={ep.guest} 
                        className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-102 transition-transform duration-[1200ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3 text-[8px] font-mono tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                        {ep.chapter}
                      </div>
                      <div className="absolute bottom-3 left-3 text-sm font-kanit font-black text-white uppercase tracking-wider">
                        {ep.guest}
                      </div>
                    </div>

                    <h3 className="font-kanit text-lg uppercase text-white/90 group-hover:text-white leading-snug transition-colors mb-3 line-clamp-2">
                      {ep.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                    <span className="font-mono text-[10px] text-white/40">{ep.duration} MINS // HQ AUDIO</span>
                    <button 
                      onClick={() => {
                        if (activeEpisode === idx) {
                          setIsPlaying(!isPlaying);
                        } else {
                          setActiveEpisode(idx);
                          setIsPlaying(true);
                        }
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isActive 
                          ? 'bg-warm-orange border-warm-orange text-white scale-105 shadow-[0_0_15px_rgba(255,92,31,0.4)]' 
                          : 'bg-transparent border-white/20 hover:border-warm-orange text-white hover:bg-warm-orange/10 hover:scale-105'
                      }`}
                    >
                      {isActive ? (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="w-full flex flex-col items-center justify-center pt-8 border-t border-white/5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mb-4">
              {isPlaying ? `NOW STREAMING: ${activeEpisode !== null ? ['EPISODE 42 - JASS MANAK', 'EPISODE 41 - ROOP SHARMA', 'EPISODE 40 - GURINDER GILL'][activeEpisode] : ''}` : 'SELECT EPISODE TO STREAM WAVEFORM'}
            </span>
            <AudioWaveform active={isPlaying} />
          </div>
        </div>
      </section>

      {/* Guest Showcase */}
      <section className="py-32 bg-transparent relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
              GUEST SHOWCASE
            </span>
            <h2 className="font-kanit text-4xl md:text-5xl font-black uppercase text-white leading-tight">
              MEET THE VOICE OF THE CULTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "JASS MANAK",
                role: "Singer & Songwriter",
                bio: "With billions of streams across platforms, Jass represents the global scaling of modern Punjabi pop and melodic structure.",
                handle: "@jassmanak",
                img: "/guest_jass_manak.png"
              },
              {
                name: "ROOP SHARMA",
                role: "Film Director & Editor",
                bio: "Crafting the visuals behind Punjabi cinema, Roop is a creative force working at the intersection of pacing and narrative.",
                handle: "@roopsharma",
                img: "/guest_roop_sharma.png"
              },
              {
                name: "GURINDER GILL",
                role: "Artist & Label Lead",
                bio: "Moving from underground circles to international charts, Gurinder details the business and vision of modern music labels.",
                handle: "@gurindergill",
                img: "/guest_gurinder_gill.png"
              }
            ].map((guest, idx) => (
              <div key={idx} className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-black">
                    <img src={guest.img} alt={guest.name} className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange block mb-1">
                    {guest.role}
                  </span>
                  <h3 className="font-kanit text-2xl font-black text-white uppercase tracking-wider mb-4 leading-none">
                    {guest.name}
                  </h3>
                  <p className="font-sans text-xs text-soft-cream-dim leading-relaxed mb-6 font-light">
                    {guest.bio}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4 text-xs font-mono text-white/50">
                  <span>FOLLOW</span>
                  <span className="text-warm-orange">{guest.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & Quote Blocks */}
      <section className="py-32 bg-black/20 backdrop-blur-sm border-b border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-6 block">
            CULTURAL DIALOGUES
          </span>
          <blockquote className="font-serif italic text-3xl md:text-5xl text-white/95 leading-tight mb-8">
            "Punjab doesn't just listen to music. We live it. Every visual, every beat, every word represents our heritage shifting onto the global stage."
          </blockquote>
          <cite className="font-mono text-xs uppercase tracking-[0.2em] text-warm-orange font-bold not-italic">
            — FROM EPISODE 42 ON HEIRLOOMS & SOUNDS
          </cite>
        </div>
      </section>

      {/* Become a Guest CTA */}
      <section className="py-32 bg-transparent relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-4 block">
            BECOME A PART OF IT
          </span>
          <h2 className="font-kanit text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-none tracking-tight">
            HAVE A STORY TO SHARE?
          </h2>
          <p className="font-sans text-soft-cream-dim text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mb-10">
            We are always looking to feature artists, designers, and creators who are pushing the boundaries of Punjabi music, design, and cinema.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-warm-orange hover:bg-warm-orange-muted text-white text-xs uppercase tracking-widest font-semibold transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            Request Interview Slots
          </button>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero 
        title="HUNGRY PRODUCTIONS." 
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
            <div className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/5">
              <span className="font-serif italic text-5xl text-white/10 block mb-4">01</span>
              <h3 className="font-kanit text-3xl font-black uppercase text-white mb-4 tracking-tight">
                HUNGRYMAN DESIGNS
              </h3>
              <p className="font-sans text-sm text-soft-cream-dim leading-relaxed mb-6 font-light">
                Our graphics lab focused entirely on official music posters, album covers, and artist visual identity. We work directly with artists to translate sonic notes into static artwork optimized for print and streaming platforms.
              </p>
            </div>
            
            <div className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/5">
              <span className="font-serif italic text-5xl text-white/10 block mb-4">02</span>
              <h3 className="font-kanit text-3xl font-black uppercase text-white mb-4 tracking-tight">
                HUNGRY TALKS
              </h3>
              <p className="font-sans text-sm text-soft-cream-dim leading-relaxed mb-6 font-light">
                Our audio-visual podcast studio hosting in-depth conversations with directors, singers, songwriters, and label executives. We preserve the stories, values, and blueprints that are building Punjabi culture today.
              </p>
            </div>
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

interface ProjectPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProjectPlannerModal({ isOpen, onClose }: ProjectPlannerModalProps) {
  const [step, setStep] = useState(1);
  const [clientRole, setClientRole] = useState('');
  const [serviceNeeds, setServiceNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const toggleNeed = (need: string) => {
    if (serviceNeeds.includes(need)) {
      setServiceNeeds(serviceNeeds.filter(n => n !== need));
    } else {
      setServiceNeeds([...serviceNeeds, need]);
    }
  };

  const resetPlanner = () => {
    setStep(1);
    setClientRole('');
    setServiceNeeds([]);
    setBudget('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 md:p-12 shadow-2xl"
          >
            {/* Close button */}
            <button 
              onClick={() => {
                onClose();
                setTimeout(resetPlanner, 300);
              }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Step 1: Who are you? */}
            {step === 1 && (
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">Step 01 / 04</span>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-6">Who are you representing?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {['Independent Artist', 'Artist Manager', 'Film Director', 'Music Label Executive'].map(role => (
                    <button
                      key={role}
                      onClick={() => setClientRole(role)}
                      className={`px-6 py-4 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-left cursor-pointer ${
                        clientRole === role 
                          ? 'bg-warm-orange border-warm-orange text-white' 
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    disabled={!clientRole}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-warm-orange hover:text-white text-xs uppercase tracking-widest font-black transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: What do you need? */}
            {step === 2 && (
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">Step 02 / 04</span>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-6">Select Creative Needs</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Poster Design', 'Album Visual Identity', 'Behind-the-Scenes Cover', 'Motion Graphics Campaign', 'Podcast Guest Booking'].map(need => {
                    const selected = serviceNeeds.includes(need);
                    return (
                      <button
                        key={need}
                        onClick={() => toggleNeed(need)}
                        className={`px-5 py-3 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                          selected 
                            ? 'bg-warm-orange border-warm-orange text-white' 
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                        }`}
                      >
                        {need}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={serviceNeeds.length === 0}
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-warm-orange hover:text-white text-xs uppercase tracking-widest font-black transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Budget Tier? */}
            {step === 3 && (
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">Step 03 / 04</span>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-6">What is the Project Scale?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Single Release', desc: 'Standard single cover & artwork assets.' },
                    { label: 'EP / Album Campaign', desc: 'Full album theme & visual branding.' },
                    { label: 'Billboard / Tour Scale', desc: 'Global scale press & motion visuals.' }
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => setBudget(item.label)}
                      className={`px-5 py-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        budget === item.label 
                          ? 'bg-warm-orange border-warm-orange text-white' 
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">{item.label}</span>
                        <span className="text-[10px] text-white/50 block font-normal leading-relaxed">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!budget}
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-warm-orange hover:text-white text-xs uppercase tracking-widest font-black transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact details */}
            {step === 4 && (
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">Step 04 / 04</span>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-6">Brief Details</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(5);
                  }}
                  className="flex flex-col gap-4 mb-8"
                >
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs focus:border-warm-orange focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs focus:border-warm-orange focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs focus:border-warm-orange focus:outline-none"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-full border border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-warm-orange hover:bg-warm-orange-muted text-white text-xs uppercase tracking-widest font-black transition-all duration-300 cursor-pointer"
                    >
                      Submit Brief
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: Submission Success Screen */}
            {step === 5 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-warm-orange/10 border border-warm-orange/30 text-warm-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="font-kanit text-3xl font-black uppercase text-white mb-4">Brief Registered</h3>
                <p className="font-sans text-xs text-soft-cream-dim leading-relaxed font-light max-w-sm mx-auto mb-8">
                  Your creative project planner details have been stored on our visual lab server. Our team will review the brief and contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(resetPlanner, 300);
                  }}
                  className="px-6 py-3 rounded-full bg-white text-black hover:bg-warm-orange hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  Close Planner
                </button>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// 3. MAIN COMPONENT (App)
// ==========================================
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div ref={containerRef} className="relative bg-transparent min-h-screen selection:bg-warm-orange selection:text-white">
        
        {/* HEADER / NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <img src="/hungryman_logo.png" alt="HungryMan Designs Logo" className="h-10 w-auto object-contain border border-white/10 rounded-sm" />
              <div className="flex flex-col">
                <span className="font-kanit font-black tracking-wider text-sm leading-none text-white">HUNGRYMAN</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-warm-orange">DESIGNS</span>
              </div>
            </Link>

            {/* Desktop Nav links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Work', path: '/work' },
                { label: 'Designs', path: '/designs' },
                { label: 'Talks', path: '/talks' },
                { label: 'About', path: '/about' }
              ].map((link) => (
                <Link 
                  key={link.label} 
                  to={link.path}
                  className="text-xs uppercase tracking-widest text-soft-cream/70 hover:text-warm-orange transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <button 
                onClick={() => setIsPlannerOpen(true)}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:border-warm-orange bg-white/5 hover:bg-warm-orange text-white text-xs uppercase tracking-widest transition-all duration-550 ease-cinematic cursor-pointer font-medium"
              >
                Start a Project
              </button>
            </div>

            {/* Mobile drawer toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white hover:text-warm-orange transition-colors">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden"
              >
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Work', path: '/work' },
                  { label: 'Designs', path: '/designs' },
                  { label: 'Talks', path: '/talks' },
                  { label: 'About', path: '/about' }
                ].map((link) => (
                  <Link 
                    key={link.label} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-left text-sm uppercase tracking-widest text-soft-cream/80 hover:text-warm-orange transition-colors py-2 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      setIsPlannerOpen(true);
                    }, 100);
                  }}
                  className="w-full text-center py-3 rounded-full bg-warm-orange hover:bg-warm-orange-muted text-white text-xs uppercase tracking-widest font-semibold transition-colors mt-2 cursor-pointer"
                >
                  Start a Project
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* PAGE CONTENT */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/designs" element={<DesignsPage />} />
          <Route path="/talks" element={<TalksPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        {/* CINEMATIC MOVIE-ENDING FOOTER */}
        <footer id="contact" className="relative w-full py-36 overflow-hidden animate-cinematic-bg border-t border-white/5 flex flex-col justify-between min-h-[90vh] z-20">
          
          {/* Giant Faded Background Typography */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end select-none pointer-events-none z-0">
            <span className="font-kanit font-black text-white/[0.015] text-[12vw] md:text-[14vw] tracking-tighter leading-none block uppercase">
              HUNGRY
            </span>
            <span className="font-kanit font-black text-white/[0.015] text-[12vw] md:text-[14vw] tracking-tighter leading-none block uppercase -mt-4 md:-mt-8 pb-4">
              PRODUCTIONS
            </span>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-6 w-full flex-grow flex flex-col justify-between items-center text-center relative z-10">
            
            {/* Main CTA block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-4xl mx-auto mt-12 mb-20"
            >
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-warm-orange font-semibold mb-6 block">
                LET'S CO-CREATE
              </span>
              <h2 className="font-kanit text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.95] tracking-tighter mb-12">
                LET'S BUILD SOMETHING<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-orange to-cinematic-gold">PEOPLE REMEMBER.</span>
              </h2>

              <div className="flex flex-wrap gap-4 items-center justify-center">
                <button 
                  onClick={() => setIsPlannerOpen(true)}
                  className="px-8 py-4 rounded-full bg-warm-orange hover:bg-warm-orange-muted text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 group transition-all duration-500 shadow-[0_0_20px_rgba(255,92,31,0.25)] hover:shadow-[0_0_30px_rgba(255,92,31,0.45)] hover:scale-105 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
                <Link 
                  to="/work"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-warm-orange hover:bg-white/5 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-500 hover:scale-105 cursor-pointer inline-block"
                >
                  Watch Our Work
                </Link>
              </div>
            </motion.div>

            {/* Movie Credits style directory links */}
            <div className="w-full border-t border-white/5 pt-20 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left md:text-center">
              {/* Column 1: DIRECTORY */}
              <div className="flex flex-col md:items-center">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6 font-bold">DIRECTORY</h4>
                <ul className="flex flex-col gap-3 font-sans text-xs text-soft-cream-dim font-light">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Work', path: '/work' },
                    { label: 'Designs', path: '/designs' },
                    { label: 'Talks', path: '/talks' },
                    { label: 'About', path: '/about' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        to={item.path}
                        className="hover:text-warm-orange transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: SOCIALS */}
              <div className="flex flex-col md:items-center">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6 font-bold">NETWORKS</h4>
                <ul className="flex flex-col gap-3 font-sans text-xs text-soft-cream-dim font-light">
                  <li>
                    <a href="https://instagram.com/hungryman" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/hungryman" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: TECHNICAL SPECIFICATIONS */}
              <div className="flex flex-col md:items-center">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6 font-bold">SPECIFICATIONS</h4>
                <div className="font-mono text-[10px] text-white/40 leading-relaxed font-light">
                  <span>FPS: 23.976 // REC MODE</span><br />
                  <span>GAMMA: S-LOG3 // WB: 4300K</span><br />
                  <span>LOC: MOHALI, PUNJAB, INDIA</span>
                </div>
              </div>
            </div>

            {/* Copyright / Footer credits info */}
            <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-mono tracking-[0.25em] text-white/30 w-full mt-4">
              <span>© {new Date().getFullYear()} HUNGRYMAN PRODUCTIONS. ALL RIGHTS RESERVED.</span>
              <span>MADE IN PUNJAB</span>
            </div>

          </div>
        </footer>

        {/* Global Project Brief Planner Modal */}
        <ProjectPlannerModal isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />

      </div>
    </Router>
  );
}
