import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { 
  ArrowUpRight, 
  Menu,
  X
} from 'lucide-react';

// Lazy load pages for performance (JS deferral/code splitting)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const WorkPage = React.lazy(() => import('./pages/WorkPage'));
const DesignsPage = React.lazy(() => import('./pages/DesignsPage'));
const TalksPage = React.lazy(() => import('./pages/TalksPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { useLocation } from 'react-router-dom';

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
              <img 
                src="/hungryman_logo.webp" 
                alt="Hungryman Productions Logo" 
                width={40}
                height={40}
                className="h-10 w-auto object-contain border border-white/10 rounded-sm" 
              />
              <div className="flex flex-col">
                <span className="font-kanit font-black tracking-wider text-sm leading-none text-white">HUNGRYMAN</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-warm-orange">PRODUCTIONS</span>
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

        {/* PAGE CONTENT WITH REACT SUSPENSE FALLBACK */}
        <React.Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center"><div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">LOADING STUDIO...</div></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/talks" element={<TalksPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </React.Suspense>

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
            <div className="w-full border-t border-white/5 pt-20 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left md:text-center">
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
                    <a href="https://www.instagram.com/hungrymandesigns/" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@hunggrytalks" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: INQUIRIES */}
              <div className="flex flex-col md:items-center">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6 font-bold">INQUIRIES</h4>
                <div className="flex flex-col gap-1 items-start md:items-center">
                  <span className="text-[10px] text-white/35 font-mono tracking-wider">CALL / WHATSAPP</span>
                  <a 
                    href="https://wa.me/919915984700" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-warm-orange transition-colors text-white font-kanit font-black text-base tracking-wider"
                  >
                    +91 99159 84700
                  </a>
                </div>
              </div>

              {/* Column 4: TECHNICAL SPECIFICATIONS */}
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
