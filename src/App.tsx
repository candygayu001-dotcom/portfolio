import AlphabetBackground from '@/components/AlphabetBackground';
import LiquidBlobs from '@/components/LiquidBlobs';
import FluidGrid from '@/components/FluidGrid';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Studies from '@/components/Studies';
import JobProfile from '@/components/JobProfile';
import Achievements from '@/components/Achievements';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LiquidBlobs />
      <AlphabetBackground />
      <FluidGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Studies />
        <JobProfile />
        <Achievements />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
