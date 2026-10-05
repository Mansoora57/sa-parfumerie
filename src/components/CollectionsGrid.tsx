import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

export const CollectionsGrid: React.FC = () => {
  const { fragrances, setIsFinderOpen } = useStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Perfumes' },
    { id: 'Oud Royale', label: 'Oud Royale' },
    { id: 'Floral Nocturne', label: 'Floral Nocturne' },
    { id: 'Amber Heritage', label: 'Amber Heritage' },
    { id: 'L’Agrume Impérial', label: 'L’Agrume Impérial' },
    { id: 'Private Reserve', label: 'Private Reserve' },
  ];

  const displayedFragrances =
    activeFilter === 'all'
      ? fragrances
      : fragrances.filter((f) => f.collection === activeFilter);

  return (
    <section id="collections" className="py-20 bg-[#0c0b0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading & Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#221c16]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a059] font-medium">
              <span>The Private Collection</span>
              <span aria-hidden="true">·</span>
              <span>Available for Immediate Dispatch</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-[#fbf9f5]">
              Masterpiece Perfumes
            </h2>

            <p className="text-xs text-[#a49685] max-w-xl">
              Each creation is hand-poured in micro-batches and bottled in beveled French crystal with a hand-affixed golden crest.
            </p>
          </div>

          {/* Scent consultation trigger */}
          <div>
            <button
              onClick={() => setIsFinderOpen(true)}
              className="flex items-center gap-2 text-xs font-cinzel text-[#c5a059] hover:text-[#f4efe6] transition-colors py-2 border-b border-[#c5a059]/40 hover:border-[#f4efe6] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need help deciding? Open Scent Profiler →</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Tabs (functional segmented buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 text-xs font-cinzel tracking-wider uppercase rounded transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#c5a059] text-[#0b0a09] font-bold shadow-md'
                  : 'bg-[#15120f] text-[#9c8e7d] hover:text-[#f4efe6] border border-[#262018]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFragrances.map((fragrance) => (
            <ProductCard key={fragrance.id} fragrance={fragrance} />
          ))}
        </div>
      </div>
    </section>
  );
};
