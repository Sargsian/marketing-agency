import type { Group } from "three";
import { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import Meshes from "./Meshes";

const Sun = () => {
  const sunRef = useRef<Group>(null);

  const { scale } = useControls("Sun", {
    scale: 0.08,
  });

  // A failed attempt to solve the lag issue on hover

  useFrame(() => {
    if (!sunRef.current) return;
    sunRef.current.rotation.y += 0.0007;
  });
  return (
    <group
      position={[0, 0, 0]}
      onClick={(e) => e.stopPropagation()}
      onPointerOver={(e) => e.stopPropagation()}
      ref={sunRef}
      dispose={null}
    >
      <Suspense
        fallback={
          <Meshes scale={scale} url="/assets/models/sun/scene-low.glb" />
        }
      >
        <Meshes scale={scale} url="/assets/models/sun/scene.glb" />
      </Suspense>

      <pointLight castShadow intensity={1} />
    </group>
  );
};

export default Sun;

useGLTF.preload("/assets/models/sun/scene-low.glb");
