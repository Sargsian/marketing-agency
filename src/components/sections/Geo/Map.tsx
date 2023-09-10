import { Canvas, useFrame } from "@react-three/fiber";
import Image from "next/image";
import { Suspense } from "react";
import * as THREE from "three";
import React, { useRef } from "react";
import { Environment, useEnvironment, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import SceneEnvironment from "src/scene/SceneEnvironment";

type GLTFResult = GLTF & {
  nodes: {
    Sphere_Material001_0: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshPhysicalMaterial;
  };
};

const Map = () => {
  return (
    <div className="relative flex aspect-square w-full max-w-[min(785px,80%)] items-center justify-center overflow-hidden rounded-[10px] border border-white border-opacity-50 ">
      {/* <div>
        <Image
          src="/assets/images/map2.png"
          // width={1920}
          // height={473}
          fill
          style={{ objectFit: "cover" }}
          alt="map"
          className="loop brightness-200"
        />
      </div> */}
      <Suspense fallback={null}>
        <Canvas camera={{ fov: 45, position: [0, 0, 285] }}>
          <Suspense fallback={null}>
            <SceneEnvironment />
          </Suspense>
          <ambientLight intensity={5} />
          <pointLight color="white" intensity={10} position={[100, 100, 100]} />
          <directionalLight castShadow intensity={10} />
          <Earth />
        </Canvas>
      </Suspense>
    </div>
  );
};

useGLTF.preload("/assets/models/earth/earth.glb");
export default Map;

const Earth = () => {
  const { nodes, materials } = useGLTF(
    "/assets/models/earth/earth.glb"
  ) as GLTFResult;

  const earthRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!earthRef.current) return;
    earthRef.current.rotation.y -= 0.003;
  });

  return (
    <>
      <group ref={earthRef} dispose={null}>
        <group scale={0.5}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material001_0.geometry}
            material={materials["Material.001"]}
            rotation={[-Math.PI / 2, 0, -0.262]}
            scale={100}
          />
        </group>
      </group>
    </>
  );
};
