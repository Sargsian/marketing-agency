import { useTranslation } from "next-i18next";
import Image from "next/image";
import type { CompanyTypes } from "src/components/Page";
import SidebarSection from "./SidebarSection";

type Props = { isWest: boolean } & CompanyTypes;

const Sidebar = ({ isWest, companyName }: Props) => {
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
          <SidebarSection companyName={"Tiktok"} continent={t("northAmerica")}>
            us,ca
          </SidebarSection>
          <SidebarSection companyName={"Tiktok"} continent={t("latinAmerica")}>
            ar,br,cl,co,ec,mx,pe,uy
          </SidebarSection>

          <SidebarSection companyName={"Tiktok"} continent={t("europeUkIsrael")}>
            at,be,bg,cz,dk,fi,fr,de,gr,hu,ie,il,it,lu,nl,no,pl,pt,ro,es,se,ch,uk
          </SidebarSection>
          <SidebarSection companyName={"Tiktok"} continent={t("centralEasternEurope")}>
            by,kz,ru,ua
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("White List")}>
            us
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("southAmerica")}>
            br
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("europe")}>
            ru,by
          </SidebarSection>
        </div>
        {/* isWest === false case */}
        <div
          className={`absolute left-0 transition-all duration-500 ${
            isWest ? "opacity-0" : "opacity-100"
          }`}
        >
          <SidebarSection companyName={"Tiktok"} continent={t("nearEastNorthAfricaTurkey")}>
            bh,eg,iq,jo,kw,lb,ma,om,pk,qa,sa,za,tr,uae
          </SidebarSection>
          <SidebarSection companyName={"Tiktok"} continent={t("northeastAsia")}>
            jp,kr,tw
          </SidebarSection>
          <SidebarSection companyName={"Tiktok"} continent={t("southeastAsia")}>
            kh,id,my,ph,sg,th,vn
          </SidebarSection>
          <SidebarSection companyName={"Tiktok"} continent={t("oceania")}>
            au,nz
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("middleEast")}>
            ae,kw
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("centralAsia")}>
            uz,tj,kz,af,sa
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("southAsia")}>
            in,bd,pk,lk,np
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("southeastAsia")}>
            id,my,th,vn,ph,sg
          </SidebarSection>
          <SidebarSection companyName={"Bigo"} continent={t("africa")}>
            ng,ss,et,ke,zm
          </SidebarSection>
        </div>
        {companyName === "Meta" && (
          <a
          className="relative z-50 text-black text-lg font-medium leading-[140%] tracking-[-0.81px] uppercase hover:opacity-70 transition-all"
            href="https://www.facebook.com/business/help/1155157871341714?id=176276233019487"
            target="_blank"
          >
            {t("fullList")}
          </a>
        )}
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
