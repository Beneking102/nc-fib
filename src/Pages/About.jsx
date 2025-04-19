import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, Shield } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Defining the yellowish theme
const theme = {
  text: '#DFBE5D',       // primary text color
  background: '#151515', // background for blurred/backdrop elements
  neon: '#AC9247',       // neon accent color
};

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${theme.neon}, ${theme.text})`
        }}
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About us
      </h2>
    </div>
    <p 
      className="mt-2 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      style={{ color: '#999' }}
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5" style={{ color: theme.neon }} />
      Einsatz für Recht & Ordnung in Narco City
      <Sparkles className="w-5 h-5" style={{ color: theme.neon }} />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        {/* subtle neon glow layers */}
        <div className="absolute inset-0 rounded-full blur-2xl animate-spin-slower" style={{ background: `linear-gradient(90deg, ${theme.neon}, ${theme.text})` }} />
        <div className="absolute inset-0 rounded-full blur-2xl animate-pulse-slow opacity-50" style={{ background: `linear-gradient(90deg, ${theme.text}, ${theme.neon})` }} />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(172,146,71,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <img
            src="/fib.png"
            alt="FIB Narco City"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className="absolute -z-10 inset-0 rounded-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-20" style={{ background: `linear-gradient(135deg, ${theme.neon}, ${theme.text})` }} />
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold" style={{ color: theme.text }}>{value}</span>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#bbb' }}>{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: '#888' }}>{description}</p>
          <ArrowUpRight className="w-4 h-4 transition-colors" style={{ color: theme.text }} />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { einsaetze, erfahrung } = useMemo(() => ({
    einsaetze: 100,
    erfahrung: 3,
  }), []);

  useEffect(() => {
    AOS.init({ once: false });
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => AOS.refresh(), 250);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statsData = useMemo(() => [
    { icon: Shield,   value: "∞", label: "Ermittlungen", description: "Aufgedeckte Netzwerke & Delikte", animation: "fade-right" },
    { icon: Award,    value: `${einsaetze}+`,     label: "Einsätze",       description: "Schnelle und effektive Operationen", animation: "fade-up" },
    { icon: Globe,    value: `${erfahrung}+`,label: "Jahre Erfahrung", description: "Konstante Präsenz in Narco City", animation: "fade-left" },
  ], [einsaetze, erfahrung]);

  return (
    <div className="h-auto pb-[10%] overflow-hidden px-[5%] lg:px-[10%] mt-10 text-white" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-3xl block" style={{ backgroundClip: 'text', color: theme.text }}>Wir sind das</span>
              <span className="text-5xl block mt-2 text-gray-300">Narco City FIB</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-justify pb-4" data-aos="fade-right" data-aos-duration="1500" style={{ color: '#ccc' }}>
              Das <strong>Federal Investigation Bureau</strong> in Narco City ist ein Elite-Team, das sich auf die Bekämpfung von organisiertem Verbrechen, Korruption und Cyberkriminalität spezialisiert hat. Mit modernsten Technologien und taktischem Know-how sorgen wir für Sicherheit, Transparenz und Recht im Staat Narco City.
            </p>
          </div>
          <ProfileImage />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
          {statsData.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);