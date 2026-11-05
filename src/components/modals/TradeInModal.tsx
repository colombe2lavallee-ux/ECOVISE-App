import React, { useState } from 'react';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToStore: () => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  onGoToStore,
}) => {
  const [deviceType, setDeviceType] = useState('fridge');
  const [age, setAge] = useState(12);
  const [condition, setCondition] = useState('working');

  if (!isOpen) return null;

  // Calculation formula
  const baseTradeIn = deviceType === 'fridge' ? 80 : deviceType === 'washer' ? 65 : 45;
  const stateGrant = 250;
  const estimatedAnnualSavings = deviceType === 'fridge' ? 190 : deviceType === 'washer' ? 95 : 55;
  const totalDirectDeduction = baseTradeIn + stateGrant;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-surface-container space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              calculate
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Estimer ma prime & reprise
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

        <p className="font-body-sm text-xs text-on-surface-variant">
          Estimez en temps réel le montant déductible immédiatement au panier avec le recyclage de votre équipement énergivore.
        </p>

        {/* Device selection */}
        <div className="space-y-1.5">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            Type d'équipement
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'fridge', label: 'Réfrigérateur', icon: 'kitchen' },
              { id: 'washer', label: 'Lave-linge', icon: 'local_laundry_service' },
              { id: 'dishwasher', label: 'Lave-vaisselle', icon: 'dishwasher_gen' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setDeviceType(t.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  deviceType === t.id
                    ? 'border-secondary bg-secondary-container/20 text-secondary font-semibold'
                    : 'border-surface-container bg-surface-container-low text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                <span className="text-[11px] leading-tight text-center">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Age Slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Âge de l'appareil
            </span>
            <span className="font-bold text-primary font-label-numeric-md">{age} ans</span>
          </div>
          <input
            type="range"
            min="3"
            max="20"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
            className="w-full accent-secondary"
          />
          <div className="flex justify-between text-[10px] text-on-surface-variant">
            <span>3 ans</span>
            <span>10 ans (amorti)</span>
            <span>20 ans</span>
          </div>
        </div>

        {/* Condition */}
        <div className="space-y-1.5">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            État fonctionnel
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCondition('working')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium cursor-pointer ${
                condition === 'working'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface'
              }`}
            >
              Fonctionnel (En service)
            </button>
            <button
              type="button"
              onClick={() => setCondition('damaged')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium cursor-pointer ${
                condition === 'damaged'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface'
              }`}
            >
              En panne / Bruyant
            </button>
          </div>
        </div>

        {/* Calculation Result Bento */}
        <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2 border border-surface-container">
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">Reprise garantie Ecovise DEEE :</span>
            <span className="font-bold text-secondary font-label-numeric-md">+{baseTradeIn} €</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">Prime Éco-Rénovation Bavière :</span>
            <span className="font-bold text-secondary font-label-numeric-md">+{stateGrant} €</span>
          </div>
          <div className="h-[1px] bg-surface-variant" />
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-semibold text-on-surface block">
                Total déductible au panier :
              </span>
              <span className="text-[11px] text-secondary font-medium">
                + {estimatedAnnualSavings} €/an d'électricité économisée
              </span>
            </div>
            <span className="font-display-hero-mobile text-[22px] font-bold text-primary">
              {totalDirectDeduction} €
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onGoToStore();
            }}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
            type="button"
          >
            <span>Choisir un remplaçant au Store (-{totalDirectDeduction} €)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
