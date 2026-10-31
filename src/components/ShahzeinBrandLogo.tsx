import React from 'react';
import shahzeinLogoImg from '../assets/images/shahzein_luxury_emblem_v9.png';

interface ShahzeinBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ShahzeinBrandLogo: React.FC<ShahzeinBrandLogoProps> = ({ size = 'md', className = '' }) => {
  // Height sizing for the wide luxury banner logo
  const heights = {
    sm: 'h-8 sm:h-10',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16 md:h-20',
  };

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src={shahzeinLogoImg}
        alt="SHAHZEIN.A PARFUMERIE - BE REMEMBERED DIFFERENTLY"
        className={`${heights[size]} w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]`}
        loading="eager"
      />
    </div>
  );
};
