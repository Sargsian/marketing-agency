import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useControls } from "leva";

const PinkyPLanet = ({
  distanceFromSun,
}: {
  distanceFromSun: number;
}) => {
  const gltf = useGLTF("/assets/models/pinkyPlanet/scene.glb");
  // const textureMap = useTexture("/assets/models/pinkyPlanet/pink_planet.png");
  // const fbx = useLoader(FBXLoader, '/assets/models/pinkyPlanet/scene.fbx')

  const { offset, scale } = useControls("Pinky Planet", {
    offset: 5.22,
    scale: 0.06,
  });

  const testRef = useRef<THREE.Group>(null);
  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;
  useFrame(() => {
    if (!testRef.current) return;
    testRef.current.rotation.y -= 0.002;
  });
  return (
    //  <primitive ref={testRef} position={[x * 1.5, 0, z * 1.5]} object={fbx} />
    <group
      ref={testRef}
      position={[x * distanceFromSun, 0, z * distanceFromSun]}
      dispose={null}
    >
      <primitive
        scale={scale * 0.5}
        object={gltf.scene}
      />
    </group>
  );
};

export default PinkyPLanet;

useGLTF.preload("/assets/models/pinkyPlanet/scene.glb");
