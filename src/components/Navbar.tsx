import React, { useState, useEffect, MouseEvent } from "react";
import { Menu, X } from "lucide-react";

const theme = {
  text: "#DFBE5D",
  background: "#151515",
  neon: "#AC9247",
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Units", label: "Abteilungen" },
    { href: "#MW", label: "Most Wanted" },
    { href: "#Boss", label: "Führungsebene" },
    { href: "#Discord", label: "Discord" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          const el = document.querySelector(item.href);
          if (!el) return null;
          return {
            id: item.href.replace("#", ""),
            offset: (el as HTMLElement).offsetTop - 200,
            height: (el as HTMLElement).clientHeight,
          };
        })
        .filter(Boolean) as { id: string; offset: number; height: number }[];

      const scrollPos = window.scrollY;
      const current = sections.find(
        (sec) => scrollPos >= sec.offset && scrollPos < sec.offset + sec.height
      );
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const scrollToSection = (e: MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-[#151515] shadow-[0_0_10px_#AC9247]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[90%] mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-xl font-bold"
            style={{ color: theme.text }}
          >
            Narco City | FIB
          </a>

          {/* Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative px-2 py-1 font-medium text-sm transition-all duration-200"
                  style={{ color: isActive ? theme.neon : theme.text }}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full transition-transform duration-200 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ backgroundColor: theme.neon }}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            style={{ color: theme.text }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-[" + theme.background + "] top-16 left-0 transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex flex-col py-4">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-4 py-3 font-medium text-base transition-opacity duration-300"
                style={{
                  color: isActive ? theme.neon : theme.text,
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;