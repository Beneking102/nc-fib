import React, { memo, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FileText, Code, Award, Globe, Shield, ArrowUpRight } from 'lucide-react';

export const theme = {
    text: '#DFBE5D',
    background: '#151515',
    neon: '#AC9247',   
  };

  interface Subunit { name: string; description: string; }
  interface Unit { name: string; description: string; subunits?: Subunit[]; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; animation: string; }
  
  const units: Unit[] = [
    {
      name: 'Gang and Drug Division',
      description: 'Drug Observation Agency & Gang Task Force',
      icon: FileText,
      animation: 'fade-right',
      subunits: [
        { name: 'DOA', description: 'Ermittlungen zu Drogen & Drogenrouten' },
        { name: 'GTF', description: 'Gangs, Kommunikation & Waffenrouten' },
      ],
    },
    { name: 'Criminal Investigation Division', description: 'Korruption & interne Ermittlungen', icon: Shield, animation: 'fade-up', subunits: [
        { name: 'CID', description: '' },
      ], },
    { name: 'Special Interception Team', description: 'Gebietssicherung & Bergung bei Großeinsätzen', icon: Globe, animation: 'fade-left', subunits: [
        { name: 'SIT', description: '' },
      ], },
    { name: 'Air Support Division', description: 'Luftunterstützung & öffentliche Sicherheit', icon: Code, animation: 'fade-right', subunits: [
        { name: 'ASD', description: '' },
      ], },
  ];

const Departments = () => {
    useEffect(() => { AOS.init({ once: true, offset: 50 }); }, []);
    return (
      <section className="py-12 px-6" id="Units">
        <h2 className="text-4xl font-bold mb-8 text-center" style={{ backgroundClip: 'text', color: theme.text }}>
          Abteilungen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {units.map(unit => (
            <div key={unit.name} data-aos={unit.animation} data-aos-duration="1000" className="relative group">
              <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                <div className="absolute -z-10 inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${theme.neon}, ${theme.text})` }} />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                    <unit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold" style={{ color: theme.text }}>{unit.name}</h3>
                </div>
                <p className="mb-4" style={{ color: '#bbb' }}>{unit.description}</p>
  
                {unit.subunits && (
                  <div className="flex flex-wrap gap-2">
                    {unit.subunits.map(sub => (
                      <span
                        key={sub.name}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: `${theme.background}CC`,
                          border: `1px solid ${theme.neon}`,
                          color: theme.text,
                        }}
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  export default memo(Departments);