import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Mars: THREE.Mesh;
  };
  materials: {
    Mars: THREE.MeshStandardMaterial;
  };
};

const JupiterPlanet = ({
  pause,
  rotationSpeed,
  animationTime,
}: {
  pause: boolean;
  rotationSpeed: number;
  animationTime: () => number;
}) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/jupiterPlanet/scene.glb"
  ) as GLTFResult;

  const crystalRef = useRef<THREE.Group>(null);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Jupiter Planet",
    {
      offset: {
        value: 1,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
      speed: { value: 1.235 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!crystalRef.current) return;
    crystalRef.current.rotation.y -= 0.003;

    if (pause) {
      return;
    }
    crystalRef.current.position.x =
      Math.sin(animationTime() * speed + offset) * x * distanceFromSun;

    crystalRef.current.position.z =
      Math.cos(animationTime() * speed + offset) * x * distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      dispose={null}
      ref={crystalRef}
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