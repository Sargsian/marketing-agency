import { type RefObject, forwardRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial;
  };
};

const LavaPlanet = forwardRef(function LavaPlanet(
  {
    onClick,
    rotationSpeed,
    pause
  }: {
    onClick: () => void;
    pause: boolean;
    rotationSpeed: number;
  },
  ref
) {
  const [hovered, setHovered] = useState(false);

  const { offset, scale, distanceFromSun, speed } = useControls("Lava Planet", {
    offset: { value: 1.256, min: 0, max: Math.PI * 2, step: 0.01 },
    scale: { value: 3.1, min: 0, max: 20, step: 0.01 },
    distanceFromSun: { value: 2.4, min: 1, max: 10, step: 0.1 },
    speed: { value: 3.61, min: 0.01, max: 10, step: 0.005 },
  });

  const { companyIsChosen } = useScene();

  const animationTime = useOffset(pause);

  const { nodes, materials } = useGLTF(
    "/assets/models/lavaPlanet/scene.glb"
  ) as GLTFResult;

  const lavaRef = ref as RefObject<Group>;

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!lavaRef.current) return;
    lavaRef.current.rotation.y -= 0.003 * rotationSpeed;

    if (pause) return;

    lavaRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    lavaRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <group
      scale={2 + scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => (onClick(), setHovered(false))}
      ref={lavaRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
      dispose={null}
    >
      {!companyIsChosen && (
        <PlanetHtml
          hovered={hovered}
          onClick={onClick}
          setHovered={setHovered}
          name="Bigo"
        />
      )}
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.DefaultMaterial}
      />
    </group>
  );
});

export default LavaPlanet;

useGLTF.preload("/assets/models/lavaPlanet/scene.glb");
