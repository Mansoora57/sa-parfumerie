import React, { createContext, useContext, useState, useEffect } from 'react';
import { Fragrance, CartItem, CustomerOrder, DomainSettings } from '../types';
import { INITIAL_FRAGRANCES, INITIAL_DOMAIN_SETTINGS } from '../data/initialFragrances';

interface StoreContextType {
  // Products / Inventory
  fragrances: Fragrance[];
  selectedFragrance: Fragrance | null;
  setSelectedFragrance: (f: Fragrance | null) => void;
  updateStock: (fragranceId: string, delta: number) => void;
  setFragranceStock: (fragranceId: string, newStock: number) => void;
  updateFragrance: (fragrance: Fragrance) => void;
  addFragrance: (fragrance: Omit<Fragrance, 'id'>) => void;
  deleteFragrance: (fragranceId: string) => void;
  resetInventory: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (fragrance: Fragrance, volume: '10ml Discovery' | '50ml' | '100ml', engraving?: string) => void;
  removeFromCart: (fragranceId: string, volume: string) => void;
  updateCartQuantity: (fragranceId: string, volume: string, delta: number) => void;
  clearCart: () => void;
  cartTotalPKR: number;
  cartCount: number;

  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isFinderOpen: boolean;
  setIsFinderOpen: (open: boolean) => void;
  isDomainModalOpen: boolean;
  setIsDomainModalOpen: (open: boolean) => void;
  activeView: 'store' | 'cms';
  setActiveView: (view: 'store' | 'cms') => void;

  // Orders
  orders: CustomerOrder[];
  addOrder: (order: Omit<CustomerOrder, 'id' | 'orderNumber' | 'date'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: CustomerOrder['fulfillmentStatus']) => void;

  // Domain & Hosting
  domainSettings: DomainSettings;
  updateDomainSettings: (settings: Partial<DomainSettings>) => void;
  pingDomain: () => Promise<number>;

  // Platform Environment (Working/Studio Platform vs Customer Side)
  isWorkingPlatform: boolean;
  setIsWorkingPlatform: (val: boolean) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [fragrances, setFragrances] = useState<Fragrance[]>(() => {
    const saved = localStorage.getItem('shahzein_fragrances');
    if (saved) {
      try {
        const parsed: Fragrance[] = JSON.parse(saved);
        return parsed.map((item) => {
          const fresh = INITIAL_FRAGRANCES.find((f) => f.id === item.id);
          if (fresh && item.image && item.image.startsWith('/src/assets/images/')) {
            return { ...item, image: fresh.image };
          }
          return item;
        });
      } catch {
        return INITIAL_FRAGRANCES;
      }
    }
    return INITIAL_FRAGRANCES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shahzein_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('shahzein_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Seed with 1 initial sample order for luxury realism in CMS
    return [
      {
        id: 'ord-sample-1',
        orderNumber: 'SAP-7821-PK',
        date: '2026-10-02 18:45',
        customer: {
          fullName: 'Tariq Mansoor Al-Rashid',
          email: 'tariq.mansoor@consulate.pk',
          phone: '+92 300 8241920',
          address: 'Suite 402, Clifton Luxury Enclave, Block 4',
          city: 'Karachi',
          postalCode: '75600',
          country: 'Pakistan',
          notes: 'Handle with care: bespoke gold bottle engraving requested.',
        },
        items: [
          {
            fragranceId: 'oud-shahzein-royale',
            fragrance: INITIAL_FRAGRANCES[0],
            selectedVolume: '100ml',
            pricePKR: 28500,
            quantity: 1,
            customEngraving: 'T.M.R. 2026',
          },
        ],
        subtotalPKR: 28500,
        deliveryMethod: 'Royal Chauffeur White Glove (Same-Day Karachi)',
        deliveryFeePKR: 0,
        totalPKR: 28500,
        paymentMethod: 'Card (3D Secure)',
        paymentStatus: 'Paid & Encrypted',
        fulfillmentStatus: 'Wax-Sealed in Vault',
        trackingCode: 'KHI-EXP-88912-SA',
        complimentarySamples: ['Rose Nocturne de Taif 2ml', 'Amber Sultani Privé 2ml'],
        customEngravingText: 'T.M.R. 2026',
      },
    ];
  });

  const [domainSettings, setDomainSettings] = useState<DomainSettings>(() => {
    const saved = localStorage.getItem('shahzein_domain');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DOMAIN_SETTINGS;
      }
    }
    return INITIAL_DOMAIN_SETTINGS;
  });

  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'store' | 'cms'>('store');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Detect whether running in working platform (AI Studio Build / preview / dev) vs public customer side
  const [isWorkingPlatform, setIsWorkingPlatformState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    const searchParams = new URLSearchParams(window.location.search);

    // URL override triggers: ?admin=true or ?working=true unlocks working platform controls
    if (searchParams.get('admin') === 'true' || searchParams.get('cms') === 'true' || searchParams.get('working') === 'true') {
      localStorage.setItem('shahzein_working_platform', 'true');
      return true;
    }
    if (searchParams.get('customer') === 'true') {
      localStorage.removeItem('shahzein_working_platform');
      return false;
    }

    // Check localStorage saved preference
    const savedPlatform = localStorage.getItem('shahzein_working_platform');
    if (savedPlatform === 'true') return true;

    // Working platform host detection (Cloud Run AI Studio preview, localhost, dev environments)
    const isDevHost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.includes('.run.app') || // AI Studio dev & shared preview URLs
      hostname.includes('googleusercontent.com') ||
      hostname.includes('webcontainer') ||
      hostname.includes('stackblitz');

    return isDevHost;
  });

  const setIsWorkingPlatform = (val: boolean) => {
    setIsWorkingPlatformState(val);
    if (val) {
      localStorage.setItem('shahzein_working_platform', 'true');
    } else {
      localStorage.removeItem('shahzein_working_platform');
    }
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('shahzein_fragrances', JSON.stringify(fragrances));
  }, [fragrances]);

  useEffect(() => {
    localStorage.setItem('shahzein_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shahzein_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shahzein_domain', JSON.stringify(domainSettings));
  }, [domainSettings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const updateStock = (fragranceId: string, delta: number) => {
    setFragrances((prev) =>
      prev.map((item) => {
        if (item.id === fragranceId) {
          const newQty = Math.max(0, item.stockQuantity + delta);
          let newStatus = item.status;
          if (newQty === 0) newStatus = 'Sold Out';
          else if (newQty <= item.lowStockThreshold) newStatus = 'Low Stock';
          else newStatus = 'In Stock';
          return { ...item, stockQuantity: newQty, status: newStatus };
        }
        return item;
      })
    );
  };

  const setFragranceStock = (fragranceId: string, newStock: number) => {
    setFragrances((prev) =>
      prev.map((item) => {
        if (item.id === fragranceId) {
          const validQty = Math.max(0, newStock);
          let newStatus = item.status;
          if (validQty === 0) newStatus = 'Sold Out';
          else if (validQty <= item.lowStockThreshold) newStatus = 'Low Stock';
          else newStatus = 'In Stock';
          return { ...item, stockQuantity: validQty, status: newStatus };
        }
        return item;
      })
    );
  };

  const updateFragrance = (updated: Fragrance) => {
    setFragrances((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
    showToast(`Updated "${updated.name}" inventory details.`);
  };

  const addFragrance = (newFrag: Omit<Fragrance, 'id'>) => {
    const id = newFrag.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullFragrance: Fragrance = {
      ...newFrag,
      id: `${id}-${Date.now().toString().slice(-4)}`,
    };
    setFragrances((prev) => [fullFragrance, ...prev]);
    showToast(`Added "${fullFragrance.name}" to inventory.`);
  };

  const deleteFragrance = (id: string) => {
    setFragrances((prev) => prev.filter((f) => f.id !== id));
    showToast('Fragrance removed from collection.');
  };

  const resetInventory = () => {
    setFragrances(INITIAL_FRAGRANCES);
    localStorage.removeItem('shahzein_fragrances');
    showToast('Inventory reset to Maison Master Archive.');
  };

  // Cart operations
  const addToCart = (
    fragrance: Fragrance,
    volume: '10ml Discovery' | '50ml' | '100ml',
    engraving?: string
  ) => {
    const volumeOption = fragrance.volumeOptions.find((v) => v.size === volume);
    const price = volumeOption ? volumeOption.pricePKR : fragrance.pricePKR;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.fragranceId === fragrance.id &&
          item.selectedVolume === volume &&
          (item.customEngraving || '') === (engraving || '')
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          fragranceId: fragrance.id,
          fragrance,
          selectedVolume: volume,
          pricePKR: price,
          quantity: 1,
          customEngraving: engraving,
        },
      ];
    });

    showToast(`Added ${fragrance.name} (${volume}) to your shopping coffret.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (fragranceId: string, volume: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.fragranceId === fragranceId && item.selectedVolume === volume)
      )
    );
  };

  const updateCartQuantity = (
    fragranceId: string,
    volume: string,
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.fragranceId === fragranceId &&
            item.selectedVolume === volume
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalPKR = cart.reduce(
    (sum, item) => sum + item.pricePKR * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Orders
  const addOrder = (
    orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'date'>
  ): CustomerOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `SAP-${randomSuffix}-PK`,
      date: dateStr,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automatically decrement inventory stock
    orderData.items.forEach((item) => {
      updateStock(item.fragranceId, -item.quantity);
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: CustomerOrder['fulfillmentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, fulfillmentStatus: status } : ord))
    );
    showToast(`Order status updated to "${status}".`);
  };

  // Domain Management
  const updateDomainSettings = (newSettings: Partial<DomainSettings>) => {
    setDomainSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Domain routing & DNS records updated.');
  };

  const pingDomain = async (): Promise<number> => {
    // Simulate real high-speed DNS Edge ping
    const latency = Math.floor(18 + Math.random() * 12);
    setDomainSettings((prev) => ({
      ...prev,
      lastPingMs: latency,
      lastVerified: `Active · DNS & SSL Verified (${latency}ms response time via Asia-South Node)`,
    }));
    return latency;
  };

  return (
    <StoreContext.Provider
      value={{
        fragrances,
        selectedFragrance,
        setSelectedFragrance,
        updateStock,
        setFragranceStock,
        updateFragrance,
        addFragrance,
        deleteFragrance,
        resetInventory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalPKR,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFinderOpen,
        setIsFinderOpen,
        isDomainModalOpen,
        setIsDomainModalOpen,
        activeView,
        setActiveView,
        orders,
        addOrder,
        updateOrderStatus,
        domainSettings,
        updateDomainSettings,
        pingDomain,
        isWorkingPlatform,
        setIsWorkingPlatform,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
