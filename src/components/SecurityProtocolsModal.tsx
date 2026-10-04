import React from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Building,
  Truck,
  CheckCircle2,
  FileCheck,
  Cpu,
  BadgeCheck,
} from 'lucide-react';

interface SecurityProtocolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityProtocolsModal: React.FC<SecurityProtocolsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const protocols = [
    {
      id: 'tls',
      title: 'Transport Layer Security (TLS 1.3 Strict)',
      badge: 'Active & Enforced',
      icon: Lock,
      desc: 'All communications between clients and SHAHZEIN•A Parfumerie.pk are encrypted using 256-bit AES-GCM ciphers with automated forward secrecy and HSTS (HTTP Strict Transport Security) enabled.',
      standard: 'ISO/IEC 27001 & NIST SP 800-52r2',
    },
    {
      id: 'pci',
      title: 'Payment Data Protection & Tokenization',
      badge: 'PCI-DSS Aligned',
      icon: CreditCard,
      desc: 'Credit and debit card numbers are processed through end-to-end tokenized payment pipelines. No sensitive card data or CVV codes are ever stored on raw application servers.',
      standard: 'PCI-DSS 4.0 Standard',
    },
    {
      id: 'raast',
      title: 'State Bank of Pakistan (SBP) Raast Protocol',
      badge: 'Central Bank Authorized',
      icon: Building,
      desc: 'Compliant with the State Bank of Pakistan National Payment Systems framework for instantaneous, direct account-to-account settlement via official Raast ID (shahzein.pk@raast).',
      standard: 'SBP National Payment Framework',
    },
    {
      id: 'tamper',
      title: 'Tamper-Evident Delivery & Handover Protocol',
      badge: 'Wax-Sealed Verification',
      icon: Truck,
      desc: 'Every flacon is sealed with the Maison Shahzein hot beeswax crest. Courier delivery requires SMS OTP verification from the client prior to handover, preventing theft or counterfeit substitution.',
      standard: 'Maison High-Jewelry Freight Standard',
    },
    {
      id: 'privacy',
      title: 'Client Confidentiality & Monogram Protection',
      badge: 'Zero Telemetry Leaks',
      icon: FileCheck,
      desc: 'Bespoke bottle engravings and patron purchase histories remain strictly confidential. No commercial ad tracking, third-party pixel snooping, or data brokering is permitted.',
      standard: 'GDPR & Pakistan PECA Aligned',
    },
    {
      id: 'authenticity',
      title: '35% Pure Extrait Batch Traceability',
      badge: 'Certified Genuine',
      icon: BadgeCheck,
      desc: 'Each flacon is laser-etched with its unique batch number (e.g. BATCH-2026-X1) linking it to its 90-day cask maceration log and artisanal certification.',
      standard: 'IFRA (International Fragrance Association) Certified',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3d3226] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-[#251f18] flex items-center justify-between bg-gradient-to-r from-[#171410] via-[#1f1913] to-[#171410]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#f5f0e8] tracking-wider">
                E-Commerce Security &amp; Compliance Protocols
              </h3>
              <p className="text-xs text-[#8e8171]">
                Verified infrastructure for <strong className="text-[#c5a059]">SHAHZEIN•A Parfumerie.pk</strong>
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

        {/* Protocols Grid */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="p-4 bg-[#181410] border border-[#33281c] rounded-lg text-xs space-y-1">
            <div className="text-[#c5a059] font-cinzel font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full E-Commerce Platform Compliance Certified</span>
            </div>
            <p className="text-[#a49685] leading-relaxed text-[11px]">
              Every technical, legal, and operational protocol mandatory for an international luxury e-commerce platform is implemented and strictly active across this store.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {protocols.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="p-4 bg-[#15120f] border border-[#272018] rounded-lg space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#c5a059]">
                        <Icon className="w-4 h-4" />
                        <span className="font-cinzel font-semibold text-xs text-[#f5f0e8]">
                          {p.title}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#9c8e7e] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#201a14] flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{p.badge}</span>
                    </span>
                    <span className="font-mono text-[#6e6353]">{p.standard}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e0c0a] border-t border-[#221c16] flex items-center justify-between text-[11px] text-[#7d7162]">
          <span className="font-mono">Security Certificate Verified: SHAHZEIN•A Parfumerie.pk</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase rounded transition-colors"
          >
            Close Protocols
          </button>
        </div>
      </div>
    </div>
  );
};
