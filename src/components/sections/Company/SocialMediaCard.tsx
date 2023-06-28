import Image from "next/image";
import Dot from "src/components/Dot";

const SocialMediaCard = ({
  name,
  number,
  info,
}: {
  name: string;
  number: number;
  info: string;
}) => {
  return (
    <div
      className={`relative py-9 lg:flex [@media(min-width:650px)]:py-24 ${
        number === 2 ? "flex-[1.3]" : "flex-1"
      } basis-1/5 items-center justify-center border-white border-opacity-20 lg:border-t 2xl:basis-0`}
    >
      {number === 1 && (
        <>
          <Dot side="left" verticalSide="top" showAt="lg" />
        </>
      )}
      {number === 2 && (
        <>
          <Dot side="left" verticalSide="top" showAt="lg" />
          <Dot side="right" verticalSide="top" showAt="lg" />
          <Dot side="left" arbitraryVerticalSide="top" offset={0} showAt="lg" />
        </>
      )}
      {number === 3 && (
        <>
          <Dot side="right" verticalSide="top" showAt="lg" />
          <Dot side="left" verticalSide="bottom" showAt="lg" />
          <Dot
            side="left"
            arbitraryVerticalSide="bottom"
            offset={0}
            showAt="lg"
          />
        </>
      )}

      <div className="flex flex-col [@media(max-width:649px)]:items-center">
        <div className="flex flex-col">
          <div className="relative mb-6 aspect-square w-[100px] sm:mb-8 [@media(max-width:649px)]:w-full">
            <Image
              src={`/icons/${name}.svg`}
              fill
              priority
              style={{ objectFit: "contain" }}
              alt={`${name}-icon`}
            />
          </div>
          <span className="absolute right-[10px] top-[36px] mb-4 align-top font-jetbrains text-accent opacity-70 lg:static">
            00{number}
          </span>
          <span className="mb-5 capitalize text-gray-medium heading-2 sm:mb-8">
            {name}
          </span>
          <p className="w-[290px] font-medium tracking-tighter text-gray-dark">
            {info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
