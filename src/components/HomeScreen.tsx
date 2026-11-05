import React, { useState } from 'react';
import { TabType, Appliance } from '../types';

interface HomeScreenProps {
  appliances: Appliance[];
  onNavigate: (tab: TabType) => void;
  onOpenScan: () => void;
  onOpenRebate: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  appliances,
  onNavigate,
  onOpenScan,
  onOpenRebate,
}) => {
  const [forecastMode, setForecastMode] = useState<'annual' | 'monthly'>('annual');

  // Dynamic calculations based on appliances list
  const totalAnnualCost = appliances.reduce((sum, a) => sum + a.annualCost, 0);
  const totalExcessCost = appliances.reduce((sum, a) => sum + (a.excessCost || 0), 0);
  const drainingCount = appliances.filter((a) => (a.excessCost || 0) > 0).length;

  const displayCost = forecastMode === 'annual' ? totalAnnualCost : Math.round(totalAnnualCost / 12);
  const displayExcess = forecastMode === 'annual' ? totalExcessCost : Math.round(totalExcessCost / 12);
  const costUnit = forecastMode === 'annual' ? '/year' : '/month';

  const fridge = appliances.find((a) => a.id === 'app-1') || appliances[0];
  const washer = appliances.find((a) => a.id === 'app-2') || appliances[1];
  const cooktop = appliances.find((a) => a.id === 'app-3') || appliances[2];
  const dishwasher = appliances.find((a) => a.id === 'app-4') || appliances[3];

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Greeting & Health Score Header */}
      <section className="flex flex-col space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg-mobile text-[24px] font-bold text-on-surface tracking-tight">
              Welcome back, Sarah
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse" />
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Home Health Score:{' '}
                <span className="font-semibold text-tertiary-container">Moderate (64/100)</span>
              </p>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">energy_savings_leaf</span>
          </div>
        </div>

        {/* Toggle Selector */}
        <div className="flex p-1 bg-surface-container rounded-full max-w-xs" role="tablist">
          <button
            aria-selected={forecastMode === 'annual'}
            onClick={() => setForecastMode('annual')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center font-label-caps text-[11px] font-semibold transition-all cursor-pointer ${
              forecastMode === 'annual'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            Annual Forecast
          </button>
          <button
            aria-selected={forecastMode === 'monthly'}
            onClick={() => setForecastMode('monthly')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center font-label-caps text-[11px] font-semibold transition-all cursor-pointer ${
              forecastMode === 'monthly'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            Monthly Live
          </button>
        </div>
      </section>

      {/* Primary Hero Card: Cost & Urgent Drain Callout */}
      <section className="rounded-xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(20,83,45,0.06)] p-space-md flex flex-col space-y-4 relative overflow-hidden border border-surface-container">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
              Projected Energy Expense
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="font-label-numeric-lg text-[26px] text-on-surface font-bold tracking-tight">
                €{displayCost}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant ml-1">
                  {costUnit}
                </span>
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-caps text-[11px] font-semibold">
                +€{displayExcess} vs avg
              </span>
            </div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">insights</span>
          </div>
        </div>

        {/* Drain Warning Banner Inside Hero */}
        <div className="rounded-lg bg-surface-container-high p-3 flex flex-col space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[20px]">warning</span>
            <p className="font-body-sm text-body-sm font-semibold text-on-surface">
              {drainingCount} appliances are draining your budget
            </p>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Potential savings up to <span className="font-semibold text-secondary">€385/year</span> with A+++ upgrade grants.
          </p>
        </div>

        {/* CTA Trigger */}
        <button
          onClick={onOpenRebate}
          className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary rounded-lg flex items-center justify-between px-4 transition-colors shadow-sm font-body-sm text-body-sm font-semibold cursor-pointer"
          type="button"
        >
          <span>Estimate Trade-in Cashback</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </section>

      {/* Quick Action Row */}
      <section className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenScan}
          className="flex flex-col text-left p-3.5 rounded-xl bg-surface-container-lowest shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-surface-container-low transition-colors border border-surface-container cursor-pointer"
          type="button"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-2.5">
            <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
          </div>
          <span className="font-headline-sm text-body-md font-semibold text-on-surface">
            Scan Appliance
          </span>
          <span className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 leading-tight">
            Instant rating & leaks
          </span>
        </button>

        <button
          onClick={onOpenRebate}
          className="flex flex-col text-left p-3.5 rounded-xl bg-surface-container-lowest shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-surface-container-low transition-colors border border-surface-container cursor-pointer"
          type="button"
        >
          <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-2.5">
            <span className="material-symbols-outlined text-[22px]">calculate</span>
          </div>
          <span className="font-headline-sm text-body-md font-semibold text-on-surface">
            Calculate Rebate
          </span>
          <span className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 leading-tight">
            State & eco bonuses
          </span>
        </button>
      </section>

      {/* My Household Appliances Section */}
      <section className="flex flex-col space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              My Appliances
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[11px] font-semibold">
              {appliances.length} Active
            </span>
          </div>
          <button
            onClick={() => onNavigate('appliances')}
            className="font-body-sm text-body-sm text-secondary font-semibold hover:underline cursor-pointer"
            type="button"
          >
            View All
          </button>
        </div>

        {/* Appliance 1: Urgent Drain (Fridge) */}
        {fridge && (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col space-y-3 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">kitchen</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight">
                    {fridge.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {fridge.brand} {fridge.model}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-caps text-[11px] font-semibold whitespace-nowrap">
                {fridge.oldRatingTag || 'Class F (Old A+)'}
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-on-surface-variant">
                  Estimated Run Cost
                </span>
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-on-surface">
                  €{fridge.annualCost} / yr
                </span>
              </div>
              <div className="h-6 w-[1px] bg-surface-variant" />
              <div className="flex flex-col text-right">
                <span className="font-label-caps text-[11px] text-error font-semibold">
                  Overpaying
                </span>
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-error">
                  ~€{fridge.excessCost} / yr
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-body-sm text-[12px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">history</span>
                {fridge.ageYears} yrs installed
              </span>
              <button
                onClick={() => onNavigate('store')}
                className="h-9 px-3 rounded-lg bg-primary-container text-on-primary text-body-sm font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-primary"
                type="button"
              >
                <span>Replace & Save €{fridge.potentialSavings}</span>
                <span className="px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold">
                  +€{fridge.tradeInValue} trade
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Appliance 2: Moderate Drain (Washing Machine) */}
        {washer && (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col space-y-3 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">
                    local_laundry_service
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight">
                    {washer.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {washer.brand} {washer.model}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[11px] font-semibold">
                {washer.oldRatingTag || 'Class E • 8 yrs'}
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-on-surface-variant">
                  Annual Consumption
                </span>
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-on-surface">
                  €{washer.annualCost} / yr
                </span>
              </div>
              <div className="h-6 w-[1px] bg-surface-variant" />
              <div className="flex flex-col text-right">
                <span className="font-label-caps text-[11px] text-tertiary font-semibold">
                  Inefficient
                </span>
                <span className="font-label-numeric-md text-label-numeric-md font-bold text-tertiary">
                  ~€{washer.excessCost} / yr leak
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onNavigate('store')}
                className="h-9 px-3 rounded-lg text-secondary bg-surface-container font-body-sm text-body-sm font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer"
                type="button"
              >
                <span>View Eco Alternatives</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* Appliance 3: Optimized Eco Item (Cooktop) */}
        {cooktop && (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col space-y-2.5 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">skillet</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight">
                    {cooktop.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {cooktop.brand} {cooktop.model}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[11px] font-semibold">
                Class A+++
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-label-numeric-md text-label-numeric-md text-on-surface font-semibold">
                €{cooktop.annualCost}{' '}
                <span className="font-body-sm text-[12px] font-normal text-on-surface-variant">
                  / yr
                </span>
              </span>
              <div className="flex items-center gap-1 text-secondary font-body-sm text-[13px] font-medium">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Eco Certified</span>
              </div>
            </div>
          </div>
        )}

        {/* Appliance 4: Moderate/Normal (Dishwasher) */}
        {dishwasher && (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col space-y-2.5 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">dishwasher_gen</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight">
                    {dishwasher.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {dishwasher.brand} {dishwasher.model}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[11px] font-semibold">
                Class D • 5 yrs
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-label-numeric-md text-label-numeric-md text-on-surface font-semibold">
                €{dishwasher.annualCost}{' '}
                <span className="font-body-sm text-[12px] font-normal text-on-surface-variant">
                  / yr
                </span>
              </span>
              <span className="font-body-sm text-[12px] text-on-surface-variant">
                Standard run range
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Promotional Referral Card */}
      <section className="rounded-xl bg-primary-container text-on-primary p-space-md shadow-[0_4px_16px_rgba(20,83,45,0.12)] flex flex-col space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[11px] font-bold">
            Community Incentive
          </span>
          <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
            group_add
          </span>
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold leading-tight">
            Refer & Earn €15 + Guaranteed Trade-In
          </h3>
          <p className="font-body-sm text-body-sm text-on-primary-container mt-1.5 leading-relaxed">
            Help parents or neighbors check older appliances. You get €15 direct cash, and they unlock up to €120 disposal credit.
          </p>
        </div>
        <button
          onClick={() => onNavigate('rewards')}
          className="w-full h-11 bg-surface-container-lowest text-primary rounded-lg font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 shadow hover:bg-surface-bright transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span>Invite Family or Scan Item</span>
        </button>
      </section>

      {/* Community Micro-Stat Impact */}
      <section className="rounded-xl bg-surface-container-low p-3.5 flex items-center gap-3 border border-surface-container">
        <div className="w-9 h-9 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">forest</span>
        </div>
        <div className="flex-1">
          <p className="font-body-sm text-[13px] text-on-surface font-semibold">
            Neighborhood Eco-Rank: Top 38% in Munich
          </p>
          <p className="font-body-sm text-[12px] text-on-surface-variant">
            142 kg CO₂ saved in your district so far.
          </p>
        </div>
      </section>
    </div>
  );
};
