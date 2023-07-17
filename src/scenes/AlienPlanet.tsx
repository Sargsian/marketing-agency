import * as THREE from "three";
import { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import type { Group } from "three";
import { useControls } from "leva";
import { useRouter } from "next/router";

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

const AlienPlanet = ({ pause }: { pause: boolean }) => {
  const { nodes, materials } = useGLTF(
    "/assets/models/alienPlanet/scene.glb"
  ) as GLTFResult;
  const router = useRouter();
  const [active, setActive] = useState(false);

  const alienRef = useRef<Group>(null);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Alien Planet",
    {
      offset: {
        value: 0,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 0, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 4, min: 1, max: 10, step: 0.1 },
      speed: { value: 1.235, min: 0.01, max: 1.3, step: 0.005 },
    }
  );

  const clockRef = useRef(new THREE.Clock());

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!alienRef.current) return;
    alienRef.current.rotation.y -= 0.003;

    if (pause) {
      return;
    }
    alienRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;

    alienRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * speed + offset) *
      x *
      distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      scale={5 + scale}
      onClick={() => setActive(true)}
      ref={alienRef}
      dispose={null}
    >
      {active && (
        <Html distanceFactor={40} center as="div" className="h-20 bg-red-300">
          <span className="group absolute bottom-16 right-16 inline-block h-[8px] w-[8px] rounded-full outline outline-1 outline-offset-1 outline-[#ffffff77] before:absolute before:left-1/2 before:top-1/2 before:h-[6px] before:w-[6px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:delay-100 hover:before:h-[10px] before:hover:w-[10px]">
            <span className="absolute right-1 top-1/4 h-[1px] w-[100px] origin-right rotate-[32deg] rounded bg-white opacity-0 delay-300 group-hover:opacity-100">
              <span
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => router.push("/tiktok")}
                className="absolute bottom-[-24px] right-[100%] inline-block h-5 min-w-[100px] -rotate-[32deg] font-jetbrains text-sm font-medium tracking-[-1.4px] hover:cursor-pointer"
              >
                TikTok Planet
                <span className="absolute bottom-[-5px] left-[1px] h-[1px] w-[calc(100%)] cursor-auto rounded bg-white"></span>
              </span>
            </span>
          </span>
        </Html>
      )}
      <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Clouds}
        scale={1.025}
      />
    </group>
  );
};
export default AlienPlanet;

useGLTF.preload("/assets/models/alienPlanet/scene.glb");
