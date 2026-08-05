import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';

export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
};