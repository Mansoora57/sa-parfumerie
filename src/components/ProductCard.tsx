import React, { useState } from 'react';
import { Fragrance } from '../types';
import { useStore } from '../context/StoreContext';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  fragrance: Fragrance;
}

export const ProductCard: React.FC<ProductCardProps> = ({ fragrance }) => {
  const { setSelectedFragrance, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<'10ml Discovery' | '50ml' | '100ml'>('100ml');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentOption = fragrance.volumeOptions.find((v) => v.size === selectedSize) || fragrance.volumeOptions[2] || fragrance.volumeOptions[0];
  const displayPrice = currentOption ? currentOption.pricePKR : fragrance.pricePKR;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(fragrance, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => setSelectedFragrance(fragrance)}
      className="group relative bg-[#13110f] border border-[#26211a] hover:border-[#4f4333] rounded-lg overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Zone (65-70% height) */}
      <div className="relative aspect-[4/5] bg-[#0c0b0a] overflow-hidden">
        <img
          src={fragrance.image}
          alt={fragrance.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedFallback) {
              target.dataset.triedFallback = 'true';
              target.src = '/images/perfume_oud_royal_1791027761416.jpg';
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Quiet 1-line text status kicker - Zero pill discipline */}
        <div className="absolute top-3 left-3">
          {fragrance.isBestseller && (
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a059] font-medium bg-[#0c0b0a]/80 backdrop-blur px-2 py-0.5 border border-[#3d3224]">
              Maison Bestseller
            </span>
          )}
          {!fragrance.isBestseller && fragrance.status === 'Low Stock' && (
            <span className="text-[10px] tracking-[0.2em] uppercase text-amber-400 font-medium bg-[#0c0b0a]/80 backdrop-blur px-2 py-0.5 border border-amber-900/40">
              Only {fragrance.stockQuantity} Remaining
            </span>
          )}
        </div>

        {/* Quick View Floating Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0b0a]/90 text-[#f4efe6] text-xs font-cinzel tracking-wider rounded border border-[#443828]">
            <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Inspect Notes &amp; Monogram</span>
          </span>
        </div>
      </div>

      {/* Product Information Zone */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8e8172] tracking-[0.16em] uppercase">
            <span>{fragrance.collection}</span>
            <span aria-hidden="true">·</span>
            <span>{fragrance.concentration}</span>
          </div>

          {/* Fragrance Name */}
          <h3 className="font-cinzel text-base font-semibold text-[#f5f0e8] group-hover:text-[#c5a059] transition-colors mt-1">
            {fragrance.name}
          </h3>

          {/* French Subtitle */}
          <p className="font-cormorant italic text-xs text-[#b0a291] mt-0.5 line-clamp-1">
            {fragrance.frenchTitle}
          </p>

          {/* Scent Accord Notes */}
          <div className="text-[11px] text-[#7d7162] mt-2 line-clamp-1">
            <span className="text-[#a49685]">Notes:</span> {fragrance.topNotes.slice(0, 2).join(', ')}, {fragrance.heartNotes[0]}
          </div>
        </div>

        {/* Flacon Volume Selector Buttons */}
        <div className="space-y-3 pt-2 border-t border-[#1f1b16]">
          <div
            className="flex items-center gap-1 bg-[#1a1714] p-1 rounded border border-[#2b251d]"
            onClick={(e) => e.stopPropagation()}
          >
            {fragrance.volumeOptions.map((opt) => (
              <button
                key={opt.size}
                type="button"
                onClick={() => setSelectedSize(opt.size)}
                className={`flex-1 py-1 text-[10px] tracking-wider font-medium rounded transition-colors ${
                  selectedSize === opt.size
                    ? 'bg-[#c5a059] text-[#0b0a09] font-bold shadow-sm'
                    : 'text-[#9c8e7e] hover:text-[#f4efe6]'
                }`}
              >
                {opt.size.replace(' Discovery', '')}
              </button>
            ))}
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="font-mono text-base font-semibold text-[#f5f0e8] tabular-nums">
                ₨ {displayPrice.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#716556]">Tax &amp; Duty Included</div>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={fragrance.stockQuantity === 0}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-cinzel font-medium rounded transition-all cursor-pointer ${
                fragrance.stockQuantity === 0
                  ? 'bg-[#1e1b17] text-[#6b6052] cursor-not-allowed'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#221e18] hover:bg-[#c5a059] text-[#e8dac8] hover:text-[#0b0a09] border border-[#3b3227]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : fragrance.stockQuantity === 0 ? (
                <span>Vault Depleted</span>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
