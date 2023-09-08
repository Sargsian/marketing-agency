import Image from "next/image";
import { useTranslation } from "next-i18next";
import type { CompanyTypes } from "src/components/Page";
import LocationsSection from "./LocationsSection";
import Dot from "src/components/Dot";

type Props = {
  isWest: boolean;
} & CompanyTypes;

const Locations = ({ isWest, companyName }: Props) => {
  const { t } = useTranslation("geo");

  return (
    <div className="flex w-full flex-col justify-between md:w-[445px] md:min-w-[280px] lg:min-w-[350px]">
      <div className="relative h-[460px]">
        <span className="mb-9 inline-block tag">{t("tag")}</span>
        <div
          className={`absolute left-0 h-full w-full transition-all duration-500 ${
            isWest ? "opacity-100" : "opacity-0"
          }`}
        >
          <LocationsSection companyName="Tiktok" number={1}>
            {t("northAmerica")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={2}>
            {t("latinAmerica")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={3}>
            {t("europeUkIsrael")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={4}>
            {t("centralEasternEurope")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={1}>
            {t("White List")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={2}>
            {t("latinAmerica")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={3}>
            {t("europe")}
          </LocationsSection>
        </div>
        <div
          className={`absolute left-0 h-full w-full transition-all duration-500 ${
            isWest ? "opacity-0" : "opacity-100"
          }`}
        >
          <LocationsSection companyName="Tiktok" number={1}>
            {t("nearEastNorthAfricaTurkey")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={2}>
            {t("northeastAsia")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={3}>
            {t("southeastAsia")}
          </LocationsSection>
          <LocationsSection companyName="Tiktok" number={4}>
            {t("oceania")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={1}>
            {t("southAsia")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={2}>
            {t("southeastAsia")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={3}>
            {t("centralAsia")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={4}>
            {t("middleEast")}
          </LocationsSection>
          <LocationsSection companyName="Bigo" number={5}>
            {t("africa")}
          </LocationsSection>
        </div>
        {companyName === "Meta" && (
          <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
            <Dot side="left" verticalSide="top" />
            <Dot side="right" verticalSide="top" />
            <span className="mr-1 opacity-60 heading-4">01</span>
            <span className="heading-4">{t("metaRegions")}</span>
          </div>
        )}
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
