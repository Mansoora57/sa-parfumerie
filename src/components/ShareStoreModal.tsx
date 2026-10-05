import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { safeCopyToClipboard } from '../utils/clipboard';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  QrCode,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface ShareStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareStoreModal: React.FC<ShareStoreModalProps> = ({ isOpen, onClose }) => {
  const { domainSettings, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'whatsapp'>('link');

  if (!isOpen) return null;

  const productionStoreUrl = 'https://sa-parfumerie.web.app';
  const fallbackStoreUrl = 'https://sa-parfumerie.firebaseapp.com';
  const directStoreUrl = productionStoreUrl;
  const liveStoreUrl = productionStoreUrl;

  const whatsappMessage = `As-salamu alaykum! You are cordially invited to explore SHAHZEIN•A Parfumerie — our online flagship store featuring personalized bespoke fragrance recommendations, rare 35% Extrait flacons, and secure checkout with complimentary white-glove delivery across Pakistan:\n\n${productionStoreUrl}`;

  const handleCopyDirect = async () => {
    await safeCopyToClipboard(directStoreUrl);
    setCopied(true);
    showToast('Direct Store Link Copied! Customer will open store directly.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopy = async () => {
    await safeCopyToClipboard(liveStoreUrl);
    setCopied(true);
    showToast('Store address copied! Ready to send to any client.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    const link = document.createElement('a');
    link.href = `https://api.whatsapp.com/send?text=${encoded}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3d3226] rounded-xl max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Top Decorative Header */}
        <div className="p-6 border-b border-[#262018] flex items-center justify-between bg-gradient-to-r from-[#171410] via-[#1c1712] to-[#171410]">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-[#c5a059]" />
            <div>
              <h3 className="font-cinzel text-base font-bold text-[#f5f0e8] tracking-wider">
                Share Store Address
              </h3>
              <p className="text-[11px] text-[#9c8e7e]">
                Apna official store address kisi ko bhi dein (Instant Access)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8c7f6f] hover:text-[#f4efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Banner */}
        <div className="p-6 space-y-6">
          <div className="p-4 bg-[#181410] border border-[#3a2f22] rounded-lg text-center space-y-1">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-medium font-cinzel">
              Maison Shahzein · Online Flagship
            </div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#fbf9f5] tracking-wider">
              SHAHZEIN•A Parfumerie.pk
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Secure · TLS 1.3 Strict Encrypted · Active Now</span>
            </div>
          </div>

          {/* Quick Share Options */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab('link')}
              className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                activeTab === 'link'
                  ? 'bg-[#221c16] border-[#c5a059] text-[#c5a059]'
                  : 'bg-[#15120f] border-[#29221a] text-[#8e8170] hover:text-[#f4efe6]'
              }`}
            >
              <Copy className="w-4 h-4" />
              <span className="text-[11px] font-medium font-cinzel">Direct Link</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-[#221c16] border-[#c5a059] text-[#c5a059]'
                  : 'bg-[#15120f] border-[#29221a] text-[#8e8170] hover:text-[#f4efe6]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="text-[11px] font-medium font-cinzel">WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-[#221c16] border-[#c5a059] text-[#c5a059]'
                  : 'bg-[#15120f] border-[#29221a] text-[#8e8170] hover:text-[#f4efe6]'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-[11px] font-medium font-cinzel">Scan QR</span>
            </button>
          </div>

          {/* TAB 1: DIRECT LINK */}
          {activeTab === 'link' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Direct Store Link Card (100% Working, Direct Access) */}
              <div className="p-4 bg-gradient-to-br from-[#1c1711] to-[#120f0c] border-2 border-[#c5a059] rounded-lg space-y-3 shadow-xl shadow-black/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#f5e6c8] font-cinzel font-bold flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    <span>Direct Store Link (Direct Customer Access):</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded font-mono font-semibold">
                    100% DIRECT • NO WARNINGS
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 bg-[#0a0908] rounded border border-[#3d3122]">
                  <code className="font-mono text-xs text-[#f5f0e8] select-all font-semibold break-all">
                    {directStoreUrl}
                  </code>
                  <button
                    onClick={handleCopyDirect}
                    className="px-3.5 py-2 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-bold text-xs rounded transition-all cursor-pointer font-cinzel shrink-0 shadow-md flex items-center gap-1.5"
                  >
                    <span>{copied ? 'Copied!' : 'Copy Direct Link'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#b8a795] leading-relaxed">
                  Is direct link se customer <strong>bina kisi Google Redirect Notice ya intermediate warning ke</strong> seedha aapke store me enter hoga.
                </p>
              </div>

              {/* Secondary Mirror Live Address */}
              <div className="p-3.5 bg-[#171410] border border-[#3a2f22] rounded-lg space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#c5a059]">
                  <span className="font-cinzel font-semibold">Official Secondary Mirror URL:</span>
                  <span className="text-[10px] text-emerald-400 font-mono">100% LIVE</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 bg-[#0a0908] rounded border border-[#2b2217]">
                  <code className="font-mono text-xs text-[#dcd1c2] select-all break-all">
                    {fallbackStoreUrl}
                  </code>
                  <button
                    onClick={async () => {
                      await safeCopyToClipboard(fallbackStoreUrl);
                      showToast('Copied: https://sa-parfumerie.firebaseapp.com');
                    }}
                    className="px-2.5 py-1 bg-[#231d17] hover:bg-[#322920] text-[#c5a059] border border-[#3d3224] text-xs rounded transition-all cursor-pointer font-cinzel shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP SHARING */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-xs text-[#a49685]">
                Pre-composed luxury invitation message for your clients:
              </div>

              <div className="p-3.5 bg-[#0d0c0a] border border-[#2e261d] rounded-lg text-xs text-[#d0c3b2] italic font-cormorant text-base leading-relaxed max-h-36 overflow-y-auto">
                "{whatsappMessage}"
              </div>

              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs font-cinzel uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp to Client</span>
              </button>
            </div>
          )}

          {/* TAB 3: QR CODE */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center animate-in fade-in">
              <div className="text-xs text-[#a49685]">
                Show this QR Code to anyone in person or in salon to instantly open the store:
              </div>

              {/* High Contrast Luxury QR Code representation */}
              <div className="inline-block p-4 bg-white rounded-xl shadow-2xl mx-auto border-4 border-[#c5a059]">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(liveStoreUrl)}`}
                  alt="SHAHZEIN•A Parfumerie.pk Store QR Code"
                  className="w-44 h-44 object-contain"
                />
              </div>

              <div className="text-xs text-[#b8ab9a] font-cinzel">
                Scan with any phone camera to enter <strong>SHAHZEIN•A Parfumerie.pk</strong>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-[#0e0c0a] border-t border-[#221c16] flex items-center justify-between text-[11px] text-[#7d7162]">
          <span className="font-mono">SHAHZEIN•A Parfumerie.pk</span>
          <span className="text-emerald-400">All Security Protocols Enforced</span>
        </div>
      </div>
    </div>
  );
};
