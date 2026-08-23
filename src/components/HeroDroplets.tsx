import { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  life: number;
}

/**
 * Canvas overlay for the hero section.
 * - A soft highlighter follows the cursor on hover (water surface glow).
 * - Clicking spawns water droplets that fly outward and ripple like a splash.
 */
export default function HeroDroplets() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = -9999;
    let mouseY = -9999;
    let hovering = false;
    let droplets: Droplet[] = [];
    let ripples: Ripple[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hovering = true;
    };

    const onLeave = () => {
      hovering = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripples.push({ x, y, r: 0, maxR: 180, life: 1 });
      ripples.push({ x, y, r: 0, maxR: 120, life: 1 });

      const count = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 2 + Math.random() * 4.5;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          r: 3 + Math.random() * 5,
          life: 1,
          maxLife: 50 + Math.random() * 30,
        });
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // hover highlighter — soft water surface glow following cursor
      if (hovering) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 140);
        grad.addColorStop(0, 'rgba(125, 211, 252, 0.28)');
        grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.12)');
        grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 140, 0, Math.PI * 2);
        ctx.fill();

        // tiny core droplet
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(186, 230, 253, 0.5)';
        ctx.fill();
      }

      // ripples
      ripples = ripples.filter((rp) => rp.life > 0);
      for (const rp of ripples) {
        rp.r += 3.5;
        rp.life = 1 - rp.r / rp.maxR;
        if (rp.life <= 0) continue;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${rp.life * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // droplets
      droplets = droplets.filter((d) => d.life > 0);
      for (const d of droplets) {
        d.vy += 0.18; // gravity
        d.vx *= 0.99;
        d.x += d.vx;
        d.y += d.vy;
        d.life -= 1 / d.maxLife;

        const alpha = Math.max(d.life, 0);
        const radius = Math.max(d.r * d.life, 0.5);

        // droplet body
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, radius * 2);
        grad.addColorStop(0, `rgba(186, 230, 253, ${alpha * 0.9})`);
        grad.addColorStop(0.5, `rgba(56, 189, 248, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // droplet highlight
        ctx.beginPath();
        ctx.arc(d.x - radius * 0.3, d.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 rounded-[1.5rem] cursor-pointer"
    />
  );
}
