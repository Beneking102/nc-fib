import React, { memo } from 'react';

export const theme = {
    text: '#DFBE5D',
    background: '#151515',
    neon: '#AC9247',
  };

export interface MostWantedPerson {
  lastName: string;
  firstName: string;
  birthDate: string;
  information: string;
  reward: string;
  note: string;
  dangerLevel: 'gefährlich' | 'ungefährlich';
  rewardInfo: string;
}

export let mostWantedList: MostWantedPerson[] = [];

const MostWanted = () => (
  <section className="py-12 px-6" id="MW">
    <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: theme.text }}>
      Most Wanted
    </h2>
    {mostWantedList.length === 0 ? (
      <p className="text-lg text-center" style={{ color: '#bbb' }}>Derzeit keine gesuchten Personen.</p>
    ) : (
      <div className="space-y-6">
        {mostWantedList.map(p => (
          <div key={`${p.lastName}-${p.firstName}`} className="p-6 rounded-2xl backdrop-blur-lg border" style={{ borderColor: theme.neon + '33' }}>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: theme.neon }}>
              {p.firstName} {p.lastName}
            </h3>
            <p style={{ color: '#ccc' }}><strong>Geburtsdatum:</strong> {p.birthDate}</p>
            <p style={{ color: '#ccc' }}><strong>Information:</strong> {p.information}</p>
            <p style={{ color: '#ccc' }}><strong>Belohnung:</strong> {p.reward}</p>
            <p style={{ color: '#ccc' }}><strong>Hinweis für Staatsbeamte:</strong> {p.note}</p>
            <p style={{ color: '#ccc' }}><strong>Gefahrenstufe:</strong> {p.dangerLevel}</p>
            <p style={{ color: '#ccc' }}><strong>Infos zur Belohnung:</strong> {p.rewardInfo}</p>
          </div>
        ))}
      </div>
    )}
  </section>
);
export default memo(MostWanted);