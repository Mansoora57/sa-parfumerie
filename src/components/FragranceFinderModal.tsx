import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Fragrance } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const FragranceFinderModal: React.FC = () => {
  const { isFinderOpen, setIsFinderOpen, fragrances, addToCart, setSelectedFragrance } = useStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    intensity: 'Opulent',
    family: 'Oriental Oud',
    occasion: 'Royal Gala',
    notes: ['Cambodian Agarwood', 'Taif Rose'],
    season: 'Autumn / Winter',
  });

  const [customQuery, setCustomQuery] = useState('');
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isFinderOpen) return null;

  const steps = [
    {
      title: 'Scent Trail & Fragrance Presence',
      subtitle: 'How do you desire your scent trail to be experienced?',
      options: [
        { label: 'Intimate Whisper', value: 'Intimate', desc: 'A subtle, delicate skin scent perceived only in close embrace' },
        { label: 'Magnetic Elegance', value: 'Moderate', desc: 'Distinctive aura within personal conversation space' },
        { label: 'Opulent Royal Trail', value: 'Opulent', desc: 'Commanding projection that lingers gracefully in a room' },
        { label: 'Monolithic Sovereign', value: 'Monolithic', desc: 'Unstoppable, eternal presence with heavy resinous scent trail' },
      ],
      field: 'intensity',
    },
    {
      title: 'Dominant Fragrance Family',
      subtitle: 'Which emotional chord calls to your senses?',
      options: [
        { label: 'Oriental Oud & Rare Woods', value: 'Oriental Oud', desc: 'Aged agarwood, sacred frankincense, and dark resins' },
        { label: 'Floral Nocturne & Taif Rose', value: 'Floral', desc: 'Velvety nocturnal damask rose, peony, and ambrette' },
        { label: 'Woody Amber & Warm Spices', value: 'Woody Amber', desc: 'Molten Baltic amber, Ceylon cinnamon, and bourbon vanilla' },
        { label: 'Fresh Citrus & Earthy Vetiver', value: 'Fresh Citrus', desc: 'Sun-drenched Calabrian bergamot, neroli, and Haitian roots' },
        { label: 'Smoked Tuscan Leather', value: 'Leather', desc: 'Birch tar, saffron gold, and vintage glove leather' },
        { label: 'Dark Gourmand & Roasted Beans', value: 'Gourmand', desc: 'Arabian mocha, bitter almond, and dark cocoa' },
      ],
      field: 'family',
    },
    {
      title: 'Primary Occasion & Setting',
      subtitle: 'Where will your signature perfume accompany you most?',
      options: [
        { label: 'Royal Gala & Grand Celebrations', value: 'Royal Gala', desc: 'High-profile Pakistani weddings, evening receptions' },
        { label: 'Executive Boardroom & Leadership', value: 'Executive', desc: 'Crisp, authoritative, sophisticated, polished' },
        { label: 'Intimate Evenings & Dinners', value: 'Intimate Evening', desc: 'Sensual, intoxicating, warm, unforgettable' },
        { label: 'Monsoon Petrichor & Winter Breeze', value: 'Monsoon / Winter', desc: 'Deep, comforting resins against crisp cool air' },
      ],
      field: 'occasion',
    },
  ];

  // Calculate recommendation matches based on answers
  const calculateMatches = () => {
    return fragrances
      .map((f) => {
        let score = 70;
        if (f.olfactoryFamily === answers.family) score += 20;
        if (f.sillage === answers.intensity) score += 10;
        if (answers.notes.some((n) => f.topNotes.includes(n) || f.heartNotes.includes(n) || f.baseNotes.includes(n))) {
          score += 8;
        }
        return { fragrance: f, score: Math.min(99, score) };
      })
      .sort((a, b) => b.score - a.score);
  };

  const matches = calculateMatches();
  const topMatch = matches[0]?.fragrance || fragrances[0];
  const secondaryMatches = matches.slice(1, 3).map((m) => m.fragrance);

  // Gemini consultation
  const handleConsultAiPerfumer = async () => {
    setIsAiLoading(true);
    setAiNote(null);
    try {
      // Check if gemini key is available
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are the Master Perfumer at SHAHZEIN.A PARFUMERIE (address: SHAHZEIN.A PARFUMERIE.PK), an ultra-luxury perfume house based in Pakistan.
Provide a 2-3 sentence personalized fragrance recommendation for a client seeking:
- Intensity: ${answers.intensity}
- Preferred Family: ${answers.family}
- Occasion: ${answers.occasion}
- Client note/request: ${customQuery || 'Suggest a bespoke layering ritual for me.'}
Recommend specifically our creation "${topMatch.name}" (${topMatch.concentration}) and suggest layering with another note. Tone must be poetic, luxurious, and authoritative.`,
        });
        setAiNote(response.text || 'Our Master Perfumer recommends starting with pulse points.');
      } else {
        // High luxury fallback
        setAiNote(
          `"For ${answers.occasion.toLowerCase()}, ${topMatch.name} creates an arresting presence. Its ${topMatch.heartNotes[0]} accords harmonize flawlessly with your desire for ${answers.intensity.toLowerCase()} projection. We recommend anointing your pulse points and collar with two delicate spritzes." — Master Perfumer, Shahzein.A Parfumerie`
        );
      }
    } catch {
      setAiNote(
        `"Our Master Perfumer recommends ${topMatch.name} for your requested profile. Its opulent ${topMatch.topNotes[0]} and ${topMatch.heartNotes[0]} notes provide an extraordinary harmony for ${answers.occasion}."`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3d3227] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-[#251f18] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#f5f0e8] font-bold">
              Personalized Scent Profiler
            </span>
          </div>
          <button
            onClick={() => setIsFinderOpen(false)}
            className="p-1.5 text-[#8f8171] hover:text-[#f4efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps or Results */}
        <div className="p-6 sm:p-8">
          {currentStep < steps.length ? (
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs text-[#8a7d6e]">
                <span className="tracking-widest uppercase">
                  Phase 0{currentStep + 1} of 0{steps.length}
                </span>
                <span className="font-mono">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
              </div>

              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl text-[#f4efe6] font-semibold">
                  {steps[currentStep].title}
                </h3>
                <p className="font-cormorant italic text-base text-[#b9ac9a] mt-1">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {steps[currentStep].options.map((opt) => {
                  const fieldKey = steps[currentStep].field as keyof typeof answers;
                  const isSelected = answers[fieldKey] === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [fieldKey]: opt.value,
                        }))
                      }
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#221c16] border-[#c5a059] shadow-md'
                          : 'bg-[#161310] border-[#29221a] hover:border-[#42372a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-cinzel font-medium ${isSelected ? 'text-[#c5a059]' : 'text-[#f4efe6]'}`}>
                          {opt.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#c5a059]" />}
                      </div>
                      <p className="text-xs text-[#8e8170] mt-2 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Navigation button */}
              <div className="pt-4 flex items-center justify-between">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#9f9180] hover:text-[#f4efe6] transition-colors"
                  >
                    Previous Step
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  <span>{currentStep === steps.length - 1 ? 'Reveal Bespoke Match' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1f1a14] border border-[#3d3224] rounded-full text-xs text-[#c5a059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized Fragrance Recommendation Ready</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#fbf9f5] font-semibold">
                  Your Bespoke Signature Match
                </h3>
                <p className="text-xs text-[#9d8f7e] max-w-md mx-auto">
                  Calculated based on your preference for {answers.family} accords, {answers.intensity.toLowerCase()} scent trail, and {answers.occasion} moments.
                </p>
              </div>

              {/* Top Recommended Card */}
              <div className="bg-[#171410] border border-[#443828] rounded-xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 aspect-[4/5] rounded-lg overflow-hidden bg-[#0c0b0a] border border-[#2b241c]">
                  <img
                    src={topMatch.image}
                    alt={topMatch.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c5a059] uppercase tracking-wider font-semibold">
                        98% Scent Compatibility
                      </span>
                      <span className="font-mono text-[#f4efe6] tabular-nums font-semibold">
                        ₨ {topMatch.pricePKR.toLocaleString()}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5f0e8] mt-1">
                      {topMatch.name}
                    </h4>
                    <p className="font-cormorant italic text-sm text-[#c0b29f]">
                      {topMatch.frenchTitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#b8ab99] leading-relaxed">
                    {topMatch.description}
                  </p>

                  <div className="p-3 bg-[#110f0d] rounded border border-[#251f18] text-xs space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#c5a059] font-medium">
                      Harmonizing Notes Breakdown
                    </div>
                    <div className="text-[#cfc3b3]">
                      {topMatch.topNotes[0]} · {topMatch.heartNotes[0]} · {topMatch.baseNotes[0]}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        addToCart(topMatch, '100ml');
                        setIsFinderOpen(false);
                      }}
                      className="flex-1 py-3 px-4 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Bottle (100ml)</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFragrance(topMatch);
                        setIsFinderOpen(false);
                      }}
                      className="py-3 px-4 bg-[#1d1914] hover:bg-[#28221b] text-[#f4efe6] border border-[#3b3124] text-xs font-medium uppercase tracking-wider rounded transition-colors"
                    >
                      Inspect Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Bespoke Layering Ritual Suggestion */}
              {secondaryMatches.length > 0 && (
                <div className="p-5 bg-[#161310] border border-[#2e261d] rounded-lg space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#c5a059] font-cinzel font-semibold">
                    The Signature Layering Guide
                  </div>
                  <p className="text-xs text-[#b0a392]">
                    Elevate your scent trail by spraying a base of <strong className="text-[#f4efe6]">{topMatch.name}</strong> on pulse points, followed by a mist of <strong className="text-[#f4efe6]">{secondaryMatches[0].name}</strong> on your lapel or scarf for multidimensional aura.
                  </p>
                </div>
              )}

              {/* Virtual Perfumer Consultation */}
              <div className="p-5 bg-[#14110e] border border-[#33291f] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-cinzel text-[#c5a059]">
                    Consult Virtual Master Perfumer
                  </span>
                  <span className="text-[10px] text-[#7d7162]">Live Algorithmic Consultation</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Specific request (e.g. Wedding gift for groom, monsoon humidity)..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="flex-1 bg-[#0c0b0a] border border-[#2d241c] rounded px-3 py-2 text-xs text-[#f5f0e8] placeholder-[#665b4f] focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    onClick={handleConsultAiPerfumer}
                    disabled={isAiLoading}
                    className="px-4 py-2 bg-[#221c16] hover:bg-[#31281e] text-[#c5a059] border border-[#423627] text-xs rounded transition-colors whitespace-nowrap"
                  >
                    {isAiLoading ? 'Synthesizing...' : 'Consult Perfumer'}
                  </button>
                </div>

                {aiNote && (
                  <div className="p-3.5 bg-[#0e0c0a] border-l-2 border-[#c5a059] rounded-r text-xs text-[#d4c7b5] italic font-cormorant text-base leading-relaxed animate-in fade-in">
                    {aiNote}
                  </div>
                )}
              </div>

              {/* Reset Quiz */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(0);
                    setAiNote(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8c7f6f] hover:text-[#f4efe6] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Consultation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
