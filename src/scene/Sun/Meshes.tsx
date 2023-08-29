import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

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

const Meshes = ({ url, scale }: { url: string; scale: number }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;
  return (
    <>
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
    </>
  );
};

export default Meshes;
