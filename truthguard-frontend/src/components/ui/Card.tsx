import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-sm ${
        hoverable ? 'hover:shadow-xl hover:border-[#1976D2]/30 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};