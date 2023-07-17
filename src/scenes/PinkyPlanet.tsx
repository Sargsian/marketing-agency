import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useControls } from "leva";

const PinkyPLanet = ({ pause }: { pause: boolean }) => {
  const gltf = useGLTF("/assets/models/pinkyPlanet/scene.glb");
  // const textureMap = useTexture("/assets/models/pinkyPlanet/pink_planet.png");
  // const fbx = useLoader(FBXLoader, '/assets/models/pinkyPlanet/scene.fbx')

  const pinkyRef = useRef<THREE.Group>(null);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Pinky Planet",
    {
      offset: { value: 5.232, min: 0, max: Math.PI * 2, step: 0.01 },
      scale: { value: 3.5, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
      speed: { value: 0.25, min: 0.01, max: 1, step: 0.005 },
    }
  );

  const clockRef = useRef(new THREE.Clock());

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!pinkyRef.current) return;
    pinkyRef.current.rotation.y -= 0.002;
    if (pause) return;
    pinkyRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) * x * distanceFromSun;
    pinkyRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) * x * distanceFromSun;
  });
  return (
    //  <primitive ref={pinkyRef} position={[x * 1.5, 0, z * 1.5]} object={fbx} />
    <group
      ref={pinkyRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
      dispose={null}
    >
      <primitive scale={scale * 0.01 + 0.02} object={gltf.scene} />
    </group>
  );
};

export default PinkyPLanet;

useGLTF.preload("/assets/models/pinkyPlanet/scene.glb");
