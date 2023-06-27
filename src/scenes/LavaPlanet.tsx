import { Group } from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial;
  };
};

const LavaPlanet = ({ distanceFromSun }: { distanceFromSun: number }) => {

  const { offset, scale } = useControls('Lava Planet',{
    offset: 2.09,
    scale: 5,
  });

  const lavaRef = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    '/assets/models/lavaPlanet/scene.glb'
  ) as GLTFResult;

  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;

  return (
    <group scale={scale} ref={lavaRef} position={[x * distanceFromSun, 0, z * distanceFromSun]} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.DefaultMaterial}
      />
    </group>
  );
};

export default LavaPlanet;

useGLTF.preload('/assets/models/lavaPlanet/scene.glb');
