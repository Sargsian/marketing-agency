import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import type { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Phoenix_LOD0__0: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

const PhoenixPlanet = ({ pause }: { pause: boolean }) => {
  const phoenixRef = useRef<Group>(null);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Phoenix Planet",
    {
      offset: { value: 4.18, min: 0, max: Math.PI * 2, step: 0.01 },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
      speed: { value: 0.335, min: 0.01, max: 1, step: 0.005 },
    }
  );

  const clockRef = useRef(new THREE.Clock());

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!phoenixRef.current) return;
    phoenixRef.current.rotation.y -= 0.002;
    if (pause) return;
    phoenixRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) * x * distanceFromSun;
    phoenixRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) * x * distanceFromSun;
  });
  const { nodes, materials } = useGLTF(
    "/assets/models/phoenixPlanet/scene.glb"
  ) as GLTFResult;
  return (
    <group
      scale={2.54 + scale}
      ref={phoenixRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
      dispose={null}
    >
      <mesh
        geometry={nodes.Phoenix_LOD0__0.geometry}
        material={materials["Scene_-_Root"]}
        position={[0, 1.735, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.078}
      />
    </group>
  );
};

export default PhoenixPlanet;

useGLTF.preload("/assets/models/phoenixPlanet/scene.glb");
