import Link from "next/link";
import { useTranslation } from "next-i18next";
import Dot from "src/components/Dot";
import type { CompanyTypes } from "src/components/Page";

const NextView = ({ companyName }: CompanyTypes) => {
  const { t } = useTranslation("nextView");

  return (
    <div className="relative mb-10 flex justify-between border-y border-white border-opacity-20 xl:mb-32">
      <Dot side="left" verticalSide="top" />
      <Dot side="right" verticalSide="top" />
      <Dot side="left" verticalSide="bottom" />
      <Dot side="right" verticalSide="bottom" />
      <div className="py-6 uppercase xl:my-[72px] xl:min-w-[623px] xl:flex-1 xl:py-0">
        <h1 className="uppercase tracking-tighter heading-1">
          {companyName === "Tiktok"
            ? "Bigo"
            : companyName === "Bigo"
            ? "Meta"
            : "Tiktok"}
        </h1>
      </div>
      <div className="relative border-opacity-20 px-3 xl:mx-0 xl:w-[910px]">
        <Dot side="left" verticalSide="top" showAt="xl" />
        <Dot side="left" verticalSide="bottom" showAt="xl" />
        <div className="h-full xl:max-w-[600px]">
          <Link
            href={`${
              companyName === "Tiktok"
                ? "/bigo"
                : companyName === "Bigo"
                ? "/meta"
                : "/"
            }`}
            className="group absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-jetbrains text-base font-normal uppercase tracking-[-1.2px] text-accent md:text-xl xl:text-2xl"
          >
            {t("nextView")}
            <span className="pointer-events-none absolute left-[calc(0%-100px)] top-1/2 h-[1px] w-[50px] bg-accent transition-all group-hover:w-[100px] md:left-[calc(0%-144px)] md:w-[74px] group-hover:md:w-[144px]"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NextView;
