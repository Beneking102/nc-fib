import React, { useState, useEffect, useCallback, memo } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const theme = {
  text: '#DFBE5D',
  background: '#151515',
  neon: '#AC9247',
};

const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div
        className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"
        style={{ background: `linear-gradient(90deg, ${theme.neon}, ${theme.text})` }}
      />
      <div
        className="relative px-4 py-2 rounded-full"
        style={{
          background: `${theme.background}CC`,
          border: `1px solid ${theme.text}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          className="text-sm font-medium flex items-center"
          style={{ background: `-webkit-linear-gradient('${theme.text}', '${theme.neon}')`, WebkitBackgroundClip: 'text', color: theme.neon  }}
        >
          In der Konzeptphase
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight" style={{ color: theme.text }}>
      Federal Investigation Bureau
    </h1>
  </div>
));

const RoleTyping = memo(({ role }: { role: string }) => (
  <span className="text-xl md:text-2xl font-light" style={{ backgroundClip: 'text', color: theme.neon }}>
    {role}
  </span>
));

const UnitTag = memo(({ unit }: { unit: string }) => (
  <div
    className="px-3 py-1 rounded-full text-sm font-medium"
    style={{
      background: `${theme.background}BB`,
      border: `1px solid ${theme.neon}`,
      color: theme.text,
    }}
  >
    {unit}
  </div>
));

const CTAButton = memo(({ href, text }: { href: string; text: string }) => (
  <a href={href}>
    <button
      className="relative px-6 py-2 rounded-lg font-medium"
      style={{
        color: theme.text,
        background: `${theme.background}`,
        border: `2px solid ${theme.neon}`,
      }}
    >
      {text}
      <span
        className="absolute inset-0 rounded-lg blur transition-opacity duration-500"
        style={{
          background: theme.neon,
          opacity: 0,
        }}
      />
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 30;
const PAUSE_DURATION = 3000;
const ROLES = ["Sichern der Stadt", "Ermitteln gegen Kriminalität"];
const UNITS = ["GDA", "CID", "SIT", "ASD", "HR"];

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 50 });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTyping = useCallback(() => {
    const currentWord = ROLES[wordIndex];
    if (isTyping) {
      if (charIndex < currentWord.length) {
        setText((prev) => prev + currentWord[charIndex]);
        setCharIndex((i) => i + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((i) => i - 1);
      } else {
        setWordIndex((i) => (i + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <div id="Home" className="min-h-screen overflow-hidden">
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>        
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between min-h-screen">
          <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right" data-aos-delay="200">
            <StatusBadge />
            <MainTitle />
            <div className="flex items-center h-8" data-aos="fade-up" data-aos-delay="400">
              <RoleTyping role={text} />
              <span className="w-[2px] h-6 ml-1 animate-blink" style={{ background: theme.neon }}></span>
            </div>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: theme.text }} data-aos="fade-up" data-aos-delay="600">
              Das FIB schützt Narco City durch effektive Ermittlungen und gezielte Einsätze. Unsere Agenten arbeiten Hand in Hand, um Verbrechen zu bekämpfen und Sicherheit zu gewährleisten.
            </p>
            <div className="flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="800">
              {UNITS.map((unit) => <UnitTag key={unit} unit={unit} />)}
            </div>
            <div className="flex gap-4 mt-6" data-aos="fade-up" data-aos-delay="1000">
              <CTAButton href="https://discord.gg/zWu3atpzhN" text="Discord" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);