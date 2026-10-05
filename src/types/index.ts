export interface VolumeOption {
  size: '10ml Discovery' | '50ml' | '100ml';
  pricePKR: number;
}

export type OlfactoryFamily =
  | 'Oriental Oud'
  | 'Floral'
  | 'Woody Amber'
  | 'Fresh Citrus'
  | 'Gourmand'
  | 'Leather';

export type FragranceStatus = 'In Stock' | 'Low Stock' | 'Vault Reserved' | 'Sold Out';

export interface Fragrance {
  id: string;
  name: string;
  frenchTitle: string;
  collection: 'Oud Royale' | 'Floral Nocturne' | 'Amber Heritage' | 'L’Agrume Impérial' | 'Private Reserve';
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Pure Parfum Oil';
  pricePKR: number;
  originalPricePKR?: number;
  volumeOptions: VolumeOption[];
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  batchNo: string;
  status: FragranceStatus;
  image: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  olfactoryFamily: OlfactoryFamily;
  sillage: 'Intimate' | 'Moderate' | 'Opulent' | 'Monolithic';
  longevity: string;
  description: string;
  craftsmanshipNote: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  fragranceId: string;
  fragrance: Fragrance;
  selectedVolume: '10ml Discovery' | '50ml' | '100ml';
  pricePKR: number;
  quantity: number;
  customEngraving?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    notes?: string;
  };
  items: CartItem[];
  subtotalPKR: number;
  deliveryMethod: string;
  deliveryFeePKR: number;
  totalPKR: number;
  paymentMethod: 'Card (3D Secure)' | 'Cash on Delivery (COD)' | 'Raast / Instant Bank Transfer';
  paymentStatus: 'Paid & Encrypted' | 'Pending Verification' | 'COD Authorized';
  fulfillmentStatus: 'Order Confirmed' | 'Custom Engraving & Maceration' | 'Wax-Sealed in Vault' | 'Dispatched via Chauffeur' | 'Delivered';
  trackingCode: string;
  complimentarySamples: string[];
  customEngravingText?: string;
}

export interface DomainRecord {
  type: 'A' | 'CNAME' | 'TXT' | 'CAA';
  host: string;
  value: string;
  status: 'Propagated & Secured' | 'Configured' | 'Verified';
  ttl: string;
}

export interface DomainSettings {
  domainName: string;
  subdomain: string;
  liveAddress: string;
  cloudRunUrl: string;
  hostingStatus: 'Active & Secured' | 'Propagating' | 'Maintenance';
  sslProvider: string;
  primaryIP: string;
  cnameTarget: string;
  edgeNodes: string[];
  dnsRecords: DomainRecord[];
  lastPingMs: number;
  lastVerified: string;
  recommendedDomains: string[];
}

export interface ScentRecommendationResult {
  topMatch: Fragrance;
  matchScore: number;
  reasoning: string;
  secondaryMatches: Fragrance[];
  suggestedLayering: {
    baseFragrance: Fragrance;
    layerFragrance: Fragrance;
    technique: string;
  };
}

export interface NotificationSettings {
  adminPhone: string;
  adminWhatsApp: string;
  soundAlertEnabled: boolean;
  browserPushEnabled: boolean;
  autoOpenWhatsApp: boolean;
  smsGatewayWebhookUrl?: string;
  lastNotificationSent?: string;
}
