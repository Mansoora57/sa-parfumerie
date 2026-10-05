import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, ShoppingBag, ShieldCheck, Check, Clock, Wind } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedFragrance, setSelectedFragrance, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<'10ml Discovery' | '50ml' | '100ml'>('100ml');
  const [engravingText, setEngravingText] = useState('');
  const [enableEngraving, setEnableEngraving] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!selectedFragrance) return null;

  const currentOption =
    selectedFragrance.volumeOptions.find((v) => v.size === selectedSize) ||
    selectedFragrance.volumeOptions[2] ||
    selectedFragrance.volumeOptions[0];
  const price = currentOption ? currentOption.pricePKR : selectedFragrance.pricePKR;

  const handleAdd = () => {
    addToCart(
      selectedFragrance,
      selectedSize,
      enableEngraving && engravingText.trim() ? engravingText.trim().toUpperCase() : undefined
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedFragrance(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3b3227] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedFragrance(null)}
          className="absolute top-4 right-4 z-10 p-2 text-[#9a8d7d] hover:text-[#f4efe6] bg-[#0c0b0a]/80 rounded-full border border-[#2d251d] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Flacon Image & Bespoke Plaque Preview */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-[#0c0b0a] border border-[#2f271f] aspect-[4/5]">
              <img
                src={selectedFragrance.image}
                alt={selectedFragrance.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/images/perfume_oud_royal_1791027761416.jpg';
                  }
                }}
                className="w-full h-full object-cover"
              />

              {/* Bespoke Plaque Engraving Simulation Overlay */}
              {enableEngraving && engravingText.trim() && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1b1713]/90 border border-[#c5a059] px-4 py-2 rounded shadow-xl text-center backdrop-blur-sm min-w-[160px] animate-in fade-in zoom-in-95">
                  <div className="text-[8px] tracking-[0.25em] text-[#9c8d7b] uppercase">
                    Bespoke Monogram
                  </div>
                  <div className="font-cinzel text-xs font-bold text-[#c5a059] tracking-[0.2em] mt-0.5">
                    {engravingText.toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sillage & Longevity Bar */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#191612] rounded border border-[#2b241c] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <div>
                  <div className="text-[10px] text-[#7d7162] uppercase tracking-wider">Longevity</div>
                  <div className="text-[#f4efe6] font-medium">{selectedFragrance.longevity}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#c5a059]" />
                <div>
                  <div className="text-[10px] text-[#7d7162] uppercase tracking-wider">Scent Trail</div>
                  <div className="text-[#f4efe6] font-medium">{selectedFragrance.sillage}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fragrance Architecture, Customization & Purchase */}
          <div className="md:col-span-7 space-y-6">
            <div>
              {/* Clean metadata */}
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a059] font-medium">
                <span>{selectedFragrance.collection}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedFragrance.concentration}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8e8070]">SKU: {selectedFragrance.sku}</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5f0e8] mt-1">
                {selectedFragrance.name}
              </h2>
              <p className="font-cormorant italic text-base text-[#cfc2b0] mt-0.5">
                {selectedFragrance.frenchTitle}
              </p>

              <div className="font-mono text-2xl font-semibold text-[#f5f0e8] mt-3 tabular-nums">
                ₨ {price.toLocaleString()}
                <span className="text-xs text-[#8c7f6f] font-sans font-normal ml-2">
                  (Includes custom luxury presentation box)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#c4b7a5] leading-relaxed">
              {selectedFragrance.description}
            </p>

            {/* Fragrance Pyramid */}
            <div className="bg-[#181511] p-4 rounded-lg border border-[#2f271e] space-y-3">
              <div className="text-[11px] tracking-[0.2em] uppercase font-cinzel text-[#c5a059]">
                Fragrance Notes &amp; Pyramid
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[#f4efe6] w-20 shrink-0 text-[11px] uppercase tracking-wider">
                    Top Notes:
                  </span>
                  <span className="text-[#c5baa8]">{selectedFragrance.topNotes.join(' · ')}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[#f4efe6] w-20 shrink-0 text-[11px] uppercase tracking-wider">
                    Heart Notes:
                  </span>
                  <span className="text-[#c5baa8]">{selectedFragrance.heartNotes.join(' · ')}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[#f4efe6] w-20 shrink-0 text-[11px] uppercase tracking-wider">
                    Base Notes:
                  </span>
                  <span className="text-[#c5baa8]">{selectedFragrance.baseNotes.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Bottle Volume Picker */}
            <div className="space-y-2">
              <label className="text-[11px] tracking-[0.2em] uppercase text-[#a89a88] block">
                Select Bottle Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {selectedFragrance.volumeOptions.map((opt) => (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setSelectedSize(opt.size)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      selectedSize === opt.size
                        ? 'bg-[#221d17] border-[#c5a059] text-[#f4efe6]'
                        : 'bg-[#15120f] border-[#29221a] text-[#8e8171] hover:text-[#f4efe6]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{opt.size}</div>
                    <div className="text-[11px] text-[#c5a059] font-mono tabular-nums">
                      ₨ {opt.pricePKR.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Engraving Section */}
            <div className="p-3.5 bg-[#171410] border border-[#2d251d] rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="text-xs font-medium text-[#f4efe6] tracking-wide">
                    Complimentary Bottle Engraving
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableEngraving(!enableEngraving)}
                  className={`text-[11px] font-semibold transition-colors ${
                    enableEngraving ? 'text-[#c5a059]' : 'text-[#7d7162] hover:text-[#c5a059]'
                  }`}
                >
                  {enableEngraving ? 'Enabled (₨ 0)' : '+ Enable Monogram'}
                </button>
              </div>

              {enableEngraving && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Enter initials or name (e.g. S.A. 2026)"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-[#100e0c] border border-[#3b3125] rounded px-3 py-2 text-xs text-[#f5f0e8] placeholder-[#6e6354] uppercase tracking-widest focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[10px] text-[#8a7c6b]">
                    Delicately hand-engraved onto a warm golden brass crest fixed to your bottle.
                  </p>
                </div>
              )}
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={selectedFragrance.stockQuantity === 0}
                className={`w-full py-4 text-xs font-cinzel font-semibold tracking-[0.2em] uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  selectedFragrance.stockQuantity === 0
                    ? 'bg-[#1d1a16] text-[#6e6353] cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] shadow-[#c5a059]/15'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : selectedFragrance.stockQuantity === 0 ? (
                  <span>Out of Stock in Vault</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₨ {price.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#7d7162] mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit Secure Checkout · Complimentary White Glove Shipping Across Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
