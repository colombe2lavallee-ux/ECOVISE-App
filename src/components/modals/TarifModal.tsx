import React, { useState } from 'react';

interface TarifModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTarif: number;
  onSave: (newTarif: number) => void;
}

export const TarifModal: React.FC<TarifModalProps> = ({
  isOpen,
  onClose,
  currentTarif,
  onSave,
}) => {
  const [val, setVal] = useState(currentTarif.toString());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      onSave(num);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-surface-container">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Ajuster Tarif SWM
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Mettez à jour le coût au kilowattheure de votre facture pour recalculer les économies réelles de vos appareils.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="kwhInput">
              Tarif (€/kWh)
            </label>
            <div className="relative flex items-center">
              <input
                id="kwhInput"
                step="0.01"
                min="0.10"
                max="1.50"
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low font-label-numeric-lg text-label-numeric-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
              />
              <span className="absolute right-3.5 font-body-sm text-body-sm text-on-surface-variant font-medium">
                € / kWh
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant">
              Moyenne Allemagne 2025 : ~0,37 à 0,41 € / kWh
            </p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-body-md text-body-sm font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-body-md text-body-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
