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

const BrownPlanet = ({
  distanceFromSun,
}: {
  distanceFromSun: number;
}) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/brownPlanet/scene.glb"
  ) as GLTFResult;

  const { offset, scale } = useControls("Brown Planet", {
    offset: 1.04,
    scale: 2.78,
  });

  const brownRef = useRef<Group>(null);
  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;
  useFrame(() => {
    if (!brownRef.current) return;
    brownRef.current.rotation.y -= 0.002;
  });

  return (
    <group
      scale={scale}
      ref={brownRef}
      position={[x * distanceFromSun, 0, z * distanceFromSun]}
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
