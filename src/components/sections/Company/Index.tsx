import Image from "next/image";
import Dot from "src/components/Dot";
import TiktokCard from "src/components/sections/Company/TiktokCard";
import MetaCard from "src/components/sections/Company/MetaCard";
import { useTranslation } from "next-i18next";
import type { CompanyTypes } from "src/components/Page";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import SliderCard from "src/components/sections/Company/SliderCard";
import BigoCard from "src/components/sections/Company/BigoCard";
import { PointerEvent, useContext, useEffect, useRef, useState } from "react";
import { useIsVisible } from "src/hooks/useInvisible";
// import { pixelColorHandler } from "src/utils";
import html2canvas from "html2canvas";
import { CanvasContext } from "src/components/Layouts/Primary/PrimaryLayout";

const tiktokMedia = [
  {
    title: "Tiktok",
    name: "tiktok",
  },
  {
    title: "Bundle",
    name: "bundle",
  },
  {
    title: "Pangle",
    name: "pangle",
  },
];

const bigoMedia = [
  {
    title: "Likee",
    name: "likee",
  },
  {
    title: "IMO Messenger",
    name: "imo",
  },
];

const metaMedia = [
  {
    title: "Facebook",
    name: "facebook",
  },
  {
    title: "Instagram",
    name: "instagram",
  },
  {
    title: "Meta Audience Network",
    name: "meta",
  },
  {
    title: "Messenger",
    name: "messenger",
  },
];

const Company = ({ companyName }: CompanyTypes) => {
  const { t } = useTranslation("company");

  const [mouseX, setMouseX] = useState("000000000");
  const [mouseY, setMouseY] = useState("000000000");
  const [rgba, setRgba] = useState({ r: `00`, g: `00`, b: `00`, a: `255` });

  const companyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisible = useIsVisible(companyRef);

  const threeisLoaded = useContext(CanvasContext);

  const mouseXHandler = (e: MouseEvent) => {
    if (window.innerWidth < 640 || !isVisible) return;
    const initialX = "000000000";
    const newX =
      initialX.substring(e.clientX.toString().length) + e.clientX.toString();
    setMouseX(newX);
  };

  const mouseYHandler = (e: MouseEvent) => {
    if (window.innerWidth < 640 || !isVisible) return;
    const initialY = "000000000";
    const newY =
      initialY.substring(e.clientY.toString().length) + e.clientY.toString();
    setMouseY(newY);
  };

  const socialMedia =
    companyName === "Tiktok"
      ? tiktokMedia
      : companyName === "Bigo"
      ? bigoMedia
      : companyName === "Meta"
      ? metaMedia
      : [];

  const handleEyedropper = (e: MouseEvent) => {
    // const rgba = pixelColorHandler(e);
    if (!rgba) return;
    console.log(rgba);

    setRgba(rgba);
  };

  useEffect(() => {
    const element = document.getElementById(
      "canvas-root"
    ) as HTMLCanvasElement;
    if (element) {
      element.addEventListener("mousemove", handleEyedropper);
    }
    // if (isVisible) {
    // } else {
    //   window.removeEventListener("mousemove", pixelColorHandler);
    // }
    return () => window.removeEventListener("mousemove", handleEyedropper);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const screenshot = document.getElementById("screenshot-root");
    if (screenshot) return;
    const takeScreenshot = async () => {
      const parent = document.getElementById('canvas-root')
      const target = document.getElementById('canvas-root')
      if (!parent || !target) return
      const screenshot = await html2canvas(target);
      console.log(screenshot, "screenshot");
      screenshot.id = "screenshot-root";
      screenshot.style.position = "absolute";
      screenshot.style.top = "0";
      screenshot.style.left = "0";
      // screenshot.style.opacity = "0";
      parent.append(screenshot);
      return screenshot;
    };
    // takeScreenshot().catch(console.error);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("mousemove", mouseXHandler);
      window.addEventListener("mousemove", mouseYHandler);
    } else {
      window.removeEventListener("mousemove", mouseXHandler),
        window.removeEventListener("mousemove", mouseYHandler);
    }

    return () => (
      window.removeEventListener("mousemove", mouseXHandler),
      window.removeEventListener("mousemove", mouseYHandler)
    );
  }, [isVisible]);

  return (
    <div ref={companyRef} id="canvas-target" className="relative mb-20 text-white lg:mb-[190px]">
      <div className="relative border-t border-white border-opacity-20">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <div className="absolute bottom-0 flex w-full gap-6 lg:hidden">
          <span className="relative bottom-0 flex-1 after:absolute after:bottom-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-20">
            <Dot side="left" verticalSide="bottom" hideAt="lg" />
            <Dot side="right" verticalSide="bottom" hideAt="lg" />
          </span>
          <div className="relative w-20">
            <div className="absolute bottom-[-16px] right-0 z-10 flex gap-3">
              <Image
                src={"/icons/left-arrow.svg"}
                width={32}
                height={32}
                className="swiper-button-prev cursor-pointer"
                alt="left-arrow"
              />
              <Image
                src={"/icons/right-arrow.svg"}
                width={32}
                height={32}
                className="swiper-button-next cursor-pointer"
                alt="left-arrow"
              />
            </div>
          </div>
        </div>
        <h1 className="py-6 uppercase tracking-tighter heading-1 xl:py-7 2xl:py-10">
          {t("heading")}
        </h1>
      </div>
      {companyName === "Tiktok" ? (
        <div className="hidden lg:flex">
          {socialMedia.map((social, i) => (
            <TiktokCard
              name={social.name}
              title={social.title}
              info={t(`${social.name}Info`)}
              number={i + 1}
              key={i}
            />
          ))}
        </div>
      ) : companyName === "Meta" ? (
        <div className="hidden grid-cols-2 lg:grid">
          {socialMedia.map((social, i) => (
            <MetaCard
              name={social.name}
              title={social.title}
              info={t(`${social.name}Info`)}
              number={i + 1}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="hidden grid-cols-2 lg:grid">
          {socialMedia.map((social, i) => (
            <BigoCard
              name={social.name}
              title={social.title}
              info={t(`${social.name}Info`)}
              number={i + 1}
              key={i}
            />
          ))}
        </div>
      )}
      <div className="lg:hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
          className=""
          slidesPerView={1}
        >
          {socialMedia.map((social, i) => (
            <SwiperSlide key={i}>
              <SliderCard
                name={social.name}
                title={social.title}
                info={t(`${social.name}Info`)}
                number={i + 1}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="canvas-root" className="absolute top-0 left-0 w-full h-full">

      </div>
      <div className="relative flex justify-between border-y border-white border-opacity-20 py-5 font-jetbrains text-sm font-medium leading-[18px] tracking-tighter">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <Dot side="left" verticalSide="bottom" />
        <Dot side="right" verticalSide="bottom" />
        <div>
          <span className="text-white opacity-50">RGBA</span>{" "}
          <span className="text-white opacity-80">{`(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`}</span>
        </div>
        <div className="hidden sm:block">
          <span className="mr-8">
            {" "}
            <span className="text-white opacity-50">x</span>{" "}
            <span className="text-white opacity-90">{mouseX}</span>
          </span>
          <span>
            {" "}
            <span className="text-white opacity-50">y</span>{" "}
            <span className="text-white opacity-90">{mouseY}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Company;
