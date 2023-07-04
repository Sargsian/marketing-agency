import Image from "next/image";
import Dot from "src/components/Dot";
import InfoCard from "src/components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";

import "swiper/css";

const instructions = [
  { text: "item1" },
  { text: "item2" },
  { text: "item3" },
  { text: "item4" },
];

const HowToStart = () => {
  const { t } = useTranslation("howToStart");
  return (
    <div className="relative mb-20 border-t border-white border-opacity-20 lg:mb-32">
      <Dot side="left" verticalSide="top" />
      <Dot side="right" verticalSide="top" />
      <div className="mb-9 flex justify-between lg:mb-[100px]">
        <h1 className="mt-6 uppercase tracking-tighter heading-1 xl:mt-7 2xl:mt-10">
          {t("heading")}
        </h1>
        <div className="relative mt-4 h-8 w-8 sm:mt-8 sm:h-[46px] sm:w-[46px] xl:mt-10 xl:h-[72px] xl:w-[72px] 2xl:mt-[76px]">
          <Image
            src={"/icons/diagonal-arrow.svg"}
            fill
            style={{ objectFit: "contain" }}
            alt="diagonal-arrow"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between xl:flex-row">
        <div>
          <span className="mb-[42px] mr-[243px] inline-block tag">
            {t("tag")}
          </span>
        </div>
        <div className="flex grid-cols-2 flex-col gap-[22px] gap-y-5 lg:grid lg:gap-y-10">
          {instructions.map((instruction, i) => (
            <div
              className="relative border-t border-white border-opacity-20 pt-5 md:pt-7"
              key={i}
            >
              <Dot side="left" verticalSide="top" />
              <Dot side="right" verticalSide="top" />
              <h3 className="w-[calc(100%-24px)] uppercase heading-3-v2">
                {t(instruction.text)}
              </h3>
              <span className="tracking-[-1.2px text-2xl] absolute right-0 top-5 font-jetbrains text-white opacity-60 md:top-[28px]">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToStart;
