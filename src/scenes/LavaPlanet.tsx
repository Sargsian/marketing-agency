import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial;
  };
};

const LavaPlanet = ({ pause }: { pause: boolean }) => {
  
  const { offset, scale, distanceFromSun, speed } = useControls("Lava Planet", {
    offset: { value: 2.09, min: 0, max: Math.PI * 2, step: 0.01 },
    scale: { value: 0, min: 0, max: 20, step: 0.01 },
    distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
    speed: { value: 0.767, min: 0.01, max: 1, step: 0.005 },
  });

  const lavaRef = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    "/assets/models/lavaPlanet/scene.glb"
  ) as GLTFResult;

  const clockRef = useRef(new THREE.Clock());

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!lavaRef.current) return;
    lavaRef.current.rotation.y -= 0.003;
    if (pause) return;
    lavaRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
    lavaRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
  });

  return (
    <group
      scale={5 + scale}
      ref={lavaRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
      dispose={null}
    >
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.DefaultMaterial}
      />
    </group>
  );
};

export default LavaPlanet;

useGLTF.preload("/assets/models/lavaPlanet/scene.glb");
