import Image from "next/image";
import { useTranslation } from "next-i18next";
import Dot from "src/components/Dot";

const Locations = ({ isWest }: { isWest: boolean }) => {
  const { t } = useTranslation("geo");

  return (
    <div className="flex w-full flex-col justify-between md:w-[445px] md:min-w-[280px] lg:min-w-[350px]">
      <div className="h-[460px]">
        <span className="mb-9 inline-block tag">{t("tag")}</span>
        <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
          <Dot side="left" verticalSide="top" />
          <Dot side="right" verticalSide="top" />
          <span className="mr-1 opacity-60 heading-4">01</span>
          <span className="heading-4">{isWest ? t("northAmerica") : t("nearEast")}</span>
        </div>
        <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
          <Dot side="left" verticalSide="top" />
          <Dot side="right" verticalSide="top" />
          <span className="mr-1 opacity-60 heading-4">02</span>
          <span className="heading-4">{isWest ? t("latinAmerica") : t("northeastAsia")}</span>
        </div>
        <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
          <Dot side="left" verticalSide="top" />
          <Dot side="right" verticalSide="top" />
          <span className="mr-1 opacity-60 heading-4">03</span>
          <span className="heading-4">{isWest ? t("europe") : t("southeastAsia")}</span>
        </div>
        <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
          <Dot side="left" verticalSide="top" />
          <Dot side="right" verticalSide="top" />
          <span className="mr-1 opacity-60 heading-4">04</span>
          <span className="heading-4">{isWest ? t("centralEurope") : t("oceania")}</span>
        </div>
      </div>
      <div className="mx-auto mt-3 flex h-[246px] max-w-fit rounded-md border border-accent">
        <Image
          src="/assets/images/cubes.svg"
          width={436}
          height={243}
          alt="map"
        />
      </div>
    </div>
  );
};

export default Locations;
