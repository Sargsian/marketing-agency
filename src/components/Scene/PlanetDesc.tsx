
const PlanetDesc = ({ name, t }: { name: "Bigo" | "Tiktok" | "Meta", t: (arg: string) => string }) => {
  return (
    <div className="absolute right-[0%] top-[30px] w-fit rounded-[7px] border border-white border-opacity-30 bg-blue-100 bg-opacity-20 bg-clip-padding pb-[22px] pl-3 pr-[21px] pt-4 text-[10px] leading-[14px] text-black backdrop-blur-sm backdrop-filter [backface-visibility:hidden]">
      <div className="flex w-[190px] flex-col gap-8">
        <div>
          <span className="text-white text-opacity-70 subtitle-3">
            {t("planetTags")}
          </span>
          <h5 className="uppercase text-white heading-5">
            {t("planetProducts")}
          </h5>
          <span className="text-accent subtitle">
            {t("planetCommission")} {name === "Meta" ? "15%" : "5%"}
          </span>
        </div>
        {name !== "Meta" && (
          <div>
            <span className="text-white text-opacity-70 subtitle-3">
              {t("planetArbitrage")}
            </span>
            <h5 className="uppercase text-white heading-5">
              {t("planetVerticals")}
            </h5>
            <span className="text-accent subtitle">
              {t("planetCommission")} 10%
            </span>
          </div>
        )}
        <div>
          <span className="text-white text-opacity-70 subtitle-3">
            {t("planetArbitrage")}
          </span>
          <h5 className="uppercase text-white heading-5">
            {t("planetPayment")}
          </h5>
          <div className="mb-1 text-accent subtitle">USDT (TRC20)</div>
          <div className="mb-1 text-accent subtitle">
            Wire Transfer (min. 500$)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDesc;
