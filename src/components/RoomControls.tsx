'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useFurnitureStore } from '@/store/furnitureStore';

interface RoomControlsProps {
  className?: string;
}

export const RoomControls: React.FC<RoomControlsProps> = ({ className = '' }) => {
  const {
    currentRoom,
    updateRoomConfig,
    selectedFurnitureId,
    placedFurniture,
    removeFurniture,
    clearRoom,
    saveRoom,
    isGridVisible,
    toggleGrid
  } = useFurnitureStore();
  
  const selectedFurniture = placedFurniture.find(item => item.id === selectedFurnitureId);
  
  const wallColors = [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Light Gray', color: '#F5F5F5' },
    { name: 'Warm Beige', color: '#F5F5DC' },
    { name: 'Light Blue', color: '#E6F3FF' },
    { name: 'Soft Green', color: '#F0FFF0' },
    { name: 'Light Pink', color: '#FFF0F5' }
  ];
  
  const floorColors = [
    { name: 'Oak Wood', color: '#DEB887' },
    { name: 'Dark Wood', color: '#8B4513' },
    { name: 'Light Wood', color: '#F5DEB3' },
    { name: 'Gray Concrete', color: '#A0A0A0' },
    { name: 'White Marble', color: '#F8F8FF' },
    { name: 'Dark Tile', color: '#2F4F4F' }
  ];
  
  const handleWallColorChange = (color: string) => {
    updateRoomConfig({ wallColor: color });
  };
  
  const handleFloorColorChange = (color: string) => {
    updateRoomConfig({ floorColor: color });
  };
  
  const handleLightingChange = (type: 'ambient' | 'directional', value: number[]) => {
    const newLighting = {
      ...currentRoom.lighting,
      [type]: value[0] / 100
    };
    updateRoomConfig({ lighting: newLighting });
  };
  
  const handleRoomDimensionChange = (dimension: 'width' | 'length' | 'height', value: number[]) => {
    const newDimensions = {
      ...currentRoom.dimensions,
      [dimension]: value[0]
    };
    updateRoomConfig({ dimensions: newDimensions });
  };
  
  return (
    <div className={`bg-white border-l shadow-lg ${className}`}>
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Room Controls</h2>
        <p className="text-gray-600">Customize your room and furniture</p>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-140px)]">
        
        {/* Room Dimensions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Room Dimensions</CardTitle>
            <CardDescription>Adjust the size of your room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Width: {currentRoom.dimensions.width}m</Label>
              <Slider
                value={[currentRoom.dimensions.width]}
                onValueChange={(value) => handleRoomDimensionChange('width', value)}
                max={15}
                min={3}
                step={0.5}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Length: {currentRoom.dimensions.length}m</Label>
              <Slider
                value={[currentRoom.dimensions.length]}
                onValueChange={(value) => handleRoomDimensionChange('length', value)}
                max={15}
                min={3}
                step={0.5}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Height: {currentRoom.dimensions.height}m</Label>
              <Slider
                value={[currentRoom.dimensions.height]}
                onValueChange={(value) => handleRoomDimensionChange('height', value)}
                max={5}
                min={2}
                step={0.1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Wall Colors */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Wall Color</CardTitle>
            <CardDescription>Choose your wall color</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {wallColors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => handleWallColorChange(colorOption.color)}
                  className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                    currentRoom.wallColor === colorOption.color
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                >
                  <div className="text-gray-800">{colorOption.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Floor Colors */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Floor Color</CardTitle>
            <CardDescription>Choose your floor material</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {floorColors.map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => handleFloorColorChange(colorOption.color)}
                  className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                    currentRoom.floorColor === colorOption.color
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                >
                  <div className="text-white text-shadow">{colorOption.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Lighting */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Lighting</CardTitle>
            <CardDescription>Adjust room lighting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">
                Ambient Light: {Math.round(currentRoom.lighting.ambient * 100)}%
              </Label>
              <Slider
                value={[currentRoom.lighting.ambient * 100]}
                onValueChange={(value) => handleLightingChange('ambient', value)}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">
                Main Light: {Math.round(currentRoom.lighting.directional * 100)}%
              </Label>
              <Slider
                value={[currentRoom.lighting.directional * 100]}
                onValueChange={(value) => handleLightingChange('directional', value)}
                max={100}
                min={20}
                step={5}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* View Options */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">View Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="grid-toggle" className="text-sm font-medium">
                Show Grid
              </Label>
              <Switch
                id="grid-toggle"
                checked={isGridVisible}
                onCheckedChange={toggleGrid}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Selected Furniture */}
        {selectedFurniture && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Selected Furniture</CardTitle>
              <CardDescription>{selectedFurniture.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="secondary">{selectedFurniture.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span>{selectedFurniture.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span>
                    ({selectedFurniture.position[0].toFixed(1)}, {selectedFurniture.position[2].toFixed(1)})
                  </span>
                </div>
              </div>
              <Button
                onClick={() => removeFurniture(selectedFurniture.id)}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                Remove Furniture
              </Button>
            </CardContent>
          </Card>
        )}
        
        <Separator />
        
        {/* Room Actions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Room Actions</CardTitle>
            <CardDescription>Save, load, or clear your room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={saveRoom} className="w-full" variant="outline">
              Save Room
            </Button>
            <Button onClick={clearRoom} className="w-full" variant="destructive">
              Clear All Furniture
            </Button>
          </CardContent>
        </Card>
        
        {/* Statistics */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Room Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Furniture Count:</span>
                <span>{placedFurniture.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room Area:</span>
                <span>{(currentRoom.dimensions.width * currentRoom.dimensions.length).toFixed(1)}m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value:</span>
                <span className="text-green-600">
                  ${placedFurniture.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};