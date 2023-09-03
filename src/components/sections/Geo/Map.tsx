import Image from "next/image";

const Map = () => {
  return (
    <div className="aspect-auto h-fit w-fit overflow-hidden rounded-[10px] border border-white border-opacity-50">
      <Image
        src="/assets/images/map.png"
        width={785}
        height={200}
        alt="map"
        className="brightness-200"
      />
    </div>
  );
};

export default Map;
