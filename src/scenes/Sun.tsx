import type { Group } from "three";
import { useRef, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Planeta009_09Sun_0: THREE.Mesh;
    ["Nubes001_09Nubes-atmosfera_-_Sun_0"]: THREE.Mesh;
  };
  materials: {
    ["09.Sun"]: THREE.MeshStandardMaterial;
    ["09.Nubes-atmosfera_-_Sun"]: THREE.MeshStandardMaterial;
  };
};

const Sun = () => {
  const sunRef = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    "/assets/models/sun/scene.glb"
  ) as GLTFResult;

  const { scale } = useControls("Sun", {
    scale: 0.08,
  });

  // A failed attempt to solve the lag issue on hover
  const rotateSun = useCallback(() => {
    if (!sunRef.current) return;
    sunRef.current.rotation.y -= 0.0007;
  }, []);

  useFrame(() => rotateSun());
  return (
    <group position={[0, 0, 0]} ref={sunRef} dispose={null}>
      <mesh
        geometry={nodes.Planeta009_09Sun_0.geometry}
        material={materials["09.Sun"]}
        rotation={[-2.083, 0.146, 0.212]}
        scale={scale}
      />
      <mesh
        geometry={nodes["Nubes001_09Nubes-atmosfera_-_Sun_0"].geometry}
        material={materials["09.Nubes-atmosfera_-_Sun"]}
        rotation={[-2.088, 0.384, -0.177]}
        scale={scale}
      >
        {/* <pointLight castShadow color={'#FAFC8A'} intensity={5} /> */}
      </mesh>

      {/* <primitive
        ref={sunRef}
        object={sunModel.scene}
        emmissiveMap={sunTexture}
        scale={0.5}
      /> */}
      <pointLight castShadow intensity={1.5} />
    </group>
  );
};

export default Sun;

useGLTF.preload("/assets/models/sun/scene.glb");
