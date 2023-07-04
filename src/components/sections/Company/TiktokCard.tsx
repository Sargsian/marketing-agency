import Image from "next/image";
import Dot from "src/components/Dot";
import type { CompanyTypes } from "src/components/Page";

const TitkokCard = ({
  name,
  number,
  title,
  info,
}: {
  name: string;
  number: number;
  title: string;
  info: string;
  companyName?: CompanyTypes;
}) => {
  return (
    <div
      className={`relative flex py-24 ${
        number === 2 ? "flex-[1.3]" : "flex-1"
      } basis-1/5 items-center justify-center border-t border-white border-opacity-20 2xl:basis-0`}
    >
      {number === 1 && (
        <>
          <Dot side="left" verticalSide="top" />
        </>
      )}
      {number === 2 && (
        <>
          <Dot side="left" verticalSide="top" />
          <Dot side="right" verticalSide="top" />
          <Dot side="left" arbitraryVerticalSide="top" offset={0} />
        </>
      )}
      {number === 3 && (
        <>
          <Dot side="right" verticalSide="top" />
          <Dot side="left" verticalSide="bottom" />
          <Dot side="left" arbitraryVerticalSide="bottom" offset={0} />
        </>
      )}

      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="relative mb-8 aspect-square w-[100px]">
            <Image
              src={`/icons/${name}.svg`}
              fill
              priority
              style={{ objectFit: "contain" }}
              alt={`${title}-icon`}
            />
          </div>
          <span className="align-top font-jetbrains text-accent opacity-70">
            00{number}
          </span>
          <span className="mb-8 capitalize text-gray-medium heading-2">
            {title}
          </span>
          <p className="w-[290px] font-medium tracking-tighter text-gray-dark">
            {info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitkokCard;
