import React, { useState } from 'react';
import { TabType, Appliance, StoreProduct } from './types';
import {
  initialUserSettings,
  initialAppliances,
  storeProducts,
  rewardTransactions,
  partnerVouchers,
  initialNotifications,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { AppliancesScreen } from './components/AppliancesScreen';
import { StoreScreen } from './components/StoreScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ProfileScreen } from './components/ProfileScreen';

// Modals
import { ScanModal } from './components/modals/ScanModal';
import { TradeInModal } from './components/modals/TradeInModal';
import { TarifModal } from './components/modals/TarifModal';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { EcoAdvisorModal } from './components/modals/EcoAdvisorModal';
import { EnergyLabelGuideModal } from './components/modals/EnergyLabelGuideModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { ApplianceDiagnosticModal } from './components/modals/ApplianceDiagnosticModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [settings, setSettings] = useState(initialUserSettings);
  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isRebateOpen, setIsRebateOpen] = useState(false);
  const [isTarifOpen, setIsTarifOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorInitialMode, setAdvisorInitialMode] = useState<'chat' | 'video'>('chat');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Appliance | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  // Adjust electricity tariff and recalculate costs across all appliances
  const handleSaveTarif = (newTarif: number) => {
    const currentRate = settings.tarifKwh || 0.38;
    setSettings((prev) => ({ ...prev, tarifKwh: newTarif }));
    setAppliances((prev) =>
      prev.map((app) => {
        const newAnnualCost = Math.round(app.annualKwh * newTarif);
        const baselineKwh = app.annualKwh - (app.excessCost ? Math.round(app.excessCost / currentRate) : 0);
        const newExcess = app.excessCost ? Math.round((app.annualKwh - baselineKwh) * newTarif) : undefined;
        return {
          ...app,
          annualCost: newAnnualCost,
          excessCost: newExcess,
        };
      })
    );
    showToast(`Nouveau tarif SWM enregistré : ${newTarif.toFixed(2)} €/kWh. Calculs mis à jour !`);
  };

  const handleAddScannedAppliance = (newApp: Appliance) => {
    setAppliances((prev) => [newApp, ...prev]);
    showToast(`${newApp.name} ajouté à vos équipements.`);
  };

  const handleAddToCart = (product: StoreProduct) => {
    showToast(
      `${product.name} sélectionné avec reprise garantie (-${product.tradeInBonus} €) & prime d'État (-${product.appliedGrant} €) déduites !`
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Toutes les alertes ont été marquées comme lues.');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col items-center">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 max-w-sm mx-auto z-50 p-3.5 bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 animate-slideDown">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">
              check_circle
            </span>
            <span className="text-body-sm text-[13px] font-medium leading-tight">
              {toastMessage}
            </span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-inverse-on-surface/70 hover:text-white p-1 cursor-pointer shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Main Responsive Mobile Frame */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-sm">
        {/* Fixed Top Header */}
        <Header
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadCount}
        />

        {/* Content Area with Top & Bottom Navigation Padding */}
        <main className="flex-1 w-full px-4 pt-18 pb-24">
          {currentTab === 'home' && (
            <HomeScreen
              appliances={appliances}
              onNavigate={setCurrentTab}
              onOpenScan={() => setIsScanOpen(true)}
              onOpenRebate={() => setIsRebateOpen(true)}
            />
          )}

          {currentTab === 'appliances' && (
            <AppliancesScreen
              appliances={appliances}
              onNavigate={setCurrentTab}
              onOpenScan={() => setIsScanOpen(true)}
              onOpenTradeIn={() => setIsRebateOpen(true)}
              onOpenDiagnostic={(app) => setSelectedDiagnostic(app)}
            />
          )}

          {currentTab === 'store' && (
            <StoreScreen
              products={storeProducts}
              onAddToCart={handleAddToCart}
              onOpenProductInfo={(prod) => setSelectedProduct(prod)}
              onOpenSimulator={() => setIsRebateOpen(true)}
            />
          )}

          {currentTab === 'rewards' && (
            <RewardsScreen
              walletBalance={settings.walletBalance}
              ecoPoints={settings.ecoPoints}
              referralCode={settings.referralCode}
              transactions={rewardTransactions}
              vouchers={partnerVouchers}
              onOpenScan={() => setIsScanOpen(true)}
              onShowToast={showToast}
              onUpdateWallet={(bal) => setSettings((s) => ({ ...s, walletBalance: bal }))}
              onUpdatePoints={(pts) => setSettings((s) => ({ ...s, ecoPoints: pts }))}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              settings={settings}
              onOpenTarifModal={() => setIsTarifOpen(true)}
              onOpenAdvisorModal={(mode) => {
                setAdvisorInitialMode(mode);
                setIsAdvisorOpen(true);
              }}
              onOpenGuideModal={() => setIsGuideOpen(true)}
              onShowToast={showToast}
              onUpdateSettings={(newVals) => setSettings((s) => ({ ...s, ...newVals }))}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
      </div>

      {/* Global Modals */}
      <ScanModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onAddScannedAppliance={handleAddScannedAppliance}
        onNavigateToStore={() => setCurrentTab('store')}
      />

      <TradeInModal
        isOpen={isRebateOpen}
        onClose={() => setIsRebateOpen(false)}
        onGoToStore={() => setCurrentTab('store')}
      />

      <TarifModal
        isOpen={isTarifOpen}
        onClose={() => setIsTarifOpen(false)}
        currentTarif={settings.tarifKwh}
        onSave={handleSaveTarif}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectAppliance={() => setCurrentTab('appliances')}
      />

      <EcoAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        initialMode={advisorInitialMode}
      />

      <EnergyLabelGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <ApplianceDiagnosticModal
        appliance={selectedDiagnostic}
        onClose={() => setSelectedDiagnostic(null)}
        onNavigateToStore={() => setCurrentTab('store')}
      />
    </div>
  );
}
