export type TabType = 'home' | 'appliances' | 'store' | 'rewards' | 'profile';

export interface Appliance {
  id: string;
  name: string;
  brand: string;
  model: string;
  room: 'kitchen' | 'laundry' | 'other';
  roomLabel: string;
  ageYears: number;
  energyClass: string;
  oldRatingTag?: string;
  status: 'critical' | 'inefficient' | 'optimal' | 'standard';
  statusLabel: string;
  annualKwh: number;
  annualCost: number;
  excessCost?: number;
  leakDescription?: string;
  imageUrl?: string;
  tradeInValue: number;
  potentialSavings: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'fridge' | 'washer' | 'dishwasher';
  energyClass: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  recommendationBadge?: string;
  replacesAppliance?: string;
  annualKwh: number;
  annualCost: number;
  annualSavings: number;
  oldApplianceKwh?: number;
  oldApplianceCost?: number;
  imageUrl: string;
  appliedGrant: number;
  tradeInBonus: number;
  silenceRating?: string;
  features: string[];
}

export interface RewardTransaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  status: 'validated' | 'pending';
  date: string;
  icon: string;
}

export interface PartnerVoucher {
  id: string;
  category: string;
  title: string;
  description: string;
  costPoints: number;
  icon: string;
  unlocked?: boolean;
}

export interface UserSettings {
  name: string;
  email: string;
  location: string;
  homeType: string;
  surfaceM2: number;
  peopleCount: number;
  provider: string;
  tarifKwh: number;
  autoSyncIntervalMin: number;
  alertsSurconso: boolean;
  subventionsAlert: boolean;
  weeklyEcoSuggestions: boolean;
  walletBalance: number;
  ecoPoints: number;
  ecoRankPercent: number;
  savedCo2Kg: number;
  referralCode: string;
}
