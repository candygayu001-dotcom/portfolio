import { Briefcase, MapPin } from 'lucide-react';
import { jobs } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import FluidCard from '@/components/FluidCard';

export default function JobProfile() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="jobs"
      className={`reveal ${visible ? 'visible' : ''} relative z-10 py-20 px-6`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <Briefcase className="text-sky-600" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950">
              Job Profile
            </h2>
          </div>
          <p className="text-sky-700">Roles, impact, and the teams I've built with.</p>
        </header>

        <div className="space-y-6">
          {jobs.map((j) => (
            <FluidCard key={j.id} className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-sky-950">{j.role}</h3>
                  <p className="text-sky-600 font-medium">{j.company}</p>
                </div>
                <div className="text-sm text-sky-600 md:text-right">
                  <p className="font-medium">{j.period}</p>
                  <p className="inline-flex items-center gap-1">
                    <MapPin size={14} /> {j.location}
                  </p>
                </div>
              </div>
              <p className="text-sky-800/80 leading-relaxed mb-4">{j.description}</p>
              <ul className="space-y-2">
                {j.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-sky-800">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </FluidCard>
          ))}
        </div>
      </div>
    </section>
  );
}
