import React, { useState } from 'react';
import { TabType, Appliance } from '../types';

interface AppliancesScreenProps {
  appliances: Appliance[];
  onNavigate: (tab: TabType) => void;
  onOpenScan: () => void;
  onOpenTradeIn: () => void;
  onOpenDiagnostic: (appliance: Appliance) => void;
}

export const AppliancesScreen: React.FC<AppliancesScreenProps> = ({
  appliances,
  onNavigate,
  onOpenScan,
  onOpenTradeIn,
  onOpenDiagnostic,
}) => {
  const [filter, setFilter] = useState<'all' | 'replace' | 'eco' | 'kitchen' | 'laundry'>('all');

  const filteredAppliances = appliances.filter((app) => {
    if (filter === 'all') return true;
    if (filter === 'replace') return app.status === 'critical' || app.status === 'inefficient';
    if (filter === 'eco') return app.status === 'optimal' || app.status === 'standard';
    if (filter === 'kitchen') return app.room === 'kitchen';
    if (filter === 'laundry') return app.room === 'laundry';
    return true;
  });

  const totalCost = appliances.reduce((sum, a) => sum + a.annualCost, 0);

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* Title & Scan Button */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim inline-block animate-pulse" />
            <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold tracking-wider">
              Diagnostic Éco-Énergie
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-[24px] font-bold text-primary tracking-tight">
            Mes Appareils
          </h1>
        </div>
        <button
          onClick={onOpenScan}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary text-sm font-medium shadow-sm active:scale-95 transition-transform cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          <span className="font-body-sm text-body-sm text-on-primary font-medium">Scanner</span>
        </button>
      </div>

      {/* Health Score Overview */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden border border-surface-container">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
              Santé du Parc Domestique
            </span>
            <span className="font-body-sm text-body-sm text-on-surface mt-0.5 font-medium">
              {appliances.length} appareils connectés
            </span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">64</span>
            <span className="text-xs text-on-surface-variant font-medium">/ 100</span>
          </div>
        </div>

        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
          <div className="bg-secondary h-full rounded-full transition-all duration-700 w-[64%]" />
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant mt-2 font-medium">
          <span className="flex items-center gap-1 text-tertiary-container font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" /> 2 énergivores
          </span>
          <span className="flex items-center gap-1 text-secondary font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary" /> 2 éco-efficients
          </span>
        </div>
      </div>

      {/* Annual Breakdown Stacked Bar Chart */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-3 border border-surface-container">
        <div className="flex justify-between items-baseline">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide font-semibold">
            Répartition annuelle estimée
          </span>
          <span className="font-label-numeric-md text-label-numeric-md text-primary font-bold">
            {totalCost} €/an total
          </span>
        </div>

        <div className="h-4 w-full flex rounded-lg overflow-hidden gap-0.5 bg-surface-container-low p-0.5">
          <div className="bg-error rounded-sm h-full w-[37%]" title="Réfrigérateur 37%" />
          <div className="bg-tertiary-fixed-dim rounded-sm h-full w-[26%]" title="Lave-linge 26%" />
          <div className="bg-secondary-fixed-dim rounded-sm h-full w-[17%]" title="Lave-vaisselle 17%" />
          <div className="bg-secondary rounded-sm h-full w-[10%]" title="Cuisson 10%" />
          <div className="bg-surface-variant rounded-sm h-full w-[10%]" title="Autres 10%" />
        </div>

        <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error shrink-0" />
            <span className="text-on-surface truncate">Frigo Bosch (37%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0" />
            <span className="text-on-surface truncate">Lave-linge (26%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim shrink-0" />
            <span className="text-on-surface truncate">Lave-vaisselle (17%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <span className="text-on-surface truncate">Table Miele (10%)</span>
          </div>
        </div>
      </div>

      {/* Savings Opportunity Callout */}
      <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-lowest/15 shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
              electric_bolt
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-caps text-label-caps text-secondary-fixed tracking-wider uppercase font-bold">
                Opportunité d'Épargne
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary/95 leading-snug">
              Le remplacement de votre réfrigérateur amorti (12 ans) vous fera économiser{' '}
              <strong className="text-secondary-fixed font-semibold">190 €/an</strong> et évitera{' '}
              <strong className="text-secondary-fixed font-semibold">140 kg de CO₂</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {[
          { id: 'all', label: `Tous (${appliances.length})` },
          { id: 'replace', label: 'À remplacer (2)' },
          { id: 'eco', label: 'Éco-performants (2)' },
          { id: 'kitchen', label: 'Cuisine (3)' },
          { id: 'laundry', label: 'Buanderie (1)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-4 py-2 rounded-full font-body-sm text-body-sm font-semibold whitespace-nowrap shadow-sm transition-colors cursor-pointer ${
              filter === t.id
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Appliance List Cards */}
      <div className="space-y-3.5">
        {filteredAppliances.map((app) => (
          <div
            key={app.id}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden border border-surface-container transition-all"
          >
            <div className="flex gap-space-md">
              <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src={app.imageUrl}
                  alt={app.name}
                />
                <span
                  className={`absolute top-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                    app.status === 'critical'
                      ? 'bg-error text-on-error'
                      : app.status === 'inefficient'
                      ? 'bg-tertiary-fixed-dim text-on-tertiary-container'
                      : app.status === 'optimal'
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-variant text-on-surface'
                  }`}
                >
                  {app.energyClass}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                      {app.roomLabel} • {app.ageYears} ans
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        app.status === 'critical'
                          ? 'bg-error-container text-on-error-container'
                          : app.status === 'inefficient'
                          ? 'bg-tertiary-fixed/60 text-on-tertiary-fixed'
                          : app.status === 'optimal'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {app.statusLabel}
                    </span>
                  </div>

                  <h2 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5 font-bold">
                    {app.brand} {app.model}
                  </h2>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`font-label-numeric-lg text-[18px] font-bold ${
                        app.status === 'optimal' ? 'text-secondary' : 'text-on-surface'
                      }`}
                    >
                      {app.annualCost} €
                      <span className="text-xs font-normal text-on-surface-variant">/an</span>
                    </span>
                    {app.excessCost && (
                      <span
                        className={`text-xs font-semibold ${
                          app.status === 'critical' ? 'text-error' : 'text-on-tertiary-container'
                        }`}
                      >
                        +{app.excessCost} € de surcoût
                      </span>
                    )}
                    {app.status === 'optimal' && (
                      <span className="text-xs text-secondary font-medium">Basse conso</span>
                    )}
                    {app.status === 'standard' && (
                      <span className="text-xs text-on-surface-variant font-medium">
                        Usage modéré
                      </span>
                    )}
                  </div>
                </div>

                {app.leakDescription && (
                  <div
                    className={`flex items-center gap-1.5 text-xs mt-2 px-2 py-1 rounded-md ${
                      app.status === 'critical'
                        ? 'text-tertiary bg-tertiary-fixed/30'
                        : app.status === 'optimal'
                        ? 'text-secondary bg-secondary-fixed/20'
                        : 'text-on-surface-variant bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px] shrink-0">
                      {app.status === 'critical'
                        ? 'warning'
                        : app.status === 'optimal'
                        ? 'check_circle'
                        : 'schedule'}
                    </span>
                    <span className="truncate font-medium">{app.leakDescription}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions for draining / replaceable appliances */}
            {app.status === 'critical' && (
              <div className="flex items-center gap-2 mt-space-md pt-space-sm border-t border-surface-container/40">
                <button
                  onClick={onOpenTradeIn}
                  className="flex-1 py-2 px-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">eco</span>
                  <span>Reprise +80 €</span>
                </button>
                <button
                  onClick={() => onNavigate('store')}
                  className="flex-1 py-2 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">autorenew</span>
                  <span>Voir remplaçants</span>
                </button>
              </div>
            )}

            {app.status === 'inefficient' && (
              <div className="flex items-center gap-2 mt-space-md pt-space-sm border-t border-surface-container/40">
                <button
                  onClick={() => onOpenDiagnostic(app)}
                  className="flex-1 py-2 px-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">build</span>
                  <span>Diagnostic</span>
                </button>
                <button
                  onClick={() => onNavigate('store')}
                  className="flex-1 py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-body-sm text-body-sm font-semibold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">savings</span>
                  <span>Économiser 95 €</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add via Nameplate Footer Action */}
      <div className="pt-2">
        <button
          onClick={onOpenScan}
          className="w-full p-space-md rounded-xl bg-surface-container-low flex items-center justify-between text-left hover:bg-surface-container transition-colors cursor-pointer border border-surface-container"
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </div>
            <div>
              <h3 className="font-body-md text-body-md font-bold text-on-surface">
                Ajouter via Plaque Constructeur
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                L'IA détecte modèle, année et consommation
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};
