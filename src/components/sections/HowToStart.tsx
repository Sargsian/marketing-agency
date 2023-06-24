import Image from "next/image";
import Dot from "src/components/Dot";
import InfoCard from "src/components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const instructions = [
  { text: "Leave a request for connection through the online form" },
  { text: "Read the terms and conditions of the agency" },
  { text: "Remit payment" },
  { text: "Get Started" },
];

const HowToStart = () => {
  return (
    <div className="relative mb-9 border-t border-white border-opacity-20 lg:mb-24">
      <Dot side="left" verticalSide="top" />
      <Dot side="right" verticalSide="top" />
      <div className="mb-9 flex justify-between lg:mb-[100px]">
        <h1 className="mt-6 uppercase tracking-tighter heading-1 xl:mt-7 2xl:mt-10">
          How to start?
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
          <span className="mb-[42px] mr-[243px] inline-block tag">Start</span>
        </div>
        <div className="flex flex-col lg:grid grid-cols-2 gap-[22px] gap-y-5 lg:gap-y-10">
          {instructions.map((instruction, i) => (
            <div
              className="relative border-t border-white border-opacity-20 pt-5 md:pt-7"
              key={i}
            >
              <Dot side="left" verticalSide="top" />
              <Dot side="right" verticalSide="top" />
              <h3 className="uppercase w-[calc(100%-24px)] heading-3-v2">{instruction.text}</h3>
              <span className="tracking-[-1.2px text-2xl] absolute right-0 top-5 md:top-[28px] font-jetbrains text-white opacity-60">
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
