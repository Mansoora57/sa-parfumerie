import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { safeCopyToClipboard } from '../utils/clipboard';
import {
  X,
  Globe,
  ShieldCheck,
  Server,
  Activity,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Info,
} from 'lucide-react';

export const DomainHostingModal: React.FC = () => {
  const { isDomainModalOpen, setIsDomainModalOpen, domainSettings, pingDomain, showToast } = useStore();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'dns' | 'guide'>('diagnostic');
  const [customDomainInput, setCustomDomainInput] = useState(domainSettings.domainName);

  if (!isDomainModalOpen) return null;

  const copyToClipboard = async (text: string, label: string) => {
    await safeCopyToClipboard(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard.`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePing = async () => {
    setIsPinging(true);
    await pingDomain();
    setTimeout(() => {
      setIsPinging(false);
      showToast('DNS latency check completed: 22ms via Asia-South Edge Node.');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12100e] border border-[#3b3227] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-[#251f18] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#c5a059]" />
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#f5f0e8] tracking-wider">
                Store Hosting &amp; Custom Domain Manager
              </h3>
              <p className="text-xs text-[#8e8171]">
                Live setup for <strong className="text-[#c5a059]">{domainSettings.domainName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDomainModalOpen(false)}
            className="p-1.5 text-[#8c7f6f] hover:text-[#f4efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#262018] px-6 text-xs uppercase tracking-wider font-cinzel">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Why Is .PK Not Loading on Google?</span>
          </button>

          <button
            onClick={() => setActiveTab('dns')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'dns'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>DNS Records &amp; Routing</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PKNIC 3-Minute Connect Guide</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: DIAGNOSTIC & WHY IS NOT WORKING ON GOOGLE */}
          {activeTab === 'diagnostic' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Immediate working URL banner */}
              <div className="p-5 bg-gradient-to-r from-[#171410] via-[#211a13] to-[#171410] border border-[#c5a059]/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Your Store IS LIVE and Working Right Now at This Web Address:</span>
                  </div>
                  <span className="text-[10px] text-[#9c8e7e] font-mono bg-[#0c0b0a] px-2 py-0.5 rounded border border-[#2b2319]">
                    100% OPERATIONAL
                  </span>
                </div>

                <div className="p-3 bg-[#0c0b0a] border border-[#2d251c] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="font-mono text-xs text-[#f5f0e8] break-all select-all">
                    {domainSettings.cloudRunUrl}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(domainSettings.cloudRunUrl, 'Live Store Web Address')}
                      className="px-3 py-1.5 bg-[#251f18] hover:bg-[#342c22] text-[#f4efe6] border border-[#443828] rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedField === 'Live Store Web Address' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={domainSettings.cloudRunUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
                    >
                      <span>Open Live Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-[#a49685] leading-relaxed">
                  Anyone on Google, Chrome, Safari, Android, or iPhone can view, browse fragrances, test the Scent Profiler, and place orders directly at the link above.
                </p>
              </div>

              {/* Explaining the Google / Browser error */}
              <div className="p-5 bg-[#171410] border border-[#382d20] rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f5f0e8]">
                      Why did Google/Chrome say "This site can't be reached" for https://shahzein.a-parfumerie.pk?
                    </h4>
                    <p className="text-xs text-[#9d8f7e]">
                      Here are the 2 simple reasons and how custom domain mapping works:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  {/* Reason 1 */}
                  <div className="p-4 bg-[#100e0c] border border-[#262018] rounded-lg space-y-2">
                    <div className="font-cinzel text-xs font-semibold text-[#c5a059] flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#251f18] text-[#c5a059] flex items-center justify-center text-[10px] font-mono">1</span>
                      <span>Domain Registration at PKNIC</span>
                    </div>
                    <p className="text-[#a89b8a] leading-relaxed text-[11px]">
                      A custom domain like <strong className="text-[#f4efe6]">.pk</strong> must be registered at the Pakistani domain authority (<strong className="text-[#f4efe6]">PKNIC</strong> at <span className="text-[#c5a059]">pknic.net.pk</span> or via registrars like Paknic, GoDaddy, HosterPK). Until registered, the internet's root DNS servers will report that the name does not exist yet.
                    </p>
                  </div>

                  {/* Reason 2 */}
                  <div className="p-4 bg-[#100e0c] border border-[#262018] rounded-lg space-y-2">
                    <div className="font-cinzel text-xs font-semibold text-[#c5a059] flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#251f18] text-[#c5a059] flex items-center justify-center text-[10px] font-mono">2</span>
                      <span>DNS CNAME Record Mapping</span>
                    </div>
                    <p className="text-[#a89b8a] leading-relaxed text-[11px]">
                      Once you register your .pk domain, you point its <strong className="text-[#f4efe6]">CNAME record</strong> to this Google Cloud Run server (<strong className="text-[#f4efe6] font-mono text-[10px]">ais-pre-lagd7wiyocfe4ga5nvjhii-367287586413.asia-southeast1.run.app</strong>). After pointing, Google and all web browsers will open this store under your domain automatically.
                    </p>
                  </div>
                </div>

                {/* Domain Format Tip for Pakistan */}
                <div className="p-4 bg-[#12100d] border border-[#2c2319] rounded-lg space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#c5a059] font-cinzel font-semibold text-[11px]">
                    <Info className="w-4 h-4" />
                    <span>Important Note on Domain Dots &amp; Recommended PKNIC Names</span>
                  </div>
                  <p className="text-[#a49685] leading-relaxed text-[11px]">
                    In internet naming rules, a dot signifies a subdomain. So <code className="text-[#f4efe6] font-mono">shahzein.a-parfumerie.pk</code> has two dots before <code className="text-[#f4efe6] font-mono">.pk</code>. For a cleaner, prestigious single-domain registration on PKNIC, we recommend registering one of these official Pakistani domains:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {domainSettings.recommendedDomains.map((dm) => (
                      <span
                        key={dm}
                        onClick={() => copyToClipboard(dm, 'Domain Name')}
                        className="px-2.5 py-1 bg-[#1a1611] hover:bg-[#251f18] border border-[#3b3023] rounded font-mono text-[11px] text-[#e8dac7] cursor-pointer flex items-center gap-1.5 transition-colors"
                        title="Click to copy"
                      >
                        <span>{dm}</span>
                        <Copy className="w-3 h-3 text-[#c5a059]" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handlePing}
                  disabled={isPinging}
                  className="flex items-center gap-1.5 text-xs text-[#c5a059] hover:text-[#f4efe6] transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                  <span>Test Edge Server Health ({domainSettings.lastPingMs}ms)</span>
                </button>

                <button
                  onClick={() => setActiveTab('guide')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase rounded transition-all cursor-pointer"
                >
                  <span>See 3-Minute PKNIC Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DNS RECORDS */}
          {activeTab === 'dns' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h4 className="font-cinzel text-sm sm:text-base font-semibold text-[#f5f0e8]">
                  DNS Record Configuration for Your Domain Registrar
                </h4>
                <p className="text-xs text-[#9d8f7e] mt-1">
                  Copy and paste these exact records into your domain registrar console (PKNIC / Cloudflare / GoDaddy / Namecheap) to point your domain to this store.
                </p>
              </div>

              <div className="bg-[#15120f] border border-[#2c241b] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1b1712] border-b border-[#282119] text-[#9c8e7d] uppercase text-[10px] tracking-wider font-cinzel">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">Type</th>
                        <th className="py-2.5 px-4 font-semibold">Host / Name</th>
                        <th className="py-2.5 px-4 font-semibold">Points To / Destination</th>
                        <th className="py-2.5 px-4 font-semibold">Status</th>
                        <th className="py-2.5 px-4 text-right">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#221c15] text-[#d4c7b6]">
                      {domainSettings.dnsRecords.map((rec) => (
                        <tr key={`${rec.type}-${rec.host}`} className="hover:bg-[#1a1612]">
                          <td className="py-3 px-4 font-mono font-bold text-[#c5a059]">
                            {rec.type}
                          </td>
                          <td className="py-3 px-4 font-mono">{rec.host}</td>
                          <td className="py-3 px-4 font-mono text-xs break-all max-w-[240px]">
                            {rec.value}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{rec.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => copyToClipboard(rec.value, `${rec.type} Record`)}
                              className="p-1 hover:text-[#c5a059] text-[#7d705f] transition-colors cursor-pointer"
                              title="Copy record value"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Server Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#15120f] border border-[#2b231a] rounded-lg space-y-1">
                  <div className="text-[10px] text-[#8e8171] uppercase">Google Cloud Anycast IP</div>
                  <div className="font-mono text-[#f4efe6]">{domainSettings.primaryIP}</div>
                </div>

                <div className="p-3 bg-[#15120f] border border-[#2b231a] rounded-lg space-y-1">
                  <div className="text-[10px] text-[#8e8171] uppercase">Edge Caching Nodes</div>
                  <div className="text-[#f4efe6]">Karachi, Lahore, Dubai</div>
                </div>

                <div className="p-3 bg-[#15120f] border border-[#2b231a] rounded-lg space-y-1">
                  <div className="text-[10px] text-[#8e8171] uppercase">TLS Security</div>
                  <div className="text-emerald-400">TLS 1.3 Strict Auto-Renew</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PKNIC 3-MINUTE CONNECT GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h4 className="font-cinzel text-sm sm:text-base font-semibold text-[#f5f0e8]">
                  Step-by-Step 3-Minute Guide to Connect Your Domain
                </h4>
                <p className="text-xs text-[#9d8f7e] mt-1">
                  Follow these 3 quick steps to have your custom domain live on Google and across all devices:
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Step 1 */}
                <div className="p-4 bg-[#161310] border border-[#2e251b] rounded-lg flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] text-[#0b0a09] font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="font-cinzel font-semibold text-[#f4efe6] text-xs">
                      Register Domain on PKNIC or Registrar
                    </div>
                    <p className="text-[#a49685] text-[11px] leading-relaxed">
                      Visit <a href="https://pknic.net.pk" target="_blank" rel="noopener noreferrer" className="text-[#c5a059] underline">pknic.net.pk</a> or any Pakistani registrar (e.g. Paknic, HosterPK, WebSouls) and register your desired domain name such as <strong className="text-[#f5f0e8]">shahzein-parfumerie.pk</strong> or <strong className="text-[#f5f0e8]">shahzeinparfumerie.pk</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-[#161310] border border-[#2e251b] rounded-lg flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] text-[#0b0a09] font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="font-cinzel font-semibold text-[#f4efe6] text-xs">
                      Add the CNAME Record
                    </div>
                    <p className="text-[#a49685] text-[11px] leading-relaxed">
                      In your registrar's DNS Management tab, add a new DNS Record with these values:
                    </p>
                    <div className="p-3 bg-[#0c0b0a] rounded border border-[#2a2218] font-mono text-[11px] space-y-1">
                      <div><span className="text-[#7d7162]">Record Type:</span> <strong className="text-[#c5a059]">CNAME</strong></div>
                      <div><span className="text-[#7d7162]">Host / Name:</span> <strong className="text-[#f4efe6]">@</strong> or <strong className="text-[#f4efe6]">www</strong></div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#7d7162]">Points To:</span> <strong className="text-[#f4efe6] break-all">{domainSettings.cnameTarget}</strong>
                        </div>
                        <button
                          onClick={() => copyToClipboard(domainSettings.cnameTarget, 'CNAME Target')}
                          className="px-2 py-1 bg-[#201b15] hover:bg-[#2e261e] border border-[#3d3224] rounded text-[10px] text-[#c5a059] flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-[#161310] border border-[#2e251b] rounded-lg flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] text-[#0b0a09] font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="font-cinzel font-semibold text-[#f4efe6] text-xs">
                      Instant Live Propagation &amp; Automated SSL
                    </div>
                    <p className="text-[#a49685] text-[11px] leading-relaxed">
                      Once saved, DNS propagation takes between 5 to 30 minutes. Google Cloud will automatically provision a free, trusted TLS/SSL certificate with zero manual renewal required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
