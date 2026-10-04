import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle,
  Lock,
  ArrowRight,
  Smartphone,
  Building,
  QrCode,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotalPKR, addOrder, showToast } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Karachi',
    postalCode: '75600',
    country: 'Pakistan',
    deliveryMethod: 'Royal White Glove Courier (Complimentary 2-3 Days)',
    paymentMethod: 'Card (3D Secure)' as 'Card (3D Secure)' | 'Cash on Delivery (COD)' | 'Raast / Instant Bank Transfer',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardHolder: '',
    raastTxnId: '',
    orderNotes: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFulfillmentStep, setActiveFulfillmentStep] = useState(0);

  if (!isCheckoutOpen) return null;

  const pakistaniCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Peshawar',
    'Multan',
    'Quetta',
    'Sialkot',
    'Hyderabad',
    'International (GCC / UK)',
  ];

  // Detect card type
  const detectCardType = (num: string) => {
    const cleaned = num.replace(/\s+/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('6')) return 'PayPak';
    return 'Credit/Debit';
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      let paymentStatus: CustomerOrder['paymentStatus'] = 'Paid & Encrypted';
      if (formData.paymentMethod === 'Cash on Delivery (COD)') {
        paymentStatus = 'COD Authorized';
      } else if (formData.paymentMethod === 'Raast / Instant Bank Transfer') {
        paymentStatus = 'Paid & Encrypted';
      }

      const newOrder = addOrder({
        customer: {
          fullName: formData.fullName || 'Maison Patron',
          email: formData.email || 'client@shahzein.a-parfumerie.pk',
          phone: formData.phone || '+92 300 1234567',
          address: formData.address || 'Executive Residence',
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          notes: formData.orderNotes,
        },
        items: cart,
        subtotalPKR: cartTotalPKR,
        deliveryMethod: formData.deliveryMethod,
        deliveryFeePKR: 0,
        totalPKR: cartTotalPKR,
        paymentMethod: formData.paymentMethod,
        paymentStatus,
        fulfillmentStatus: 'Order Confirmed',
        trackingCode: `TRK-${Math.floor(100000 + Math.random() * 900000)}-PK`,
        complimentarySamples: ['Amber Sultani Privé 2ml', 'Rose Nocturne de Taif 2ml'],
      });

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      setStep(4);
    }, 1200);
  };

  const fulfillmentSteps = [
    { title: 'Order Confirmed', desc: 'Secure payment validated & logged on SHAHZEIN.A PARFUMERIE.PK' },
    { title: 'Bespoke Maceration & Plaque Engraving', desc: 'Flacon hand-inspected by Master Nez' },
    { title: 'Wax-Sealed in Vault', desc: 'Housed in signature black lacquer coffret with gold ribbon' },
    { title: 'Dispatched via Chauffeur / Courier', desc: 'En route with temperature-controlled white glove care' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3b3227] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Top Header */}
        <div className="p-5 border-b border-[#251f18] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#c5a059]" />
            <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#f5f0e8] font-bold">
              {step === 4 ? 'Order Confirmed & Secured' : 'Secure Vault Checkout'}
            </span>
          </div>

          <button
            onClick={() => {
              if (step === 4) {
                setIsCheckoutOpen(false);
                setStep(1);
                setConfirmedOrder(null);
              } else {
                setIsCheckoutOpen(false);
              }
            }}
            className="p-1.5 text-[#8c7f6f] hover:text-[#f4efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Steps 1-3) */}
        {step < 4 && (
          <div className="bg-[#181511] px-6 py-3 border-b border-[#262018] flex items-center justify-between text-xs text-[#8e8171]">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#c5a059] font-semibold' : ''}`}>
              <span>01. Destination</span>
            </div>
            <span>·</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#c5a059] font-semibold' : ''}`}>
              <span>02. Delivery Method</span>
            </div>
            <span>·</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#c5a059] font-semibold' : ''}`}>
              <span>03. Secure Payment</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* STEP 1: Shipping Destination */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-xl text-[#f4efe6] font-semibold">
                  Client &amp; Delivery Destination
                </h3>
                <p className="text-xs text-[#9d8f7e] mt-1">
                  Complimentary temperature-controlled delivery across all cities in Pakistan and international capitals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#b8ab99]">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shahzein Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#181511] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#b8ab99]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="client@shahzein.a-parfumerie.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181511] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#b8ab99]">Contact Phone (for Courier SMS Dispatch)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181511] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#b8ab99]">City / Region</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#181511] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                  >
                    {pakistaniCities.map((city) => (
                      <option key={city} value={city} className="bg-[#12100e]">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs text-[#b8ab99]">Street Address &amp; Residence / Suite</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House 42, Khayaban-e-Hafiz, Phase 6, DHA"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#181511] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <div className="text-xs text-[#8c7e6f]">
                  Coffret Value: <strong className="text-[#c5a059] font-mono tabular-nums">₨ {cartTotalPKR.toLocaleString()}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  <span>Select Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Method */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-xl text-[#f4efe6] font-semibold">
                  White Glove Delivery Experience
                </h3>
                <p className="text-xs text-[#9d8f7e] mt-1">
                  Each flacon is secured in protective foam cushioning inside our wax-sealed black lacquer coffret.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Royal White Glove Courier (Complimentary 2-3 Days)',
                    badge: 'Complimentary (₨ 0)',
                    desc: 'Tracked insured air courier delivery directly to your doorstep in all Pakistani cities.',
                  },
                  {
                    name: 'VIP Same-Day Chauffeur (Karachi / Lahore / Islamabad)',
                    badge: 'Complimentary for Orders > ₨ 20,000',
                    desc: 'Hand-delivered by Maison Shahzein uniformed concierge within hours of bottling.',
                  },
                ].map((option) => (
                  <div
                    key={option.name}
                    onClick={() => setFormData({ ...formData, deliveryMethod: option.name })}
                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                      formData.deliveryMethod === option.name
                        ? 'bg-[#221c16] border-[#c5a059]'
                        : 'bg-[#15120f] border-[#29221a] hover:border-[#3d3225]'
                    }`}
                  >
                    <Truck className={`w-5 h-5 shrink-0 mt-0.5 ${formData.deliveryMethod === option.name ? 'text-[#c5a059]' : 'text-[#8c7f6f]'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#f4efe6]">{option.name}</span>
                        <span className="text-[10px] text-[#c5a059] font-mono">{option.badge}</span>
                      </div>
                      <p className="text-xs text-[#8e8170] mt-1">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs uppercase tracking-wider text-[#9a8d7d] hover:text-[#f4efe6]"
                >
                  Back to Destination
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  <span>Select Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Secure Payment Gateways */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-xl text-[#f4efe6] font-semibold">
                  Secure Payment Gateway
                </h3>
                <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>256-Bit Military Grade TLS Encryption Active on SHAHZEIN•A Parfumerie.pk</span>
                </div>
              </div>


              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Card (3D Secure)', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'Raast / Instant Bank Transfer', label: 'Raast / Bank Transfer', icon: Building },
                  { id: 'Cash on Delivery (COD)', label: 'Cash on Delivery', icon: Smartphone },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          paymentMethod: item.id as typeof formData.paymentMethod,
                        })
                      }
                      className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#221c16] border-[#c5a059] text-[#c5a059]'
                          : 'bg-[#15120f] border-[#29221a] text-[#8e8170] hover:text-[#f4efe6]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Card Form */}
              {formData.paymentMethod === 'Card (3D Secure)' && (
                <div className="p-4 bg-[#181511] border border-[#2e261e] rounded-lg space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a49685]">Detected Network:</span>
                    <span className="font-mono text-[#c5a059] font-semibold">
                      {detectCardType(formData.cardNumber)} 3D Secure
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#b8ab99]">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#100e0c] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] font-mono tracking-wider focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#b8ab99]">Expiration</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-[#100e0c] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] font-mono focus:border-[#c5a059] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#b8ab99]">CVV / CVC (3 Digits)</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#100e0c] border border-[#30271e] rounded px-3 py-2.5 text-xs text-[#f5f0e8] font-mono focus:border-[#c5a059] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Raast / Bank Transfer Form */}
              {formData.paymentMethod === 'Raast / Instant Bank Transfer' && (
                <div className="p-4 bg-[#181511] border border-[#2e261e] rounded-lg space-y-3.5 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs text-[#c5a059]">
                    <QrCode className="w-4 h-4" />
                    <span className="font-semibold">State Bank of Pakistan Raast Instant Settlement</span>
                  </div>

                  <div className="p-3 bg-[#0f0d0b] rounded border border-[#262018] text-xs space-y-1 text-[#b8ab99]">
                    <div>
                      Raast ID: <strong className="text-[#f4efe6] font-mono">shahzein.pk@raast</strong>
                    </div>
                    <div>
                      Bank: <strong className="text-[#f4efe6]">Meezan Bank Ltd (Islamic Boutique Banking)</strong>
                    </div>
                    <div>
                      Account Title: <strong className="text-[#f4efe6]">SHAHZEIN A PARFUMERIE PVT LTD</strong>
                    </div>
                    <div>
                      IBAN: <strong className="text-[#f4efe6] font-mono">PK42MEZN0001020104829101</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#b8ab99]">Transaction Reference / Receipt ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. RAAST-8829104 or Bank Alfalah Ref"
                      value={formData.raastTxnId}
                      onChange={(e) => setFormData({ ...formData, raastTxnId: e.target.value })}
                      className="w-full bg-[#100e0c] border border-[#30271e] rounded px-3 py-2 text-xs text-[#f5f0e8] font-mono focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Cash on Delivery Form */}
              {formData.paymentMethod === 'Cash on Delivery (COD)' && (
                <div className="p-4 bg-[#181511] border border-[#2e261e] rounded-lg space-y-2 animate-in fade-in text-xs text-[#b8ab99]">
                  <div className="text-sm font-semibold text-[#f4efe6]">Cash on Delivery Authorized</div>
                  <p>
                    Pay in cash directly to our white glove courier upon physical delivery of your sealed coffret. You will receive an SMS confirmation code prior to dispatch.
                  </p>
                </div>
              )}

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-[#221c16] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#8e8171] uppercase">Total Amount Due</div>
                  <div className="font-mono text-xl font-bold text-[#c5a059] tabular-nums">
                    ₨ {cartTotalPKR.toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-[0.2em] rounded transition-all cursor-pointer shadow-lg shadow-[#c5a059]/15"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Securing Transaction...' : 'Complete Purchase'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && confirmedOrder && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-cinzel text-2xl text-[#f4efe6] font-bold">
                  Order Confirmed &amp; Sealed
                </h3>
                <p className="text-xs text-[#9d8f7e]">
                  Your order reference <strong className="text-[#c5a059] font-mono">{confirmedOrder.orderNumber}</strong> has been registered in the Maison vault.
                </p>
              </div>

              {/* Order Tracking Timeline */}
              <div className="p-5 bg-[#171410] border border-[#30261c] rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-cinzel uppercase tracking-wider text-[#c5a059] font-semibold">
                    Real-Time Flacon Tracker
                  </span>
                  <span className="text-[11px] font-mono text-[#a39482]">
                    Tracking: {confirmedOrder.trackingCode}
                  </span>
                </div>

                <div className="space-y-3">
                  {fulfillmentSteps.map((st, idx) => {
                    const isCompleted = idx <= activeFulfillmentStep;
                    const isCurrent = idx === activeFulfillmentStep;
                    return (
                      <div key={st.title} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 ${
                            isCompleted ? 'bg-[#c5a059] text-[#0b0a09]' : 'bg-[#221c16] text-[#6b6052]'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold ${isCurrent ? 'text-[#f5f0e8]' : isCompleted ? 'text-[#c5baa8]' : 'text-[#6b6052]'}`}>
                            {st.title}
                          </div>
                          <div className="text-[11px] text-[#7d7162]">{st.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress simulator button */}
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveFulfillmentStep((prev) => (prev + 1) % fulfillmentSteps.length)}
                    className="text-[11px] text-[#c5a059] hover:text-[#f4efe6] transition-colors cursor-pointer"
                  >
                    Simulate Next Stage →
                  </button>
                </div>
              </div>

              {/* Order Summary & Itemization */}
              <div className="p-4 bg-[#14120f] border border-[#282119] rounded-lg text-xs space-y-3">
                <div className="flex justify-between border-b border-[#241d16] pb-2 font-medium text-[#c5baa8]">
                  <span>Itemized Flacons</span>
                  <span>Amount</span>
                </div>

                {confirmedOrder.items.map((it) => (
                  <div key={`${it.fragranceId}-${it.selectedVolume}`} className="flex justify-between items-center text-xs">
                    <div>
                      <div className="text-[#f4efe6] font-medium">
                        {it.fragrance.name} ({it.selectedVolume}) × {it.quantity}
                      </div>
                      {it.customEngraving && (
                        <div className="text-[10px] text-[#c5a059] font-mono">
                          Engraving: "{it.customEngraving}"
                        </div>
                      )}
                    </div>
                    <div className="font-mono text-[#f5f0e8] tabular-nums">
                      ₨ {(it.pricePKR * it.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#241d16] flex justify-between text-sm font-semibold">
                  <span className="text-[#f4efe6]">Total Paid ({confirmedOrder.paymentMethod})</span>
                  <span className="text-[#c5a059] font-mono tabular-nums">
                    ₨ {confirmedOrder.totalPKR.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Invoice PDF Simulation & Return to Boutique */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => showToast(`Receipt generated for order ${confirmedOrder.orderNumber}. Verified via SHAHZEIN•A Parfumerie.`)}
                  className="flex-1 py-3 px-4 bg-[#1e1914] hover:bg-[#2b241c] text-[#f4efe6] border border-[#3d3225] rounded text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >

                  <FileText className="w-4 h-4 text-[#c5a059]" />
                  <span>Download Invoice Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep(1);
                    setConfirmedOrder(null);
                  }}
                  className="flex-1 py-3 px-4 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  <span>Return to Boutique</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
