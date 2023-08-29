import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    Planet: THREE.MeshStandardMaterial;
    Clouds: THREE.MeshStandardMaterial;
  };
};

const Meshes = ({ url }: { url: string }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;

  return (
    <>
      <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Clouds}
        scale={1.025}
      />
    </>
  );
};

export default Meshes;
