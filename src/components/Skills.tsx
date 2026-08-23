import { useEffect, useRef } from 'react';
import { Code2 } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import FluidCard from '@/components/FluidCard';

export default function Skills() {
  const { ref, visible } = useReveal<HTMLElement>();
  const barsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!visible || !barsRef.current) return;
    const fills = barsRef.current.querySelectorAll<HTMLElement>('.skill-fill');
    fills.forEach((f, i) => {
      const level = skills[i]?.level ?? 0;
      setTimeout(() => {
        f.style.width = `${level}%`;
      }, 150 * i);
    });
  }, [visible]);

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} relative z-10 py-20 px-6`}
    >
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <Code2 className="text-sky-600" size={26} />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950">Skills</h2>
          </div>
          <p className="text-sky-700">Tools and technologies I reach for.</p>
        </header>

        <FluidCard className="p-8 space-y-5">
          <div ref={barsRef} className="space-y-5">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-sky-900">{s.name}</span>
                <span className="text-sky-600">{s.level}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-sky-100 overflow-hidden">
                <div className="skill-fill" />
              </div>
            </div>
          ))}
          </div>
        </FluidCard>
      </div>
    </section>
  );
}
