import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#072B74] hover:bg-[#0A3A96] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-[#1976D2] hover:bg-[#1565C0] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-[#072B74] text-[#072B74] hover:bg-[#072B74]/5",
    ghost: "text-[#111827] hover:bg-gray-100",
    danger: "bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </motion.button>
  );
};