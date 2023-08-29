import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mars: THREE.Mesh;
  };
  materials: {
    Mars: THREE.MeshStandardMaterial;
  };
};

const Meshes = ({ url }: { url: string }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;
  return (
    <mesh
      geometry={nodes.Mars.geometry}
      material={materials.Mars}
      scale={6.354}
    />
  );
};

export default Meshes;
