import React from 'react';
import { ShieldCheck, Sparkles, Droplet, Gem, Award, Feather } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Craftsmanship: React.FC = () => {
  const { setIsFinderOpen } = useStore();

  return (
    <section id="bespoke-craft" className="py-20 bg-[#0e0c0a] border-t border-[#221d17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.22em] uppercase text-[#c5a059] font-medium">
            <span>Haute Parfumerie Métier</span>
            <span aria-hidden="true">·</span>
            <span>Maison Shahzein</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#fbf9f5]">
            The Alchemy of Flacon &amp; Sillage
          </h2>

          <p className="font-cormorant text-xl text-[#d0c2b0] italic font-light">
            Every bottle is an ode to patience — ninety days of undisturbed cask maceration, micro-filtered crystal, and hand-engraved golden metal plaques.
          </p>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 bg-[#14110e] border border-[#262018] rounded-xl space-y-4 relative group hover:border-[#423627] transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#1e1913] border border-[#3d3224] flex items-center justify-center text-[#c5a059]">
              <Droplet className="w-6 h-6" />
            </div>

            <div className="text-[11px] font-mono tracking-wider uppercase text-[#c5a059]">
              01. Concentration
            </div>

            <h3 className="font-cinzel text-xl font-semibold text-[#f5f0e8]">
              35% Pure Extrait de Parfum
            </h3>

            <p className="text-xs text-[#a89b8a] leading-relaxed">
              While conventional commercial perfumes dilute fragrances to ten or fifteen percent, our elixirs boast a saturated thirty-five percent concentration of pure botanical and resinous oils, ensuring a magnetic longevity exceeding eighteen hours on fabric and pulse points.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-[#14110e] border border-[#262018] rounded-xl space-y-4 relative group hover:border-[#423627] transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#1e1913] border border-[#3d3224] flex items-center justify-center text-[#c5a059]">
              <Gem className="w-6 h-6" />
            </div>

            <div className="text-[11px] font-mono tracking-wider uppercase text-[#c5a059]">
              02. Flacon Sculpture
            </div>

            <h3 className="font-cinzel text-xl font-semibold text-[#f5f0e8]">
              Heavy Crystal &amp; Brass Cap
            </h3>

            <p className="text-xs text-[#a89b8a] leading-relaxed">
              Each flacon is cast from thick optical glass with precision-cut bevels that refract the natural amber and ruby hues of the macerated essence. Completed with a custom solid-weighted brass magnetic cap that snaps into alignment with satisfying resonance.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-[#14110e] border border-[#262018] rounded-xl space-y-4 relative group hover:border-[#423627] transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#1e1913] border border-[#3d3224] flex items-center justify-center text-[#c5a059]">
              <Feather className="w-6 h-6" />
            </div>

            <div className="text-[11px] font-mono tracking-wider uppercase text-[#c5a059]">
              03. Bespoke Inscription
            </div>

            <h3 className="font-cinzel text-xl font-semibold text-[#f5f0e8]">
              Hand-Engraved Monogram
            </h3>

            <p className="text-xs text-[#a89b8a] leading-relaxed">
              Make your flacon an heirloom. Our artisans hand-inscribe your chosen initials or milestone date onto a warm golden plaque, permanently affixed to the flacon prior to its sealing in our black lacquer vault coffret.
            </p>
          </div>
        </div>

        {/* Personalized Consultation Callout Banner */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#171410] via-[#201a14] to-[#171410] border border-[#3d3225] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#c5a059] font-cinzel">
              <Sparkles className="w-4 h-4" />
              <span>Unsure Which Creation Complements Your Aura?</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#fbf9f5] font-semibold">
              Take the Personalized Scent Consultation
            </h3>
            <p className="text-xs text-[#9d8e7c] max-w-xl">
              Answer four brief sensory questions to receive a calculated olfactory match, notes breakdown, and bespoke layering protocol tailored for you.
            </p>
          </div>

          <button
            onClick={() => setIsFinderOpen(true)}
            className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg whitespace-nowrap"
          >
            Start Scent Profiler
          </button>
        </div>
      </div>
    </section>
  );
};
