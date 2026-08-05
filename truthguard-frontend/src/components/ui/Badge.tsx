import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  children,
  className = '',
}) => {
  const styles = {
    success: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
    warning: 'bg-amber-50 text-[#F59E0B] border-amber-200',
    danger: 'bg-rose-50 text-[#DC2626] border-rose-200',
    info: 'bg-blue-50 text-[#1976D2] border-blue-200',
    neutral: 'bg-gray-100 text-[#6B7280] border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};