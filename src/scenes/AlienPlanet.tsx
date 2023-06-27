import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { Group } from "three";
import { useControls } from "leva";

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

const AlienPlanet = ({
  distanceFromSun,
}: {
  distanceFromSun: number;
}) => {
  const { offset,scale } = useControls('Alien Planet',{
    offset: 0,
    scale: 5,
    
  });

  const { nodes, materials } = useGLTF(
    "/assets/models/alienPlanet/scene.glb"
  ) as GLTFResult;
  const alienRef = useRef<Group>(null);
  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;

  useFrame(() => {
    if (!alienRef.current) return;
    alienRef.current.rotation.y -= 0.002;
  });

  return (
    <group
      scale={scale}
      ref={alienRef}
      position={[x * distanceFromSun, 0, z * distanceFromSun]}
      dispose={null}
    >
      <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Clouds}
        scale={1.025}
      />
    </group>
  );
};
export default AlienPlanet;

useGLTF.preload("/assets/models/alienPlanet/scene.glb");
