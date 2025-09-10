'use client';

import React, { useRef } from 'react';
import { RoomConfig } from '@/types/furniture';
import { Plane, Box } from '@react-three/drei';
import * as THREE from 'three';

interface RoomProps {
  config: RoomConfig;
}

export const Room: React.FC<RoomProps> = ({ config }) => {
  const { dimensions, wallColor, floorColor } = config;
  const floorRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      {/* Floor */}
      <Plane
        ref={floorRef}
        args={[dimensions.width, dimensions.length]}
        position={[dimensions.width / 2, 0, dimensions.length / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshLambertMaterial color={floorColor} />
      </Plane>
      
      {/* Walls */}
      {/* Back Wall */}
      <Plane
        args={[dimensions.width, dimensions.height]}
        position={[dimensions.width / 2, dimensions.height / 2, 0]}
        rotation={[0, 0, 0]}
      >
        <meshLambertMaterial color={wallColor} side={THREE.DoubleSide} />
      </Plane>
      
      {/* Left Wall */}
      <Plane
        args={[dimensions.length, dimensions.height]}
        position={[0, dimensions.height / 2, dimensions.length / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshLambertMaterial color={wallColor} side={THREE.DoubleSide} />
      </Plane>
      
      {/* Right Wall */}
      <Plane
        args={[dimensions.length, dimensions.height]}
        position={[dimensions.width, dimensions.height / 2, dimensions.length / 2]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshLambertMaterial color={wallColor} side={THREE.DoubleSide} />
      </Plane>
      
      {/* Front Wall (partially visible for open feeling) */}
      <group>
        {/* Left side of front wall */}
        <Plane
          args={[dimensions.width * 0.3, dimensions.height]}
          position={[dimensions.width * 0.15, dimensions.height / 2, dimensions.length]}
          rotation={[0, Math.PI, 0]}
        >
          <meshLambertMaterial color={wallColor} side={THREE.DoubleSide} />
        </Plane>
        
        {/* Right side of front wall */}
        <Plane
          args={[dimensions.width * 0.3, dimensions.height]}
          position={[dimensions.width * 0.85, dimensions.height / 2, dimensions.length]}
          rotation={[0, Math.PI, 0]}
        >
          <meshLambertMaterial color={wallColor} side={THREE.DoubleSide} />
        </Plane>
      </group>
      
      {/* Ceiling (optional, subtle) */}
      <Plane
        args={[dimensions.width, dimensions.length]}
        position={[dimensions.width / 2, dimensions.height, dimensions.length / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshLambertMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1}
        />
      </Plane>
      
      {/* Room corners (visual enhancement) */}
      {/* Floor corners */}
      <Box
        args={[0.05, 0.05, dimensions.length]}
        position={[0, 0.025, dimensions.length / 2]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
      
      <Box
        args={[0.05, 0.05, dimensions.length]}
        position={[dimensions.width, 0.025, dimensions.length / 2]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
      
      <Box
        args={[dimensions.width, 0.05, 0.05]}
        position={[dimensions.width / 2, 0.025, 0]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
      
      <Box
        args={[dimensions.width, 0.05, 0.05]}
        position={[dimensions.width / 2, 0.025, dimensions.length]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
      
      {/* Ceiling corners */}
      <Box
        args={[0.05, 0.05, dimensions.length]}
        position={[0, dimensions.height - 0.025, dimensions.length / 2]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
      
      <Box
        args={[0.05, 0.05, dimensions.length]}
        position={[dimensions.width, dimensions.height - 0.025, dimensions.length / 2]}
      >
        <meshLambertMaterial color="#999999" />
      </Box>
    </group>
  );
};