import {
  CameraControls,
  PerformanceMonitor,
  Sparkles,
  useProgress,
} from "@react-three/drei";
import { type RefObject, useEffect, useRef, useState } from "react";
import { type Group } from "three";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import AlienPlanet from "src/scene/AlienPlanet";
import LavaPlanet from "src/scene/LavaPlanet";
import AnimatedStars from "src/scene/AnimatedStars";
import Sun from "src/scene/Sun";
import * as THREE from "three";
import MarsPlanet from "src/scene/MarsPlanet";
import { useSceneDispatch } from "src/store/SceneContext";
import { useRouter } from "next/router";
import JupiterPlanet from "src/scene/JupiterPlanet";
import TerraformedPlanet from "src/scene/TerraformedPlanet";
import { useOffset } from "src/hooks/useOffset";
import SceneEnvironment from "src/scene/SceneEnvironment";

const Scene = () => {
  const router = useRouter();
  const dispatch = useSceneDispatch();
  const { loaded, active } = useProgress();
  const [isFirstRender, setIsFirstRender] = useState(true);

  console.log("loaded: ", loaded, "active: ", active);

  const [pause, setPause] = useState(false);

  const animationTime = useOffset(pause);

  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<CameraControls>(null);
  const alienRef = useRef<Group>(null);
  const lavaRef = useRef<Group>(null);
  const terraformedRef = useRef<Group>(null);

  const sun = new THREE.Vector3(0, 0, 0);
  const vec = new THREE.Vector3();

  const handleRoute = (route: "tiktok" | "bigo" | "meta") => {
    dispatch({
      type: "companyIsChosen",
      payload: { companyIsChosen: true },
    }),
      void router.push(`/${route}`);
  };

  console.log("rerender", pause);

  useFrame(() => {
    if (!groupRef.current) return;
    if (pause) return;
    groupRef.current.rotation.y = animationTime() / 14;
  });

  const panToPlanet = (planetRef: RefObject<Group>) => {
    if (!planetRef.current || !cameraRef.current) return;
    setPause(true);
    cameraRef.current.removeAllEventListeners();
    const planetAngle = Math.atan2(
      planetRef.current.getWorldPosition(vec).x,
      planetRef.current.getWorldPosition(vec).z
    );

    const distanceToSun =
      planetRef.current.getWorldPosition(vec).distanceTo(sun) + 15;

    void cameraRef.current?.rotatePolarTo(Math.PI / 2.05, true);
    void cameraRef.current?.dollyTo(distanceToSun, true);
    const angle = planetAngle - cameraRef.current.azimuthAngle;
    const absoluteAngle =
      THREE.MathUtils.euclideanModulo(angle + Math.PI, Math.PI * 2) - Math.PI;
    void cameraRef.current?.rotateAzimuthTo(
      cameraRef.current.azimuthAngle + absoluteAngle,
      true
    );

    dispatch({ type: "scroll", payload: { scroll: true } }),
      dispatch({
        type: "companyIsChosen",
        payload: { companyIsChosen: true },
      });
  };

  useEffect(() => {
    if (!cameraRef.current || !isFirstRender) return;
    cameraRef.current.mouseButtons.right = 0;

    setTimeout(() => {
      void cameraRef.current?.rotatePolarTo(Math.PI / 2.4, true);
      void cameraRef.current?.rotateAzimuthTo(Math.PI, true);
      void cameraRef.current?.dollyTo(200, true);
      setIsFirstRender(false);
    }, 500);
  }, [dispatch, isFirstRender]);

  useEffect(() => {
    if (!loaded) return;
    if (!alienRef.current || !cameraRef.current || isFirstRender) return;
    if (router.pathname === "/tiktok") {
      panToPlanet(alienRef);
    } else if (router.pathname === "/bigo") {
      panToPlanet(lavaRef);
    } else if (router.pathname === "/meta") {
      panToPlanet(terraformedRef);
    } else if (router.pathname === "/") {
      cameraRef.current.removeAllEventListeners();
      dispatch({ type: "scroll", payload: { scroll: false } });
      dispatch({
        type: "companyIsChosen",
        payload: { companyIsChosen: false },
      });
      const distanceToSun =
        alienRef.current.getWorldPosition(vec).distanceTo(sun) + 80;
      void cameraRef.current.dollyTo(distanceToSun, true);
      void cameraRef.current?.rotatePolarTo(Math.PI / 2.1, true);
      setPause(false);
    }
  }, [router.pathname, loaded, isFirstRender]);

  return (
    <>
      {/* <Perf /> */}
      <CameraControls
        polarAngle={Math.PI * 2}
        maxDistance={5000}
        touches={{ one: 32, two: 256, three: 64 }}
        distance={5000}
        ref={cameraRef}
      />

      <directionalLight castShadow intensity={1} />
      <SceneEnvironment />

      <group>
        <AnimatedStars />
        <Sparkles
          count={3010}
          opacity={0.1}
          scale={1224 * 5}
          size={4426}
          speed={10.4}
        />
        <Sun />
        <group ref={groupRef}>
          <AlienPlanet
            pause={pause}
            onClick={() => handleRoute("tiktok")}
            ref={alienRef}
            rotationSpeed={router.pathname === "/tiktok" ? 0.2 : 1}
          />
          <MarsPlanet pause={pause} />
          <LavaPlanet
            pause={pause}
            onClick={() => handleRoute("bigo")}
            ref={lavaRef}
            rotationSpeed={router.pathname === "/bigo" ? 0.2 : 1}
          />
          <TerraformedPlanet
            pause={pause}
            rotationSpeed={router.pathname === "/meta" ? 0.2 : 1}
            ref={terraformedRef}
            onClick={() => handleRoute("meta")}
          />
          <JupiterPlanet pause={pause} />
        </group>
      </group>
    </>
  );
};

export default Scene;
