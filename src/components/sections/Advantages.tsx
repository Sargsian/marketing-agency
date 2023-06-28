import Image from "next/image";
import Dot from "src/components/Dot";
import InfoCard from "src/components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";

import "swiper/css";

const infoList = [
  { text: "card1" },
  { text: "card2" },
  { text: "card3" },
  { text: "card4" },
  { text: "card5" },
  { text: "card6" },
];

const Advantages = () => {
  const { t } = useTranslation("advantages");
  return (
    <div className="relative mb-20 border-t border-white border-opacity-20 lg:mb-48">
      <Dot side="left" verticalSide="top" />
      <Dot side="right" verticalSide="top" />
      <div className="mb-9 flex justify-between lg:mb-[100px]">
        <h1 className="mt-6 uppercase tracking-tighter heading-1 xl:mt-7 2xl:mt-10">
          {t('heading')}
        </h1>
        <div className="relative mt-4 h-8 w-8 sm:h-[46px] sm:mt-8 sm:w-[46px] xl:mt-10 xl:h-[72px] xl:w-[72px] 2xl:mt-[76px]">
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
          <span className="mb-[13px] inline-block tag">{t('tag')}</span>
        </div>
        <div className="ml-auto hidden grid-cols-3 gap-5 lg:grid xl:ml-0">
          {infoList.map((info, i) => (
            <InfoCard text={t(info.text)} key={i} />
          ))}
        </div>
        <div className="lg:hidden">
          <Swiper spaceBetween={6} slidesPerView={"auto"}>
            {infoList.map((info, i) => (
              <SwiperSlide
                style={{ width: "290px" }}
                className="w-[290px]"
                key={i}
              >
                <InfoCard text={t(info.text)} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
