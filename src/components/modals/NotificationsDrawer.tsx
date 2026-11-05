import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  read: boolean;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectAppliance: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectAppliance,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl relative border border-surface-container space-y-3 mt-12 sm:mt-0">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              notifications
            </span>
            <h3 className="font-headline-sm text-body-lg text-primary font-bold">
              Notifications & Alertes
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-secondary hover:underline cursor-pointer font-medium"
              type="button"
            >
              Tout marquer lu
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.type === 'warning') onSelectAppliance();
                onClose();
              }}
              className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                n.read
                  ? 'bg-surface-container-low border-surface-container'
                  : 'bg-surface-container-lowest border-secondary-fixed-dim/60 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                    n.type === 'warning'
                      ? 'text-error'
                      : n.type === 'reward'
                      ? 'text-secondary'
                      : 'text-primary'
                  }`}
                >
                  {n.type === 'warning'
                    ? 'warning'
                    : n.type === 'reward'
                    ? 'savings'
                    : 'check_circle'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-body-sm font-semibold text-on-surface leading-snug">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                  </div>
                  <p className="text-[12px] text-on-surface-variant mt-0.5 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
