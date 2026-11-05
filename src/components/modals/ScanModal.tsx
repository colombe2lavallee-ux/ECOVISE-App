import React, { useState } from 'react';
import { Appliance } from '../../types';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScannedAppliance?: (appliance: Appliance) => void;
  onNavigateToStore?: () => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onAddScannedAppliance,
  onNavigateToStore,
}) => {
  const [step, setStep] = useState<'camera' | 'scanning' | 'result'>('camera');
  const [manualMode, setManualMode] = useState(false);
  const [serialInput, setSerialInput] = useState('');

  if (!isOpen) return null;

  const handleStartScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('result');
    }, 1800);
  };

  const handleReset = () => {
    setStep('camera');
    setManualMode(false);
  };

  const detectedAppliance: Appliance = {
    id: `scan-${Date.now()}`,
    name: 'Réfrigérateur Bosch KGN39',
    brand: 'Bosch',
    model: 'Serie 4 NoFrost Combi',
    room: 'kitchen',
    roomLabel: 'Cuisine',
    ageYears: 12,
    energyClass: 'Classe F',
    oldRatingTag: 'Class F (Old A+)',
    status: 'critical',
    statusLabel: 'Critique',
    annualKwh: 815,
    annualCost: 310,
    excessCost: 190,
    leakDescription: 'Joint magnétique usé & compresseur en surrégime (78%)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0WRdt7Z7TsL_Vm2053WKdJrzK2PpAwiN5yDQBVW7_3kdNSFvAp_Evc4qyFHvmpsy_PE3q2cP2Th8Kw9AkZ-oZcMb-SzLYSCB9Iwz_FaMEMWX4Qhxesl56zoXfHaYaCgIHWrYbT4QWhqpZnB4NbEhJhxZuzNXDB2qNVP96EHhgRRSDqFHtf83jUjNpcMN2ttvkn3FQ9HIbxy9nug49mlG_QuKw9_k-ZiOTRhpLgikdA4jGRpl3_fiu',
    tradeInValue: 80,
    potentialSavings: 190,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-surface-container transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              document_scanner
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              Scanner un appareil
            </h2>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {step === 'camera' && !manualMode && (
          <div className="space-y-4">
            <div className="h-48 rounded-xl bg-slate-900 text-white relative overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner border border-slate-700">
              {/* Simulated camera viewfinder corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-secondary-fixed rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-secondary-fixed rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-secondary-fixed rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-secondary-fixed rounded-br-sm" />

              {/* Sample nameplate mockup */}
              <div className="bg-slate-800/80 border border-slate-600 rounded p-2 text-center text-[10px] font-mono tracking-wider text-slate-300 max-w-[220px]">
                <p className="font-bold text-white">BOSCH · E-Nr. KGN39VI35/01</p>
                <p>FD 9304 · 004821 · 220-240V ~ 50Hz</p>
                <div className="h-1 w-full bg-secondary-fixed/50 rounded mt-1 animate-pulse" />
              </div>

              <div className="mt-3 text-center">
                <span className="font-body-sm text-[13px] font-medium text-white block">
                  Pointez la plaque signalétique
                </span>
                <span className="text-[11px] text-slate-400">
                  Généralement située à l'intérieur de la porte ou à l'arrière
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleStartScan}
                className="w-full py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                <span>Démarrer l'analyse photo IA</span>
              </button>

              <button
                onClick={() => setManualMode(true)}
                className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-body-sm text-[13px] font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
                type="button"
              >
                Saisir le modèle ou numéro de série
              </button>
            </div>
          </div>
        )}

        {step === 'scanning' && (
          <div className="h-56 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="relative w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed mb-4">
              <span className="material-symbols-outlined text-[36px] animate-spin">
                sync
              </span>
            </div>
            <h4 className="font-headline-sm text-body-lg font-semibold text-white">
              Analyse IA en cours...
            </h4>
            <p className="font-body-sm text-xs text-slate-300 mt-1">
              Lecture de la plaque optique & vérification des barèmes énergétiques BAFA
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-error uppercase tracking-wider bg-error-container px-2 py-0.5 rounded-full">
                    Classe F (Ancien A+)
                  </span>
                  <h4 className="font-headline-sm text-body-lg font-bold text-on-surface mt-1">
                    Bosch NoFrost Serie 4
                  </h4>
                  <p className="text-xs text-on-surface-variant">Fabriqué en 2013 (12 ans d'âge)</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-on-surface-variant block">Surconsommation</span>
                  <span className="font-label-numeric-lg text-[18px] font-bold text-error">
                    +190 €/an
                  </span>
                </div>
              </div>

              <div className="p-2 bg-error-container/40 rounded-lg text-xs text-on-error-container flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-error shrink-0">
                  warning
                </span>
                <span>Dégradation d'isolation thermique détectée. Remplacement hautement rentable.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-surface-container p-2.5 rounded-xl">
                <span className="text-on-surface-variant block">Reprise garantie</span>
                <span className="font-bold text-primary font-label-numeric-md">+80 € cashback</span>
              </div>
              <div className="bg-secondary-fixed/30 p-2.5 rounded-xl">
                <span className="text-on-surface-variant block">Primes déductibles</span>
                <span className="font-bold text-secondary font-label-numeric-md">Jusqu'à 250 €</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  if (onNavigateToStore) onNavigateToStore();
                  onClose();
                  handleReset();
                }}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-body-sm text-body-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/90"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Voir les remplaçants A+++ subventionnés</span>
              </button>

              <button
                onClick={() => {
                  if (onAddScannedAppliance) onAddScannedAppliance(detectedAppliance);
                  onClose();
                  handleReset();
                }}
                className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-body-sm text-[13px] font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Ajouter à mes équipements
              </button>
            </div>
          </div>
        )}

        {manualMode && step === 'camera' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Marque et Référence
              </label>
              <input
                type="text"
                placeholder="Ex: Bosch KGN39, Whirlpool 6th..."
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setManualMode(false)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs"
              >
                Retour caméra
              </button>
              <button
                onClick={handleStartScan}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm"
              >
                Rechercher
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
