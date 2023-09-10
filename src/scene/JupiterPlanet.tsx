import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
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
  pause,
}: {
  pause: boolean;
}) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/jupiterPlanet/scene-transformed.glb"
  ) as GLTFResult;

  const jupiterRef = useRef<THREE.Group>(null);

  const animationTime = useOffset(pause);

  const offset = 4.1;
  const distanceFromSun = 9.5;
  const speed = 0.01;

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

useGLTF.preload("/assets/models/jupiterPlanet/scene-transformed.glb");

export default JupiterPlanet;
