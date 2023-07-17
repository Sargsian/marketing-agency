import {
  Environment,
  OrbitControls,
  useEnvironment,
  useTexture,
} from "@react-three/drei";
import { RefObject, useEffect, useRef, useState } from "react";
import { Vector3, type Group } from "three";
import { Perf } from "r3f-perf";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import AlienPlanet from "src/scenes/AlienPlanet";
import LavaPlanet from "src/scenes/LavaPlanet";
import PhoenixPlanet from "src/scenes/PhoenixPlanet";
import PinkyPlanet from "src/scenes/PinkyPlanet";
import BrownPlanet from "src/scenes/BrownPlanet";
import AnimatedStars from "src/scenes/AnimatedStars";
import Sun from "src/scenes/Sun";
import * as THREE from "three";
import MarsPlanet from "src/scenes/MarsPlanet";
import {
  useSpring,
  animated,
  config,
  useSpringRef,
  useSpringValue,
} from "@react-spring/three";
import { useControls } from "leva";

const Scenes = ({ pause }: { pause: boolean }) => {
  const envMap = useEnvironment({ files: "/assets/models/galaxy2.hdr" });
  const groupRef = useRef<Group>(null);
  const [posY, setPosY] = useState(0);
  const [enableCamera, setEnableCamera] = useState(true);

  const vec = new THREE.Vector3();

  const [{ rotation }, api] = useSpring(() => ({
    onRest: () => (setEnableCamera(true), console.log("animation ended")),
    from: { rotation: 0 },
    config: { tension: 50, friction: 20, precision: 0.0001 },
  }));

  const handleRotate = (e: ThreeEvent<MouseEvent>) => {
    if (!e.object.parent || !enableCamera) return;

    setEnableCamera(false);

    const cameraAngle = Math.atan2(
      +e.camera?.position.x,
      +e.camera?.position.z
    );

    const planetAngle = Math.atan2(
      +e.object.parent.getWorldPosition(vec).x,
      +e.object.parent.getWorldPosition(vec).z
    );

    console.log(planetAngle, "planetAngle");
    console.log(cameraAngle, "cameraAngle");
    // return

    if (cameraAngle - planetAngle < -Math.PI) {
      console.log(-Math.PI, "minus PI");
      const rotateAngle = cameraAngle - planetAngle + 2 * Math.PI;
      api.start({
        to: {
          rotation: rotateAngle + posY,
        },
      });
      setPosY(rotateAngle + posY);
      return;
    } else if (cameraAngle - planetAngle > Math.PI) {
      console.log(-Math.PI, "minus PI");
      const rotateAngle = cameraAngle - planetAngle - 2 * Math.PI;
      api.start({
        to: {
          rotation: rotateAngle + posY,
        },
      });
      setPosY(rotateAngle + posY);
      return;
    }

    api.start({
      to: {
        rotation: cameraAngle - planetAngle + posY,
      },
    });

    setPosY(cameraAngle - planetAngle + posY);
  };

  useFrame(() => {
    if (!groupRef.current) return;
    // Axis rotation
    // groupRef.current.rotation.y += 0.012;
  });

  // Planets revolving around the sun relationship is as follows: x, 1.34x, 2.48x, 3.07x, 3.61x, 4.94x

  return (
    <>
      {/* <Perf /> */}
      <OrbitControls
        rotation={[0, posY, 0]}
        enableRotate
        enabled={enableCamera}
        minDistance={20}
        maxDistance={250}
        // makeDefault
        // maxPolarAngle={Math.PI / 2}
        // minPolarAngle={Math.PI / 2}
      />

      <animated.mesh rotation-y={rotation}>
        <sphereGeometry args={[600, 600, 600]} />
        <meshStandardMaterial side={THREE.BackSide} map={envMap} />
      </animated.mesh>
      <animated.group rotation-y={rotation}>
        <AnimatedStars />
        {/* <Environment background={"only"} map={envMap} /> */}
        <Sun />
        <group onClick={handleRotate} ref={groupRef}>
          <AlienPlanet pause={pause} />
          <BrownPlanet pause={pause} />
          <LavaPlanet pause={pause} />
          <MarsPlanet pause={pause} />
          <PhoenixPlanet pause={pause} />
          <PinkyPlanet pause={pause} />
        </group>
      </animated.group>
    </>
  );
};

export default Scenes;
