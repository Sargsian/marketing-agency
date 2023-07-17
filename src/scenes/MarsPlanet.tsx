import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import type { Group } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["4_mars_mars_shader_0"]: THREE.Mesh;
  };
  materials: {
    mars_shader: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "4. mars|7. saturn.001Action.002"
  | "4. mars|ringsAction"
  | "4. mars|saturn_ringAction"
  | "4. mars|spatial cameraAction"
  | "4. mars|SphereAction"
  | "4. mars|SphereAction.002"
  | "4. mars|uranus|Take 001|BaseLayer"
  | "4. mars|venusAction"
  | "4. mars|venusAction.001"
  | "4. mars|venusAction.002"
  | "4. mars|venusAction.003"
  | "4. mars|venusAction.004"
  | "4. mars|venusAction.005"
  | "4. mars|venusAction.008";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const MarsPlanet = ({ pause }: { pause: boolean }) => {
  const { offset, scale, distanceFromSun, speed } = useControls("Mars Planet", {
    offset: { value: 3.14, min: 0, max: Math.PI * 2, step: 0.01 },
    scale: { value: 0, min: 0, max: 20, step: 0.01 },
    distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
    speed: { value: 0.62, min: 0.01, max: 1, step: 0.005 },
  });

  const marsRef = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/marsPlanet/scene.glb"
  ) as GLTFResult;

  const clockRef = useRef(new THREE.Clock());

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!marsRef.current) return;
    marsRef.current.rotation.y -= 0.002;
    if (pause) return;
    marsRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
    marsRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
  });

  // const { actions } = useAnimations<GLTFActions>(animations, marsRef);

  return (
    <group
      ref={marsRef}
      position={[
        distanceFromSun * x * Math.sin(offset),
        0,
        distanceFromSun * z * Math.cos(offset),
      ]}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group name="RootNode" scale={0.01}>
          <group
            name="4_mars"
            rotation={[-Math.PI / 2, -0.436, 0]}
            scale={300 + scale * 300}
          >
            <mesh
              name="4_mars_mars_shader_0"
              geometry={nodes["4_mars_mars_shader_0"].geometry}
              material={materials.mars_shader}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default MarsPlanet;

useGLTF.preload("/assets/models/marsPlanet/scene.glb");
