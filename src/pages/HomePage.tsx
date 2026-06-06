import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

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
    bg: "/assets/col_designs.webp",
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
    bg: "/assets/col_talks.webp" 
  },
  { 
    num: "03", 
    title: "EDITING", 
    subtitle: "STORYTELLING", 
    bg: "/assets/col_editing.webp" 
  },
  { 
    num: "04", 
    title: "PRODUCTION", 
    subtitle: "CINEMATIC VISUALS", 
    bg: "/assets/col_production.webp" 
  },
  { 
    num: "05", 
    title: "ARTISTS", 
    subtitle: "CULTURE", 
    bg: "/assets/col_artists.webp",
    bottomContent: (
      <blockquote className="column-bottom-quote">
        Real Stories.<br />
        Real People.<br />
        Real Impact.
      </blockquote>
    )
  }
];

function FeaturedWorkPreview() {
  const previewPosters = [
    { src: '/poster 1.webp', artist: 'PARMISH VERMA', category: 'Official Tour Visuals', year: '2024', w: 872, h: 863 },
    { src: '/karan_aujla.jpeg', artist: 'KARAN AUJLA', category: 'Album Cover & Visual Identity', year: '2023', w: 1080, h: 1350 },
    { src: '/khan_bhaini2.jpeg', artist: 'KHAN BHAINI', category: 'Cinematic Campaign Poster', year: '2023', w: 1074, h: 1600 }
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
                width={poster.w}
                height={poster.h}
                loading="lazy"
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
                src="/tari_baba.png" 
                width={436}
                height={236}
                loading="lazy"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                alt="Tari Baba Spotlight" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-warm-orange mb-2 block">
                  SPOTLIGHT INTERVIEW
                </span>
                <h4 className="font-kanit text-2xl font-black text-white uppercase tracking-wider leading-none">
                  TARI BABA
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
            <div className="flex flex-wrap items-center gap-8 border-l border-white/10 pl-6 mb-8">
              <div>
                <span className="font-kanit text-3xl font-black text-white leading-none">280K+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mt-1">Video Views</span>
              </div>
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

export default function HomePage() {
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
          <h1 className="main-title">
            <span className="white-text">WE CREATE</span>
            <span className="orange-text">CULTURE</span>
          </h1>
          <div className="centerpiece-subtext">
            <span>POSTER</span>
            <span className="subtext-dot">•</span>
            <span>PODCAST</span>
            <span className="subtext-dot">•</span>
            <span>PRODUCTIONS</span>
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
              Hungry Productions combines visual storytelling and meaningful conversations to build culture that lasts. Founded by premium visual creator Sahilpreet Singh, HungryMan Designs has established itself as an authoritative creative agency in Punjab, directing iconic music visual campaigns, tour poster designs, and official album covers from our studio hub in Mohali. Serving artists and local businesses in Ludhiana and Chandigarh, we translate creative concepts into high-converting digital assets, helping brands define modern culture.
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
                    <img 
                      src="/poster 2.webp" 
                      width={695}
                      height={868}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" 
                      alt="Album Cover Campaign" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-6 col-start-8 row-start-2 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img 
                      src="/poster 4.webp" 
                      width={662}
                      height={870}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" 
                      alt="Artist Visual Branding" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-5 col-start-2 row-start-9 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img 
                      src="/poster 6.webp" 
                      width={871}
                      height={865}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" 
                      alt="Cinematic Movie Poster" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="col-span-5 row-span-5 col-start-8 row-start-8 relative rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <img 
                      src="/poster 8.webp" 
                      width={865}
                      height={872}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.85] hover:brightness-100 transition-all duration-700" 
                      alt="Motion Graphics Poster" 
                    />
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
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <Link to="/graphic-designer-ludhiana" className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium hover:text-warm-orange">
                    Graphic Designer in Ludhiana
                  </Link>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <Link to="/album-cover-designer-ludhiana" className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium hover:text-warm-orange">
                    Album Cover Designer in Ludhiana
                  </Link>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-soft-cream/70 font-medium">
                    Artist Branding
                  </span>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-soft-cream/70 font-medium">
                    Motion Graphics
                  </span>
                </li>
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
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <Link to="/podcast-production-ludhiana" className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium hover:text-warm-orange">
                    Podcast Production in Ludhiana
                  </Link>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <Link to="/video-production-ludhiana" className="text-xs uppercase tracking-widest text-soft-cream/70 group-hover/item:text-white transition-colors duration-300 font-medium hover:text-warm-orange">
                    Video Production in Ludhiana
                  </Link>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-soft-cream/70 font-medium">
                    Industry Talks
                  </span>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-orange group-hover/item:scale-150 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-soft-cream/70 font-medium">
                    Storytelling
                  </span>
                </li>
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
                  src="/hungry_talks_studio.webp" 
                  width={1024}
                  height={1024}
                  loading="lazy"
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
