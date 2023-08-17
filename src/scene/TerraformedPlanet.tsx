import React, { type RefObject, forwardRef, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";
import { type Group, type Mesh } from "three";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";

type GLTFResult = GLTF & {
  nodes: {
    Esfera_Mat_0: THREE.Mesh;
    Esfera_1_Mat1_0: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    ["Mat.1"]: THREE.MeshStandardMaterial;
  };
};

const TerraformedPlanet = forwardRef(function TerraformedPlanet(
  {
    rotationSpeed,
    onClick,
    pause,
  }: {
    rotationSpeed: number;
    pause: boolean;
    onClick: () => void;
  },
  ref
) {
  const { nodes, materials } = useGLTF(
    "/assets/models/terraformedPlanet/scene.glb"
  ) as GLTFResult;

  const TerraformedRef = ref as RefObject<Group>;

  const [hovered, setHovered] = useState(false);

  const { companyIsChosen } = useScene();

  const animationTime = useOffset(pause);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Terraformed Planet",
    {
      offset: {
        value: 3.768,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0.8, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 3.0, min: 1, max: 10, step: 0.1 },
      speed: { value: 3.07 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!TerraformedRef.current) return;
    TerraformedRef.current.rotation.y -= 0.003 * rotationSpeed;

    if (pause) return;

    TerraformedRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    TerraformedRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      ref={TerraformedRef}
      onClick={() => onClick()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      {!companyIsChosen && (
        <PlanetHtml
          hovered={hovered}
          onClick={onClick}
          setHovered={setHovered}
          name="Meta"
        />
      )}

      <mesh
        receiveShadow
        scale={0.004 + scale * 0.001}
        geometry={nodes.Esfera_Mat_0.geometry}
        material={materials.material}
        rotation={[Math.PI, 0.211, -Math.PI]}
      />
      <mesh
        receiveShadow
        scale={0.00405 + scale * 0.001}
        geometry={nodes.Esfera_1_Mat1_0.geometry}
        material={materials["Mat.1"]}
      />
    </group>
  );
});

useGLTF.preload("/assets/models/terraformedPlanet/scene.glb");

export default TerraformedPlanet;
