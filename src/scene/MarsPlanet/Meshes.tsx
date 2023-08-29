import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["4_mars_mars_shader_0"]: THREE.Mesh;
    ["4_mars_mars_shader_0_1"]: THREE.Mesh;
  };
  materials: {
    mars_shader: THREE.MeshStandardMaterial;
  };
};

const Meshes = ({ url }: { url: string }) => {
  const { nodes, materials } = useGLTF(url) as GLTFResult;
  return (
    <>
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
    </>
  );
};


useGLTF.preload("/assets/models/marsPlanet/scene-low.glb");

export default Meshes;
