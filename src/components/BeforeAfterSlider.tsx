import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Monitor } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  widthVal?: number;
  heightVal?: number;
}

export function BeforeAfterSlider({ 
  beforeSrc, 
  afterSrc, 
  beforeLabel = "Raw Studio Capture", 
  afterLabel = "Final Graded Poster",
  widthVal = 1200,
  heightVal = 800
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

export function TabbedBeforeAfterSlider() {
  const transformationProjects = [
    { id: 'diljit', label: 'DILJIT TOUR POSTER', before: '/image 1.webp', after: '/poster 1.webp', beforeLabel: 'Raw Studio Capture', afterLabel: 'Final Graded Poster', w: 490, h: 744 },
    { id: 'aujla', label: 'KARAN AUJLA ALBUM', before: '/image 3.webp', after: '/poster 3.webp', beforeLabel: 'Concept Composite', afterLabel: 'Album Cover Art', w: 488, h: 730 },
    { id: 'studio', label: 'STUDIO COLOR GRADING', before: '/image 4.webp', after: '/image 5.webp', beforeLabel: 'Log Profile Camera Raw', afterLabel: 'Final Graded Visual Lab', w: 1301, h: 1209 }
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
        widthVal={currentProj.w}
        heightVal={currentProj.h}
      />
    </div>
  );
}
