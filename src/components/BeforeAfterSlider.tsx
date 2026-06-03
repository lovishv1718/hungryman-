import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  widthVal?: number;
  heightVal?: number;
  className?: string;
}

export function BeforeAfterSlider({ 
  beforeSrc, 
  afterSrc, 
  beforeLabel = "Raw Studio Capture", 
  afterLabel = "Final Graded Poster",
  widthVal = 1200,
  heightVal = 800,
  className = "h-[400px] md:h-[600px]"
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
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-ew-resize select-none ${className}`}
    >
      {/* BEFORE LAYER (Raw Photography) */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
        <img 
          src={beforeSrc} 
          alt="Before" 
          width={widthVal}
          height={heightVal}
          loading="lazy"
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
          width={widthVal}
          height={heightVal}
          loading="lazy"
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

export function CarouselBeforeAfterSlider() {
  const carouselProjects = [
    { id: 'inder', label: 'INDER CHAHAL', before: '/inder_chahal_before.png', after: '/inderchahal_after.jpeg', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 1080, h: 1350 },
    { id: 'lucky', label: 'LUCKY VERMA', before: '/luckyverma_before.png', after: '/lucky_verma_after.jpeg', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 1080, h: 1350 },
    { id: 'babbumaan', label: 'BABBU MAAN', before: '/babbumaan_before.png', after: '/babbumaan_after.jpeg', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 1080, h: 1350 },
    { id: 'gulab', label: 'GULAB SIDHU', before: '/gulab_sidhu_before.png', after: '/gulab_sidhu_after.jpeg', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 1080, h: 1350 },
    { id: 'amrinder', label: 'AMRINDER GILL', before: '/amrindergill_before.png', after: '/amrinder_gill_after.jpeg', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 768, h: 960 }
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Card 3 (index 2) starts centered!
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselProjects.length) % carouselProjects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselProjects.length);
  };

  const getX = (offset: number) => {
    if (isMobile) {
      if (offset === 0) return "0%";
      if (offset === -1) return "-78%";
      if (offset === 1) return "78%";
      if (offset === -2) return "-150%";
      return "150%";
    } else {
      if (offset === 0) return "0%";
      if (offset === -1) return "-60%";
      if (offset === 1) return "60%";
      if (offset === -2) return "-120%";
      return "120%";
    }
  };

  const getScale = (offset: number) => {
    if (offset === 0) return 1.0;
    return isMobile ? 0.75 : 0.82;
  };

  const getOpacity = (offset: number) => {
    if (offset === 0) return 1.0;
    return isMobile ? 0.15 : 0.45;
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none overflow-hidden py-6">
      {/* 3D Carousel Stage */}
      <div className="relative w-full max-w-6xl h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible">
        {carouselProjects.map((proj, idx) => {
          let offset = idx - activeIndex;

          // Circular index math to wrap correctly
          if (offset < -2) offset += carouselProjects.length;
          if (offset > 2) offset -= carouselProjects.length;

          const isActive = idx === activeIndex;
          const zIndex = 20 - Math.abs(offset);

          return (
            <motion.div
              key={proj.id}
              style={{
                position: 'absolute',
                width: isMobile ? '82%' : '65%',
                maxWidth: '700px',
                zIndex,
              }}
              animate={{
                x: getX(offset),
                scale: getScale(offset),
                opacity: getOpacity(offset),
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
              }}
              className={`aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-[600ms] ${
                isActive 
                  ? 'glowing-card-active' 
                  : 'border border-white/5 shadow-2xl brightness-50 hover:brightness-75'
              }`}
              onClick={() => {
                if (!isActive) setActiveIndex(idx);
              }}
            >
              {isActive ? (
                <BeforeAfterSlider 
                  beforeSrc={proj.before}
                  afterSrc={proj.after}
                  beforeLabel={proj.beforeLabel}
                  afterLabel={proj.afterLabel}
                  widthVal={proj.w}
                  heightVal={proj.h}
                  className="w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full bg-[#070708]">
                  <img 
                    src={proj.after} 
                    alt={proj.label}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-xs font-kanit font-black text-white/50 uppercase tracking-widest">
                    {proj.label}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-10 md:mt-14 z-30">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/70 hover:bg-warm-orange hover:border-warm-orange text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg active:scale-95"
          aria-label="Previous Project"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 select-none min-w-[240px] text-center">
          {activeIndex + 1} / {carouselProjects.length} — <span className="text-white font-bold">{carouselProjects[activeIndex].label}</span>
        </span>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/70 hover:bg-warm-orange hover:border-warm-orange text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg active:scale-95"
          aria-label="Next Project"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

