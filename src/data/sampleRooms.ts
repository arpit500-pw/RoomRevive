import { SampleRoom } from '../types';

export const SAMPLE_ROOMS: SampleRoom[] = [
  {
    id: 'sample-hostel-1',
    name: 'Standard Double Hostel Room',
    roomType: 'Hostel • Twin Sharing',
    description: 'White whitewashed walls, metal frame cot, standard laminate desk, and bare ceiling fluorescent tube.',
    originalImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    recommendedStyle: 'cozy',
    presetTargetBudget: 2500,
  },
  {
    id: 'sample-pg-2',
    name: 'Urban PG Single Room',
    roomType: 'PG • Single Occupancy',
    description: 'Compact 10x10 ft rented room with tiled floor, wooden single bed, and generic wardrobe.',
    originalImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    recommendedStyle: 'japandi',
    presetTargetBudget: 3500,
  },
  {
    id: 'sample-dorm-3',
    name: 'Engineering Campus Study Nook',
    roomType: 'Dorm • Corner Study',
    description: 'Utilitarian metal bookshelf, institutional desk chair, tangled computer wires, and window ledge.',
    originalImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    recommendedStyle: 'dark-academia',
    presetTargetBudget: 2800,
  },
];

