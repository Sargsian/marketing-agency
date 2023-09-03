import Image from "next/image";
import Dot from "src/components/Dot";
import { useTranslation } from "next-i18next";
import Sidebar from "./Sidebar";
import Locations from "./Locations";
import Map from "./Map";
import { useEffect, useState } from "react";

const Geo = () => {
  const { t } = useTranslation("geo");
  const [isWest, setIsWest] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWest((prevState) => !prevState);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20 lg:mb-48">
      <div className="relative flex justify-between border-t border-white border-opacity-20 md:mb-6 lg:mb-[86px]">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <span>
          <h1 className="mr-6 inline-block py-6 uppercase tracking-tighter text-white heading-1 lg:mr-4 xl:py-7 2xl:py-10">
            {t("heading")}
          </h1>
        </span>
        <span className="mt-14 hidden flex-col gap-9 lg:flex">
          <Image
            src="/assets/images/geo-bars.svg"
            alt="geo-statistics"
            width={283}
            height={76}
          />
          <div className="relative h-[72px] w-[72px] self-end">
            <Image
              src="/icons/down-arrow.svg"
              fill
              style={{ objectFit: "cover" }}
              alt="down-arrow"
            />
          </div>
        </span>
      </div>
      <div className="hidden flex-col gap-5 sm:px-16 md:flex-row md:gap-9 md:px-0 lg:gap-16 lg:px-7 xl:flex xl:h-[822px] xl:gap-5 xl:px-0">
        <Sidebar isWest={isWest} />
        <Map />
        <Locations isWest={isWest} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-8 xl:hidden">
        <Map />
        <div className="flex w-full flex-col-reverse items-center justify-center gap-8 sm:flex-row">
          <Sidebar isWest={isWest} />
          <Locations isWest={isWest} />
        </div>
      </div>
    </div>
  );
};

export default Geo;
