import React, { useState } from 'react';
import { UserSettings } from '../types';

interface ProfileScreenProps {
  settings: UserSettings;
  onOpenTarifModal: () => void;
  onOpenAdvisorModal: (mode: 'chat' | 'video') => void;
  onOpenGuideModal: () => void;
  onShowToast: (msg: string) => void;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  settings,
  onOpenTarifModal,
  onOpenAdvisorModal,
  onOpenGuideModal,
  onShowToast,
  onUpdateSettings,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(settings.name);
  const [editLocation, setEditLocation] = useState(settings.location);

  const handleSyncSmartMeter = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Compteur SWM synchronisé : 4/4 appareils indexés.');
    }, 1200);
  };

  const handleDownloadPdf = () => {
    onShowToast('Téléchargement de l’audit T1 2024 (PDF 2.4 Mo) initié.');
  };

  const handleDownloadCertificate = () => {
    onShowToast('Certificat DEEE Recyclage Réfrigérateur & Lave-linge téléchargé.');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ name: editName, location: editLocation });
    setShowEditProfileModal(false);
    onShowToast('Profil mis à jour.');
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-12 pt-1">
      {/* Profile Identity Card */}
      <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden border border-surface-container">
        <div className="flex items-start gap-space-md">
          <div className="relative shrink-0">
            <img
              alt={settings.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-primary-fixed"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVqxRLx0q0fn_0s22vPw-hhOovTcY85p7lv_elDWJqszuV-S3GB8dFa10upf5r5pRs7um6Dr7sfAHv1GxbDuKqDHxKQE58ub1NKDvmzJpbL3AHd0hmmO37It16Wns45alpGHyITgEG0OvxwLv3OcoIzfQtcYXffvoojlHNJbl9dO8sWDn-KYQWPScrqrU_4w7CCIP9DXX-iTuspL656EBhCTgNIq3vwHB-8Mxo-8KFYBxWbd5LT0HZ"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-on-secondary ring-2 ring-surface-container-lowest">
              <span
                className="material-symbols-outlined text-[10px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-space-xs">
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                {settings.name}
              </h1>
              <button
                aria-label="Éditer le profil"
                onClick={() => setShowEditProfileModal(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high/60 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              {settings.email}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-primary">
                location_on
              </span>
              <span className="font-body-sm text-body-sm text-xs truncate">
                {settings.location}
              </span>
            </div>
          </div>
        </div>

        {/* Membership status badge */}
        <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between border border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </span>
            <div>
              <p className="font-headline-sm text-body-sm text-primary font-bold leading-tight">
                Membre Premium Éco-Transition
              </p>
              <p className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                Actif depuis Mars 2024
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase font-bold">
            PRO
          </span>
        </div>
      </section>

      {/* Section: Mon Foyer & Données Énergie */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline-sm text-body-lg text-primary font-bold flex items-center gap-2">
            <span
              className="material-symbols-outlined text-secondary text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cottage
            </span>
            Mon Foyer & Données Énergie
          </h2>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="font-label-caps text-label-caps text-secondary uppercase hover:underline font-bold cursor-pointer"
            type="button"
          >
            Modifier
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-surface-container">
          {/* Housing specs */}
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col justify-between border border-surface-container">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span className="font-label-caps text-label-caps uppercase font-semibold">
                  Type d'habitat
                </span>
              </div>
              <div className="mt-2">
                <p className="font-headline-sm text-body-md text-on-surface font-bold">
                  {settings.homeType}
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  {settings.surfaceM2} m² • {settings.peopleCount} personnes
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col justify-between border border-surface-container">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">devices_other</span>
                <span className="font-label-caps text-label-caps uppercase font-semibold">
                  Surveillance
                </span>
              </div>
              <div className="mt-2">
                <p className="font-headline-sm text-body-md text-on-surface font-bold">
                  4 Appareils
                </p>
                <p className="font-body-sm text-[12px] text-secondary font-bold">100% monitorés</p>
              </div>
            </div>
          </div>

          {/* Electricity provider card */}
          <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm border border-surface-container">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                    Fournisseur d'électricité
                  </p>
                  <p className="font-headline-sm text-body-md text-on-surface font-bold">
                    {settings.provider}
                  </p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-secondary-fixed/30 mt-1 shrink-0" />
            </div>

            <div className="flex items-baseline justify-between pt-space-xs">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant font-medium">
                  Tarif de base appliqué
                </span>
                <div className="font-label-numeric-lg text-[22px] text-primary font-bold">
                  {settings.tarifKwh.toFixed(2).replace('.', ',')}{' '}
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                    € / kWh
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenTarifModal}
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-body-sm text-[13px] font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Ajuster tarif
              </button>
            </div>
          </div>

          {/* Smart Meter Sync module */}
          <div className="bg-surface-container-high/40 rounded-lg p-space-sm flex items-center justify-between border border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-[20px]">sensors</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-body-md text-body-sm font-semibold text-on-surface">
                    Compteur SWM / Smart Link
                  </p>
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Synchro auto toutes les {settings.autoSyncIntervalMin} min
                </p>
              </div>
            </div>
            <button
              aria-label="Forcer la synchronisation"
              onClick={handleSyncSmartMeter}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-high transition-colors cursor-pointer ${
                isSyncing ? 'animate-spin' : ''
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">sync</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section: Paramètres & Préférences */}
      <section className="space-y-space-sm">
        <div className="px-1">
          <h2 className="font-headline-sm text-body-lg text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
            Paramètres & Préférences
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container divide-y divide-surface-container">
          {/* Toggle: Alertes temps réel */}
          <label className="flex items-center justify-between p-space-md cursor-pointer hover:bg-surface-container-low/40 rounded-t-xl transition-colors">
            <div className="flex items-center gap-space-sm max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Alertes de surconsommation
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Notification instantanée lors d'un pic inhabituel
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.alertsSurconso}
              onChange={(e) => onUpdateSettings({ alertsSurconso: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary relative" />
          </label>

          {/* Toggle: Aides & Subventions */}
          <label className="flex items-center justify-between p-space-md cursor-pointer hover:bg-surface-container-low/40 transition-colors">
            <div className="flex items-center gap-space-sm max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">savings</span>
              </div>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Aides & subventions locales
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Veille sur les primes Bavière et fédérales BAFA
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.subventionsAlert}
              onChange={(e) => onUpdateSettings({ subventionsAlert: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary relative" />
          </label>

          {/* Toggle: Mode Éco-Suggestion */}
          <label className="flex items-center justify-between p-space-md cursor-pointer hover:bg-surface-container-low/40 transition-colors">
            <div className="flex items-center gap-space-sm max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">tips_and_updates</span>
              </div>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Mode Éco-Suggestion hebdo
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Recommandations intelligentes chaque lundi
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.weeklyEcoSuggestions}
              onChange={(e) => onUpdateSettings({ weeklyEcoSuggestions: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary relative" />
          </label>

          {/* Action: Rapport PDF */}
          <div className="p-space-md flex items-center justify-between hover:bg-surface-container-low/40 rounded-b-xl transition-colors">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              </div>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Audit énergétique global
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Dernier relevé trimestriel T1 2024
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-primary font-body-sm text-[12px] font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              PDF
            </button>
          </div>
        </div>
      </section>

      {/* Section: Assistance, Recyclage & Conseils */}
      <section className="space-y-space-sm">
        <div className="px-1">
          <h2 className="font-headline-sm text-body-lg text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">support_agent</span>
            Assistance & Documents
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md space-y-space-md border border-surface-container">
          {/* Recycling certificates highlight */}
          <div className="bg-secondary-fixed/20 rounded-lg p-space-sm flex items-center justify-between border border-secondary-fixed/40">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                verified_user
              </span>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-secondary-fixed-variant">
                  Certificats de recyclage & reprise
                </p>
                <p className="font-body-sm text-[12px] text-on-secondary-fixed-variant/80">
                  2 appareils certifiés remis en filière DEEE
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadCertificate}
              className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm hover:scale-105 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
            </button>
          </div>

          {/* Eco-advisor direct contact card */}
          <div className="bg-surface-container-low rounded-lg p-space-md border border-surface-container">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
              </div>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Conseiller Éco-Énergie Ecovise
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Accompagnement personnalisé inclus
                </p>
              </div>
            </div>
            <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
              <button
                onClick={() => onOpenAdvisorModal('chat')}
                className="w-full py-2 px-space-sm rounded-lg bg-surface-container-lowest text-primary text-body-sm text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Messagerie
              </button>
              <button
                onClick={() => onOpenAdvisorModal('video')}
                className="w-full py-2 px-space-sm rounded-lg bg-primary text-on-primary text-body-sm text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">video_call</span>
                Visio 15 min
              </button>
            </div>
          </div>

          {/* FAQ & Energy Labels Reference */}
          <button
            onClick={onOpenGuideModal}
            className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer text-left border border-surface-container"
            type="button"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px]">
                label_important
              </span>
              <div>
                <p className="font-body-md text-body-sm font-semibold text-on-surface">
                  Guide des étiquettes européennes
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Comprendre l'échelle A+++ à G et nouvelles normes A-G
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* App Footer Actions */}
      <section className="pt-space-xs pb-space-sm space-y-space-md">
        <button
          onClick={() => onShowToast('Session sécurisée conservée.')}
          className="w-full py-3 rounded-lg bg-surface-container-low text-error font-body-md text-body-md font-semibold flex items-center justify-center gap-2 hover:bg-error-container/40 transition-colors cursor-pointer border border-surface-container"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Se déconnecter
        </button>
        <div className="text-center">
          <p className="font-label-caps text-[11px] text-outline uppercase tracking-wider">
            Ecovise Energy OS • Version 2.4.1 (Build 842)
          </p>
          <p className="font-body-sm text-[12px] text-outline mt-0.5">
            Données hébergées en Allemagne • Conforme RGPD
          </p>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4 border border-surface-container">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-primary">Modifier mes coordonnées</h3>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase text-on-surface-variant">
                  Ville / District
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary/90 cursor-pointer"
              >
                Sauvegarder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
