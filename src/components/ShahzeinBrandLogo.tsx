import React from 'react';

interface ShahzeinBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ShahzeinBrandLogo: React.FC<ShahzeinBrandLogoProps> = ({ size = 'md', className = '' }) => {
  // Height sizing for the vertically stacked official logo
  const heights = {
    sm: 'h-13 sm:h-15',
    md: 'h-16 sm:h-20',
    lg: 'h-20 sm:h-24 md:h-28',
  };

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src="/images/shahzein-official-logo.svg?v=20261005"
        alt="SHAHZEIN.A PARFUMERIE - BE REMEMBERED DIFFERENTLY"
        className={`${heights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]`}
        loading="eager"
      />
    </div>
  );
};
