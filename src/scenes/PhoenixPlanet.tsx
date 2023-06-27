import { Group } from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Phoenix_LOD0__0: THREE.Mesh;
  };
  materials: {
    ['Scene_-_Root']: THREE.MeshStandardMaterial;
  };
};

const PhoenixPlanet = ({ distanceFromSun }: { distanceFromSun: number }) => {
  const phoenixRef = useRef<Group>(null);

  const { offset, scale } = useControls('Phoenix Planet',{
    offset: 4.18,
    scale: 2.54,
  });

  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;

  useFrame(() => {
    if (!phoenixRef.current) return;
    phoenixRef.current.rotation.y -= 0.002;
  });
  const { nodes, materials } = useGLTF(
    '/assets/models/phoenixPlanet/scene.glb'
  ) as GLTFResult;
  return (
    <group scale={scale} ref={phoenixRef} position={[x * distanceFromSun, 0, z * distanceFromSun]} dispose={null}>
      <mesh
        geometry={nodes.Phoenix_LOD0__0.geometry}
        material={materials['Scene_-_Root']}
        position={[0, 1.735, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.078}
      />
    </group>
  );
};

export default PhoenixPlanet;

useGLTF.preload('/assets/models/phoenixPlanet/scene.glb');
