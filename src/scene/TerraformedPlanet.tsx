import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";

type GLTFResult = GLTF & {
  nodes: {
    Esfera_Mat_0: THREE.Mesh;
    Esfera_1_Mat1_0: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    ["Mat.1"]: THREE.MeshStandardMaterial;
  };
};

const TerraformedPlanet = ({
  rotationSpeed,
  animationTime,
}: {
  rotationSpeed: number;
  animationTime: () => number;
}) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/terraformedPlanet/scene.glb"
  ) as GLTFResult;

  const TerraformedRef = useRef<THREE.Group>(null);

  const { preview, pause, companyIsChosen } = useScene();

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Terraformed Planet",
    {
      offset: {
        value: 1.7,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0.8, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 3.0, min: 1, max: 10, step: 0.1 },
      speed: { value: 3.07 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!TerraformedRef.current) return;
    TerraformedRef.current.rotation.y -= 0.003;

    if (pause) {
      return;
    }
    TerraformedRef.current.position.x =
      Math.sin(animationTime() * (speed / 4) + offset) * x * distanceFromSun;

    TerraformedRef.current.position.z =
      Math.cos(animationTime() * (speed / 4) + offset) * x * distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      ref={TerraformedRef}
      dispose={null}
    >
      <mesh
        scale={0.004 + scale * 0.001}
        geometry={nodes.Esfera_Mat_0.geometry}
        material={materials.material}
        rotation={[Math.PI, 0.211, -Math.PI]}
      />
      <mesh
        scale={0.00405 + scale * 0.001}
        geometry={nodes.Esfera_1_Mat1_0.geometry}
        material={materials["Mat.1"]}
      />
    </group>
  );
};

useGLTF.preload("/assets/models/terraformedPlanet/scene.glb");

export default TerraformedPlanet;
