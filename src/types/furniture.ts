export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  color: string;
  material: FurnitureMaterial;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export interface PlacedFurniture extends FurnitureItem {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  isSelected: boolean;
}

export type FurnitureCategory = 
  | 'living-room'
  | 'bedroom'
  | 'dining'
  | 'office'
  | 'storage'
  | 'decor';

export type FurnitureMaterial = 
  | 'wood'
  | 'metal'
  | 'fabric'
  | 'leather'
  | 'glass'
  | 'plastic';

export interface RoomConfig {
  id: string;
  name: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  wallColor: string;
  floorMaterial: string;
  floorColor: string;
  lighting: {
    ambient: number;
    directional: number;
  };
  placedFurniture: PlacedFurniture[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewState {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  zoom: number;
}

export interface FurnitureStore {
  // Room configuration
  currentRoom: RoomConfig;
  savedRooms: RoomConfig[];
  
  // Furniture catalog
  furnitureItems: FurnitureItem[];
  selectedCategory: FurnitureCategory | null;
  
  // Placement state
  placedFurniture: PlacedFurniture[];
  selectedFurnitureId: string | null;
  isDragging: boolean;
  
  // View state
  viewState: ViewState;
  isGridVisible: boolean;
  
  // Actions
  setCurrentRoom: (room: RoomConfig) => void;
  updateRoomConfig: (config: Partial<RoomConfig>) => void;
  addFurniture: (furniture: FurnitureItem, position: [number, number, number]) => void;
  removeFurniture: (id: string) => void;
  updateFurniturePosition: (id: string, position: [number, number, number]) => void;
  updateFurnitureRotation: (id: string, rotation: [number, number, number]) => void;
  selectFurniture: (id: string | null) => void;
  setSelectedCategory: (category: FurnitureCategory | null) => void;
  setDragging: (isDragging: boolean) => void;
  toggleGrid: () => void;
  saveRoom: () => void;
  loadRoom: (id: string) => void;
  clearRoom: () => void;
}

export interface RaycastHit {
  point: [number, number, number];
  object: any;
  face: any;
  distance: number;
}