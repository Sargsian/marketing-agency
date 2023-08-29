import { type RefObject, forwardRef, useState, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScene } from "src/store/SceneContext";
import { type Group } from "three";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";
import Meshes from "./Meshes";

const TerraformedPlanet = forwardRef(function TerraformedPlanet(
  {
    rotationSpeed,
    onClick,
    pause,
  }: {
    rotationSpeed: number;
    pause: boolean;
    onClick: () => void;
  },
  ref
) {
  const TerraformedRef = ref as RefObject<Group>;

  const [hovered, setHovered] = useState(false);

  const { companyIsChosen } = useScene();

  const animationTime = useOffset(pause);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Terraformed Planet",
    {
      offset: {
        value: 3,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 1.93, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 3.9, min: 1, max: 10, step: 0.1 },
      speed: { value: 1.3, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!TerraformedRef.current) return;
    TerraformedRef.current.rotation.y -= 0.003 * rotationSpeed;

    if (pause) return;

    TerraformedRef.current.position.x =
      Math.sin(animationTime() * (speed / 10) + offset) * x * distanceFromSun;

    TerraformedRef.current.position.z =
      Math.cos(animationTime() * (speed / 10) + offset) * x * distanceFromSun;
  });

  return (
    <group
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
      ref={TerraformedRef}
      onClick={() => onClick()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      {!companyIsChosen && (
        <PlanetHtml
          hovered={hovered}
          onClick={onClick}
          setHovered={setHovered}
          name="Meta"
        />
      )}
      <Suspense
        fallback={
          <Meshes
            scale={scale}
            url="/assets/models/terraformedPlanet/scene-low.glb"
          />
        }
      >
        <Meshes
          scale={scale}
          url="/assets/models/terraformedPlanet/scene.glb"
        />
      </Suspense>
    </group>
  );
});

useGLTF.preload("/assets/models/terraformedPlanet/scene-low.glb");

export default TerraformedPlanet;
