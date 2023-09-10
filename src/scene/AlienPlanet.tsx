import React, { type RefObject, forwardRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import { type Group } from "three";

import { useScene } from "src/store/SceneContext";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";

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
    pause,
  }: {
    onClick: () => void;
    pause: boolean;
    rotationSpeed: number;
  },
  ref
) {
  const { nodes, materials } = useGLTF(
    "/assets/models/alienPlanet/scene-transformed.glb"
  ) as GLTFResult;

  const [hovered, setHovered] = useState(false);

  const { companyIsChosen } = useScene();

  const animationTime = useOffset(pause);

  console.log('unnecesary rerender')

  const alienRef = ref as RefObject<Group>;

  const offset = 4.64;
  const scale = 0;
  const distanceFromSun = 2.2;
  const speed = 2.08;

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
        <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.Clouds}
          scale={1.025}
        />
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

useGLTF.preload("/assets/models/alienPlanet/scene-transformed.glb");
