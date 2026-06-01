import { motion } from 'framer-motion';

interface AudioWaveformProps {
  active: boolean;
}

export default function AudioWaveform({ active }: AudioWaveformProps) {
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
