import React, { useState } from 'react';
import { StoreProduct } from '../types';

interface StoreScreenProps {
  products: StoreProduct[];
  onAddToCart: (product: StoreProduct) => void;
  onOpenProductInfo: (product: StoreProduct) => void;
  onOpenSimulator: () => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  products,
  onAddToCart,
  onOpenProductInfo,
  onOpenSimulator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended');
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);
  const [leasingDurationMonths, setLeasingDurationMonths] = useState(36);

  const categories = [
    { id: 'recommended', label: 'Recommandé pour vous', icon: 'check_circle' },
    { id: 'all', label: 'Tous les appareils' },
    { id: 'fridge', label: 'Réfrigérateurs A+++' },
    { id: 'washer', label: 'Lave-linge éco' },
    { id: 'dishwasher', label: 'Lave-vaisselle' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'recommended') return true;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'fridge') return p.category === 'fridge';
    if (selectedCategory === 'washer') return p.category === 'washer';
    if (selectedCategory === 'dishwasher') return p.category === 'dishwasher';
    return true;
  });

  const p1 = products.find((p) => p.id === 'prod-1') || products[0];
  const p2 = products.find((p) => p.id === 'prod-2') || products[1];
  const p3 = products.find((p) => p.id === 'prod-3') || products[2];

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* Contextual Header */}
      <div className="flex items-start justify-between pt-1">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed mb-1.5">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider font-bold">
              Aides Déduites Directement
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-[24px] font-bold text-primary tracking-tight">
            Éco-Store & Primes
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Rénovez vos équipements gourmands sans avance de frais.
          </p>
        </div>
        <button
          onClick={() => setSelectedCategory('all')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-primary shadow-sm shrink-0 cursor-pointer hover:bg-surface-container-highest"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
        </button>
      </div>

      {/* Hero Grant Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-5 text-on-primary shadow-md">
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <span className="material-symbols-outlined text-[160px] text-white">solar_power</span>
        </div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-1 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </span>
            <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary-fixed font-bold">
              Coup de Pouce Rénovation 2025
            </span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm leading-tight font-bold text-white">
              Jusqu'à 250 € d'aides de l'État & primes énergie
            </p>
            <p className="font-body-sm text-body-sm text-primary-fixed mt-1">
              Déduction immédiate au panier + livraison soignée et reprise de votre ancien matériel 100% offertes.
            </p>
          </div>

          {/* Live Grant Tracker Meter */}
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-label-numeric-md mb-1.5 text-surface-container-low">
              <span>Sarah : Éligibilité Prime Validée</span>
              <span className="font-bold text-secondary-fixed">250 € / 250 €</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden">
              <div className="h-full bg-secondary-fixed rounded-full w-full transition-all duration-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Filter Chips */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
            Catégories éligibles
          </span>
          <span className="font-body-sm text-xs text-secondary font-semibold">
            Diagnostic Sarah (2 alertes)
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {categories.map((c) => {
            const active = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-full font-body-sm text-body-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                {c.icon && <span className="material-symbols-outlined text-[16px]">{c.icon}</span>}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product 1: Liebherr Pure BioFresh A (Recommandation N°1) */}
      {p1 && (
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm space-y-3.5 border border-surface-container">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[11px] font-bold">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                recommend
              </span>
              Recommandation Ecovise N°1
            </span>
            <span className="font-label-caps text-[11px] text-error bg-error-container/60 px-2 py-0.5 rounded-full font-semibold">
              Remplace votre Bosch (12 ans)
            </span>
          </div>

          <div className="flex gap-3.5 items-center">
            <div className="w-24 h-28 rounded-xl overflow-hidden bg-surface-container shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                src={p1.imageUrl}
                alt={p1.name}
              />
              <span className="absolute bottom-1 left-1 bg-primary text-on-primary font-label-caps text-[10px] font-bold px-1.5 py-0.5 rounded">
                {p1.energyClass}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold truncate">
                {p1.name}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p1.subtitle}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-label-numeric-lg text-[22px] text-primary font-bold">
                  {p1.price} €
                </span>
                {p1.originalPrice && (
                  <span className="font-body-sm text-body-sm text-outline line-through">
                    {p1.originalPrice} €
                  </span>
                )}
                {p1.discountBadge && (
                  <span className="font-label-caps text-label-caps text-secondary font-bold bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                    {p1.discountBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Energy Comparison Matrix */}
          <div className="rounded-xl bg-surface-container-low p-3 space-y-2 border border-surface-container">
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface-variant">Conso annuelle :</span>
              <span className="font-label-numeric-md text-label-numeric-md font-semibold text-primary">
                {p1.annualKwh} kWh/an (~{p1.annualCost} €/an)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface-variant">Votre appareil actuel :</span>
              <span className="font-label-numeric-md text-label-numeric-md text-error font-medium">
                {p1.oldApplianceKwh} kWh/an (~{p1.oldApplianceCost} €/an)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-variant overflow-hidden flex">
              <div className="h-full bg-secondary w-1/10 rounded-full" />
              <div className="h-full bg-error/40 w-9/10" />
            </div>
            <p className="font-label-caps text-[11px] text-secondary font-semibold flex items-center gap-1 pt-0.5">
              <span className="material-symbols-outlined text-[14px]">savings</span>
              Gain net estimé : +{p1.annualSavings} €/an d'électricité immédiatement
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onAddToCart(p1)}
              className="flex-1 py-3 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:opacity-90 cursor-pointer transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Ajouter avec reprise (-{p1.tradeInBonus} €)</span>
            </button>
            <button
              onClick={() => onOpenProductInfo(p1)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-high text-primary shrink-0 hover:bg-surface-container-highest cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>
          </div>
        </div>
      )}

      {/* Product 2: Bosch Serie 8 EcoSilence */}
      {p2 && (
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm space-y-3 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">
              {p2.recommendationBadge}
            </span>
            <span className="font-label-caps text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">
              Remplacement conseillé
            </span>
          </div>

          <div className="flex gap-3.5 items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                src={p2.imageUrl}
                alt={p2.name}
              />
              <span className="absolute bottom-1 left-1 bg-secondary text-on-secondary font-label-caps text-[10px] font-bold px-1.5 py-0.5 rounded">
                {p2.energyClass}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold truncate">
                {p2.name}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p2.subtitle}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-label-numeric-lg text-[22px] text-primary font-bold">
                  {p2.price} €
                </span>
                {p2.originalPrice && (
                  <span className="font-body-sm text-body-sm text-outline line-through">
                    {p2.originalPrice} €
                  </span>
                )}
                {p2.discountBadge && (
                  <span className="font-label-caps text-label-caps text-secondary-container text-on-secondary-container font-bold px-1.5 py-0.5 rounded">
                    {p2.discountBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl text-xs font-body-sm border border-surface-container">
            <span className="text-on-surface-variant">{p2.annualKwh} kWh / 100 cycles</span>
            <span className="font-label-numeric-md font-bold text-secondary">
              Économie : ~{p2.annualSavings} €/an
            </span>
          </div>

          <button
            onClick={() => onAddToCart(p2)}
            className="w-full py-2.5 px-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 active:opacity-90 cursor-pointer transition-colors shadow-sm"
            type="button"
          >
            <span>Sélectionner cet appareil</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Product 3: Miele G 7000 EcoFlex */}
      {p3 && (
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm space-y-3 border border-surface-container">
          <div className="flex gap-3.5 items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                src={p3.imageUrl}
                alt={p3.name}
              />
              <span className="absolute bottom-1 left-1 bg-primary text-on-primary font-label-caps text-[10px] font-bold px-1.5 py-0.5 rounded">
                {p3.energyClass}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {p3.silenceRating && (
                <div className="inline-flex items-center gap-1 text-[11px] font-label-caps text-on-tertiary-container bg-tertiary-fixed px-1.5 py-0.5 rounded mb-1 font-semibold">
                  {p3.silenceRating}
                </div>
              )}
              <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold truncate">
                {p3.name}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p3.subtitle}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-label-numeric-lg text-[22px] text-primary font-bold">
                  {p3.price} €
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  Aides : {p3.appliedGrant} € appliquées
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenProductInfo(p3)}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-variant transition-colors cursor-pointer"
            type="button"
          >
            <span>Découvrir la fiche complète</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      )}

      {/* Simulator Express Mensualité / Leasing Éco */}
      <div className="rounded-2xl bg-surface-container-low p-4 space-y-3 border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">payments</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Option Abonnement & Leasing Éco
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Financez à partir de{' '}
          <span className="font-semibold text-primary font-label-numeric-md">19 €/mois</span>,
          intégralement compensé par vos économies d'électricité mensuelles.
        </p>

        {/* Visual equation card */}
        <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest p-3 rounded-xl text-center items-center border border-surface-container">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant font-medium">
              Mensualité
            </p>
            <p className="font-label-numeric-md text-label-numeric-md text-primary font-bold mt-0.5">
              19 €
            </p>
          </div>
          <div className="text-secondary font-bold text-lg">-</div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant font-medium">
              Éco énergie
            </p>
            <p className="font-label-numeric-md text-label-numeric-md text-secondary font-bold mt-0.5">
              -21 €
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs px-1 text-on-surface-variant">
          <span>Reste à charge effectif :</span>
          <span className="font-bold text-secondary font-label-numeric-md">
            +2 €/mois en votre faveur
          </span>
        </div>

        <button
          onClick={() => setShowSimulatorModal(true)}
          className="w-full py-2.5 rounded-xl bg-surface-container-highest text-primary font-body-sm text-body-sm font-semibold text-center hover:bg-surface-variant transition-colors cursor-pointer"
          type="button"
        >
          Simuler mon reste à charge zéro
        </button>
      </div>

      {/* RoCoT / Ecovise Guarantees Banner */}
      <div className="rounded-2xl bg-surface-container-lowest p-4 space-y-3 border border-surface-container">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">verified_user</span> Les
          Engagements Sérénité Ecovise
        </h3>
        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                Garantie 5 ans constructeur & pièces incluse
              </p>
              <p className="font-label-caps text-[11px] text-on-surface-variant">
                Protection totale sans franchise ni coût caché
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">recycling</span>
            </div>
            <div>
              <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                Reprise et recyclage certifié de l'ancien matériel
              </p>
              <p className="font-label-caps text-[11px] text-on-surface-variant">
                Filière éco-responsable certifiée DEEE
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                Livraison & installation soignée à domicile
              </p>
              <p className="font-label-caps text-[11px] text-on-surface-variant">
                Mise en service et configuration éco par nos experts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      {showSimulatorModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 border border-surface-container">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Simulateur Leasing Zéro Reste à Charge
              </h3>
              <button
                onClick={() => setShowSimulatorModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Nos partenaires bancaires verts appliquent directement la déduction des primes d'État et des gains en kilowattheures garantis sur votre échéancier.
            </p>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase text-on-surface">
                Durée du contrat : {leasingDurationMonths} mois
              </label>
              <input
                type="range"
                min="24"
                max="48"
                step="12"
                value={leasingDurationMonths}
                onChange={(e) => setLeasingDurationMonths(parseInt(e.target.value, 10))}
                className="w-full accent-secondary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>24 mois</span>
                <span>36 mois (conseillé)</span>
                <span>48 mois</span>
              </div>
            </div>

            <div className="p-3.5 bg-secondary-fixed/20 rounded-xl space-y-1.5 border border-secondary-fixed">
              <div className="flex justify-between text-xs">
                <span>Loyer mensuel :</span>
                <span className="font-mono font-bold text-primary">
                  {leasingDurationMonths === 24 ? 25 : leasingDurationMonths === 36 ? 19 : 15} €/mois
                </span>
              </div>
              <div className="flex justify-between text-xs text-secondary font-semibold">
                <span>Gain kWh garanti :</span>
                <span className="font-mono">-21 €/mois</span>
              </div>
              <div className="border-t border-secondary-fixed/40 pt-1 flex justify-between text-sm font-bold text-primary">
                <span>Bilan mensuel pour vous :</span>
                <span className="text-secondary font-mono">
                  {leasingDurationMonths === 24 ? '+4 €/mois' : leasingDurationMonths === 36 ? '+2 €/mois' : '-6 €/mois'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSimulatorModal(false);
                onAddToCart(p1);
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs cursor-pointer shadow-sm"
              type="button"
            >
              Choisir cette formule sans avance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
