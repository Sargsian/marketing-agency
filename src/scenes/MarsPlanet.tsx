import { Group } from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    ['4_mars_mars_shader_0']: THREE.Mesh;
  };
  materials: {
    mars_shader: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | '4. mars|7. saturn.001Action.002'
  | '4. mars|ringsAction'
  | '4. mars|saturn_ringAction'
  | '4. mars|spatial cameraAction'
  | '4. mars|SphereAction'
  | '4. mars|SphereAction.002'
  | '4. mars|uranus|Take 001|BaseLayer'
  | '4. mars|venusAction'
  | '4. mars|venusAction.001'
  | '4. mars|venusAction.002'
  | '4. mars|venusAction.003'
  | '4. mars|venusAction.004'
  | '4. mars|venusAction.005'
  | '4. mars|venusAction.008';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const MarsPlanet = ({ distanceFromSun }: { distanceFromSun: number }) => {

  const { offset, scale } = useControls('Mars Planet',{
    offset: 3.14,
    scale: 1.69,
  });

  const marsRef = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/marsPlanet/scene.glb'
  ) as GLTFResult;

  const x = Math.sin(offset) * 20;
  const z = Math.cos(offset) * 20;

  useFrame(() => {
    if (!marsRef.current) return;
    marsRef.current.rotation.y -= 0.002;
  });

  // const { actions } = useAnimations<GLTFActions>(animations, marsRef);
  return (
    <group ref={marsRef} position={[x * distanceFromSun, 0, z * distanceFromSun]} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='RootNode' scale={0.01}>
          <group
            name='4_mars'
            rotation={[-Math.PI / 2, -0.436, 0]}
            scale={scale * 300}
          >
            <mesh
              name='4_mars_mars_shader_0'
              geometry={nodes['4_mars_mars_shader_0'].geometry}
              material={materials.mars_shader}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default MarsPlanet;

useGLTF.preload('/assets/models/marsPlanet/scene.glb');
