import {
  CameraControls,
  Environment,
  PerformanceMonitor,
  Sparkles,
  useEnvironment,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { RefObject, Suspense, use, useEffect, useRef, useState } from "react";
import { type Group } from "three";
import { Perf } from "r3f-perf";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import AlienPlanet from "src/scene/AlienPlanet";
import LavaPlanet from "src/scene/LavaPlanet";
import PinkyPlanet from "src/scene/PinkyPlanet";
import AnimatedStars from "src/scene/AnimatedStars";
import Sun from "src/scene/Sun";
import * as THREE from "three";
import MarsPlanet from "src/scene/MarsPlanet";
import { useControls } from "leva";
import { useScene, useSceneDispatch } from "src/store/SceneContext";
import { useRouter } from "next/router";
import JupiterPlanet from "src/scene/JupiterPlanet";
import TerraformedPlanet from "src/scene/TerraformedPlanet";
import KeplerPlanet from "src/scene/KeplerPlanet";
import PlanetHtml from "src/components/Scene/PlanetHtml";
import { useOffset } from "src/hooks/useOffset";

const Scene = () => {
  const router = useRouter();
  const dispatch = useSceneDispatch();
  const { scroll, companyIsChosen } = useScene();
  const { loaded, active } = useProgress();
  const [enableCamera, setEnableCamera] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const envMap = useEnvironment({ files: "/assets/models/galaxy2.hdr" });
  const [selectedPlanet, setSelectedPlanet] = useState("");

  const [currentPlanet, setCurrentPlanet] = useState<THREE.Object3D | null>(
    null
  );

  const [pause, setPause] = useState(false);

  const animationTime = useOffset(pause);

  const clockRef = useRef(new THREE.Clock());
  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<CameraControls>(null);
  const alienRef = useRef<Group>(null);
  const lavaRef = useRef<Group>(null);
  const terraformedRef = useRef<Group>(null);

  const sun = new THREE.Vector3(0, 0, 0);
  const vec = new THREE.Vector3();

  const userInteraction = (interaction: "enable" | "disable") => {
    if (!cameraRef.current) return;
    // if (interaction === "disable") {
    //   cameraRef.current.mouseButtons.left = 0;
    //   cameraRef.current.mouseButtons.wheel = 0;
    //   cameraRef.current.mouseButtons.middle = 0;
    //   cameraRef.current.touches
    //   cameraRef.current.touches.one = 0;
    //   cameraRef.current.touches.two = 0;
    //   cameraRef.current.touches.three = 0;
    // } else if (interaction === "enable") {
    //   cameraRef.current.mouseButtons.left = 1;
    //   cameraRef.current.mouseButtons.wheel = 8;
    //   cameraRef.current.mouseButtons.middle = 8;
    //   cameraRef.current.touches.one = 32;
    //   // cameraRef.current.touches.two = 1;
    //   // cameraRef.current.touches.three = 471;
    // }
  };

  useEffect(() => {
    if (!cameraRef.current) return;
    // cameraRef.current.touches.two = 256
  }, []);

  const handleRoute = (route: "tiktok" | "bigo" | "meta") => {
    userInteraction("disable");
    dispatch({
      type: "companyIsChosen",
      payload: { companyIsChosen: true },
    }),
      void router.push(`/${route}`);
  };

  console.log("rerender");

  useFrame(() => {
    if (!groupRef.current) return;
    if (pause) return;
    groupRef.current.rotation.y = animationTime() / 14;
  });

  // const handleRotate = (e: ThreeEvent<MouseEvent>) => {
  //   if (
  //     !e.object.parent ||
  //     !enableCamera ||
  //     !cameraRef.current ||
  //     scroll ||
  //     true
  //   )
  //   dispatch({ type: "pause", payload: { pause: true } });
  //   e.stopPropagation();

  //   const planetAngle = Math.atan2(
  //     +e.object.parent.getWorldPosition(vec).x,
  //     +e.object.parent.getWorldPosition(vec).z
  //   );

  //   const distanceToSun =
  //     e.object.parent.getWorldPosition(vec).distanceTo(sun) + 40;
  //   setCurrentPlanet(e.object.parent);

  //   void cameraRef.current?.rotatePolarTo(Math.PI / 2.02, true);
  //   void cameraRef.current?.dollyTo(distanceToSun, true);

  //   const angle = planetAngle - cameraRef.current.azimuthAngle;
  //   const absoluteAngle =
  //     THREE.MathUtils.euclideanModulo(angle + Math.PI, Math.PI * 2) - Math.PI;

  //   void cameraRef.current?.rotateAzimuthTo(
  //     cameraRef.current.azimuthAngle + absoluteAngle,
  //     true
  //   );
  //   dispatch({ type: "preview", payload: { preview: true } });
  // };

  const panToPlanet = (planetRef: RefObject<Group>) => {
    if (!planetRef.current || !cameraRef.current) return;
    // dispatch({ type: "pause", payload: { pause: true } });
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
    cameraRef.current.addEventListener("rest", () =>
      dispatch({ type: "preview", payload: { preview: true } })
    );

    userInteraction("disable");
    // cameraRef.current.addEventListener(
    //   "rest",
    //   () => (
    dispatch({ type: "scroll", payload: { scroll: true } }),
      dispatch({ type: "preview", payload: { preview: false } }),
      dispatch({
        type: "companyIsChosen",
        payload: { companyIsChosen: true },
      });
  };

  useEffect(() => {
    if (active || !cameraRef.current || !isFirstRender) return;
    cameraRef.current.mouseButtons.right = 0;
    console.log(cameraRef.current.touches.one, "one");
    console.log(cameraRef.current.touches.two, "two");
    console.log(cameraRef.current.touches.three, "three");

    setTimeout(() => {
      void cameraRef.current?.rotatePolarTo(Math.PI / 2.4, true);
      void cameraRef.current?.rotateAzimuthTo(Math.PI, true);
      void cameraRef.current?.dollyTo(200, true);
      setIsFirstRender(false);
    }, 500);
  }, [active, dispatch, isFirstRender]);

  // useEffect(() => {
  //   if (currentPlanet && companyIsChosen && cameraRef.current) {
  //     const distanceToSun =
  //       currentPlanet.getWorldPosition(vec).distanceTo(sun) + 15;
  //     void cameraRef.current?.rotatePolarTo(Math.PI / 2.05, true);
  //     void cameraRef.current?.dollyTo(distanceToSun, true);

  //     cameraRef.current?.addEventListener("rest", () =>
  //       dispatch({ type: "scroll", payload: { scroll: true } })
  //     );
  //   }
  // }, [companyIsChosen]);

  // Planets revolving around the sun relationship is as follows: x, 1.34x, 2.48x, 3.07x, 3.61x, 4.94x
  // Programmatically rotate camera on page change by forwarding planet refs

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
      userInteraction("enable");
      dispatch({ type: "preview", payload: { preview: false } });
      dispatch({
        type: "companyIsChosen",
        payload: { companyIsChosen: false },
      });
      const distanceToSun =
        alienRef.current.getWorldPosition(vec).distanceTo(sun) + 80;
      void cameraRef.current.dollyTo(distanceToSun, true);
      void cameraRef.current?.rotatePolarTo(Math.PI / 2.1, true);

      setTimeout(() => {
        // dispatch({ type: "pause", payload: { pause: false } });
        setPause(false);
      }, 500);
    }
    // }, 2000);
  }, [router.pathname, loaded, isFirstRender]);

  return (
    <>
      {/* <Perf /> */}
      <CameraControls
        enabled={enableCamera}
        polarAngle={Math.PI * 2}
        maxDistance={5000}
        touches={{ one: 32, two: 256, three: 64 }}
        distance={5000}
        ref={cameraRef}
      />

      <directionalLight castShadow intensity={1} />

      <Environment background map={envMap} />

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
          {/* <ambientLight intensity={0.5} /> */}
          <AlienPlanet
            onClick={() => handleRoute("tiktok")}
            ref={alienRef}
            rotationSpeed={router.pathname === "/tiktok" ? 0.2 : 1}
          />
          <MarsPlanet rotationSpeed={0.3} />
          <LavaPlanet
            onClick={() => handleRoute("bigo")}
            ref={lavaRef}
            rotationSpeed={router.pathname === "/bigo" ? 0.2 : 1}
          />
          {/* <KeplerPlanet pause={pause} /> */}
          <TerraformedPlanet
            rotationSpeed={router.pathname === "/meta" ? 0.2 : 1}
            ref={terraformedRef}
            onClick={() => handleRoute("meta")}
          />
          <JupiterPlanet rotationSpeed={0.3} />
          {/* <PinkyPlanet rotationSpeed={0.3} /> */}
        </group>
      </group>
    </>
  );
};

export default Scene;

useTexture.preload("/assets/models/galaxy2.hdr");
