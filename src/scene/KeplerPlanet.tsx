import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useOffset } from "src/hooks/useOffset";

const KeplerPlanet = ({
  pause,
  rotationSpeed,
  animationTime,
}: {
  pause: boolean;
  rotationSpeed: number;
  animationTime: () => number;
}) => {
  const props = useTexture({
    clouds: "/assets/models/keplerPlanet/clouds.png",
    atmos: "/assets/models/keplerPlanet/atmos.png",
    planet: "/assets/models/keplerPlanet/planet.png",
  });
  const keplerRef = useRef<THREE.Group>(null);

  const { offset, scale, distanceFromSun, speed } = useControls(
    "Kepler Planet",
    {
      offset: {
        value: 1.256,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      scale: { value: 5.27, min: 0, max: 20, step: 0.01 },
      distanceFromSun: { value: 1.8, min: 1, max: 10, step: 0.1 },
      speed: { value: 4.94 * rotationSpeed, min: 0.01, max: 10, step: 0.005 },
    }
  );

  const x = 20;
  const z = 20;

  useFrame(() => {
    if (!keplerRef.current) return;
    keplerRef.current.rotation.y -= 0.003;
  });

  return (
    <group
      ref={keplerRef}
      position={[
        Math.sin(offset) * distanceFromSun * x,
        0,
        Math.cos(offset) * distanceFromSun * z,
      ]}
    >
      <mesh scale={0.4 + scale * 0.1}>
        <sphereBufferGeometry args={[5, 240, 240]} />
        <meshPhongMaterial transparent map={props.atmos} />
      </mesh>
      <mesh scale={0.5 + scale * 0.1}>
        <sphereBufferGeometry args={[5, 240, 240]} />
        <meshStandardMaterial map={props.planet} />
      </mesh>
      <mesh scale={0.56 + scale * 0.1}>
        <sphereBufferGeometry args={[5, 240, 240]} />
        <meshPhongMaterial transparent map={props.clouds} />
      </mesh>
    </group>
  );
};

export default KeplerPlanet;
