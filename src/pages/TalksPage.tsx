import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AudioWaveform from '../components/AudioWaveform';

export default function TalksPage() {
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
        style={{ backgroundImage: "url('/studio_wood_bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                img: '/guest_jass_manak.webp',
                chapter: 'EPISODE 42'
              },
              {
                guest: 'Roop Sharma',
                title: 'Directors\' Vision: How Editing and Styling Crafts Culture',
                duration: '38:40',
                img: '/guest_roop_sharma.webp',
                chapter: 'EPISODE 41'
              },
              {
                guest: 'Gurinder Gill',
                title: 'Bridging the Gap: Underground Punjabi Music to Billboard Stars',
                duration: '51:10',
                img: '/guest_gurinder_gill.webp',
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
                        width={1024}
                        height={1024}
                        loading="lazy"
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
                img: "/guest_jass_manak.webp"
              },
              {
                name: "ROOP SHARMA",
                role: "Film Director & Editor",
                bio: "Crafting the visuals behind Punjabi cinema, Roop is a creative force working at the intersection of pacing and narrative.",
                handle: "@roopsharma",
                img: "/guest_roop_sharma.webp"
              },
              {
                name: "GURINDER GILL",
                role: "Artist & Label Lead",
                bio: "Moving from underground circles to international charts, Gurinder details the business and vision of modern music labels.",
                handle: "@gurindergill",
                img: "/guest_gurinder_gill.webp"
              }
            ].map((guest, idx) => (
              <div key={idx} className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-black">
                    <img 
                      src={guest.img} 
                      alt={guest.name} 
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]" 
                    />
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
