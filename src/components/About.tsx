import { UserRound, Code2, Rocket, Heart, Coffee } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import HologramImage from '@/components/HologramImage';

const stats = [
  { icon: Code2, label: 'Years coding', value: '6+' },
  { icon: Rocket, label: 'Products shipped', value: '12' },
  { icon: Heart, label: 'Open-source repos', value: '30+' },
  { icon: Coffee, label: 'Cups per week', value: '24' },
];

export default function About() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about"
      className={`reveal ${visible ? 'visible' : ''} relative z-10 py-20 px-6`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <UserRound className="text-sky-600" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950">About Me</h2>
          </div>
          <p className="text-sky-700">The person behind the products.</p>
        </header>

        <div className="glass lift p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <HologramImage src={profile.avatar} alt={profile.name} />

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-sky-950 leading-tight">
                {profile.tagline}
              </h3>

              <p className="text-sky-800/80 leading-relaxed text-base md:text-lg">
                {profile.about}
              </p>

              <p className="text-sky-800/80 leading-relaxed">
                {profile.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 rounded-2xl bg-sky-50/60 border border-sky-100 px-4 py-3"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shrink-0">
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xl font-bold text-sky-950 leading-none">{s.value}</p>
                        <p className="text-xs text-sky-600 font-medium mt-1 truncate">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
