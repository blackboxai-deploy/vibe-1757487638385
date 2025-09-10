'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import { Room } from './Room';
import { FurnitureItem } from './FurnitureItem';
import { useFurnitureStore } from '@/store/furnitureStore';

interface Scene3DProps {
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ className = '' }) => {
  const { currentRoom, placedFurniture, isGridVisible, selectedFurnitureId } = useFurnitureStore();
  
  return (
    <div className={`w-full h-full ${className}`} id="scene3d-container">
      <Canvas
        shadows
        camera={{ 
          position: [8, 6, 8], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true // Important for screenshot export
        }}
      >
        <Suspense fallback={null}>
          {/* Camera Controls */}
          <PerspectiveCamera makeDefault position={[8, 6, 8]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
            target={[currentRoom.dimensions.width / 2, 0, currentRoom.dimensions.length / 2]}
          />
          
          {/* Environment and Lighting */}
          <Environment preset="apartment" />
          <ambientLight intensity={currentRoom.lighting.ambient} />
          <directionalLight
            intensity={currentRoom.lighting.directional}
            position={[currentRoom.dimensions.width / 2, currentRoom.dimensions.height, currentRoom.dimensions.length / 2]}
            target-position={[currentRoom.dimensions.width / 2, 0, currentRoom.dimensions.length / 2]}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
          />
          
          {/* Additional fill light */}
          <directionalLight
            intensity={0.3}
            position={[-currentRoom.dimensions.width / 4, currentRoom.dimensions.height / 2, currentRoom.dimensions.length]}
            color="#87CEEB"
          />
          
          {/* Grid */}
          {isGridVisible && (
            <Grid
              args={[currentRoom.dimensions.width * 2, currentRoom.dimensions.length * 2, 20, 20]}
              position={[currentRoom.dimensions.width / 2, 0, currentRoom.dimensions.length / 2]}
              cellColor="#dddddd"
              sectionColor="#bbbbbb"
              fadeDistance={30}
              fadeStrength={0.5}
              infiniteGrid={false}
            />
          )}
          
          {/* Room */}
          <Room config={currentRoom} />
          
          {/* Placed Furniture */}
          {placedFurniture.map((furniture) => (
            <FurnitureItem
              key={furniture.id}
              furniture={furniture}
              isSelected={furniture.id === selectedFurnitureId}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};