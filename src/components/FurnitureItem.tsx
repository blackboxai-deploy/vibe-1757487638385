'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, RoundedBox } from '@react-three/drei';
import { PlacedFurniture } from '@/types/furniture';
import { useFurnitureStore } from '@/store/furnitureStore';
import { getMaterialByType } from '@/lib/3d-utils';
import * as THREE from 'three';

interface FurnitureItemProps {
  furniture: PlacedFurniture;
  isSelected: boolean;
}

export const FurnitureItem: React.FC<FurnitureItemProps> = ({ furniture, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { selectFurniture, updateFurniturePosition } = useFurnitureStore();
  
  const { position, rotation, scale, dimensions, color, material, name } = furniture;
  const materialProps = getMaterialByType(material, color);
  
  // Add subtle animation for selected items
  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1];
    }
  });
  
  const handleClick = (event: any) => {
    event.stopPropagation();
    selectFurniture(furniture.id);
  };
  
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  
  // Create furniture geometry based on category
  const renderFurnitureGeometry = () => {
    const baseScale = isSelected || hovered ? 1.02 : 1;
    
    switch (furniture.category) {
      case 'living-room':
        if (name.toLowerCase().includes('sofa')) {
          return (
            <group>
              {/* Main sofa body */}
              <RoundedBox
                args={[dimensions.width * 0.9, dimensions.height * 0.6, dimensions.depth * 0.8]}
                position={[0, dimensions.height * 0.3, 0]}
                radius={0.05}
                smoothness={4}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Backrest */}
              <RoundedBox
                args={[dimensions.width * 0.85, dimensions.height * 0.4, dimensions.depth * 0.15]}
                position={[0, dimensions.height * 0.7, -dimensions.depth * 0.3]}
                radius={0.05}
                smoothness={4}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Arms */}
              <RoundedBox
                args={[dimensions.width * 0.12, dimensions.height * 0.5, dimensions.depth * 0.6]}
                position={[-dimensions.width * 0.38, dimensions.height * 0.45, 0]}
                radius={0.03}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              <RoundedBox
                args={[dimensions.width * 0.12, dimensions.height * 0.5, dimensions.depth * 0.6]}
                position={[dimensions.width * 0.38, dimensions.height * 0.45, 0]}
                radius={0.03}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
            </group>
          );
        } else if (name.toLowerCase().includes('chair')) {
          return (
            <group>
              {/* Seat */}
              <RoundedBox
                args={[dimensions.width * 0.8, dimensions.height * 0.1, dimensions.depth * 0.8]}
                position={[0, dimensions.height * 0.4, 0]}
                radius={0.02}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Backrest */}
              <RoundedBox
                args={[dimensions.width * 0.7, dimensions.height * 0.4, dimensions.depth * 0.1]}
                position={[0, dimensions.height * 0.7, -dimensions.depth * 0.35]}
                radius={0.02}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Legs */}
              {[-0.3, 0.3].map((x, xi) =>
                [-0.3, 0.3].map((z, zi) => (
                  <Cylinder
                    key={`${xi}-${zi}`}
                    args={[0.02, 0.02, dimensions.height * 0.4]}
                    position={[x * dimensions.width, dimensions.height * 0.2, z * dimensions.depth]}
                    scale={[baseScale, baseScale, baseScale]}
                  >
                    <meshStandardMaterial color="#654321" />
                  </Cylinder>
                ))
              )}
            </group>
          );
        } else if (name.toLowerCase().includes('table')) {
          return (
            <group>
              {/* Table top */}
              <RoundedBox
                args={[dimensions.width, dimensions.height * 0.15, dimensions.depth]}
                position={[0, dimensions.height * 0.85, 0]}
                radius={0.02}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Legs */}
              {[-0.4, 0.4].map((x, xi) =>
                [-0.4, 0.4].map((z, zi) => (
                  <Cylinder
                    key={`${xi}-${zi}`}
                    args={[0.03, 0.03, dimensions.height * 0.7]}
                    position={[x * dimensions.width, dimensions.height * 0.35, z * dimensions.depth]}
                    scale={[baseScale, baseScale, baseScale]}
                  >
                    <meshStandardMaterial color="#654321" />
                  </Cylinder>
                ))
              )}
            </group>
          );
        }
        break;
        
      case 'bedroom':
        if (name.toLowerCase().includes('bed')) {
          return (
            <group>
              {/* Mattress */}
              <RoundedBox
                args={[dimensions.width * 0.95, dimensions.height * 0.3, dimensions.depth * 0.95]}
                position={[0, dimensions.height * 0.6, 0]}
                radius={0.05}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
              {/* Bed frame */}
              <RoundedBox
                args={[dimensions.width, dimensions.height * 0.4, dimensions.depth]}
                position={[0, dimensions.height * 0.2, 0]}
                radius={0.03}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial color="#654321" />
              </RoundedBox>
              {/* Headboard */}
              <RoundedBox
                args={[dimensions.width, dimensions.height * 0.6, dimensions.depth * 0.1]}
                position={[0, dimensions.height * 0.7, -dimensions.depth * 0.45]}
                radius={0.05}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </RoundedBox>
            </group>
          );
        }
        break;
        
      case 'decor':
        if (name.toLowerCase().includes('lamp')) {
          return (
            <group>
              {/* Base */}
              <Cylinder
                args={[dimensions.width * 0.3, dimensions.width * 0.3, dimensions.height * 0.1]}
                position={[0, dimensions.height * 0.05, 0]}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial {...materialProps} />
              </Cylinder>
              {/* Pole */}
              <Cylinder
                args={[0.02, 0.02, dimensions.height * 0.7]}
                position={[0, dimensions.height * 0.4, 0]}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial color="#666666" />
              </Cylinder>
              {/* Shade */}
              <Cylinder
                args={[dimensions.width * 0.4, dimensions.width * 0.3, dimensions.height * 0.2]}
                position={[0, dimensions.height * 0.9, 0]}
                scale={[baseScale, baseScale, baseScale]}
              >
                <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
              </Cylinder>
              {/* Light */}
              <pointLight
                intensity={0.5}
                color="#ffffcc"
                position={[0, dimensions.height * 0.85, 0]}
                distance={3}
              />
            </group>
          );
        }
        break;
    }
    
    // Default box geometry for unspecified furniture
    return (
      <RoundedBox
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        radius={0.03}
        smoothness={4}
        scale={[baseScale, baseScale, baseScale]}
      >
        <meshStandardMaterial {...materialProps} />
      </RoundedBox>
    );
  };
  
  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
    >
      {renderFurnitureGeometry()}
      
      {/* Selection indicator */}
      {isSelected && (
        <Box
          args={[dimensions.width + 0.2, 0.02, dimensions.depth + 0.2]}
          position={[0, -0.01, 0]}
        >
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </Box>
      )}
      
      {/* Hover outline */}
      {hovered && !isSelected && (
        <Box
          args={[dimensions.width + 0.1, dimensions.height + 0.1, dimensions.depth + 0.1]}
          position={[0, dimensions.height / 2, 0]}
        >
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.2}
            wireframe
          />
        </Box>
      )}
    </group>
  );
};