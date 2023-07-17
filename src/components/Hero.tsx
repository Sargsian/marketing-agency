import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scenes from "src/scenes";
import { useControls } from "leva";
import { Leva } from "leva";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const Hero = () => {
  const { t } = useTranslation("header");
  const [pauseRotation, setPauseRotation] = useState(true);

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
        // hidden
      />
      <div className="relative h-screen bg-cover bg-center">
        <Canvas
          shadows
          camera={{ fov: 45, near: 1, far: 1000, position: [32, 17, 85] }}
        >
          <Scenes pause={pauseRotation} />
        </Canvas>
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

export default Hero;
