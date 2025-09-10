'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFurnitureStore } from '@/store/furnitureStore';
import { getCategorizedFurniture } from '@/data/furnitureData';
import { FurnitureItem } from '@/types/furniture';

interface FurnitureCatalogProps {
  className?: string;
}

export const FurnitureCatalog: React.FC<FurnitureCatalogProps> = ({ className = '' }) => {
  const { addFurniture, currentRoom } = useFurnitureStore();
  const categorizedFurniture = getCategorizedFurniture();
  
  const handleAddFurniture = (furniture: FurnitureItem) => {
    // Place furniture in center of room by default
    const centerPosition: [number, number, number] = [
      currentRoom.dimensions.width / 2,
      furniture.dimensions.height / 2,
      currentRoom.dimensions.length / 2
    ];
    addFurniture(furniture, centerPosition);
  };
  
  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `$${price.toLocaleString()}`;
  };
  
  const formatDimensions = (dimensions: { width: number; height: number; depth: number }) => {
    return `${dimensions.width}m × ${dimensions.height}m × ${dimensions.depth}m`;
  };
  
  const materialColors = {
    wood: 'bg-amber-100 text-amber-800',
    metal: 'bg-gray-100 text-gray-800',
    fabric: 'bg-blue-100 text-blue-800',
    leather: 'bg-amber-100 text-amber-900',
    glass: 'bg-cyan-100 text-cyan-800',
    plastic: 'bg-green-100 text-green-800'
  };
  
  return (
    <div className={`bg-white border-r shadow-lg ${className}`}>
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Furniture Catalog</h2>
        <p className="text-gray-600">Select furniture to add to your room</p>
      </div>
      
      <Tabs defaultValue="living-room" className="w-full">
        <TabsList className="grid w-full grid-cols-3 m-4 mb-2">
          <TabsTrigger value="living-room" className="text-xs">Living</TabsTrigger>
          <TabsTrigger value="bedroom" className="text-xs">Bedroom</TabsTrigger>
          <TabsTrigger value="dining" className="text-xs">Dining</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-3 m-4 mt-2">
          <TabsTrigger value="office" className="text-xs">Office</TabsTrigger>
          <TabsTrigger value="storage" className="text-xs">Storage</TabsTrigger>
          <TabsTrigger value="decor" className="text-xs">Decor</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[calc(100vh-280px)]">
          {Object.entries(categorizedFurniture).map(([category, items]: [string, FurnitureItem[]]) => (
            <TabsContent key={category} value={category} className="px-4 pb-4">
              <div className="space-y-3">
                {items.map((furniture) => (
                  <Card key={furniture.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-800">
                            {furniture.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600">
                            {furniture.description}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`ml-2 ${materialColors[furniture.material] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {furniture.material}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Furniture Image Placeholder */}
                      <div 
                        className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: furniture.color + '20' }}
                      >
                        {furniture.imageUrl ? (
                          <img
                            src={furniture.imageUrl}
                            alt={furniture.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="text-gray-500 text-center p-4">
                                    <div class="text-3xl mb-2">${
                                      furniture.category === 'living-room' ? '🛋️' : 
                                      furniture.category === 'bedroom' ? '🛏️' : 
                                      furniture.category === 'dining' ? '🍽️' : 
                                      furniture.category === 'office' ? '💼' : 
                                      furniture.category === 'storage' ? '📦' : '💡'
                                    }</div>
                                    <div class="text-sm">${furniture.name}</div>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className="text-gray-500 text-center p-4">
                            <div className="text-3xl mb-2">
                              {furniture.category === 'living-room' ? '🛋️' : 
                               furniture.category === 'bedroom' ? '🛏️' : 
                               furniture.category === 'dining' ? '🍽️' : 
                               furniture.category === 'office' ? '💼' : 
                               furniture.category === 'storage' ? '📦' : '💡'}
                            </div>
                            <div className="text-sm">{furniture.name}</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Furniture Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span className="font-medium">{formatDimensions(furniture.dimensions)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium text-green-600">{formatPrice(furniture.price)}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleAddFurniture(furniture)}
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        Add to Room
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
};