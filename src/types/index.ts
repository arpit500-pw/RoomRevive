export type RoomStyle =
  | 'cozy'
  | 'minimal'
  | 'dark-academia'
  | 'japandi'
  | 'pinterest-core'
  | 'industrial'
  | 'earthy'
  | 'modern';

export type BudgetTier =
  | 'under-500'
  | '500-1500'
  | '1500-3000'
  | '3000-5000'
  | '5000-plus'
  | 'custom';

export type RoomType = 'hostel' | 'pg' | 'dorm' | 'rented';
export type RoomSize = 'small' | 'medium' | 'large';

export interface StyleOption {
  id: RoomStyle;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  palette: string[];
  keyElements: string[];
  vibe: string;
}

export interface BudgetTierOption {
  id: BudgetTier;
  label: string;
  range: string;
  description: string;
  popularFor: string;
}

export interface RoomPreferences {
  roomType: RoomType;
  roomSize: RoomSize;
  preserveFurniture: string[];
  permanentRestrictions: string[];
  colorPreference: string;
  additionalNotes: string;
  keepLayout: boolean;
}

export interface BudgetItem {
  id: string;
  name: string;
  category: 'Lighting' | 'Bedding' | 'Wall Decor' | 'Desk Setup' | 'Storage' | 'Plants' | 'Accessories';
  estimatedPrice: number;
  quantity: number;
  diyTip?: string;
  whereToFind?: string;
}

export interface TransformationResult {
  id: string;
  title: string;
  createdAt: string;
  originalImage: string;
  transformedImage: string;
  style: RoomStyle;
  styleName: string;
  budgetTier: BudgetTier;
  targetBudget: number;
  totalEstimatedCost: number;
  roomType: RoomType;
  roomSize: RoomSize;
  keepLayout: boolean;
  summary: string;
  colorPalette: {
    hex: string;
    name: string;
    role: string;
  }[];
  highlights: string[];
  budgetBreakdown: BudgetItem[];
  recommendedDecorIds: string[];
  notes?: string;
}

export interface InspirationItem {
  id: string;
  title: string;
  style: RoomStyle;
  styleName: string;
  budgetEstimate: string;
  roomType: RoomType;
  imageUrl: string;
  beforeImage?: string;
  author: string;
  campusCity: string;
  likes: number;
  tags: string[];
  isFeatured?: boolean;
}

export interface DecorItem {
  id: string;
  name: string;
  category: 'Lighting' | 'Bedding' | 'Wall Decor' | 'Desk Setup' | 'Storage' | 'Plants' | 'Organization';
  estimatedPrice: number;
  priceFormatted: string;
  compatibleStyles: RoomStyle[];
  imageUrl: string;
  description: string;
  diyAlternative?: string;
  aestheticNotes: string;
  studentHack: string;
}

export interface MoodboardItem {
  id: string;
  itemId: string;
  type: 'inspiration' | 'decor' | 'transformation' | 'style';
  title: string;
  imageUrl: string;
  style?: RoomStyle;
  price?: number;
  notes?: string;
  addedAt: string;
}

export interface SampleRoom {
  id: string;
  name: string;
  roomType: string;
  description: string;
  originalImage: string;
  recommendedStyle: RoomStyle;
  presetTargetBudget: number;
}

