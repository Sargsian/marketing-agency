import Image from "next/image";

const Map = () => {
  return (
    <div className="relative w-full max-w-[785px] overflow-hidden rounded-[10px] border border-white border-opacity-50 pb-[35%]">
        <Image
          src="/assets/images/map2.png"
          // width={1920}
          // height={473}
          fill
          style={{ objectFit: "cover" }}
          alt="map"
          className="-translate-x-[20%] brightness-200"
        />
      </div>
  );
};

export default Map;
