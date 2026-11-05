import React from 'react';
import { Appliance } from '../../types';

interface ApplianceDiagnosticModalProps {
  appliance: Appliance | null;
  onClose: () => void;
  onNavigateToStore: () => void;
}

export const ApplianceDiagnosticModal: React.FC<ApplianceDiagnosticModalProps> = ({
  appliance,
  onClose,
  onNavigateToStore,
}) => {
  if (!appliance) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-surface-container space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              analytics
            </span>
            <h3 className="font-headline-sm text-body-lg font-bold text-primary">
              Rapport de Télémétrie IA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex gap-3.5 items-center">
          <div className="w-16 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0">
            <img src={appliance.imageUrl} alt={appliance.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-on-surface">{appliance.name}</h4>
            <p className="text-xs text-on-surface-variant">
              {appliance.brand} {appliance.model} • {appliance.ageYears} ans
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
              {appliance.energyClass} (Surconsommation active)
            </span>
          </div>
        </div>

        {/* Diagnostic Metrics */}
        <div className="space-y-2.5 bg-surface-container-low p-3.5 rounded-xl border border-surface-container text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Consommation mesurée :</span>
            <span className="font-mono font-bold text-on-surface">{appliance.annualKwh} kWh / an</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Facture annuelle :</span>
            <span className="font-mono font-bold text-error">~{appliance.annualCost} € / an</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Surcoût évitable :</span>
            <span className="font-mono font-bold text-error">~{appliance.excessCost} € / an</span>
          </div>
          <div className="pt-1 border-t border-surface-container flex items-center gap-1.5 text-tertiary">
            <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">
              warning
            </span>
            <span>{appliance.leakDescription}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs cursor-pointer hover:bg-surface-container-high"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToStore();
            }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary/90 cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Voir remplaçants</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
