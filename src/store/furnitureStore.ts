'use client';

import { create } from 'zustand';
import { FurnitureStore, RoomConfig, PlacedFurniture, FurnitureItem, FurnitureCategory, ViewState } from '@/types/furniture';
import { furnitureData } from '@/data/furnitureData';

const defaultRoom: RoomConfig = {
  id: 'default-room',
  name: 'My Room',
  dimensions: {
    width: 8,
    length: 10,
    height: 3
  },
  wallColor: '#F5F5F5',
  floorMaterial: 'wood',
  floorColor: '#DEB887',
  lighting: {
    ambient: 0.6,
    directional: 0.8
  },
  placedFurniture: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const defaultViewState: ViewState = {
  cameraPosition: [8, 6, 8],
  cameraTarget: [4, 0, 5],
  zoom: 1
};

export const useFurnitureStore = create<FurnitureStore>((set, get) => ({
  // Room configuration
  currentRoom: defaultRoom,
  savedRooms: [defaultRoom],
  
  // Furniture catalog
  furnitureItems: furnitureData,
  selectedCategory: null,
  
  // Placement state
  placedFurniture: [],
  selectedFurnitureId: null,
  isDragging: false,
  
  // View state
  viewState: defaultViewState,
  isGridVisible: true,
  
  // Actions
  setCurrentRoom: (room: RoomConfig) => set({ currentRoom: room }),
  
  updateRoomConfig: (config: Partial<RoomConfig>) => set((state) => ({
    currentRoom: {
      ...state.currentRoom,
      ...config,
      updatedAt: new Date()
    }
  })),
  
  addFurniture: (furniture: FurnitureItem, position: [number, number, number]) => {
    const newFurniture: PlacedFurniture = {
      ...furniture,
      id: `${furniture.id}-${Date.now()}`, // Generate unique ID for placement
      position,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      isSelected: false
    };
    
    set((state) => ({
      placedFurniture: [...state.placedFurniture, newFurniture],
      currentRoom: {
        ...state.currentRoom,
        placedFurniture: [...state.currentRoom.placedFurniture, newFurniture],
        updatedAt: new Date()
      }
    }));
  },
  
  removeFurniture: (id: string) => set((state) => ({
    placedFurniture: state.placedFurniture.filter(item => item.id !== id),
    selectedFurnitureId: state.selectedFurnitureId === id ? null : state.selectedFurnitureId,
    currentRoom: {
      ...state.currentRoom,
      placedFurniture: state.currentRoom.placedFurniture.filter(item => item.id !== id),
      updatedAt: new Date()
    }
  })),
  
  updateFurniturePosition: (id: string, position: [number, number, number]) => set((state) => ({
    placedFurniture: state.placedFurniture.map(item =>
      item.id === id ? { ...item, position } : item
    ),
    currentRoom: {
      ...state.currentRoom,
      placedFurniture: state.currentRoom.placedFurniture.map(item =>
        item.id === id ? { ...item, position } : item
      ),
      updatedAt: new Date()
    }
  })),
  
  updateFurnitureRotation: (id: string, rotation: [number, number, number]) => set((state) => ({
    placedFurniture: state.placedFurniture.map(item =>
      item.id === id ? { ...item, rotation } : item
    ),
    currentRoom: {
      ...state.currentRoom,
      placedFurniture: state.currentRoom.placedFurniture.map(item =>
        item.id === id ? { ...item, rotation } : item
      ),
      updatedAt: new Date()
    }
  })),
  
  selectFurniture: (id: string | null) => set((state) => ({
    selectedFurnitureId: id,
    placedFurniture: state.placedFurniture.map(item => ({
      ...item,
      isSelected: item.id === id
    }))
  })),
  
  setSelectedCategory: (category: FurnitureCategory | null) => set({ selectedCategory: category }),
  
  setDragging: (isDragging: boolean) => set({ isDragging }),
  
  toggleGrid: () => set((state) => ({ isGridVisible: !state.isGridVisible })),
  
  saveRoom: () => {
    const state = get();
    const roomToSave = {
      ...state.currentRoom,
      id: `room-${Date.now()}`,
      updatedAt: new Date()
    };
    
    set((prevState) => ({
      savedRooms: [...prevState.savedRooms, roomToSave]
    }));
  },
  
  loadRoom: (id: string) => {
    const state = get();
    const room = state.savedRooms.find(r => r.id === id);
    if (room) {
      set({
        currentRoom: room,
        placedFurniture: room.placedFurniture,
        selectedFurnitureId: null
      });
    }
  },
  
  clearRoom: () => set((state) => ({
    placedFurniture: [],
    selectedFurnitureId: null,
    currentRoom: {
      ...state.currentRoom,
      placedFurniture: [],
      updatedAt: new Date()
    }
  }))
}));