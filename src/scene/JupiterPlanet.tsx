import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";
import { useOffset } from "src/hooks/useOffset";

type GLTFResult = GLTF & {
  nodes: {
    Mars: THREE.Mesh;
  };
  materials: {
    Mars: THREE.MeshStandardMaterial;
  };
};

const JupiterPlanet = ({
  rotationSpeed,
  pause,
}: {
  rotationSpeed: number;
  pause: boolean;
}) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/jupiterPlanet/scene.glb"
  ) as GLTFResult;

  const jupiterRef = useRef<THREE.Group>(null);

  const animationTime = useOffset(pause);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Jupiter Planet",
    {
      offset: {
        value: 4.10,
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
      <mesh
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        scale={6.354}
      />
    </group>
  );
};

useGLTF.preload("/assets/models/jupiterPlanet/scene.glb");

export default JupiterPlanet;
