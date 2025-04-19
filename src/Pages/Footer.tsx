import React, { memo } from 'react';

export const theme = {
    text: '#DFBE5D',
    background: '#151515',
    neon: '#AC9247',
  };

const Footer = () => (
  <footer className="py-6 text-center" >
    <p style={{ color: theme.text }}>
      © {new Date().getFullYear()} Narco City FIB. Made by Bene.
    </p>
  </footer>
);

export default memo(Footer);
