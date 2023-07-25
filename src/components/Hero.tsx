import { OrbitControls, useProgress, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scenes from "src/scenes";
import { useControls } from "leva";
import { Leva } from "leva";
import { useTranslation } from "next-i18next";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Hero = ({
  setThreeIsLoaded,
}: {
  setThreeIsLoaded: (arg: boolean) => void;
}) => {
  const { t } = useTranslation("header");
  const [pauseRotation, setPauseRotation] = useState(true);
  const { active } = useProgress();


  const scroller = (element: HTMLElement) => {
    window.scrollTo({
      top: element.offsetTop - 60,
      behavior: "smooth",
    });
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scroller(el);
  };

  return (
    <>
      <Leva
        collapsed
        hidden
      />
      <div className="relative h-screen bg-cover bg-center">
        <Canvas
          shadows
          camera={{ fov: 45, near: 1, far: 5000, position: [0, 0, 185] }}
        >
          <Suspense fallback={null}>
            <Scenes pause={pauseRotation} />
          </Suspense>
        </Canvas>
        <Loader dataInterpolation={(span) => `Loading ${span.toFixed(0)}%`} />

        <button
          onClick={() => setPauseRotation((prevState) => !prevState)}
          className="absolute bottom-[100px] left-[100px] text-white"
        >
          {pauseRotation ? "play" : "pause"}
        </button>
        <button
          onClick={() => handleScroll("main-content")}
          className="absolute bottom-[144px] left-1/2 -translate-x-1/2 text-white opacity-60"
        >
          {t("scroll")}
        </button>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Hero), {
  ssr: false,
});
