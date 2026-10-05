import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Fragrance, CustomerOrder } from '../types';
import { safeCopyToClipboard } from '../utils/clipboard';
import {
  Boxes,
  PackagePlus,
  Search,
  Plus,
  Minus,
  AlertTriangle,
  Edit3,
  Trash2,
  RefreshCw,
  ShoppingBag,
  Globe,
  Sliders,
  Check,
  X,
  Download,
  Upload,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const {
    fragrances,
    updateStock,
    setFragranceStock,
    updateFragrance,
    addFragrance,
    deleteFragrance,
    resetInventory,
    orders,
    updateOrderStatus,
    domainSettings,
    setActiveView,
    setIsDomainModalOpen,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'domain'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [editingFragrance, setEditingFragrance] = useState<Fragrance | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product form state
  const [newFragData, setNewFragData] = useState<Partial<Fragrance>>({
    name: '',
    frenchTitle: '',
    collection: 'Oud Royale',
    concentration: 'Extrait de Parfum',
    pricePKR: 25000,
    stockQuantity: 15,
    lowStockThreshold: 5,
    sku: 'SHZ-NEW-01',
    batchNo: 'BATCH-2026-N',
    olfactoryFamily: 'Oriental Oud',
    sillage: 'Opulent',
    longevity: '16+ Hours',
    description: '',
    craftsmanshipNote: '',
    topNotes: ['Saffron', 'Bergamot'],
    heartNotes: ['Agarwood', 'Rose'],
    baseNotes: ['Amber', 'Sandalwood'],
    volumeOptions: [
      { size: '10ml Discovery', pricePKR: 4500 },
      { size: '50ml', pricePKR: 15000 },
      { size: '100ml', pricePKR: 25000 },
    ],
    image: '/images/perfume_oud_royal_1791027761416.jpg',
    rating: 5.0,
    reviewsCount: 1,
    status: 'In Stock',
  });

  // Notes helper state
  const [topNoteInput, setTopNoteInput] = useState('');
  const [heartNoteInput, setHeartNoteInput] = useState('');
  const [baseNoteInput, setBaseNoteInput] = useState('');

  // Inventory computations
  const totalStockUnits = fragrances.reduce((sum, f) => sum + f.stockQuantity, 0);
  const totalInventoryValuePKR = fragrances.reduce((sum, f) => sum + f.stockQuantity * f.pricePKR, 0);
  const lowStockCount = fragrances.filter((f) => f.stockQuantity <= f.lowStockThreshold).length;

  const filteredFragrances = fragrances.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.batchNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = selectedCollection === 'all' || f.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  // Export inventory to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fragrances, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shahzein_inventory_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Inventory database exported successfully.');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFragrance) return;
    updateFragrance(editingFragrance);
    setEditingFragrance(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFragData.name) {
      showToast('Please provide a fragrance name.');
      return;
    }

    addFragrance(newFragData as Omit<Fragrance, 'id'>);
    setIsAddingNew(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0b0a] text-[#f4efe6] pb-20">
      {/* Top Header */}
      <div className="bg-[#14110e] border-b border-[#29221a] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a059] font-cinzel font-semibold">
                Shahzein Central Management Portal
              </span>
              <span className="text-[10px] text-[#716556]">·</span>
              <span className="text-[10px] text-emerald-400 font-mono">
                HOSTED ON SHAHZEIN.A PARFUMERIE.PK
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fbf9f5] mt-1">
              CMS Inventory Management
            </h1>
            <p className="text-xs text-[#9d8f7e] mt-0.5">
              Live catalogue stocks, aging batches, fragrance pyramids, and client order fulfillments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('store')}
              className="px-4 py-2 bg-[#1f1a14] hover:bg-[#2b241c] text-[#f4efe6] border border-[#3d3225] rounded text-xs font-cinzel uppercase tracking-wider transition-colors"
            >
              View Live Storefront →
            </button>

            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase tracking-wider rounded transition-all shadow-md"
            >
              <PackagePlus className="w-4 h-4" />
              <span>Add New Fragrance</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* KPI Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#14110e] border border-[#262017] rounded-lg space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#8e8170]">Total Units in Vault</div>
            <div className="font-mono text-2xl font-bold text-[#f5f0e8] tabular-nums">
              {totalStockUnits}
            </div>
            <div className="text-[10px] text-[#786c5c]">Active Perfume Bottles</div>
          </div>

          <div className="p-4 bg-[#14110e] border border-[#262017] rounded-lg space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#8e8170]">Total Inventory Value</div>
            <div className="font-mono text-2xl font-bold text-[#c5a059] tabular-nums">
              ₨ {totalInventoryValuePKR.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#786c5c]">Retail Value (PKR)</div>
          </div>

          <div className="p-4 bg-[#14110e] border border-[#262017] rounded-lg space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#8e8170]">Low Stock Alerts</div>
            <div className={`font-mono text-2xl font-bold tabular-nums ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {lowStockCount}
            </div>
            <div className="text-[10px] text-[#786c5c]">Threshold ≤ 5 Bottles</div>
          </div>

          <div className="p-4 bg-[#14110e] border border-[#262017] rounded-lg space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#8e8170]">Client Orders</div>
            <div className="font-mono text-2xl font-bold text-[#f5f0e8] tabular-nums">
              {orders.length}
            </div>
            <div className="text-[10px] text-[#786c5c]">Secured Vault Dispatches</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#262018] gap-6 text-xs uppercase tracking-wider font-cinzel">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            Inventory Stock &amp; Batches ({fragrances.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            Client Orders &amp; Dispatches ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('domain')}
            className={`py-3 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'domain'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8e8170] hover:text-[#f4efe6]'
            }`}
          >
            Store Address &amp; DNS Settings
          </button>
        </div>

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by perfume, SKU, or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#14110e] border border-[#2d251d] rounded px-3.5 py-2 text-xs text-[#f5f0e8] placeholder-[#7d7162] focus:border-[#c5a059] outline-none"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-[#7d7162]" />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="bg-[#14110e] border border-[#2d251d] rounded px-3 py-2 text-xs text-[#c5baa8] focus:border-[#c5a059] outline-none"
                >
                  <option value="all">All Collections</option>
                  <option value="Oud Royale">Oud Royale</option>
                  <option value="Floral Nocturne">Floral Nocturne</option>
                  <option value="Amber Heritage">Amber Heritage</option>
                  <option value="L’Agrume Impérial">L’Agrume Impérial</option>
                  <option value="Private Reserve">Private Reserve</option>
                </select>

                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#181410] hover:bg-[#231d17] border border-[#30271e] rounded text-xs text-[#c5baa8] transition-colors"
                  title="Export JSON database"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Backup JSON</span>
                </button>

                <button
                  onClick={resetInventory}
                  className="p-2 text-[#7d7162] hover:text-[#c5a059] transition-colors"
                  title="Reset to default archive"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#13100e] border border-[#292119] rounded-lg overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#191511] border-b border-[#292119] text-[#9c8e7d] uppercase text-[10px] tracking-wider font-cinzel">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Perfume Bottle</th>
                      <th className="py-3 px-4 font-semibold">SKU &amp; Batch</th>
                      <th className="py-3 px-4 font-semibold">Collection</th>
                      <th className="py-3 px-4 font-semibold">Retail Price (PKR)</th>
                      <th className="py-3 px-4 font-semibold">Vault Quantity</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#211a14] text-[#d4c7b6]">
                    {filteredFragrances.map((f) => {
                      const isLowStock = f.stockQuantity <= f.lowStockThreshold;
                      return (
                        <tr key={f.id} className="hover:bg-[#181410] transition-colors">
                          {/* Flacon Item */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={f.image}
                                alt={f.name}
                                referrerPolicy="no-referrer"
                                className="w-12 h-14 object-cover rounded bg-[#0c0b0a] border border-[#2b241c] shrink-0"
                              />
                              <div>
                                <div className="font-cinzel text-xs font-semibold text-[#f5f0e8]">
                                  {f.name}
                                </div>
                                <div className="font-cormorant italic text-[11px] text-[#9e8f7e]">
                                  {f.frenchTitle}
                                </div>
                                <div className="text-[10px] text-[#716556]">
                                  {f.concentration}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* SKU & Batch */}
                          <td className="py-3 px-4 font-mono text-[11px]">
                            <div className="text-[#f4efe6]">{f.sku}</div>
                            <div className="text-[#7d7162] text-[10px]">{f.batchNo}</div>
                          </td>

                          {/* Collection */}
                          <td className="py-3 px-4">
                            <span className="text-[#c5a059] font-medium text-[11px]">
                              {f.collection}
                            </span>
                            <div className="text-[10px] text-[#7d7162]">{f.olfactoryFamily}</div>
                          </td>

                          {/* Price */}
                          <td className="py-3 px-4 font-mono tabular-nums text-xs font-semibold text-[#f5f0e8]">
                            ₨ {f.pricePKR.toLocaleString()}
                          </td>

                          {/* Stock Quantity + Inline Stepper */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-[#3b3124] rounded bg-[#0e0c0a]">
                                <button
                                  type="button"
                                  onClick={() => updateStock(f.id, -1)}
                                  className="p-1 text-[#8e8171] hover:text-[#f4efe6] transition-colors"
                                  title="Decrease quantity by 1"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <input
                                  type="number"
                                  value={f.stockQuantity}
                                  onChange={(e) => setFragranceStock(f.id, parseInt(e.target.value) || 0)}
                                  className="w-12 text-center bg-transparent text-xs font-mono text-[#f5f0e8] focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateStock(f.id, 1)}
                                  className="p-1 text-[#8e8171] hover:text-[#f4efe6] transition-colors"
                                  title="Increase quantity by 1"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => updateStock(f.id, 10)}
                                className="px-1.5 py-0.5 text-[9px] font-mono bg-[#1c1813] hover:bg-[#28211a] border border-[#3d3225] rounded text-[#c5a059]"
                                title="Quick restock batch +10"
                              >
                                +10
                              </button>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              {f.stockQuantity === 0 ? (
                                <span className="text-[11px] text-rose-400 font-medium">Sold Out</span>
                              ) : isLowStock ? (
                                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Low Stock ({f.stockQuantity})</span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-emerald-400 font-medium">In Stock</span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingFragrance(f)}
                                className="p-1.5 text-[#9d8f7e] hover:text-[#c5a059] bg-[#1a1612] hover:bg-[#252019] rounded transition-colors"
                                title="Edit details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${f.name}" from vault catalogue?`)) {
                                    deleteFragrance(f.id);
                                  }
                                }}
                                className="p-1.5 text-[#736657] hover:text-rose-400 bg-[#1a1612] hover:bg-[#252019] rounded transition-colors"
                                title="Delete fragrance"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="text-xs text-[#9d8f7e]">
              Orders placed by clients via the secure checkout automatically sync here. You can manage status, view customer addresses, and tracking codes.
            </div>

            <div className="bg-[#13100e] border border-[#292119] rounded-lg overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#191511] border-b border-[#292119] text-[#9c8e7d] uppercase text-[10px] tracking-wider font-cinzel">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Order #</th>
                      <th className="py-3 px-4 font-semibold">Client Details</th>
                      <th className="py-3 px-4 font-semibold">City &amp; Address</th>
                      <th className="py-3 px-4 font-semibold">Items</th>
                      <th className="py-3 px-4 font-semibold">Total (PKR)</th>
                      <th className="py-3 px-4 font-semibold">Payment</th>
                      <th className="py-3 px-4 font-semibold">Fulfillment Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#211a14] text-[#d4c7b6]">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-xs text-[#7d7162]">
                          No client orders recorded yet. Place an order in the boutique to test!
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#181410] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#c5a059]">
                            {ord.orderNumber}
                            <div className="text-[10px] text-[#7d7162] font-normal">{ord.date}</div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-medium text-[#f5f0e8]">{ord.customer.fullName}</div>
                            <div className="text-[11px] text-[#9c8e7d] font-mono">{ord.customer.phone}</div>
                            <div className="text-[10px] text-[#6d6255] truncate max-w-[150px]">{ord.customer.email}</div>
                          </td>

                          <td className="py-3 px-4 text-xs">
                            <div className="text-[#f5f0e8] font-medium">{ord.customer.city}</div>
                            <div className="text-[11px] text-[#8e8171] truncate max-w-[180px]">{ord.customer.address}</div>
                          </td>

                          <td className="py-3 px-4 text-xs">
                            <div className="space-y-1">
                              {ord.items.map((it) => (
                                <div key={`${it.fragranceId}-${it.selectedVolume}`} className="text-[11px]">
                                  <span className="text-[#f5f0e8] font-medium">{it.fragrance.name}</span>
                                  <span className="text-[#8e8171]"> ({it.selectedVolume} × {it.quantity})</span>
                                  {it.customEngraving && (
                                    <span className="text-[#c5a059] block text-[10px]">
                                      Engraved: "{it.customEngraving}"
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="py-3 px-4 font-mono tabular-nums text-xs font-semibold text-[#f5f0e8]">
                            ₨ {ord.totalPKR.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 text-[11px]">
                            <div className="text-[#c5a059] font-medium">{ord.paymentMethod}</div>
                            <div className="text-[10px] text-emerald-400">{ord.paymentStatus}</div>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={ord.fulfillmentStatus}
                              onChange={(e) =>
                                updateOrderStatus(
                                  ord.id,
                                  e.target.value as CustomerOrder['fulfillmentStatus']
                                )
                              }
                              className="bg-[#1c1813] border border-[#3b3124] rounded px-2.5 py-1 text-xs text-[#f5f0e8] focus:border-[#c5a059] outline-none"
                            >
                              <option value="Order Confirmed">Order Confirmed</option>
                              <option value="Custom Engraving & Maceration">Maceration &amp; Engraving</option>
                              <option value="Wax-Sealed in Vault">Wax-Sealed in Vault</option>
                              <option value="Dispatched via Chauffeur">Dispatched via Courier</option>
                              <option value="Delivered">Delivered to Patron</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOMAIN & STORE SETTINGS */}
        {activeTab === 'domain' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#14110e] border border-[#3b3227] rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#f5f0e8]">
                    Online Store Hosting Address Settings
                  </h3>
                  <p className="text-xs text-[#9d8f7e] mt-1">
                    Integrated Custom Domain: <strong className="text-[#c5a059]">{domainSettings.domainName}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setIsDomainModalOpen(true)}
                  className="px-4 py-2 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel text-xs font-bold uppercase rounded transition-colors cursor-pointer"
                >
                  Manage Live DNS &amp; TLS
                </button>
              </div>

              {/* Working Live Cloud Store URL Card */}
              <div className="p-4 bg-[#1b1712] border border-[#c5a059]/30 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Your Store Is Live &amp; Operational Worldwide Right Now At:</span>
                  </span>
                  <span className="text-[10px] text-[#8e8170]">Direct Cloud Run Address</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-[#0e0c0a] rounded border border-[#2d251d]">
                  <code className="text-xs text-[#f5f0e8] font-mono break-all">
                    {domainSettings.cloudRunUrl}
                  </code>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={async () => {
                        await safeCopyToClipboard(domainSettings.cloudRunUrl);
                        showToast('Copied live store URL to clipboard.');
                      }}
                      className="px-2.5 py-1 bg-[#221c16] hover:bg-[#30281f] text-[#c5a059] border border-[#3d3225] rounded text-xs transition-colors cursor-pointer"
                    >
                      Copy Link
                    </button>
                    <a
                      href={domainSettings.cloudRunUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-bold rounded text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Open Store</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 bg-[#1b1712] border border-[#2b231a] rounded-lg space-y-1.5">
                  <div className="text-[10px] text-[#8e8170] uppercase">Target Custom Domain</div>
                  <div className="font-mono text-xs text-[#f5f0e8]">{domainSettings.domainName}</div>
                  <div className="text-[11px] text-amber-400">Requires PKNIC CNAME Pointing</div>
                </div>

                <div className="p-4 bg-[#1b1712] border border-[#2b231a] rounded-lg space-y-1.5">
                  <div className="text-[10px] text-[#8e8170] uppercase">CNAME Destination</div>
                  <div className="font-mono text-[10px] text-[#c5a059] break-all">{domainSettings.cnameTarget}</div>
                  <div className="text-[11px] text-[#8e8170]">Enter in PKNIC DNS console</div>
                </div>

                <div className="p-4 bg-[#1b1712] border border-[#2b231a] rounded-lg space-y-1.5">
                  <div className="text-[10px] text-[#8e8170] uppercase">SSL / TLS Cipher</div>
                  <div className="font-mono text-xs text-[#f5f0e8]">TLS 1.3 Strict</div>
                  <div className="text-[11px] text-emerald-400">Automated Google Provisioning</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingFragrance && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14110e] border border-[#3d3226] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingFragrance(null)}
              className="absolute top-4 right-4 text-[#8e8170] hover:text-[#f4efe6]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel text-lg font-bold text-[#f5f0e8] mb-4">
              Edit Fragrance: {editingFragrance.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a49685]">Fragrance Title</label>
                  <input
                    type="text"
                    value={editingFragrance.name}
                    onChange={(e) => setEditingFragrance({ ...editingFragrance, name: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">French Subtitle</label>
                  <input
                    type="text"
                    value={editingFragrance.frenchTitle}
                    onChange={(e) => setEditingFragrance({ ...editingFragrance, frenchTitle: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a49685]">Retail Price (PKR)</label>
                  <input
                    type="number"
                    value={editingFragrance.pricePKR}
                    onChange={(e) => setEditingFragrance({ ...editingFragrance, pricePKR: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingFragrance.stockQuantity}
                    onChange={(e) => setEditingFragrance({ ...editingFragrance, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">Low Stock Threshold</label>
                  <input
                    type="number"
                    value={editingFragrance.lowStockThreshold}
                    onChange={(e) => setEditingFragrance({ ...editingFragrance, lowStockThreshold: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#a49685]">Description</label>
                <textarea
                  rows={3}
                  value={editingFragrance.description}
                  onChange={(e) => setEditingFragrance({ ...editingFragrance, description: e.target.value })}
                  className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFragrance(null)}
                  className="px-4 py-2 bg-[#201b15] text-[#8e8170] hover:text-[#f4efe6] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel font-bold uppercase rounded"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14110e] border border-[#3d3226] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddingNew(false)}
              className="absolute top-4 right-4 text-[#8e8170] hover:text-[#f4efe6]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel text-lg font-bold text-[#f5f0e8] mb-4">
              Add New Luxury Perfume to Vault
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a49685]">Fragrance Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saffron Imperial"
                    value={newFragData.name}
                    onChange={(e) => setNewFragData({ ...newFragData, name: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">French Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Safran Doré & Ambre"
                    value={newFragData.frenchTitle}
                    onChange={(e) => setNewFragData({ ...newFragData, frenchTitle: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a49685]">Collection</label>
                  <select
                    value={newFragData.collection}
                    onChange={(e) => setNewFragData({ ...newFragData, collection: e.target.value as any })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  >
                    <option value="Oud Royale">Oud Royale</option>
                    <option value="Floral Nocturne">Floral Nocturne</option>
                    <option value="Amber Heritage">Amber Heritage</option>
                    <option value="L’Agrume Impérial">L’Agrume Impérial</option>
                    <option value="Private Reserve">Private Reserve</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">Concentration</label>
                  <select
                    value={newFragData.concentration}
                    onChange={(e) => setNewFragData({ ...newFragData, concentration: e.target.value as any })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                  >
                    <option value="Extrait de Parfum">Extrait de Parfum (35%)</option>
                    <option value="Eau de Parfum">Eau de Parfum (20%)</option>
                    <option value="Pure Parfum Oil">Pure Parfum Oil</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">Retail Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newFragData.pricePKR}
                    onChange={(e) => setNewFragData({ ...newFragData, pricePKR: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a49685]">Initial Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newFragData.stockQuantity}
                    onChange={(e) => setNewFragData({ ...newFragData, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a49685]">SKU</label>
                  <input
                    type="text"
                    required
                    value={newFragData.sku}
                    onChange={(e) => setNewFragData({ ...newFragData, sku: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] font-mono outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#a49685]">Description</label>
                <textarea
                  rows={2}
                  placeholder="Artisanal description of accords, notes, and scent trail..."
                  value={newFragData.description}
                  onChange={(e) => setNewFragData({ ...newFragData, description: e.target.value })}
                  className="w-full bg-[#1b1712] border border-[#30271e] rounded px-3 py-2 text-[#f5f0e8] outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-[#201b15] text-[#8e8170] hover:text-[#f4efe6] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#d9b56d] text-[#0b0a09] font-cinzel font-bold uppercase rounded cursor-pointer"
                >
                  Save &amp; Publish Perfume
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
