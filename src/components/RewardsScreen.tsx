import React, { useState } from 'react';
import { RewardTransaction, PartnerVoucher } from '../types';

interface RewardsScreenProps {
  walletBalance: number;
  ecoPoints: number;
  referralCode: string;
  transactions: RewardTransaction[];
  vouchers: PartnerVoucher[];
  onOpenScan: () => void;
  onShowToast: (msg: string) => void;
  onUpdateWallet: (newBalance: number) => void;
  onUpdatePoints: (newPoints: number) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  walletBalance,
  ecoPoints,
  referralCode,
  transactions,
  vouchers,
  onOpenScan,
  onShowToast,
  onUpdateWallet,
  onUpdatePoints,
}) => {
  const [unlockedVouchers, setUnlockedVouchers] = useState<string[]>([]);
  const [showIbanModal, setShowIbanModal] = useState(false);
  const [ibanInput, setIbanInput] = useState('DE89 7002 0270 0012 3456 78');

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode).catch(() => {});
    onShowToast(`Code "${referralCode}" copié dans le presse-papier !`);
  };

  const handleWithdraw = () => {
    setShowIbanModal(true);
  };

  const handleConfirmWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIbanModal(false);
    onShowToast(`Demande de virement de ${walletBalance.toFixed(2)} € initiée vers votre IBAN SWM.`);
    onUpdateWallet(0);
  };

  const handleConvertStore = () => {
    const converted = walletBalance * 1.1;
    onShowToast(
      `Bon d'achat Ecovise Store de ${converted.toFixed(2)} € (+10% bonus) généré avec succès !`
    );
    onUpdateWallet(0);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Salut ! Scanne ton vieil électroménager avec Ecovise pour savoir s'il surconsomme, j'utilise le code ${referralCode} pour t'offrir le bilan éco !`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    onShowToast('Partage WhatsApp initié.');
  };

  const handleUnlockVoucher = (voucher: PartnerVoucher) => {
    if (unlockedVouchers.includes(voucher.id)) {
      onShowToast(`L'offre "${voucher.title}" est déjà débloquée dans votre compte.`);
      return;
    }
    if (ecoPoints < voucher.costPoints) {
      onShowToast(`Points insuffisants (${ecoPoints} / ${voucher.costPoints} pts requis).`);
      return;
    }
    onUpdatePoints(ecoPoints - voucher.costPoints);
    setUnlockedVouchers((prev) => [...prev, voucher.id]);
    onShowToast(`Offre "${voucher.title}" débloquée avec succès (-${voucher.costPoints} pts) !`);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Header Subtitle & Quick Status */}
      <div className="flex items-center justify-between pt-2 pb-1">
        <div>
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider font-bold">
            Cagnotte & Solidarité
          </span>
          <h1 className="font-headline-lg-mobile text-[24px] font-bold text-on-surface tracking-tight">
            Récompenses & Parrainage
          </h1>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-sm">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <span>Niveau 3</span>
        </div>
      </div>

      {/* Primary Wallet Hero Bento */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-primary text-on-primary p-space-lg shadow-md">
        {/* Atmospheric decorative leaf vector */}
        <svg
          className="absolute -right-8 -bottom-10 w-44 h-44 text-white/5 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <path d="M50 0 C70 25 90 45 90 75 C90 90 75 100 50 100 C25 100 10 90 10 75 C10 45 30 25 50 0 Z" />
        </svg>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider font-semibold">
                Cagnotte disponible
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display-hero-mobile text-[32px] font-bold tracking-tight text-white font-label-numeric-lg">
                  {walletBalance.toFixed(2).replace('.', ',')}
                </span>
                <span className="font-headline-sm text-headline-sm text-primary-fixed font-semibold">
                  €
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-right">
              <div className="flex items-center justify-end gap-1 text-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-white">
                  {ecoPoints.toLocaleString('fr-FR')}
                </span>
              </div>
              <span className="text-[11px] text-primary-fixed-dim font-medium">
                Éco-Pionnier • Munich
              </span>
            </div>
          </div>

          {/* Quick Transfer Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleWithdraw}
              disabled={walletBalance <= 0}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-lowest text-primary font-bold text-body-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:bg-surface-bright disabled:opacity-50"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              <span>Transférer sur mon compte</span>
            </button>

            <button
              onClick={handleConvertStore}
              disabled={walletBalance <= 0}
              className="relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold text-body-sm shadow-sm active:scale-[0.98] transition-all overflow-hidden group cursor-pointer hover:bg-secondary-fixed-dim disabled:opacity-50"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Convertir en Store</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-secondary-fixed ml-0.5">
                +10%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Referral / Scan & Earn Card */}
      <div className="relative rounded-2xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container overflow-hidden space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
              Programme « Scan & Earn »
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Traquez les passoires thermiques avec vos proches
            </p>
          </div>
        </div>

        {/* Promo Banner Highlight */}
        <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-container">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">monetization_on</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">
            Gagnez <strong className="text-secondary font-bold">15 €</strong> par appareil énergivore scanné chez un voisin, parent ou ami.
          </p>
        </div>

        {/* Visual Stepper */}
        <div className="grid grid-cols-3 gap-2 text-center py-2">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs mb-1.5 shadow-sm">
              1
            </div>
            <span className="font-body-sm text-xs text-on-surface-variant font-medium leading-tight">
              Scannez la plaque électro
            </span>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs mb-1.5 shadow-sm">
              2
            </div>
            <span className="font-body-sm text-xs text-on-surface-variant font-medium leading-tight">
              Bilan éco offert immédiat
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xs mb-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">celebration</span>
            </div>
            <span className="font-body-sm text-xs text-on-surface font-semibold leading-tight">
              +15 € pour vous
            </span>
          </div>
        </div>

        {/* Referral Code Box */}
        <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2.5 border border-surface-container">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
            Votre code parrain éco unique
          </span>
          <div className="flex items-center justify-between bg-surface-container-lowest px-3.5 py-2.5 rounded-lg shadow-sm border border-surface-container">
            <span className="font-label-numeric-lg text-[16px] tracking-wider font-bold text-primary">
              {referralCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 text-secondary hover:text-primary font-semibold text-xs transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
              <span>Copier</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-0.5">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary text-on-primary text-xs font-semibold active:scale-[0.98] transition-transform cursor-pointer hover:bg-primary/90"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>WhatsApp</span>
            </button>
            <button
              onClick={onOpenScan}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-surface-container-highest text-on-surface text-xs font-semibold hover:bg-surface-dim active:scale-[0.98] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Scanner un frigo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Neighborhood Eco Ranking Munich */}
      <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">location_on</span>
            <div>
              <h2 className="font-headline-sm text-body-lg font-bold text-on-surface">
                Munich Bogenhausen
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Défi sobriété du quartier • Mars 2025
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed">
            Top 38%
          </span>
        </div>

        {/* Metric Bar */}
        <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between gap-4 border border-surface-container">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
              Impact évité
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-label-numeric-lg text-[22px] text-primary font-bold">142</span>
              <span className="text-body-sm font-semibold text-on-surface-variant">
                kg CO<sub>2</sub>
              </span>
            </div>
          </div>

          {/* Compact SVG Gauge Visualization */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="62, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-primary font-label-numeric-md">
                #42
              </span>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-on-surface-variant leading-tight">sur 110 foyers</p>
              <p className="text-[11px] text-secondary font-semibold">+2 places cette sem.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Rewards & Earnings History */}
      <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline-sm text-body-lg font-bold text-on-surface">
            Historique des gains
          </h2>
          <span className="text-xs font-semibold text-secondary">3 opérations</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container/60"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    tx.status === 'validated'
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-tertiary-fixed text-on-tertiary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                </div>
                <div>
                  <h3 className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {tx.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">{tx.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-secondary">
                  +{tx.amount.toFixed(2).replace('.', ',')} €
                </span>
                <span
                  className={`block text-[10px] font-semibold ${
                    tx.status === 'validated'
                      ? 'text-secondary'
                      : 'text-tertiary-container bg-tertiary-fixed px-1.5 py-0.2 rounded-full inline-block mt-0.5'
                  }`}
                >
                  {tx.status === 'validated' ? 'Validé' : 'En attente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Partner Vouchers */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-body-lg font-bold text-on-surface">
              Bons partenaires déblocables
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Convertissez vos points en rabais immédiats
            </p>
          </div>
          <span className="text-xs font-semibold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-md">
            {vouchers.length} dispo
          </span>
        </div>

        {vouchers.map((v) => {
          const isUnlocked = unlockedVouchers.includes(v.id);
          return (
            <div
              key={v.id}
              className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-3 border border-surface-container"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">{v.icon}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
                      {v.category}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface text-base font-bold">
                      {v.title}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">{v.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high">
                <div className="flex items-center gap-1 text-on-surface-variant text-xs font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">toll</span>
                  <span>
                    Coût : <strong>{v.costPoints} pts</strong>
                  </span>
                </div>
                <button
                  onClick={() => handleUnlockVoucher(v)}
                  disabled={isUnlocked}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                    isUnlocked
                      ? 'bg-surface-container text-secondary font-bold'
                      : 'bg-primary text-on-primary hover:bg-primary/90'
                  }`}
                  type="button"
                >
                  {isUnlocked ? '✓ Offre active' : "Débloquer l'offre"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* IBAN Withdraw Modal */}
      {showIbanModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4 border border-surface-container">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-body-lg font-bold text-primary">
                Virement Bancaire Immédiat
              </h3>
              <button
                onClick={() => setShowIbanModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Transférez les <strong className="text-secondary">{walletBalance.toFixed(2)} €</strong> de votre cagnotte directement vers votre compte courant.
            </p>
            <form onSubmit={handleConfirmWithdraw} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-on-surface uppercase">
                  IBAN du titulaire
                </label>
                <input
                  type="text"
                  value={ibanInput}
                  onChange={(e) => setIbanInput(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container font-mono text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary/90 cursor-pointer"
              >
                Valider le virement de {walletBalance.toFixed(2)} €
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
