import { GraduationCap } from 'lucide-react';
import { studies } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import FluidCard from '@/components/FluidCard';

export default function Studies() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="studies"
      className={`reveal ${visible ? 'visible' : ''} relative z-10 py-20 px-6`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <GraduationCap className="text-sky-600" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950">
              Studies
            </h2>
          </div>
          <p className="text-sky-700">Academic foundations and continuous learning.</p>
        </header>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-sky-400 to-transparent" />
          <div className="space-y-8">
            {studies.map((s, i) => (
              <div
                key={s.id}
                className={`relative flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-500 ring-4 ring-sky-100"
                />
                <FluidCard className="p-6 md:w-[45%] ml-12 md:ml-0">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-wide">
                    {s.period}
                  </span>
                  <h3 className="text-lg font-semibold text-sky-950 mt-1">
                    {s.degree}
                  </h3>
                  <p className="text-sky-700 font-medium">{s.institution}</p>
                  <p className="text-sky-800/80 text-sm mt-2 leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-sm text-sky-600 mt-3 font-medium">
                    {s.grade}
                  </p>
                </FluidCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
