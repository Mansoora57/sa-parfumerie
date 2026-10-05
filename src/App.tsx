import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionsGrid } from './components/CollectionsGrid';
import { Craftsmanship } from './components/Craftsmanship';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FragranceFinderModal } from './components/FragranceFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DomainHostingModal } from './components/DomainHostingModal';
import { AdminCMS } from './components/AdminCMS';
import { Toast } from './components/Toast';

const MainLayout: React.FC = () => {
  const { activeView, isWorkingPlatform } = useStore();

  return (
    <div className="min-h-screen bg-[#0c0b0a] text-[#f4efe6] flex flex-col font-sans-luxury selection:bg-[#c5a059]/30 selection:text-[#f7e7ce]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'store' || !isWorkingPlatform ? (
          <>
            <Hero />
            <CollectionsGrid />
            <Craftsmanship />
          </>
        ) : (
          <AdminCMS />
        )}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <FragranceFinderModal />
      <CartDrawer />
      <CheckoutModal />
      {isWorkingPlatform && <DomainHostingModal />}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
