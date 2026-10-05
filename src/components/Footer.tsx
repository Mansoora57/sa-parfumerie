import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShahzeinBrandLogo } from './ShahzeinBrandLogo';

export const Footer: React.FC = () => {
  const { isWorkingPlatform, setIsWorkingPlatform, showToast } = useStore();
  const [clickCount, setClickCount] = React.useState(0);

  const handleSecretAdminUnlock = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      const nextState = !isWorkingPlatform;
      setIsWorkingPlatform(nextState);
      setClickCount(0);
      showToast(nextState ? '✨ Boutique Master Controls Unlocked' : 'Storefront Customer View Enabled');
    }
  };

  return (
    <footer className="bg-[#090807] border-t border-[#1f1a14] text-xs text-[#8e8170]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Centered Maison Identity */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center">
            <ShahzeinBrandLogo size="lg" />
          </div>

          <p className="text-xs text-[#a09280] leading-relaxed max-w-md mx-auto">
            Haute Parfumerie house crafting pure concentrated extrait de parfum from rare aged agarwood, harvested Taif roses, and fossilized amber.
          </p>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 mt-8 border-t border-[#1a1611] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6d6051]">
          <div
            onClick={handleSecretAdminUnlock}
            className="cursor-default select-none transition-colors hover:text-[#8e8170]"
            title="Maison Official Copyright"
          >
            © 2026 SHAHZEIN•A PARFUMERIE.PK (PVT) LTD. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span>Handcrafted in Pakistan &amp; France</span>
            <span>·</span>
            <span>SHAHZEIN•A Parfumerie.pk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
