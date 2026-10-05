import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Droplet } from 'lucide-react';
import heroPerfumeImg from '../assets/images/hero_luxury_perfume_1791027749457.jpg';
import shahzeinLogoImg from '../assets/images/shahzein_white_line_logo_1791195088636.jpg';

export const Hero: React.FC = () => {
  const { setIsFinderOpen, fragrances, setSelectedFragrance } = useStore();
  const featuredFragrance = fragrances.find((f) => f.id === 'oud-shahzein-royale') || fragrances[0];

  return (
    <section className="relative bg-[#0c0b0a] overflow-hidden border-b border-[#221e1a]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#a17a3a]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Official Grand Maison Emblem & Brand Mark */}
            <div className="pb-2 pt-1">
              <img
                src={shahzeinLogoImg}
                alt="SHAHZEIN.A PARFUMERIE - BE REMEMBERED DIFFERENTLY"
                className="h-36 sm:h-44 md:h-48 lg:h-52 w-auto max-w-full object-contain rounded-lg border border-[#c5a059]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-[1.02]"
                loading="eager"
              />
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#fbf9f5] leading-[1.15] text-balance">
              The Sovereign Art of Bespoke Fragrance.
            </h1>

            {/* Editorial Prose */}
            <p className="font-cormorant text-xl sm:text-2xl text-[#d4c8b8] leading-relaxed max-w-2xl font-light italic">
              Distilled from aged Cambodian agarwood, dawn-picked Taif roses, and fossilized Baltic amber. Formulated at thirty-five percent perfume oil concentration for an eternal, magnetic sillage.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-semibold text-xs tracking-[0.16em] uppercase rounded transition-all duration-200 shadow-lg shadow-[#c5a059]/15 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0b0a09] group-hover:rotate-12 transition-transform" />
                <span>Personalized Scent Profiler</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#collections"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#171411] hover:bg-[#231e18] text-[#f4efe6] border border-[#3b3227] hover:border-[#c5a059] font-medium text-xs tracking-[0.16em] uppercase rounded transition-all duration-200"
              >
                <span>Explore The Vault</span>
              </a>
            </div>

            {/* Trust and Authenticity Markers (Clean unboxed text) */}
            <div className="pt-6 border-t border-[#1f1b16] grid grid-cols-3 gap-4 text-xs text-[#a69989]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#f4efe6] font-medium font-cinzel">
                  <Droplet className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>35% Pure Extrait</span>
                </div>
                <p className="text-[11px] text-[#7d7162]">Highest grade artisanal concentration</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#f4efe6] font-medium font-cinzel">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Secure Flacon Box</span>
                </div>
                <p className="text-[11px] text-[#7d7162]">Wax-sealed tamper-proof packaging</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#f4efe6] font-medium font-cinzel">
                  <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Bespoke Engraving</span>
                </div>
                <p className="text-[11px] text-[#7d7162]">Complimentary custom bottle monogramming</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#c5a059]/20 via-[#403525]/30 to-transparent rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Main Flacon Image */}
              <div className="relative rounded-lg overflow-hidden bg-[#14120f] border border-[#3b3227] shadow-2xl">
                <img
                  src={heroPerfumeImg}
                  alt="Shahzein.A Parfumerie Flacon"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle scrim overlay with product details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/80 to-transparent p-6 text-left">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] tracking-[0.24em] uppercase text-[#c5a059] font-medium">
                      Flagship Masterpiece
                    </span>
                    <span className="font-mono text-xs text-[#f5f0e8] tabular-nums font-semibold">
                      ₨ {featuredFragrance.pricePKR.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl text-[#fbf9f5] font-semibold">
                    {featuredFragrance.name}
                  </h3>
                  <p className="text-xs text-[#b8ab9a] mt-1 line-clamp-2">
                    Aged Cambodian agarwood, rare saffron, and Taif roses distilled in French oak.
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedFragrance(featuredFragrance)}
                      className="text-xs text-[#c5a059] hover:text-[#f4efe6] underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Inspect Flacon &amp; Notes
                    </button>
                    <span className="text-[11px] text-[#7e7162]">
                      100ml / 3.4 FL. OZ. Extrait
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
