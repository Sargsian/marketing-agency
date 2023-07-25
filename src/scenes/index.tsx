import { CameraControls, useEnvironment, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { type Group } from "three";
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
import { useSpring, animated, config } from "@react-spring/three";
import { useControls } from "leva";

const Scenes = ({ pause }: { pause: boolean }) => {
  const envMap = useEnvironment({ files: "/assets/models/galaxy2.hdr" });
  const [posY, setPosY] = useState(0);
  const [enableCamera, setEnableCamera] = useState(true);

  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<CameraControls>(null);

  const vec = new THREE.Vector3();

  const [{ rotation }, api] = useSpring(() => ({
    onRest: () => (setEnableCamera(true), console.log("animated")),
    from: { rotation: 0 },
    config: { tension: 80, friction: 20, precision: 0.0001 },
    // config: {...config.wobbly, precision: 0.0001},
  }));

  const { active } = useProgress();

  const handleRotate = (e: ThreeEvent<MouseEvent>) => {
    if (!e.object.parent || !enableCamera) return;

    const cameraAngle = Math.atan2(
      +e.camera?.position.x,
      +e.camera?.position.z
    );

    const planetAngle = Math.atan2(
      +e.object.parent.getWorldPosition(vec).x,
      +e.object.parent.getWorldPosition(vec).z
    );

    const sun = new THREE.Vector3(0, 0, 0);
    const distanceToSun =
      e.object.parent.getWorldPosition(vec).distanceTo(sun) + 40;

    void cameraRef.current?.rotatePolarTo(Math.PI / 2.1, true);
    void cameraRef.current?.dollyTo(distanceToSun, true);

    void cameraRef.current?.rotateAzimuthTo(planetAngle, true);
    // return;
    if (cameraAngle - planetAngle < -Math.PI) {
      const rotateAngle = cameraAngle - planetAngle + 2 * Math.PI;
      // api.start({
      //   to: {
      //     rotation: rotateAngle + posY,
      //   },
      // });
      setPosY(rotateAngle + posY);
    } else if (cameraAngle - planetAngle > Math.PI) {
      const rotateAngle = cameraAngle - planetAngle - 2 * Math.PI;
      // api.start({
        //   to: {
          //     rotation: rotateAngle + posY,
          //   },
          // });
          
          setPosY(rotateAngle + posY);
        } else {
          // api.start({
          //   to: {
          //     rotation: cameraAngle - planetAngle + posY,
          //   },
          // });
      setPosY(cameraAngle - planetAngle + posY);
    }
    // setEnableCamera(false);
  };

  useEffect(() => {
    if (active) return;
    console.log(cameraRef, "cameraRef");
    setTimeout(() => {
      void cameraRef.current?.rotatePolarTo(Math.PI / 2.4, true);
      void cameraRef.current?.rotateAzimuthTo(Math.PI, true);
      void cameraRef.current?.dollyTo(200, true);
    }, 100);
  }, [active]);

  useFrame(() => {
    if (!groupRef.current) return;
    // Axis rotation
    // groupRef.current.rotation.y += 0.012;
  });

  // Planets revolving around the sun relationship is as follows: x, 1.34x, 2.48x, 3.07x, 3.61x, 4.94x

  return (
    <>
      {/* <Perf /> */}
      <CameraControls
        enabled={enableCamera}
        minDistance={20}
        polarAngle={Math.PI * 2}
        maxDistance={250}
        distance={5000}
        minZoom={0}
        maxZoom={3}
        ref={cameraRef}
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
          {/* <ambientLight intensity={2} /> */}
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
