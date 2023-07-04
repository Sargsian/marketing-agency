import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scenes from "src/scenes";
import { useControls } from "leva";
import { ZodAny } from "zod";
import { Leva } from 'leva'
import { useTranslation } from "next-i18next";

const Hero = () => {
  const { t } = useTranslation("header");
  const scroller = (element: HTMLElement) => {
    window.scrollTo({
      top: element.offsetTop - 60,
      behavior: "smooth",
    });
  };

  const { x, y, z, fov } = useControls("Camera", {
    x: 32,
    y: 17,
    z: 85,
    fov: 45,
  });

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
      <div className="relative h-[calc(100vh+1px)] bg-cover bg-center">
        <Canvas
          shadows
          camera={{ fov: fov, near: 0.1, far: 1000, position: [x, y, z] }}
        >
          <OrbitControls
            minDistance={20}
            maxDistance={250}
            //  maxPolarAngle={Math.PI / 2.63}
            //   minPolarAngle={Math.PI / 2.63}
          />
          <Scenes />
        </Canvas>
        <button
          onClick={() => handleScroll("main-content")}
          className="absolute bottom-[144px] left-1/2 -translate-x-1/2 text-white opacity-60"
        >
          {t('scroll')}
        </button>
      </div>
    </>
  );
};

export default Hero;
