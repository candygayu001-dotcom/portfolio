import { useEffect, useRef } from 'react';

interface HologramImageProps {
  src: string;
  alt: string;
}

export default function HologramImage({ src, alt }: HologramImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;
    if (!wrapper || !image) return;

    const onMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 18;
      const rotateX = (0.5 - y) * 18;
      wrapper.style.setProperty('--holo-x', `${x * 100}%`);
      wrapper.style.setProperty('--holo-y', `${y * 100}%`);
      wrapper.style.setProperty('--rotate-x', `${rotateX}deg`);
      wrapper.style.setProperty('--rotate-y', `${rotateY}deg`);
      wrapper.classList.add('hologram-active');
    };

    const onLeave = () => {
      wrapper.style.setProperty('--holo-x', '50%');
      wrapper.style.setProperty('--holo-y', '50%');
      wrapper.style.setProperty('--rotate-x', '0deg');
      wrapper.style.setProperty('--rotate-y', '0deg');
      wrapper.classList.remove('hologram-active');
    };

    wrapper.addEventListener('pointermove', onMove);
    wrapper.addEventListener('pointerleave', onLeave);

    return () => {
      wrapper.removeEventListener('pointermove', onMove);
      wrapper.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hologram-wrap mx-auto" aria-label={`${alt} hologram image`}>
      <div className="hologram-frame">
        <img ref={imageRef} src={src} alt={alt} className="hologram-image" />
        <span className="hologram-shine" />
        <span className="hologram-scanlines" />
        <span className="hologram-corner hologram-corner-tl" />
        <span className="hologram-corner hologram-corner-tr" />
        <span className="hologram-corner hologram-corner-bl" />
        <span className="hologram-corner hologram-corner-br" />
      </div>
      <span className="hologram-caption">Hover to activate</span>
    </div>
  );
}
