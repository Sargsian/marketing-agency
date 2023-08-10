import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "src/scene";
import { useControls } from "leva";
import { Leva } from "leva";
import { useTranslation } from "next-i18next";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useScene, useSceneDispatch } from "src/store/SceneContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const { t } = useTranslation("header");
  const { preview, pause, scroll } = useScene();
  const router = useRouter();
  const dispatch = useSceneDispatch();
  const [muteSong, setMuteSong] = useState(false);

  const currentTitle =
    router.pathname === "/tiktok"
      ? "TikTok"
      : router.pathname === "/bigo"
      ? "Bigo"
      : router.pathname === "/meta"
      ? "Meta"
      : "";

  return (
    <>
      <Leva collapsed hidden />
      <div className="relative h-screen bg-cover bg-center">
        <Canvas
          shadows
          camera={{ fov: 45, near: 1, far: 5000, position: [0, 0, 185] }}
        >
          <Suspense fallback={null}>
            <Scene pause={pause} />
          </Suspense>
        </Canvas>
        <Loader dataInterpolation={(span) => `Loading ${span.toFixed(0)}%`} />
        {/* <div className="h-full bg-white"></div> */}
        <button className="absolute z-20 bottom-[100px] left-8 md:left-[100px] cursor-default text-white">
          <Link
            className={`flex items-center gap-2 transition-opacity duration-500 hover:opacity-40 ${
              router.pathname === "/"
                ? "pointer-events-none opacity-10"
                : "opacity-60"
            }`}
            href={"/"}
          >
            <Image
              width={13}
              height={13}
              alt="return"
              className="opacity-60"
              src={"/icons/return.svg"}
            />
            <span className="font-jost">Back</span>
          </Link>
        </button>
        <div
          onClick={() => setMuteSong((prevState) => !prevState)}
          className={`musicBarsIcon right-10 md:right-[100px] ${muteSong ? "muteSong" : ""}`}
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
          className={`pointer-events-none absolute bottom-[144px] left-1/2 z-10 flex -translate-x-1/2 text-white transition-all duration-500 ${
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
