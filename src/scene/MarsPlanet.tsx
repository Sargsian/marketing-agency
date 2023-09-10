import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useOffset } from "src/hooks/useOffset";

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
  pause,
}: {
  pause: boolean;
}) => {
  const marsRef = useRef<Group>(null);

  const animationTime = useOffset(pause);

  const offset = 0;
  const scale = 3.73;
  const distanceFromSun = 7.5;
  const speed = 0.24;

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!marsRef.current) return;
    marsRef.current.rotation.y -= 0.003;

    if (pause) return;

    marsRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    marsRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  const { nodes, materials } = useGLTF(
    "/assets/models/marsPlanet/scene-transformed.glb"
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

useGLTF.preload("/assets/models/marsPlanet/scene-transformed.glb");
