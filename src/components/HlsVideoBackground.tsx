import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const HlsVideoBackground = forwardRef<HTMLVideoElement, HlsVideoProps>(({ src, ...props }, ref) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Expose the raw video element to parent refs
  useImperativeHandle(ref, () => localVideoRef.current as HTMLVideoElement);

  useEffect(() => {
    const video = localVideoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const isHls = src.endsWith('.m3u8') || src.includes('.m3u8');

    if (isHls && Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 8, // Set low buffers for background video performance
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("Autoplay blocked or playback error:", err);
        });
      });
    } else {
      // Native support (Safari / iOS / Direct MP4)
      video.src = src;
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("Autoplay blocked or playback error:", err);
        });
      };
      video.addEventListener('loadedmetadata', playVideo);
      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
      };
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={localVideoRef}
      playsInline
      muted
      loop
      autoPlay
      {...props}
    />
  );
});

HlsVideoBackground.displayName = "HlsVideoBackground";
export default HlsVideoBackground;
