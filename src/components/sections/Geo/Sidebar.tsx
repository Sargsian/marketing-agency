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
      <div className="relative w-full flex-1">
        <div
          className={`absolute left-0 h-full w-full transition-all duration-500 ${
            isWest ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("northAmerica")}:
            </p>
            <div className="text-sm">us,ca</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("latinAmerica")}:
            </p>
            <div className="text-sm">
              ar,&#8203;br,&#8203;cl,&#8203;co,&#8203;ec,&#8203;mx,&#8203;pe,&#8203;uy
            </div>
          </div>
          <div className="mb-5 w-full uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("europe")}:
            </p>
            <div className="text-sm">
              at,&#8203;be,&#8203;bg,&#8203;cz,&#8203;dk,&#8203;fi,&#8203;fr,&#8203;de,&#8203;gr,&#8203;hu,&#8203;ie,&#8203;il,&#8203;it,&#8203;lu,&#8203;nl,&#8203;no,&#8203;pl,&#8203;pt,&#8203;ro,&#8203;es,&#8203;se,&#8203;ch,&#8203;uk
            </div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("centralEurope")}:
            </p>
            <div className="text-sm">by,&#8203;kz,&#8203;ru,&#8203;ua</div>
          </div>
        </div>
        {/* isWest === false case */}
        <div
          className={`absolute left-0 transition-all duration-500 ${
            isWest ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("nearEast")}:
            </p>
            <div className="text-sm">
              bh,&#8203;eg,&#8203;iq,&#8203;jo,&#8203;kw,&#8203;lb,&#8203;ma,&#8203;om,&#8203;pk
              qa,&#8203;sa,&#8203;za,&#8203;tr,&#8203;uae
            </div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("northeastAsia")}:
            </p>
            <div className="text-sm">jp,&#8203;kr,&#8203;tw</div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("southeastAsia")}:
            </p>
            <div className="text-sm">
              kh,&#8203;id,&#8203;my,&#8203;ph,&#8203;sg,&#8203;th,&#8203;vn
            </div>
          </div>
          <div className="mb-5 uppercase text-black">
            <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
              {t("oceania")}:
            </p>
            <div className="text-sm">au,&#8203;nz</div>
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
