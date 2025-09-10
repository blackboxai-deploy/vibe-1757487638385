import * as THREE from 'three';
import { PlacedFurniture } from '@/types/furniture';

// Grid and positioning utilities
export const snapToGrid = (position: [number, number, number], gridSize: number = 0.5): [number, number, number] => {
  return [
    Math.round(position[0] / gridSize) * gridSize,
    position[1], // Don't snap Y axis
    Math.round(position[2] / gridSize) * gridSize
  ];
};

export const isValidPosition = (
  position: [number, number, number], 
  dimensions: { width: number; height: number; depth: number },
  roomDimensions: { width: number; length: number; height: number }
): boolean => {
  const [x, y, z] = position;
  const { width, depth } = dimensions;
  
  // Check room boundaries
  if (x - width/2 < 0 || x + width/2 > roomDimensions.width) return false;
  if (z - depth/2 < 0 || z + depth/2 > roomDimensions.length) return false;
  if (y < 0 || y + dimensions.height > roomDimensions.height) return false;
  
  return true;
};

export const checkCollision = (
  newItem: { position: [number, number, number]; dimensions: { width: number; depth: number } },
  existingFurniture: PlacedFurniture[]
): boolean => {
  const [newX, , newZ] = newItem.position;
  const newWidth = newItem.dimensions.width;
  const newDepth = newItem.dimensions.depth;
  
  for (const furniture of existingFurniture) {
    const [existingX, , existingZ] = furniture.position;
    const existingWidth = furniture.dimensions.width;
    const existingDepth = furniture.dimensions.depth;
    
    // Check for overlap in X and Z axes
    const xOverlap = Math.abs(newX - existingX) < (newWidth + existingWidth) / 2;
    const zOverlap = Math.abs(newZ - existingZ) < (newDepth + existingDepth) / 2;
    
    if (xOverlap && zOverlap) {
      return true; // Collision detected
    }
  }
  
  return false; // No collision
};

// Camera utilities
export const getCameraPosition = (roomDimensions: { width: number; length: number; height: number }): [number, number, number] => {
  const { width, length, height } = roomDimensions;
  return [
    width + 2,
    height + 3,
    length + 2
  ];
};

export const getCameraTarget = (roomDimensions: { width: number; length: number }): [number, number, number] => {
  return [
    roomDimensions.width / 2,
    0,
    roomDimensions.length / 2
  ];
};

// Lighting utilities
export const createRoomLighting = (roomDimensions: { width: number; length: number; height: number }) => {
  const lights = [];
  
  // Ambient light
  lights.push({
    type: 'ambient',
    color: '#ffffff',
    intensity: 0.4
  });
  
  // Main directional light (sun-like)
  lights.push({
    type: 'directional',
    color: '#ffffff',
    intensity: 0.8,
    position: [roomDimensions.width / 2, roomDimensions.height, roomDimensions.length / 2],
    target: [roomDimensions.width / 2, 0, roomDimensions.length / 2],
    castShadow: true,
    shadowMapSize: 2048
  });
  
  // Secondary fill light
  lights.push({
    type: 'directional',
    color: '#87CEEB',
    intensity: 0.3,
    position: [-roomDimensions.width / 4, roomDimensions.height / 2, roomDimensions.length],
    target: [roomDimensions.width / 2, 0, roomDimensions.length / 2]
  });
  
  return lights;
};

// Material utilities
export const getMaterialByType = (materialType: string, color: string) => {
  const materialConfig = {
    roughness: 0.7,
    metalness: 0.0
  };
  
  switch (materialType) {
    case 'wood':
      return {
        ...materialConfig,
        color,
        roughness: 0.8,
        metalness: 0.1
      };
    case 'metal':
      return {
        ...materialConfig,
        color,
        roughness: 0.2,
        metalness: 0.9
      };
    case 'fabric':
      return {
        ...materialConfig,
        color,
        roughness: 0.9,
        metalness: 0.0
      };
    case 'leather':
      return {
        ...materialConfig,
        color,
        roughness: 0.4,
        metalness: 0.0
      };
    case 'glass':
      return {
        ...materialConfig,
        color,
        roughness: 0.0,
        metalness: 0.0,
        transparent: true,
        opacity: 0.3
      };
    case 'plastic':
      return {
        ...materialConfig,
        color,
        roughness: 0.3,
        metalness: 0.0
      };
    default:
      return {
        ...materialConfig,
        color
      };
  }
};

// Geometry utilities for different furniture types
export const getFurnitureGeometry = (furnitureType: string, dimensions: { width: number; height: number; depth: number }) => {
  const { width, height, depth } = dimensions;
  
  switch (furnitureType) {
    case 'sofa':
    case 'bed':
    case 'desk':
    case 'dining-table':
      return { type: 'box', args: [width, height, depth] };
    
    case 'chair':
    case 'armchair':
      return { type: 'group', components: [
        { type: 'box', args: [width, height * 0.4, depth], position: [0, height * 0.2, 0] }, // seat
        { type: 'box', args: [width, height * 0.6, depth * 0.1], position: [0, height * 0.7, -depth * 0.4] } // backrest
      ]};
    
    case 'lamp':
      return { type: 'group', components: [
        { type: 'cylinder', args: [width * 0.1, width * 0.1, height * 0.8], position: [0, height * 0.4, 0] }, // pole
        { type: 'cylinder', args: [width * 0.4, width * 0.4, height * 0.2], position: [0, height * 0.9, 0] } // shade
      ]};
    
    case 'cabinet':
    case 'wardrobe':
    case 'bookshelf':
      return { type: 'box', args: [width, height, depth] };
    
    default:
      return { type: 'box', args: [width, height, depth] };
  }
};

// Ray casting utilities for mouse interaction
export const getIntersectionPoint = (
  event: MouseEvent,
  camera: THREE.Camera,
  scene: THREE.Scene,
  canvas: HTMLCanvasElement
): THREE.Vector3 | null => {
  const rect = canvas.getBoundingClientRect();
  const mouse = new THREE.Vector2();
  
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  // Create a plane at Y=0 for floor intersection
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersectionPoint = new THREE.Vector3();
  
  if (raycaster.ray.intersectPlane(floorPlane, intersectionPoint)) {
    return intersectionPoint;
  }
  
  return null;
};

// Color utilities
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : null;
};

// Distance calculation
export const calculateDistance = (pos1: [number, number, number], pos2: [number, number, number]): number => {
  const [x1, y1, z1] = pos1;
  const [x2, y2, z2] = pos2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};