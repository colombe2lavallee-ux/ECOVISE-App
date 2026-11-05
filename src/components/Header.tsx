import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-surface-container/60">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left cursor-pointer"
        >
          <img
            alt="Ecovise"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBW79GZGZv9DNfgRAjpFYmYlXBNESmSJkMXkYffJeIgiuKXOy1Jltr2MPNu4Otek-UU-unuRFPWvTPxbJdQdRxgISold9FBahKyjB2mB8QgCGpDc_zL2crQFUIaf3FKvvrBI7B-902o0zytIgtoonysIz47A6US-Mkd4OCacdWcbAGAehjz0jPMMawuVYJGnTsTJI6NRb6hQIUm-vVB8pNCrUHfau5iUOM11BWhm91ATbqlgYpRL74x38bgD8Vnr-5SA"
            onError={(e) => {
              // Fallback logo if blocked
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
          <span className="font-headline-sm text-[22px] font-bold text-primary tracking-tight">
            Ecovise
          </span>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface animate-pulse" />
            )}
          </button>

          <button
            aria-label="User Profile"
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:opacity-90 transition-opacity cursor-pointer relative"
            type="button"
          >
            <img
              alt="Profile Sarah"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVqxRLx0q0fn_0s22vPw-hhOovTcY85p7lv_elDWJqszuV-S3GB8dFa10upf5r5pRs7um6Dr7sfAHv1GxbDuKqDHxKQE58ub1NKDvmzJpbL3AHd0hmmO37It16Wns45alpGHyITgEG0OvxwLv3OcoIzfQtcYXffvoojlHNJbl9dO8sWDn-KYQWPScrqrU_4w7CCIP9DXX-iTuspL656EBhCTgNIq3vwHB-8Mxo-8KFYBxWbd5LT0HZ"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
