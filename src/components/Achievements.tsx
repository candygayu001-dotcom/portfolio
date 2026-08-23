import { Cloud, Trophy, Award, FileBadge, type LucideIcon } from 'lucide-react';
import { achievements } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import FluidCard from '@/components/FluidCard';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Trophy,
  Award,
  FileBadge,
};

export default function Achievements() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="achievements"
      className={`reveal ${visible ? 'visible' : ''} relative z-10 py-20 px-6`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <Award className="text-sky-600" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950">
              Achievements
            </h2>
          </div>
          <p className="text-sky-700">Certifications, awards, and milestones.</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a) => {
            const Icon = iconMap[a.icon] ?? Award;
            return (
              <FluidCard key={a.id} className="p-6 flex gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-md">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="font-semibold text-sky-950 leading-tight">
                    {a.title}
                  </h3>
                  <p className="text-sm text-sky-600 font-medium">
                    {a.issuer} · {a.date}
                  </p>
                  <p className="text-sm text-sky-800/80 mt-2 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </FluidCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
