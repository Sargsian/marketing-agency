import Image from "next/image";
import Dot from "src/components/Dot";
import InfoCard from "src/components/InfoCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const productsList = [
  { text: "Product: Commission from 5%" },
  { text: "Gray verticals (arbitrage): Commission from 10%" },
];

const paymentMethodsList = [
  { text: "Capitalist EUR, USD, RUR" },
  { text: "USDT (TRC20)" },
  { text: "Wire Transfer (min. 500$)" },
];

const PriceList = () => {
  return (
    <div className="relative mb-20 border-t border-white border-opacity-20 lg:mb-48">
      <Dot side="left" verticalSide="top" />
      <Dot side="right" verticalSide="top" />
      <div className="mb-9 flex justify-between lg:mb-[100px]">
        <h1 className="mt-6 uppercase tracking-tighter heading-1 xl:mt-7 2xl:mt-10">
          Price-List
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
      <div className="flex flex-col mb-[40px] lg:mb-28 justify-between xl:flex-row">
        <div>
          <span className="mb-[13px] inline-block tag">Products</span>
        </div>
        <div className="ml-auto hidden gap-[6px] lg:gap-5 sm:flex">
          {productsList.map((info, i) => (
            <InfoCard text={info.text} key={i} />
          ))}
        </div>
        <div className="sm:hidden">
          <Swiper spaceBetween={6} slidesPerView={"auto"}>
            {productsList.map((info, i) => (
              <SwiperSlide
                style={{ width: "290px" }}
                className="w-[290px]"
                key={i}
              >
                <InfoCard text={info.text} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col justify-between xl:flex-row">
        <div>
          <span className="mb-[13px] inline-block tag">Payment Methods</span>
        </div>
        <div className="ml-auto hidden grid-cols-3 gap-5 lg:grid xl:ml-0">
          {paymentMethodsList.map((info, i) => (
            <InfoCard text={info.text} key={i} />
          ))}
        </div>
        <div className="lg:hidden">
          <Swiper spaceBetween={6} slidesPerView={"auto"}>
            {paymentMethodsList.map((info, i) => (
              <SwiperSlide
                style={{ width: "290px" }}
                className="w-[290px]"
                key={i}
              >
                <InfoCard text={info.text} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
