import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial;
  };
};

const Meshes = ({ url }: { url: string }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;

  return (
    <mesh
      geometry={nodes.defaultMaterial.geometry}
      material={materials.DefaultMaterial}
    />
  );
};

export default Meshes;
