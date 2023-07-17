import Image from "next/image";
import Dot from "src/components/Dot";
import type { CompanyTypes } from "src/components/Page";

const MetaCard = ({
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
      className={`group relative flex flex-1 py-9 sm:py-[70px] ${
        true ? "[&:nth-child(-n+2)]:border-b" : "border-none"
      } items-center justify-center border-white border-opacity-20 lg:[&:nth-child(-n+2)]:border-t even:pl-4 odd:pr-4`}
    >
      {number === 1 && (
        <>
          <Dot side="left" verticalSide="top" />
        </>
      )}
      {number === 2 && (
        <>
          <Dot side="left" arbitraryVerticalSide="top" offset={0} />
          <Dot side="right" verticalSide="top" />
        </>
      )}
      {number === 3 && (
        <>
          <Dot side="right" arbitraryVerticalSide="bottom" offset={0} />
        </>
      )}

      <span className="absolute top-0 h-full w-[62%] group-even:right-0 group-odd:left-0">
        {number === 1 && <Dot side="right" verticalSide="top" />}
        {number === 2 && <Dot side="left" verticalSide="top" />}
        {number === 3 && <Dot side="right" verticalSide="bottom" />}
        {number === 4 && <Dot side="left" verticalSide="bottom" />}
      </span>

      <div className="flex gap-8 group-even:ml-auto group-odd:mr-auto">
        <div className="flex">
          <Image
            src={`/icons/${name}.svg`}
            width={270}
            height={100}
            priority
            alt={`${title}-icon`}
          />
        </div>
        <div className="flex max-h-[300px] flex-col">
          <span className="absolute right-[10px] top-[36px] mb-4 align-top font-jetbrains text-accent opacity-70 lg:static">
            00{number}
          </span>
          <span className="mb-5 max-w-[405px] capitalize text-gray-medium heading-2 sm:mb-8">
            {title}
          </span>
          <p className="max-w-[290px] font-medium tracking-tighter text-gray-dark">
            {info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetaCard;
