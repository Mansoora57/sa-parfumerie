import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Globe, Sliders, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { ShahzeinBrandLogo } from './ShahzeinBrandLogo';

export const Footer: React.FC = () => {
  const { setIsFinderOpen, setIsDomainModalOpen, setActiveView, isWorkingPlatform, setIsWorkingPlatform, showToast } = useStore();
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
      {/* Brand & Address Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Maison Identity */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <ShahzeinBrandLogo size="lg" />
            </div>

            <p className="text-xs text-[#a09280] leading-relaxed max-w-sm">
              Luxury perfume house crafting pure concentrated perfume from rare aged agarwood, harvested Taif roses, and fossilized amber.
            </p>

            {/* Hosting address marker (Working platform only) */}
            {isWorkingPlatform && (
              <div className="pt-2">
                <button
                  onClick={() => setIsDomainModalOpen(true)}
                  className="inline-flex items-center gap-2 p-2 rounded bg-[#13100d] border border-[#2b2218] hover:border-[#c5a059] text-xs text-[#c5a059] font-mono transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>STORE: SHAHZEIN•A-PARFUMERIE</span>
                </button>
              </div>
            )}
          </div>


          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-cinzel uppercase tracking-widest text-[#f5f0e8] font-semibold">
              The Perfume House
            </div>
            <ul className="space-y-2 text-[#9a8c7b]">
              <li>
                <a href="#collections" className="hover:text-[#c5a059] transition-colors">
                  The Vault Collections
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsFinderOpen(true)}
                  className="hover:text-[#c5a059] transition-colors cursor-pointer text-left"
                >
                  Scent Profiler
                </button>
              </li>
              <li>
                <a href="#bespoke-craft" className="hover:text-[#c5a059] transition-colors">
                  Bottle Craftsmanship
                </a>
              </li>
              {isWorkingPlatform && (
                <li>
                  <button
                    onClick={() => setIsDomainModalOpen(true)}
                    className="hover:text-[#c5a059] transition-colors cursor-pointer text-left"
                  >
                    Custom Domain &amp; DNS
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Client Concierge & Atelier */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-cinzel uppercase tracking-widest text-[#f5f0e8] font-semibold">
              Studio &amp; Customer Care
            </div>
            <div className="space-y-2 text-xs text-[#9a8c7b]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Clifton Private Studio, Block 4, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>+92 300 8241920 (VIP Client Care)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>concierge@shahzein.a-parfumerie.pk</span>
              </div>
            </div>
          </div>

          {/* Secure Guarantees & CMS Portal */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-cinzel uppercase tracking-widest text-[#f5f0e8] font-semibold">
              {isWorkingPlatform ? 'Security & Store CMS' : 'Authenticity Guarantee'}
            </div>
            <p className="text-xs text-[#8c7e6e] leading-relaxed">
              Protected by 256-bit TLS encryption. Seamless payment processing via 3D Secure, Raast Instant Settlement, and Cash on Delivery.
            </p>

            {isWorkingPlatform && (
              <div className="pt-2">
                <button
                  onClick={() => setActiveView('cms')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#17130f] hover:bg-[#231d16] text-[#c5a059] border border-[#3b3023] rounded text-xs transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Access CMS Inventory Management</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-12 mt-12 border-t border-[#1a1611] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6d6051]">
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
