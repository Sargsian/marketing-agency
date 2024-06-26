import { Canvas } from "@react-three/fiber";
import Scene from "src/scene";
import { useTranslation } from "next-i18next";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useScene } from "src/store/SceneContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "./Loader";

const Hero = () => {
  const { scroll } = useScene();
  const router = useRouter();
  const [muteSong, setMuteSong] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { t } = useTranslation("hero");

  const [audio] = useState(new Audio("/assets/sounds/sound.mp3"));

  const currentTitle =
    router.pathname === "/tiktok"
      ? "TikTok"
      : router.pathname === "/bigo"
      ? "Bigo"
      : router.pathname === "/meta"
      ? "Meta"
      : "";

  useEffect(() => {
    if (!userInteracted) return;
    if (muteSong) {
      void audio.pause();
    } else {
      void audio.play();
      audio.loop = true;
      console.log("play song");
    }
  }, [muteSong, audio, userInteracted]);

  return (
    <>
      <div
        onMouseDown={() => {
          if (!userInteracted) {
            setUserInteracted(true);
          }
        }}
        className="relative h-screen bg-cover bg-center"
      >
        <div
          className={`fixed left-0 top-0 z-10 h-screen w-full shadow-[0px_-200px_200px_0px_rgba(0,_0,_0,_0.7)_inset] transition-opacity duration-500 ${
            scroll ? "visible absolute opacity-100" : "invisible opacity-0"
          }`}
        />
        <Suspense fallback={<Loader />}>
          <Canvas
            shadows
            dpr={[1, 1]}
            camera={{ fov: 45, near: 1, far: 5000, position: [0, 0, 185] }}
          >
            <Scene />
          </Canvas>
        </Suspense>
        <button
          className={`absolute bottom-[100px] left-8 z-20 text-white hover:cursor-pointer md:left-[100px] ${
            router.pathname === "/"
              ? "pointer-events-none opacity-10"
              : "opacity-60"
          }`}
        >
          <Link
            className="font-jost transition-opacity duration-500 hover:opacity-40"
            href={"/"}
          >
            {t("back")}
          </Link>
        </button>
        <div
          onClick={() => setMuteSong((prevState) => !prevState)}
          className={`musicBarsIcon right-10 md:right-[100px] ${
            muteSong ? "muteSong" : ""
          } ${userInteracted ? "startPlaying" : ""}`}
        >
          <span />
          <span />
          <span />
        </div>
        <span
          className={`absolute bottom-[244px] left-1/2 -translate-x-1/2 font-jost text-[96px] font-semibold tracking-tighter text-white transition-all ${
            scroll ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentTitle}
        </span>
        <span
          className={`absolute bottom-[144px] left-1/2 z-10 flex -translate-x-1/2 font-jost text-white transition-all duration-500 ${
            scroll ? "visible opacity-60" : "invisible opacity-0"
          }`}
        >
          {t("scroll")}
          <svg width={22} height={22} className="arrows">
            <path className="a1" d="M0 0 L5 6 L10 0"></path>
            <path className="a2" d="M0 5 L5 11 L10 5"></path>
            <path className="a3" d="M0 10 L5 17 L10 10"></path>
          </svg>
        </span>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Hero), {
  ssr: false,
});
