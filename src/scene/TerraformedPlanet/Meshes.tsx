import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

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

const Meshes = ({ url, scale }: { url: string; scale: number }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;
  
  return (
    <>
      <mesh
        receiveShadow
        scale={0.004 + scale * 0.001}
        geometry={nodes.Esfera_Mat_0.geometry}
        material={materials.material}
        rotation={[Math.PI, 0.211, -Math.PI]}
      />
      <mesh
        receiveShadow
        scale={0.00405 + scale * 0.001}
        geometry={nodes.Esfera_1_Mat1_0.geometry}
        material={materials["Mat.1"]}
      />
    </>
  );
};

export default Meshes;
