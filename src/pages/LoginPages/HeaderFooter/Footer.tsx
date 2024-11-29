 // Footer.tsx
import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex w-full bg-zinc-600 min-h-[240px] max-md:max-w-full" />
  );
};

export default Footer;
