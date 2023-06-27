import Image from "next/image";
import Dot from "src/components/Dot";
import SocialMediaCard from "src/components/sections/Company/SocialMediaCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

const socialMedias = [
  {
    name: "tiktok",
  },
  {
    name: "bundle",
  },
  {
    name: "pangle",
  },
];

const Company = () => {
  return (
    <div className="lg:mb-60 mb-20 text-white">
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
        <h1 className="uppercase tracking-tighter heading-1 py-6 xl:py-7 2xl:py-10">
          Company
        </h1>
      </div>
      <div className="hidden lg:flex">
        {socialMedias.map((social, i) => (
          <SocialMediaCard name={social.name} number={i + 1} key={i} />
        ))}
      </div>
      <div className="lg:hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            650: {
              slidesPerView: 2,
            },
          }}
          slidesPerView={1}
        >
          {socialMedias.map((social, i) => (
            <SwiperSlide key={i}>
              <SocialMediaCard name={social.name} number={i + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative flex justify-between border-y border-white border-opacity-20 py-5 font-jetbrains text-sm font-medium leading-[18px] tracking-tighter">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <Dot side="left" verticalSide="bottom" />
        <Dot side="right" verticalSide="bottom" />
        <div>
          <span className="text-white opacity-50">RGBA</span>{" "}
          <span className="text-white opacity-80">(00, 22, 100, 0, 0.6)</span>
        </div>
        <div className="hidden sm:block">
          <span className="mr-8">
            {" "}
            <span className="text-white opacity-50">x</span>{" "}
            <span className="text-white opacity-90">000002023</span>
          </span>
          <span>
            {" "}
            <span className="text-white opacity-50">y</span>{" "}
            <span className="text-white opacity-90">000001678</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Company;