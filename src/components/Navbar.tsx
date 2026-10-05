import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Sparkles,
  Globe,
  ShieldCheck,
  Sliders,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { SecurityProtocolsModal } from './SecurityProtocolsModal';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsFinderOpen,
    setIsDomainModalOpen,
    activeView,
    setActiveView,
    fragrances,
    setSelectedFragrance,
    domainSettings,
    showToast,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProtocolsOpen, setIsProtocolsOpen] = useState(false);

  const lowStockCount = fragrances.filter((f) => f.stockQuantity <= f.lowStockThreshold).length;

  const searchResults = searchQuery.trim()
    ? fragrances.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          f.heartNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          f.baseNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0b0a]/95 backdrop-blur-md border-b border-[#221e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#d4af37] hover:text-[#f4efe6] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#9a8d7d] hover:text-[#c5a059]"
              aria-label="Search perfumes"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium text-[#c5baa8]">
            <a
              href="#collections"
              onClick={() => setActiveView('store')}
              className="hover:text-[#c5a059] transition-colors py-2 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              The Collections
            </a>

            <button
              onClick={() => setIsFinderOpen(true)}
              className="flex items-center gap-1.5 text-[#e5caa0] hover:text-white transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Scent Profiler</span>
            </button>

            <a
              href="#bespoke-craft"
              onClick={() => setActiveView('store')}
              className="hover:text-[#c5a059] transition-colors py-2 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              The Craft
            </a>

            <button
              onClick={() => setIsProtocolsOpen(true)}
              className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors cursor-pointer py-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Security Protocols</span>
            </button>

            <button
              onClick={() => setIsDomainModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors cursor-pointer py-2"
            >
              <Globe className="w-3.5 h-3.5 text-[#a89988]" />
              <span>Domain &amp; DNS</span>
            </button>
          </nav>

          {/* Right Action Icons: CMS, Search & Cart */}
          <div className="flex items-center gap-3">
            {/* View Mode Switcher: Storefront vs CMS Inventory */}
            <button
              onClick={() => setActiveView(activeView === 'store' ? 'cms' : 'store')}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all rounded ${
                activeView === 'cms'
                  ? 'bg-[#c5a059] text-[#0b0a09] font-semibold'
                  : 'bg-[#1b1712] text-[#e3dac9] hover:bg-[#25201a] border border-[#3d3224]'
              }`}
              title="Toggle CMS Inventory Dashboard"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{activeView === 'cms' ? 'Return to Store' : 'CMS'}</span>
              {lowStockCount > 0 && activeView === 'store' && (
                <span className="ml-1 bg-amber-500/20 text-amber-300 text-[10px] px-1.5 rounded-full border border-amber-500/30">
                  {lowStockCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#171411] border border-[#2b251e] rounded text-xs text-[#9a8e7e] hover:text-[#f4efe6] hover:border-[#42392e] transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[11px] tracking-wide">Search notes...</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3 py-2 bg-[#191612] hover:bg-[#25201a] border border-[#382f24] rounded transition-all text-[#f4efe6] group cursor-pointer"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#c5a059] text-[#0b0a09] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs tracking-wider font-cinzel">
                Coffret
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#100e0c] border-b border-[#2a241c] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3 text-xs tracking-[0.18em] uppercase font-medium text-[#c5baa8]">
              <a
                href="#collections"
                onClick={() => {
                  setActiveView('store');
                  setMobileMenuOpen(false);
                }}
                className="py-2 hover:text-[#c5a059] border-b border-[#1f1b16]"
              >
                The Collections
              </a>

              <button
                onClick={() => {
                  setIsFinderOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-left flex items-center justify-between text-[#e5caa0] hover:text-white border-b border-[#1f1b16]"
              >
                <span>Personalized Scent Profiler</span>
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
              </button>

              <button
                onClick={() => {
                  setIsProtocolsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-left flex items-center justify-between text-emerald-400 border-b border-[#1f1b16]"
              >
                <span>Security &amp; Protocols Inspector</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsDomainModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-left flex items-center justify-between hover:text-[#c5a059] border-b border-[#1f1b16]"
              >
                <span>Hosting &amp; DNS Architecture</span>
                <Globe className="w-4 h-4 text-[#a89988]" />
              </button>

              <button
                onClick={() => {
                  setActiveView(activeView === 'store' ? 'cms' : 'store');
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-left flex items-center justify-between text-[#c5a059]"
              >
                <span>{activeView === 'cms' ? 'Return to Store' : 'CMS Inventory Dashboard'}</span>
                <Sliders className="w-4 h-4 text-[#c5a059]" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-20">
          <div className="bg-[#14120f] border border-[#3b3227] rounded-lg max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className="absolute top-5 right-5 text-[#9a8d7d] hover:text-[#f4efe6]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel text-lg tracking-wider text-[#e6d8c3] mb-4">
              Search the Olfactory Archive
            </h3>

            <div className="relative mb-6">
              <input
                type="text"
                autoFocus
                placeholder="Search by notes (e.g. Cambodian Oud, Taif Rose, Saffron, Vanilla)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1b17] border border-[#3b3227] rounded px-4 py-3 text-sm text-[#f5f0e8] placeholder-[#7d7162] focus:outline-none focus:border-[#c5a059]"
              />
              <Search className="absolute right-3.5 top-3.5 w-5 h-5 text-[#7d7162]" />
            </div>

            {searchQuery.trim() && (
              <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                {searchResults.length === 0 ? (
                  <p className="text-xs text-[#8c8072] text-center py-6">
                    No fragrances found matching "{searchQuery}".
                  </p>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedFragrance(item);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-4 p-2.5 rounded bg-[#1b1814] hover:bg-[#25211b] border border-transparent hover:border-[#3d3326] cursor-pointer transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded bg-[#0c0b0a]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-[#c5a059] uppercase tracking-wider">
                          {item.collection} · {item.concentration}
                        </div>
                        <div className="text-sm font-cinzel text-[#f4efe6] truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#9a8d7d] truncate">
                          Notes: {item.topNotes.slice(0, 2).join(', ')}, {item.heartNotes[0]}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#f5f0e8] tabular-nums">
                          ₨ {item.pricePKR.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#786c5e]">
                          {item.status}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Security Protocols Modal */}
      <SecurityProtocolsModal isOpen={isProtocolsOpen} onClose={() => setIsProtocolsOpen(false)} />
    </>
  );
};
