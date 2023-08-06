import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useScene } from "src/store/SceneContext";

const PinkyPLanet = ({
  rotationSpeed,
  animationTime,
}: {
  rotationSpeed: number;
  animationTime: () => number;
}) => {
  const textureMap = useTexture("/assets/models/pinkyPlanet/texture2.jpg");

  const pinkyRef = useRef<THREE.Group>(null);

  const { preview, pause, companyIsChosen } = useScene();

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Pinky Planet",
    {
      offset: { value: 5.232, min: 0, max: Math.PI * 2, step: 0.01 },
      scale: { value: 4.9, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 3.6, min: 1, max: 10, step: 0.1 },
      speed: { value: 2.48 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!pinkyRef.current) return;
    pinkyRef.current.rotation.y -= 0.003;

    if (pause) {
      return;
    }
    pinkyRef.current.position.x =
      Math.sin(animationTime() * (speed / 4) + offset) * x * distanceFromSun;

    pinkyRef.current.position.z =
      Math.cos(animationTime() * (speed / 4) + offset) * x * distanceFromSun;
  });

  return (
    <group
      ref={pinkyRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
    >
      <mesh material-envMapIntensity={2} scale={0.5 + scale * 0.1}>
        <sphereBufferGeometry args={[5, 240, 240]} />
        <meshStandardMaterial
          roughness={0.4}
          metalness={0.1}
          map={textureMap}
          color={"white"}
        />
      </mesh>
    </group>
  );
};

export default PinkyPLanet;

useGLTF.preload("/assets/models/pinkyPlanet/scene.glb");
