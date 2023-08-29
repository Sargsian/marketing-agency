import React, { type RefObject, forwardRef, useState, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type Group } from "three";
import { useControls } from "leva";

import { useScene } from "src/store/SceneContext";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";
import Meshes from "./Meshes";

const AlienPlanet = forwardRef(function AlienPlanet(
  {
    onClick,
    rotationSpeed,
    pause,
  }: {
    onClick: () => void;
    pause: boolean;
    rotationSpeed: number;
  },
  ref
) {
  const [hovered, setHovered] = useState(false);

  const { companyIsChosen } = useScene();

  const animationTime = useOffset(pause);

  const alienRef = ref as RefObject<Group>;

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Alien Planet",
    {
      offset: {
        value: 4.64,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 2.2, min: 1, max: 10, step: 0.1 },
      speed: { value: 2.08, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!alienRef.current) return;
    alienRef.current.rotation.y -= 0.003 * rotationSpeed;

    if (pause) return;

    alienRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    alienRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <>
      <group
        position={[
          Math.sin(offset) * distanceFromSun * x,
          0,
          Math.cos(offset) * distanceFromSun * z,
        ]}
        onPointerOver={() => {
          if (companyIsChosen) return;
          setHovered(true);
        }}
        onPointerOut={() => {
          if (companyIsChosen) return;
          setHovered(false);
        }}
        scale={5 + scale}
        onClick={() => (onClick(), setHovered(false))}
        ref={alienRef}
        dispose={null}
      >
        <Suspense
          fallback={<Meshes url="/assets/models/alienPlanet/scene-low.glb" />}
        >
          <Meshes url="/assets/models/alienPlanet/scene.glb" />
        </Suspense>
        {!companyIsChosen && (
          <PlanetHtml
            hovered={hovered}
            onClick={onClick}
            setHovered={setHovered}
            name="Tiktok"
          />
        )}
      </group>
    </>
  );
});
export default AlienPlanet;

useGLTF.preload("/assets/models/alienPlanet/scene-low.glb");
