import React, { type RefObject, forwardRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useControls } from "leva";

import { useScene } from "src/store/SceneContext";
import PlanetHtml from "src/components/Scene/PlanetHtml";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    Planet: THREE.MeshStandardMaterial;
    Clouds: THREE.MeshStandardMaterial;
  };
};

const AlienPlanet = forwardRef(function AlienPlanet(
  {
    onClick,
    rotationSpeed,
    animationTime,
  }: {
    onClick: () => void;
    rotationSpeed: number;
    animationTime: () => number;
  },
  ref
) {
  const { nodes, materials } = useGLTF(
    "/assets/models/alienPlanet/scene3.glb"
  ) as GLTFResult;

  const [hovered, setHovered] = useState(false);

  const { preview, pause, companyIsChosen } = useScene();

  const alienRef = ref as RefObject<Group>;

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Alien Planet",
    {
      offset: {
        value: 0,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4.2, min: 1, max: 10, step: 0.1 },
      speed: { value: 1.34, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!alienRef.current) return;
    alienRef.current.rotation.y -= 0.003 * rotationSpeed;
  });

  return (
    <>
      <group
        position={[
          Math.sin(offset) * distanceFromSun * x,
          0,
          Math.cos(offset) * distanceFromSun * z,
        ]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={5 + scale}
        onClick={() => (onClick(), setHovered(false))}
        ref={alienRef}
        dispose={null}
      >
        {!companyIsChosen && (
          <PlanetHtml
            hovered={hovered}
            onClick={onClick}
            setHovered={setHovered}
            name="Tiktok"
          />
        )}
        <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.Clouds}
          scale={1.025}
        />
      </group>
    </>
  );
});
export default AlienPlanet;

useGLTF.preload("/assets/models/alienPlanet/scene3.glb");
