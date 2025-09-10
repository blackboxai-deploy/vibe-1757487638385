import { FurnitureItem } from '@/types/furniture';

export const furnitureData: FurnitureItem[] = [
  // Living Room Furniture
  {
    id: 'sofa-modern-01',
    name: 'Modern Sectional Sofa',
    category: 'living-room',
    dimensions: { width: 2.5, height: 0.8, depth: 1.8 },
    color: '#8B4513',
    material: 'fabric',
    price: 1299,
    description: 'Comfortable L-shaped sectional sofa perfect for modern living rooms',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84aef937-450b-474d-be6f-8e31fbadeb3d.png'
  },
  {
    id: 'coffee-table-01',
    name: 'Glass Coffee Table',
    category: 'living-room',
    dimensions: { width: 1.2, height: 0.4, depth: 0.6 },
    color: '#87CEEB',
    material: 'glass',
    price: 399,
    description: 'Sleek glass coffee table with chrome legs',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/85a55e56-3035-44fd-8ebd-76202bd1b400.png'
  },
  {
    id: 'armchair-01',
    name: 'Leather Armchair',
    category: 'living-room',
    dimensions: { width: 0.8, height: 1.0, depth: 0.9 },
    color: '#654321',
    material: 'leather',
    price: 799,
    description: 'Classic leather armchair with wooden frame',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cdd166f3-546e-4dcc-b834-4ef84ebf5230.png'
  },
  {
    id: 'tv-stand-01',
    name: 'Oak TV Stand',
    category: 'living-room',
    dimensions: { width: 1.8, height: 0.5, depth: 0.4 },
    color: '#DEB887',
    material: 'wood',
    price: 549,
    description: 'Solid oak TV stand with storage compartments',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6cb74a45-c0e4-40cd-9afc-285b875b1eba.png'
  },

  // Bedroom Furniture
  {
    id: 'bed-queen-01',
    name: 'Queen Size Bed',
    category: 'bedroom',
    dimensions: { width: 1.6, height: 1.0, depth: 2.1 },
    color: '#8B4513',
    material: 'wood',
    price: 899,
    description: 'Elegant queen size bed with upholstered headboard',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9256bcf3-84ed-4ec9-ac70-9714bf822ed5.png'
  },
  {
    id: 'wardrobe-01',
    name: 'Walk-in Wardrobe',
    category: 'bedroom',
    dimensions: { width: 2.0, height: 2.2, depth: 0.6 },
    color: '#F5F5DC',
    material: 'wood',
    price: 1199,
    description: 'Spacious wardrobe with mirror doors',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/582c4ef7-7b73-4e63-a926-09e5cd0318c2.png'
  },
  {
    id: 'nightstand-01',
    name: 'Bedside Table',
    category: 'bedroom',
    dimensions: { width: 0.5, height: 0.6, depth: 0.4 },
    color: '#DEB887',
    material: 'wood',
    price: 199,
    description: 'Compact bedside table with drawer',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a7ecccaf-2acb-494e-8335-fcc49ec6fd97.png'
  },
  {
    id: 'dresser-01',
    name: 'Bedroom Dresser',
    category: 'bedroom',
    dimensions: { width: 1.2, height: 0.8, depth: 0.5 },
    color: '#F5F5DC',
    material: 'wood',
    price: 649,
    description: 'Six-drawer dresser with mirror',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/79a0a594-db12-4ff8-b598-72354785b703.png'
  },

  // Dining Room Furniture
  {
    id: 'dining-table-01',
    name: 'Dining Table',
    category: 'dining',
    dimensions: { width: 1.8, height: 0.75, depth: 0.9 },
    color: '#8B4513',
    material: 'wood',
    price: 799,
    description: 'Solid wood dining table for 6 people',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3274a90c-97be-448e-b8d4-5ba06032e339.png'
  },
  {
    id: 'dining-chair-01',
    name: 'Dining Chair',
    category: 'dining',
    dimensions: { width: 0.45, height: 0.85, depth: 0.5 },
    color: '#654321',
    material: 'wood',
    price: 149,
    description: 'Comfortable wooden dining chair with cushion',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/68560f20-4d73-41e5-b231-b56942bafee9.png'
  },
  {
    id: 'dining-cabinet-01',
    name: 'Dining Cabinet',
    category: 'dining',
    dimensions: { width: 1.6, height: 1.8, depth: 0.4 },
    color: '#DEB887',
    material: 'wood',
    price: 949,
    description: 'Traditional dining room cabinet with glass doors',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dd3d3385-eed1-4e1b-b202-063aba6e12f2.png'
  },

  // Office Furniture
  {
    id: 'office-desk-01',
    name: 'Executive Desk',
    category: 'office',
    dimensions: { width: 1.6, height: 0.75, depth: 0.8 },
    color: '#8B4513',
    material: 'wood',
    price: 699,
    description: 'Spacious executive desk with drawers',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd375df7-8848-491e-8753-4aba9c30fa61.png'
  },
  {
    id: 'office-chair-01',
    name: 'Ergonomic Office Chair',
    category: 'office',
    dimensions: { width: 0.6, height: 1.2, depth: 0.6 },
    color: '#000000',
    material: 'fabric',
    price: 399,
    description: 'Adjustable ergonomic office chair with lumbar support',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/828b2344-95cb-4ac1-a11b-ee1ff64162e1.png'
  },
  {
    id: 'bookshelf-01',
    name: 'Tall Bookshelf',
    category: 'office',
    dimensions: { width: 0.8, height: 2.0, depth: 0.3 },
    color: '#DEB887',
    material: 'wood',
    price: 449,
    description: 'Five-shelf wooden bookshelf',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba360e04-d8f2-491d-a4db-6b32c0445903.png'
  },

  // Storage Furniture
  {
    id: 'storage-cabinet-01',
    name: 'Storage Cabinet',
    category: 'storage',
    dimensions: { width: 1.0, height: 1.6, depth: 0.4 },
    color: '#F5F5DC',
    material: 'wood',
    price: 349,
    description: 'Multi-purpose storage cabinet with shelves',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a2687a28-f9a7-4cc2-a356-6f89183d15c7.png'
  },
  {
    id: 'storage-box-01',
    name: 'Storage Ottoman',
    category: 'storage',
    dimensions: { width: 0.6, height: 0.4, depth: 0.4 },
    color: '#696969',
    material: 'fabric',
    price: 129,
    description: 'Cushioned storage ottoman with hidden compartment',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a6275627-035b-422d-98eb-9a3c0a0b28a3.png'
  },

  // Decor Items
  {
    id: 'floor-lamp-01',
    name: 'Modern Floor Lamp',
    category: 'decor',
    dimensions: { width: 0.3, height: 1.5, depth: 0.3 },
    color: '#C0C0C0',
    material: 'metal',
    price: 199,
    description: 'Sleek modern floor lamp with adjustable head',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/917800f4-a1aa-43b2-ad6b-bac39cceadd5.png'
  },
  {
    id: 'side-table-01',
    name: 'Round Side Table',
    category: 'decor',
    dimensions: { width: 0.5, height: 0.5, depth: 0.5 },
    color: '#8B4513',
    material: 'wood',
    price: 149,
    description: 'Small round side table perfect for plants or decor',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b392cf40-66eb-4012-8579-02d46d164dd6.png'
  }
];

export const getCategorizedFurniture = () => {
  const categories = {
    'living-room': furnitureData.filter(item => item.category === 'living-room'),
    'bedroom': furnitureData.filter(item => item.category === 'bedroom'),
    'dining': furnitureData.filter(item => item.category === 'dining'),
    'office': furnitureData.filter(item => item.category === 'office'),
    'storage': furnitureData.filter(item => item.category === 'storage'),
    'decor': furnitureData.filter(item => item.category === 'decor'),
  };
  return categories;
};

export const getFurnitureById = (id: string) => {
  return furnitureData.find(item => item.id === id);
};

export const categoryLabels = {
  'living-room': 'Living Room',
  'bedroom': 'Bedroom',
  'dining': 'Dining Room',
  'office': 'Office',
  'storage': 'Storage',
  'decor': 'Decor & Lighting'
};