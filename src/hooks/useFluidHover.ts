import { useEffect, useRef } from 'react';

/**
 * Adds a fluid water-drop hover spotlight to an element.
 * A radial glow follows the cursor with no delay, and a ripple
 * expands from the entry point when the pointer enters.
 */
export function useFluidHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spotlight = document.createElement('span');
    spotlight.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0;
      transition: opacity 0.5s ease;
      background: radial-gradient(
        180px circle at var(--fx, 50%) var(--fy, 50%),
        rgba(125, 211, 252, 0.45),
        rgba(56, 189, 248, 0.18) 40%,
        transparent 70%
      );
      mix-blend-mode: screen;
    `;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0;
      border-radius: inherit;
      overflow: hidden;
    `;

    el.prepend(ripple);
    el.prepend(spotlight);
    el.style.setProperty('--fx', '50%');
    el.style.setProperty('--fy', '50%');

    let raf = 0;
    let cx = 50;
    let cy = 50;
    let tx = 50;
    let ty = 50;

    const animate = () => {
      cx += (tx - cx) * 0.35;
      cy += (ty - cy) * 0.35;
      el.style.setProperty('--fx', `${cx}%`);
      el.style.setProperty('--fy', `${cy}%`);
      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const onEnter = (e: MouseEvent) => {
      spotlight.style.opacity = '1';
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tx = x;
      ty = y;
      cx = x;
      cy = y;

      // water-drop ripple
      ripple.animate(
        [
          {
            transform: 'scale(0)',
            opacity: 0.5,
            background: `radial-gradient(120px circle at ${x}% ${y}%, rgba(125,211,252,0.5), transparent 60%)`,
          },
          {
            transform: 'scale(1.4)',
            opacity: 0,
            background: `radial-gradient(300px circle at ${x}% ${y}%, rgba(125,211,252,0.2), transparent 60%)`,
          },
        ],
        { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      );
    };

    const onLeave = () => {
      spotlight.style.opacity = '0';
      tx = 50;
      ty = 50;
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      spotlight.remove();
      ripple.remove();
    };
  }, []);

  return ref;
}
