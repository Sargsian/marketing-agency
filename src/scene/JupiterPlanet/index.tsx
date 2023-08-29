import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";
import { useOffset } from "src/hooks/useOffset";
import Meshes from "./Meshes";

const JupiterPlanet = ({
  pause,
}: {
  rotationSpeed: number;
  pause: boolean;
}) => {
  const jupiterRef = useRef<THREE.Group>(null);

  const animationTime = useOffset(pause);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Jupiter Planet",
    {
      offset: {
        value: 4.1,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 9.5, min: 1, max: 10, step: 0.1 },
      speed: { value: 0.01, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!jupiterRef.current) return;
    jupiterRef.current.rotation.y -= 0.003;

    if (pause) return;

    jupiterRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    jupiterRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      dispose={null}
      ref={jupiterRef}
    >
      <Suspense
        fallback={<Meshes url="/assets/models/jupiterPlanet/scene-low.glb" />}
      >
        <Meshes url="/assets/models/jupiterPlanet/scene.glb" />
      </Suspense>
    </group>
  );
};

useGLTF.preload("/assets/models/jupiterPlanet/scene-low.glb");

export default JupiterPlanet;
