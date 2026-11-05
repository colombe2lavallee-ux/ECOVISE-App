import React from 'react';

interface EnergyLabelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnergyLabelGuideModal: React.FC<EnergyLabelGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const comparison = [
    { oldClass: 'A+++', newClass: 'Classe A / B', note: 'Technologie ultra-efficace, compresseurs inverter' },
    { oldClass: 'A++', newClass: 'Classe C / D', note: 'Bonne isolation, conso modérée' },
    { oldClass: 'A+', newClass: 'Classe E / F', note: 'Gourmand aujourd’hui (10-15 ans d’âge)' },
    { oldClass: 'A & inférieur', newClass: 'Classe G', note: 'Passoire thermique, surcoût >150 €/an' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-surface-container space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              label_important
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Guide des Étiquettes Énergie
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

        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
          Depuis la réforme européenne de 2021, les classes A+, A++ et A+++ ont été supprimées au profit d'une échelle plus stricte de <strong>A à G</strong>. Votre ancien réfrigérateur A+ correspond désormais à une <strong>Classe F</strong> !
        </p>

        {/* Visual Comparison Scale */}
        <div className="space-y-2">
          {comparison.map((item, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">
                  {item.oldClass}
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  arrow_forward
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono font-bold">
                  {item.newClass}
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant text-right max-w-[150px] truncate">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-secondary-container/20 rounded-xl border border-secondary-fixed text-xs text-on-surface space-y-1">
          <div className="flex items-center gap-1.5 text-secondary font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Pourquoi remplacer un appareil Classe F ?
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Un passage de la classe F à la classe A réduit la facture énergétique du poste froid de <strong>80%</strong>, soit un amortissement en moins de 3 ans avec les primes déduites.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs cursor-pointer hover:bg-primary/90"
        >
          Compris, fermer le guide
        </button>
      </div>
    </div>
  );
};
