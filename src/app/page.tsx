'use client';

import React, { useState, useEffect } from 'react';
import { Scene3D } from '@/components/Scene3D';
import { FurnitureCatalog } from '@/components/FurnitureCatalog';
import { RoomControls } from '@/components/RoomControls';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFurnitureStore } from '@/store/furnitureStore';
import { exportRoomAsImage, downloadImage } from '@/lib/export-utils';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  
  const { 
    currentRoom, 
    placedFurniture, 
    selectedFurnitureId,
    selectFurniture
  } = useFurnitureStore();
  
  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleExportImage = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const dataURL = await exportRoomAsImage(canvas, currentRoom);
        downloadImage(dataURL, `room-${currentRoom.name.replace(/\s+/g, '-').toLowerCase()}`);
        toast.success('Room image exported successfully!');
      } else {
        toast.error('Unable to export image - 3D scene not ready');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export room image');
    }
  };
  
  const handleCanvasClick = (event: React.MouseEvent) => {
    // Deselect furniture when clicking on empty space
    if (event.target === event.currentTarget) {
      selectFurniture(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading 3D Furniture Visualizer</h2>
          <p className="text-gray-600">Preparing your design environment...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🏠</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">3D Furniture Visualizer</h1>
                <p className="text-sm text-gray-600">Design your dream room in 3D</p>
              </div>
            </div>
            
            {/* Room Info */}
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {currentRoom.name}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {currentRoom.dimensions.width}m × {currentRoom.dimensions.length}m
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {placedFurniture.length} items
              </Badge>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {leftPanelOpen ? 'Hide Catalog' : 'Show Catalog'}
              </Button>
              <Button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {rightPanelOpen ? 'Hide Controls' : 'Show Controls'}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                onClick={handleExportImage}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Export Image
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Furniture Catalog */}
        {leftPanelOpen && (
          <div className="w-80 flex-shrink-0">
            <FurnitureCatalog />
          </div>
        )}
        
        {/* Center - 3D Scene */}
        <div 
          className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100"
          onClick={handleCanvasClick}
        >
          <Scene3D className="w-full h-full" />
          
          {/* Scene Overlay Info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-sm space-y-1">
              <div className="font-semibold text-gray-800">Navigation</div>
              <div className="text-gray-600">• Left click + drag: Rotate</div>
              <div className="text-gray-600">• Right click + drag: Pan</div>
              <div className="text-gray-600">• Scroll: Zoom</div>
              <div className="text-gray-600">• Click furniture: Select</div>
            </div>
          </div>
          
          {/* Selected Item Info */}
          {selectedFurnitureId && (
            <div className="absolute top-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg">
              <div className="text-sm">
                <div className="font-semibold text-blue-800 mb-1">Selected Item</div>
                <div className="text-blue-700">
                  {placedFurniture.find(item => item.id === selectedFurnitureId)?.name}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Click elsewhere to deselect
                </div>
              </div>
            </div>
          )}
          
          {/* Empty Room Hint */}
          {placedFurniture.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-md">
                <div className="text-6xl mb-4">🪑</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Room is Empty</h3>
                <p className="text-gray-600">
                  Select furniture from the catalog on the left to start designing your room!
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Room Controls */}
        {rightPanelOpen && (
          <div className="w-80 flex-shrink-0">
            <RoomControls />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div>Room: {currentRoom.dimensions.width}m × {currentRoom.dimensions.length}m × {currentRoom.dimensions.height}m</div>
            <div>Furniture: {placedFurniture.length} items</div>
            <div>
              Total Value: ${placedFurniture.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}
            </div>
          </div>
          <div>
            3D Furniture Visualizer • Built with React & Three.js
          </div>
        </div>
      </footer>
    </div>
  );
}