import React, { useState } from 'react';

interface EcoAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'chat' | 'video';
}

export const EcoAdvisorModal: React.FC<EcoAdvisorModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'chat',
}) => {
  const [mode, setMode] = useState<'chat' | 'video'>(initialMode);
  const [messages, setMessages] = useState([
    {
      sender: 'advisor',
      text: 'Bonjour Sarah ! Je suis Thomas, votre conseiller éco-transition dédié à Munich. J’ai analysé votre relevé SWM : le remplacement de votre réfrigérateur de 12 ans est votre levier N°1 d’économies immédiates.',
      time: '10:14',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const newMsg = { sender: 'user', text: inputVal, time: '10:16' };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text: 'Bien reçu ! Pour le Liebherr BioFresh A, la prime de 250 € et la reprise de 80 € sont déduites immédiatement sans avance. L’installation comprend la dépose gratuite de l’ancien.',
          time: '10:17',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl relative border border-surface-container space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[20px]">headset_mic</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-body-md font-semibold text-primary">
                Conseiller Éco-Énergie Ecovise
              </h3>
              <p className="text-[11px] text-secondary font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> En ligne · Thomas M.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-surface-container rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mode === 'chat'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            Messagerie instantanée
          </button>
          <button
            onClick={() => setMode('video')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mode === 'video'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">video_call</span>
            Visio 15 min
          </button>
        </div>

        {mode === 'chat' ? (
          <div className="space-y-3">
            <div className="h-56 overflow-y-auto space-y-2.5 p-2 bg-surface-container-low rounded-xl">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-primary text-on-primary rounded-br-none'
                        : 'bg-surface-container-lowest text-on-surface border border-surface-container rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Posez votre question à Thomas..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-3.5 h-10 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 cursor-pointer flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {!bookingConfirmed ? (
              <>
                <p className="text-xs text-on-surface-variant">
                  Réservez un échange visio de 15 minutes avec notre ingénieur thermique pour valider vos devis et optimiser les subventions BAFA de votre foyer.
                </p>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-on-surface uppercase">
                    Créneaux disponibles aujourd'hui
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Aujourd’hui à 14h30', 'Aujourd’hui à 16h15', 'Demain à 10h00', 'Demain à 11h45'].map(
                      (slot, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setBookingConfirmed(true)}
                          className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container hover:border-secondary hover:bg-secondary-fixed/20 text-xs font-medium text-left transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-secondary block mb-1">
                            calendar_today
                          </span>
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 bg-secondary-fixed/30 rounded-xl text-center space-y-2 border border-secondary-fixed">
                <span className="material-symbols-outlined text-[32px] text-secondary">
                  check_circle
                </span>
                <h4 className="text-body-sm font-bold text-primary">Rendez-vous visio confirmé</h4>
                <p className="text-xs text-on-surface">
                  Un lien sécurisé Google Meet a été envoyé à <strong>sarah.meyer@example.de</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="text-xs text-secondary underline cursor-pointer pt-1"
                >
                  Modifier le créneau
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
