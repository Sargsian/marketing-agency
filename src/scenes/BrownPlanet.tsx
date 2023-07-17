import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Phoenix_LOD0__0: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

const BrownPlanet = ({ pause }: { pause: boolean }) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/brownPlanet/scene.glb"
  ) as GLTFResult;

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Brown Planet",
    {
      offset: { value: 1.04, min: 0, max: Math.PI * 2, step: 0.01 },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
      speed: { value: 0.902, min: 0.01, max: 1, step: 0.005 },
    }
  );

  const clockRef = useRef(new THREE.Clock());

  const brownRef = useRef<Group>(null);

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!brownRef.current) return;
    brownRef.current.rotation.y -= 0.003;
    if (pause) return;
    brownRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
    brownRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
  });

  return (
    <group
      scale={2.78 + scale}
      ref={brownRef}
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
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

export default BrownPlanet;

useGLTF.preload("/assets/models/brownPlanet/scene.glb");
