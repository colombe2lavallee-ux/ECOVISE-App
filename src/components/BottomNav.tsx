import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: 'home' },
    { id: 'appliances' as TabType, label: 'Appliances', icon: 'kitchen' },
    { id: 'store' as TabType, label: 'Store', icon: 'shopping_bag' },
    {
      id: 'rewards' as TabType,
      label: 'Rewards',
      icon: 'redeem',
      badge: '+€15',
    },
    { id: 'profile' as TabType, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_12px_rgba(20,83,45,0.06)]">
      <div className="max-w-md mx-auto flex justify-between items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center h-12 transition-all gap-0.5 cursor-pointer select-none ${
                isActive
                  ? 'text-secondary font-semibold scale-102'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-5 bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-label-caps text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
