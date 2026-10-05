import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, Gift } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalPKR,
    setIsCheckoutOpen,
  } = useStore();

  const [selectedFreeSamples, setSelectedFreeSamples] = useState<string[]>([
    'Amber Sultani Privé 2ml',
    'Rose Nocturne de Taif 2ml',
  ]);

  const sampleOptions = [
    'Oud Shahzein Royale 2ml',
    'Rose Nocturne de Taif 2ml',
    'Amber Sultani Privé 2ml',
    'Bergamote Impériale 2ml',
    'Cuir d’Orient Réserve 2ml',
  ];

  const toggleSample = (sample: string) => {
    if (selectedFreeSamples.includes(sample)) {
      setSelectedFreeSamples(selectedFreeSamples.filter((s) => s !== sample));
    } else {
      if (selectedFreeSamples.length < 2) {
        setSelectedFreeSamples([...selectedFreeSamples, sample]);
      } else {
        setSelectedFreeSamples([selectedFreeSamples[1], sample]);
      }
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#12100e] border-l border-[#2e261d] w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#251f18] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
            <span className="font-cinzel text-sm tracking-[0.2em] uppercase text-[#f5f0e8] font-bold">
              Your Shopping Bag ({cart.length})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#8c7f6f] hover:text-[#f4efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#473b2d] mx-auto" />
              <p className="font-cinzel text-base text-[#cfc2b1]">Your shopping bag is empty</p>
              <p className="text-xs text-[#7e7160]">
                Explore our private vault to discover your signature perfume.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-5 py-2.5 bg-[#201b15] hover:bg-[#c5a059] text-[#e5d8c6] hover:text-[#0b0a09] border border-[#3b3124] text-xs font-cinzel uppercase tracking-wider rounded transition-all"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.fragranceId}-${item.selectedVolume}`}
                    className="p-3 bg-[#181511] border border-[#2b241c] rounded-lg flex gap-3 relative"
                  >
                    <img
                      src={item.fragrance.image}
                      alt={item.fragrance.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded bg-[#0c0b0a] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-cinzel text-xs font-semibold text-[#f5f0e8] truncate">
                            {item.fragrance.name}
                          </h4>
                          <div className="text-[11px] text-[#8e8170]">
                            {item.selectedVolume} · {item.fragrance.concentration}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.fragranceId, item.selectedVolume)}
                          className="text-[#6d6152] hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Engraving Tag if present */}
                      {item.customEngraving && (
                        <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#231d16] border border-[#c5a059]/40 rounded text-[9px] text-[#c5a059] font-mono tracking-wider">
                          <span>ENGRAVED:</span>
                          <strong>{item.customEngraving}</strong>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#352c21] rounded bg-[#100e0c]">
                          <button
                            onClick={() => updateCartQuantity(item.fragranceId, item.selectedVolume, -1)}
                            className="p-1 text-[#8e8170] hover:text-[#f4efe6] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs px-2.5 text-[#f4efe6] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.fragranceId, item.selectedVolume, 1)}
                            className="p-1 text-[#8e8170] hover:text-[#f4efe6] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono text-xs font-semibold text-[#f4efe6] tabular-nums">
                          ₨ {(item.pricePKR * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complimentary Samples Selection (Luxury Perk) */}
              <div className="p-3.5 bg-[#171410] border border-[#2e261d] rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-cinzel">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Complimentary Discovery Miniatures</span>
                  </div>
                  <span className="text-[10px] text-[#8e8170]">
                    Select 2 ({selectedFreeSamples.length}/2)
                  </span>
                </div>

                <div className="space-y-1.5">
                  {sampleOptions.map((sample) => {
                    const isChecked = selectedFreeSamples.includes(sample);
                    return (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => toggleSample(sample)}
                        className={`w-full flex items-center justify-between p-2 rounded text-[11px] text-left border transition-colors ${
                          isChecked
                            ? 'bg-[#221c16] border-[#c5a059] text-[#f4efe6]'
                            : 'bg-[#100e0c] border-[#251f18] text-[#8e8170] hover:text-[#cfc2b1]'
                        }`}
                      >
                        <span>{sample}</span>
                        <span className="text-[10px] font-mono text-[#c5a059]">
                          {isChecked ? 'SELECTED (FREE)' : '+ ADD'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Complimentary Packaging Guarantee */}
              <div className="flex items-center gap-2.5 p-3 bg-[#15120f] border border-[#282119] rounded-lg text-xs text-[#9d8f7e]">
                <Gift className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  Every perfume bottle is housed in our signature black lacquer gift box, hand-tied with silk ribbon and sealed with wax.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout Trigger */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#251f18] bg-[#0e0c0a] space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#8c7f6f]">
                <span>Estimated Shipping</span>
                <span className="text-[#c5a059] font-medium">Complimentary White Glove</span>
              </div>

              <div className="flex justify-between text-sm font-cinzel text-[#f4efe6]">
                <span>Total Due</span>
                <span className="font-mono text-base font-semibold tabular-nums text-[#c5a059]">
                  ₨ {cartTotalPKR.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-[0.2em] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/15"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proceed to Secure Checkout</span>
            </button>

            <div className="text-center text-[10px] text-[#6d6152] font-mono">
              256-bit TLS Encrypted · Verified on SHAHZEIN.A PARFUMERIE.PK
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
