import { create } from 'zustand';
import {
  RoomStyle,
  BudgetTier,
  RoomPreferences,
  TransformationResult,
  MoodboardItem,
  BudgetItem,
} from '../types';
import { SAMPLE_TRANSFORMATIONS } from '../data/transformations';
import { ROOM_STYLES } from '../data/styles';

const STORAGE_KEY_TRANSFORMATIONS = 'roomrevive_transformations_v1';
const STORAGE_KEY_MOODBOARD = 'roomrevive_moodboard_v1';
const STORAGE_KEY_LIKES = 'roomrevive_liked_inspirations_v1';

interface StudioState {
  uploadedImage: string | null;
  uploadedFileName: string | null;
  selectedStyle: RoomStyle;
  budgetTier: BudgetTier;
  customBudget: number;
  preferences: RoomPreferences;
  isGenerating: boolean;
  generationProgress: number;
  generationStepMessage: string;
}

interface RoomStoreState {
  studio: StudioState;
  savedTransformations: TransformationResult[];
  moodboard: MoodboardItem[];
  likedInspirations: string[];
  
  // Studio actions
  setUploadedImage: (imageUrl: string | null, fileName?: string) => void;
  setSelectedStyle: (style: RoomStyle) => void;
  setBudgetTier: (tier: BudgetTier) => void;
  setCustomBudget: (budget: number) => void;
  updatePreferences: (updates: Partial<RoomPreferences>) => void;
  resetStudio: () => void;
  
  // Transformation actions
  generateMakeover: () => Promise<string>;
  getTransformationById: (id: string) => TransformationResult | undefined;
  deleteTransformation: (id: string) => void;
  
  // Moodboard actions
  addToMoodboard: (item: Omit<MoodboardItem, 'id' | 'addedAt'>) => void;
  removeFromMoodboard: (id: string) => void;
  isItemInMoodboard: (itemId: string) => boolean;
  updateMoodboardNote: (id: string, note: string) => void;
  
  // Inspiration likes
  toggleLikeInspiration: (id: string) => void;
}

const defaultPreferences: RoomPreferences = {
  roomType: 'hostel',
  roomSize: 'small',
  preserveFurniture: ['Bed frame', 'Study desk'],
  permanentRestrictions: ['No wall drilling', 'Landlord inspection'],
  colorPreference: 'Warm neutrals & sage accents',
  additionalNotes: '',
  keepLayout: true,
};

const defaultStudio: StudioState = {
  uploadedImage: null,
  uploadedFileName: null,
  selectedStyle: 'cozy',
  budgetTier: '1500-3000',
  customBudget: 2500,
  preferences: defaultPreferences,
  isGenerating: false,
  generationProgress: 0,
  generationStepMessage: '',
};

const getInitialTransformations = (): TransformationResult[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRANSFORMATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return SAMPLE_TRANSFORMATIONS;
};

const getInitialMoodboard = (): MoodboardItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MOODBOARD);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return [
    {
      id: 'mb-init-1',
      itemId: 'decor-fairy-lights',
      type: 'decor',
      title: 'Warm Amber Copper Wire Fairy Lights',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
      price: 280,
      notes: 'Must buy 2 packs: one for study desk perimeter and one along curtain rod.',
      addedAt: 'Yesterday',
    },
    {
      id: 'mb-init-2',
      itemId: 'insp-2',
      type: 'inspiration',
      title: 'Warm Hygge Study Corner',
      imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80',
      style: 'cozy',
      price: 1850,
      notes: 'Love the framed postcard grid over the desk! Need to print A6 prints.',
      addedAt: '2 days ago',
    },
    {
      id: 'mb-init-3',
      itemId: 'decor-waffle-throw',
      type: 'decor',
      title: 'Waffle-Weave Cotton Bed Throw',
      imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80',
      price: 799,
      notes: 'Oatmeal shade will hide the dull blue hostel foam mattress.',
      addedAt: '3 days ago',
    },
  ];
};

const getInitialLikes = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return ['insp-1', 'insp-2', 'insp-4'];
};

export const useRoomStore = create<RoomStoreState>((set, get) => ({
  studio: defaultStudio,
  savedTransformations: getInitialTransformations(),
  moodboard: getInitialMoodboard(),
  likedInspirations: getInitialLikes(),

  setUploadedImage: (imageUrl, fileName) =>
    set((state) => ({
      studio: {
        ...state.studio,
        uploadedImage: imageUrl,
        uploadedFileName: fileName || (imageUrl ? 'uploaded-room.jpg' : null),
      },
    })),

  setSelectedStyle: (style) =>
    set((state) => ({
      studio: { ...state.studio, selectedStyle: style },
    })),

  setBudgetTier: (tier) =>
    set((state) => {
      let defaultVal = state.studio.customBudget;
      if (tier === 'under-500') defaultVal = 480;
      else if (tier === '500-1500') defaultVal = 1200;
      else if (tier === '1500-3000') defaultVal = 2400;
      else if (tier === '3000-5000') defaultVal = 4200;
      else if (tier === '5000-plus') defaultVal = 6500;
      return {
        studio: {
          ...state.studio,
          budgetTier: tier,
          customBudget: defaultVal,
        },
      };
    }),

  setCustomBudget: (budget) =>
    set((state) => ({
      studio: { ...state.studio, customBudget: budget },
    })),

  updatePreferences: (updates) =>
    set((state) => ({
      studio: {
        ...state.studio,
        preferences: { ...state.studio.preferences, ...updates },
      },
    })),

  resetStudio: () =>
    set({
      studio: defaultStudio,
    }),

  generateMakeover: async () => {
    const { studio, savedTransformations } = get();
    const styleObj = ROOM_STYLES.find((s) => s.id === studio.selectedStyle) || ROOM_STYLES[0];
    
    // Fallback image if user didn't upload or chose a sample
    const original =
      studio.uploadedImage ||
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';

    // Set starting loading states
    set((state) => ({
      studio: {
        ...state.studio,
        isGenerating: true,
        generationProgress: 10,
        generationStepMessage: 'Studying your room dimensions and light angles...',
      },
    }));

    await new Promise((r) => setTimeout(r, 650));
    set((state) => ({
      studio: {
        ...state.studio,
        generationProgress: 35,
        generationStepMessage: `Applying ${styleObj.name} aesthetic and material textures...`,
      },
    }));

    await new Promise((r) => setTimeout(r, 750));
    set((state) => ({
      studio: {
        ...state.studio,
        generationProgress: 65,
        generationStepMessage: `Mapping budget breakdown within ₹${studio.customBudget.toLocaleString('en-IN')}...`,
      },
    }));

    await new Promise((r) => setTimeout(r, 700));
    set((state) => ({
      studio: {
        ...state.studio,
        generationProgress: 90,
        generationStepMessage: 'Balancing ambient lighting, cord management & decor accents...',
      },
    }));

    await new Promise((r) => setTimeout(r, 600));

    // Dynamic generated transformation matching the user's specific choices
    const newId = `revive-${Date.now()}`;
    const budgetTotal = Math.round(studio.customBudget * 0.92);

    const generatedBreakdown: BudgetItem[] = [
      {
        id: `bi-${newId}-1`,
        name: `${styleObj.name} Ambient Lighting Fixture`,
        category: 'Lighting',
        estimatedPrice: Math.round(budgetTotal * 0.18),
        quantity: 1,
        diyTip: 'Wrap around bed rail or shelf with non-marking clips.',
        whereToFind: 'Amazon / Local electrical shop',
      },
      {
        id: `bi-${newId}-2`,
        name: 'Textured Cotton Mattress Bedspread & Runner',
        category: 'Bedding',
        estimatedPrice: Math.round(budgetTotal * 0.32),
        quantity: 1,
        diyTip: 'Layer neutral textures to conceal standard hostel mattress prints.',
        whereToFind: 'Meesho / Local handloom stall',
      },
      {
        id: `bi-${newId}-3`,
        name: 'Minimal Aesthetic Art Print Pack (Set of 12)',
        category: 'Wall Decor',
        estimatedPrice: Math.round(budgetTotal * 0.15),
        quantity: 1,
        diyTip: 'Print onto 300gsm cardstock at campus print shop for ₹50 total.',
        whereToFind: 'Public domain museum archives / Xerox store',
      },
      {
        id: `bi-${newId}-4`,
        name: 'Desk Cable Box & Surface Organizer Tray',
        category: 'Desk Setup',
        estimatedPrice: Math.round(budgetTotal * 0.16),
        quantity: 1,
        diyTip: 'Upcycle shoeboxes wrapped in kraft paper to hide ugly multi-plugs.',
        whereToFind: 'Stationery shop / IKEA',
      },
      {
        id: `bi-${newId}-5`,
        name: 'Easy-Care Pothos Plant in Earthen Clay Pot',
        category: 'Plants',
        estimatedPrice: Math.round(budgetTotal * 0.11),
        quantity: 1,
        diyTip: 'Grows vigorously in water cuttings without needing rich sunlight.',
        whereToFind: 'Street plant vendor',
      },
    ];

    const actualCost = generatedBreakdown.reduce((sum, item) => sum + item.estimatedPrice * item.quantity, 0);

    const result: TransformationResult = {
      id: newId,
      title: `${styleObj.name} Hostel Makeover`,
      createdAt: 'Just now',
      originalImage: original,
      transformedImage: styleObj.imageUrl,
      style: studio.selectedStyle,
      styleName: styleObj.name,
      budgetTier: studio.budgetTier,
      targetBudget: studio.customBudget,
      totalEstimatedCost: actualCost,
      roomType: studio.preferences.roomType,
      roomSize: studio.preferences.roomSize,
      keepLayout: studio.preferences.keepLayout,
      summary: `Tailored ${styleObj.name} transformation respecting fixed hostel architecture. Swapped clinical lighting for warm 2700K layers, added tactile bedding to mask basic college furniture, and introduced a zero-drill wall art setup.`,
      colorPalette: styleObj.palette.map((hex, idx) => ({
        hex,
        name: ['Base Hue', 'Layer', 'Accent Tone', 'Wood/Shadow', 'Detail'][idx] || 'Accent',
        role: ['Walls & Canvas', 'Bedding & Drapes', 'Cushions & Art', 'Furniture Hardware', 'Finishing Accents'][idx] || 'Detail',
      })),
      highlights: [
        `Preserved ${studio.preferences.roomType.toUpperCase()} architectural boundaries and bed orientation`,
        `Selected ${styleObj.vibe.toLowerCase()} decor components`,
        `Strict adherence to landlord/hostel restriction: ${studio.preferences.permanentRestrictions[0] || 'No drilling'}`,
        `Color balance attuned to ${studio.preferences.colorPreference}`,
        `Optimized total estimated expenditure to ₹${actualCost.toLocaleString('en-IN')}`,
      ],
      budgetBreakdown: generatedBreakdown,
      recommendedDecorIds: ['decor-fairy-lights', 'decor-waffle-throw', 'decor-bamboo-desk', 'decor-pothos-pot'],
    };

    const updatedTransformations = [result, ...savedTransformations];
    localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(updatedTransformations));

    set((state) => ({
      savedTransformations: updatedTransformations,
      studio: {
        ...state.studio,
        isGenerating: false,
        generationProgress: 100,
        generationStepMessage: 'Complete!',
      },
    }));

    return newId;
  },

  getTransformationById: (id) => {
    return get().savedTransformations.find((t) => t.id === id);
  },

  deleteTransformation: (id) => {
    set((state) => {
      const updated = state.savedTransformations.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(updated));
      return { savedTransformations: updated };
    });
  },

  addToMoodboard: (item) => {
    set((state) => {
      const newItem: MoodboardItem = {
        ...item,
        id: `mb-${Date.now()}`,
        addedAt: 'Just now',
      };
      const updated = [newItem, ...state.moodboard];
      localStorage.setItem(STORAGE_KEY_MOODBOARD, JSON.stringify(updated));
      return { moodboard: updated };
    });
  },

  removeFromMoodboard: (id) => {
    set((state) => {
      const updated = state.moodboard.filter((m) => m.id !== id && m.itemId !== id);
      localStorage.setItem(STORAGE_KEY_MOODBOARD, JSON.stringify(updated));
      return { moodboard: updated };
    });
  },

  isItemInMoodboard: (itemId) => {
    return get().moodboard.some((m) => m.itemId === itemId);
  },

  updateMoodboardNote: (id, note) => {
    set((state) => {
      const updated = state.moodboard.map((m) => (m.id === id ? { ...m, notes: note } : m));
      localStorage.setItem(STORAGE_KEY_MOODBOARD, JSON.stringify(updated));
      return { moodboard: updated };
    });
  },

  toggleLikeInspiration: (id) => {
    set((state) => {
      const exists = state.likedInspirations.includes(id);
      const updated = exists
        ? state.likedInspirations.filter((i) => i !== id)
        : [...state.likedInspirations, id];
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updated));
      return { likedInspirations: updated };
    });
  },
}));

