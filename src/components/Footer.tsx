import { Heart } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="relative z-10 py-10 px-6 text-center">
      <div className="max-w-3xl mx-auto glass p-6">
        <p className="text-sky-800 text-sm">
          Built with <Heart size={14} className="inline text-sky-500" /> by{' '}
          {profile.name}. © {new Date().getFullYear()} — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
