import { useEffect, useRef } from 'react';

interface Cell {
  x: number;
  y: number;
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  s: number;
  ts: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  strength: number;
}

const GRID = 42;
const INFLUENCE = 150;
const MAX_PUSH = 26;
const RING_WIDTH = 34;
const EASE = 0.32;

export default function FluidGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cells: Cell[] = [];
    let ripples: Ripple[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let lastX = -9999;
    let lastY = -9999;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = [];
      for (let y = GRID / 2; y < h + GRID; y += GRID) {
        for (let x = GRID / 2; x < w + GRID; x += GRID) {
          cells.push({ x, y, dx: 0, dy: 0, tx: 0, ty: 0, s: 1, ts: 1 });
        }
      }
    };

    build();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const speed = Math.hypot(mouseX - lastX, mouseY - lastY);
      lastX = mouseX;
      lastY = mouseY;
      if (speed > 26) {
        ripples.push({ x: mouseX, y: mouseY, r: 0, strength: Math.min(speed / 40, 1.4) });
        if (ripples.length > 10) ripples.shift();
      }
    };

    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, strength: 2.2 });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', build);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ripples = ripples.filter((rp) => rp.strength > 0.04);
      for (const rp of ripples) {
        rp.r += 5.5;
        rp.strength *= 0.965;
      }

      for (const c of cells) {
        // cursor push (instant target)
        const ddx = c.x - mouseX;
        const ddy = c.y - mouseY;
        const dist = Math.hypot(ddx, ddy);
        let tx = 0;
        let ty = 0;
        let ts = 1;
        if (dist < INFLUENCE) {
          const f = (1 - dist / INFLUENCE) * MAX_PUSH;
          const inv = 1 / (dist || 1);
          tx = ddx * inv * f;
          ty = ddy * inv * f;
          ts = 1 + (1 - dist / INFLUENCE) * 0.9;
        }

        // ripple waves (water drop)
        for (const rp of ripples) {
          const rd = Math.hypot(c.x - rp.x, c.y - rp.y);
          const delta = Math.abs(rd - rp.r);
          if (delta < RING_WIDTH) {
            const wave = (1 - delta / RING_WIDTH) * rp.strength * 14;
            const inv = 1 / (rd || 1);
            const dir = rd < rp.r ? -1 : 1;
            tx += (c.x - rp.x) * inv * wave * dir;
            ty += (c.y - rp.y) * inv * wave * dir;
            ts += (1 - delta / RING_WIDTH) * rp.strength * 0.5;
          }
        }

        c.tx = tx;
        c.ty = ty;
        c.ts = ts;
        c.dx += (c.tx - c.dx) * EASE;
        c.dy += (c.ty - c.dy) * EASE;
        c.s += (c.ts - c.s) * EASE;

        const px = c.x + c.dx;
        const py = c.y + c.dy;
        const size = 5 * c.s;
        const alpha = 0.16 + Math.min(c.s - 1, 1) * 0.5;

        ctx.beginPath();
        ctx.roundRect(px - size / 2, py - size / 2, size, size, size * 0.35);
        ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
        ctx.fill();

        if (c.s > 1.05) {
          ctx.beginPath();
          ctx.roundRect(px - size / 2, py - size / 2, size, size, size * 0.35);
          ctx.strokeStyle = `rgba(125, 211, 252, ${Math.min((c.s - 1) * 0.6, 0.5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[2] pointer-events-none"
    />
  );
}
