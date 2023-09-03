import { useTranslation } from "next-i18next";
import Image from "next/image";

const Sidebar = ({ isWest }: { isWest: boolean }) => {
  const { t } = useTranslation("geo");

  return (
    <div className="relative flex h-full min-h-[700px] w-full min-w-[241px] max-w-[290px] flex-col bg-accent p-3 font-jetbrains text-sm sm:w-[290px] sm:min-w-[290px] sm:p-[25px]">
      <div className="mx-auto mb-8 flex aspect-square w-[calc(100%-24px)] items-center justify-center rounded-[25px] border border-black sm:mx-0 sm:h-60 sm:w-60">
        <span className="bar bar-1" />
        <span className="bar bar-2" />
        <span className="bar bar-3" />
        <span className="bar bar-4" />
        <span className="bar bar-5" />
        <span className="bar bar-6" />
      </div>
      {/* animated stuff start */}
      {/* isWest === true case */}
      <div className="relative">
        <div
          className={`absolute left-0 transition-all duration-500 ${
            isWest ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("northAmerica") : t("nearEast")}:
            </p>
            <div className="text-sm">
              bh,eg,iq,jo,kw,lb,ma,om,pk qa,sa,za,tr,uae
            </div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("latinAmerica") : t("northeastAsia")}:
            </p>
            <div className="text-sm">p,kr,tw</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("europe") : t("southeastAsia")}:
            </p>
            <div className="text-sm">kh,id,my,ph,sg,th,vn</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("centralEurope") : t("oceania")}:
            </p>
            <div className="text-sm">au,nz</div>
          </div>
        </div>
        {/* isWest === false case */}
        <div
          className={`absolute left-0 transition-all duration-500 ${
            isWest ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("northAmerica") : t("nearEast")}:
            </p>
            <div className="text-sm">
              bh,eg,iq,jo,kw,lb,ma,om,pk qa,sa,za,tr,uae
            </div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("latinAmerica") : t("northeastAsia")}:
            </p>
            <div className="text-sm">p,kr,tw</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("europe") : t("southeastAsia")}:
            </p>
            <div className="text-sm">kh,id,my,ph,sg,th,vn</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px] ">
              {isWest ? t("centralEurope") : t("oceania")}:
            </p>
            <div className="text-sm">au,nz</div>
          </div>
        </div>

        {/*  animated stuff end */}
      </div>
      <div className="mt-auto flex-row">
        <span className="mb-[10px] block uppercase text-black">
          {t("loadingFooter")}..
        </span>
        <div className="flex gap-[2px]">
          <span className="inline-block h-[21px] w-[28px] bg-black" />
          <span className="inline-block h-[21px] w-[24px] bg-black" />
          <span className="inline-block h-[21px] w-[20px] bg-black" />
          <span className="inline-block h-[21px] w-[16px] bg-black" />
          <span className="inline-block h-[21px] w-[12px] bg-black" />
          <span className="inline-block h-[21px] w-[9px] bg-black" />
          <span className="inline-block h-[21px] w-[4px] bg-black" />
          <span className="inline-block h-[21px] w-[2px] animate-blink bg-black" />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-[90px] w-[90px] -rotate-[90deg]">
        <Image
          src="/assets/images/triangle.png"
          fill
          style={{ objectFit: "fill" }}
          alt="triangle"
        />
      </div>
    </div>
  );
};

export default Sidebar;
