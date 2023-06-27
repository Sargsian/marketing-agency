import {
  Environment,
  Lightformer,
  useEnvironment,
  useHelper,
} from "@react-three/drei";
import { ReactNode, useRef } from "react";
import { Group } from "three";
import { Perf } from "r3f-perf";

import { useFrame } from "@react-three/fiber";
import AlienPlanet from "src/scenes/AlienPlanet";
import LavaPlanet from "src/scenes/LavaPlanet";
import PhoenixPlanet from "src/scenes/PhoenixPlanet";
import PinkyPlanet from "src/scenes/PinkyPlanet";
import BrownPlanet from "src/scenes/BrownPlanet";
import AnimatedStars from "src/scenes/AnimatedStars";
import Sun from "src/scenes/Sun";
import MarsPlanet from "src/scenes/MarsPlanet";
import { useControls } from "leva";

const planets = [
  AlienPlanet,
  LavaPlanet,
  PhoenixPlanet,
  PinkyPlanet,
  BrownPlanet,
  MarsPlanet,
];


const Scenes = () => {
  const envMap = useEnvironment({ files: "/assets/models/galaxy2.hdr" });
  const groupRef = useRef<Group>(null);

  const { distanceFromSun } = useControls({
    distanceFromSun: 4,
  });

 

  useFrame(() => {
    if (!groupRef.current) return;
    // Axis rotation
    // groupRef.current.rotation.y += 0.012;
  });

  return (
    <>
      {/* <Perf /> */}
      <AnimatedStars />
      <Environment background map={envMap} />

      <Sun />
      <group ref={groupRef}>
        <AlienPlanet distanceFromSun={distanceFromSun} />
        <PinkyPlanet distanceFromSun={distanceFromSun}/>
        <BrownPlanet distanceFromSun={distanceFromSun}  />
        <LavaPlanet distanceFromSun={distanceFromSun}  />
        <MarsPlanet distanceFromSun={distanceFromSun}  />
        <PhoenixPlanet distanceFromSun={distanceFromSun} />
        {/* {planets.map((Planet, i) => (
          <group key={i}>
            <Planet distanceFromSun={4} offset={(i + 1) * 20} />
          </group>
        ))} */}
      </group>
    </>
  );
};

export default Scenes;
