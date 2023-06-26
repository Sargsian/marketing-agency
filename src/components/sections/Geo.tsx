import Image from "next/image";
import Link from "next/link";
import Dot from "src/components/Dot";

const locations = [
  { name: "Eastern Europe" },
  { name: "Europe" },
  { name: "Latin America" },
  { name: "North America" },
];

const Geo = () => {
  return (
    <div className="mb-20 lg:mb-48">
      <div className="relative mb-6 flex justify-between border-t border-white border-opacity-20 lg:mb-[86px]">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <span>
          <h1 className="mr-6 lg:mr-4 text-white inline-block py-6 uppercase tracking-tighter heading-1 xl:py-7 2xl:py-10">
            Geo
          </h1>
          <Link className="uppercase link" href="#">
            Full list of available GEOs
          </Link>
        </span>
        <span className="mt-14 hidden flex-col gap-9 lg:flex">
          <Image
            src="/assets/geo-bars.svg"
            alt="geo-statistics"
            width={283}
            height={76}
          />
          <div className="relative h-[72px] w-[72px] self-end">
            <Image
              src="icons/down-arrow.svg"
              fill
              style={{ objectFit: "cover" }}
              alt="down-arrow"
            />
          </div>
        </span>
      </div>
      <div className="flex xl:h-[822px] flex-col gap-5 sm:px-16 md:flex-row md:gap-9 md:px-0 lg:gap-16 lg:px-7 xl:gap-5 xl:px-0">
        <div className="relative hidden h-full w-[290px] flex-col bg-accent p-[25px] font-jetbrains text-sm xl:flex">
          <div className="mb-8 flex h-60 w-60 items-center justify-center rounded-[25px] border border-black">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
            <span className="bar bar-4" />
            <span className="bar bar-5" />
            <span className="bar bar-6" />
          </div>
          <div>
            <p className="text-justify font-medium uppercase leading-[140%] tracking-[-0.42px] text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="mt-auto">
            <span className="mb-[10px] inline-block uppercase text-black">
              Lorem ipsum
            </span>
            <Image
              src="/icons/accordion.svg"
              width={129}
              height={21}
              alt="accordion"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[90px] w-[90px] -rotate-[90deg]">
            <Image
              src="/assets/triangle.png"
              fill
              style={{ objectFit: "fill" }}
              alt="triangle"
            />
          </div>
        </div>
        <div className="h-fit w-fit aspect-auto overflow-hidden rounded-[10px] border border-white border-opacity-50">
          <Image src="/assets/map.png" width={785} height={200} alt="map" />
        </div>
        <div className="flex h-full w-full flex-col justify-between md:w-[445px] md:min-w-[280px] lg:min-w-[350px]">
          <div className="">
            <span className="mb-9 mt-6 md:mt-0 inline-block tag">Geo targeting</span>
            {locations.map((location, i) => (
              <div
                className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 uppercase heading-3"
                key={i}
              >
                <Dot side="left" verticalSide="top" />
                <Dot side="right" verticalSide="top" />
                <span className="opacity-60 heading-4">0{i + 1}</span>
                <span>{location.name}</span>
              </div>
            ))}
          </div>
          <div className="flex h-[246px] mt-3 max-w-fit mx-auto rounded-md border border-accent">
            <Image src="/assets/cubes.svg" width={436} height={243} alt="map" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geo;
