import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";

type GLTFResult = GLTF & {
  nodes: {
    ["4_mars_mars_shader_0"]: THREE.Mesh;
    ["4_mars_mars_shader_0_1"]: THREE.Mesh;
  };
  materials: {
    mars_shader: THREE.MeshStandardMaterial;
  };
};

const MarsPlanet = ({
  rotationSpeed,
  animationTime,
}: {
  rotationSpeed: number;
  animationTime: () => number;
}) => {
  const marsRef = useRef<Group>(null);

  const { preview, pause, companyIsChosen } = useScene();

  const { offset, scale, distanceFromSun, speed } = useControls("Mars Planet", {
    offset: {
      value: 1.2,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
    },
    scale: { value: 2.8, min: 0, max: 20, step: 0.01 },
    distanceFromSun: { value: 4.8, min: 1, max: 10, step: 0.1 },
    speed: { value: 1 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
  });

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!marsRef.current) return;
    marsRef.current.rotation.y -= 0.003;

    if (pause) {
      return;
    }
    marsRef.current.position.x =
      Math.sin(animationTime() * (speed / 4) + offset) * x * distanceFromSun;

    marsRef.current.position.z =
      Math.cos(animationTime() * (speed / 4) + offset) * x * distanceFromSun;
  });

  const { nodes, materials } = useGLTF(
    "/assets/models/marsPlanet/scene3.glb"
  ) as GLTFResult;

  return (
    <group
      ref={marsRef}
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      dispose={null}
      name="Sketchfab_Scene"
    >
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
        <group
          name="656dac23814e461180cce73bdfc761ecfbx"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01 + scale * 0.01}
        >
          <group name="Object_2">
            <group name="RootNode">
              <group
                name="4_mars"
                rotation={[-Math.PI / 2, -0.436, 0]}
                scale={140}
              >
                <mesh
                  name="4_mars_mars_shader_0"
                  geometry={nodes["4_mars_mars_shader_0"].geometry}
                  material={materials.mars_shader}
                />
                <mesh
                  name="4_mars_mars_shader_0_1"
                  geometry={nodes["4_mars_mars_shader_0_1"].geometry}
                  material={materials.mars_shader}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default MarsPlanet;

useGLTF.preload("/assets/models/marsPlanet/scene4.glb");
