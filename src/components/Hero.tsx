import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import FluidCard from '@/components/FluidCard';
import HeroDroplets from '@/components/HeroDroplets';

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Twitter,
};

export default function Hero() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="profile"
      className={`reveal ${visible ? 'visible' : ''} relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 pb-16`}
    >
      <FluidCard className="max-w-5xl w-full p-8 md:p-14 text-center">
        <HeroDroplets />
        <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative pulse-glow rounded-full">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white/70 shadow-lg"
            />
          </div>
        </div>

        <p className="text-sky-600 font-medium tracking-wide uppercase text-sm mb-2">
          {profile.title}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-sky-950 mb-4">
          {profile.name}
        </h1>
        <p className="text-lg md:text-xl text-sky-700 max-w-2xl mx-auto mb-8 leading-relaxed">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-sky-700 mb-8">
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} /> {profile.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Mail size={16} /> {profile.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={16} /> {profile.phone}
          </span>
        </div>

        <p className="text-sky-800/80 max-w-2xl mx-auto leading-relaxed mb-8">
          {profile.bio}
        </p>

        <div className="flex justify-center gap-4">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon] ?? Github;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-full glass lift flex items-center justify-center text-sky-700 hover:text-sky-900"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
        </div>
      </FluidCard>
    </section>
  );
}
