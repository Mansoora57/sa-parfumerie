import React from 'react';
import shahzeinLogoImg from '../assets/images/shahzein_white_line_logo_1791195088636.jpg';

interface ShahzeinBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ShahzeinBrandLogo: React.FC<ShahzeinBrandLogoProps> = ({ size = 'md', className = '' }) => {
  // Height sizing for the vertically stacked official logo
  const heights = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-22 md:h-24',
  };

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src={shahzeinLogoImg}
        alt="SHAHZEIN.A PARFUMERIE - BE REMEMBERED DIFFERENTLY"
        className={`${heights[size]} w-auto object-contain rounded transition-transform duration-300 group-hover:scale-[1.03] shadow-[0_4px_14px_rgba(0,0,0,0.85)]`}
        loading="eager"
      />
    </div>
  );
};
