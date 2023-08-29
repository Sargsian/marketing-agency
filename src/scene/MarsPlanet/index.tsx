import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useOffset } from "src/hooks/useOffset";
import Meshes from "./Meshes";

const MarsPlanet = ({ pause }: { rotationSpeed: number; pause: boolean }) => {
  const marsRef = useRef<Group>(null);

  const animationTime = useOffset(pause);

  const { offset, scale, distanceFromSun, speed } = useControls("Mars Planet", {
    offset: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
    },
    scale: { value: 3.73, min: 0, max: 20, step: 0.01 },
    distanceFromSun: { value: 7.5, min: 1, max: 10, step: 0.1 },
    speed: { value: 0.24, min: 0.01, max: 10, step: 0.005 },
  });

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!marsRef.current) return;
    marsRef.current.rotation.y -= 0.003;

    if (pause) return;

    marsRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    marsRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <group
      ref={marsRef}
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      dispose={null}
      name="Sketchfab_Scene"
    >
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
        <group
          name="656dac23814e461180cce73bdfc761ecfbx"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01 + scale * 0.01}
        >
          <group name="Object_2">
            <group name="RootNode">
              <group
                name="4_mars"
                rotation={[-Math.PI / 2, -0.436, 0]}
                scale={140}
              >
                <Suspense
                  fallback={
                    <Meshes url="/assets/models/marsPlanet/scene-low.glb" />
                  }
                >
                  <Meshes url="/assets/models/marsPlanet/scene.glb" />
                </Suspense>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
useGLTF.preload("/assets/models/marsPlanet/scene-low.glb");

export default MarsPlanet;

