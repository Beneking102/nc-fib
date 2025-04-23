import React, { memo } from 'react';

export const theme = {
    text: '#DFBE5D',
    background: '#151515',
    neon: '#AC9247',
  };

export interface Leader { id: string;  image: string; }

export const leaders: Leader[] = [
  { id: 'FIB-01',  image: '/fib-01.png' },
  { id: 'FIB-02',  image: '/fib-03.png' },
  { id: 'FIB-03', image: '/Photo.png' },
];

const Leadership = () => (
  <section className="py-12 px-6" id="Boss">
    <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: theme.text }}>
      Führungsebene
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {leaders.map(l => (
        <div key={l.id} className="text-center p-6 backdrop-blur-lg rounded-2xl border" style={{ borderColor: theme.neon + '33' }}>
          <img src={l.image} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
          <p className="font-semibold" style={{ color: theme.text }}>{l.id}</p>
        </div>
      ))}
    </div>
  </section>
);
export default memo(Leadership);