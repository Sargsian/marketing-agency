import Image from "next/image";
import Dot from "src/components/Dot";

const SocialMediaCard = ({
  name,
  number,
}: {
  name: string;
  number: number;
}) => {
  return (
    <div
      className={`relative py-9 [@media(min-width:650px)]:py-24 lg:flex ${
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

      <div className="[@media(max-width:649px)]:items-center flex flex-col">
        <div className="flex flex-col">
          <div className="relative mb-6 sm:mb-8 aspect-square w-[100px] [@media(max-width:649px)]:w-full">
            <Image
              src={`/icons/${name}.svg`}
              fill
              priority
              style={{ objectFit: "contain" }}
              alt={`${name}-icon`}
            />
          </div>
          <span className="absolute right-[10px] top-[36px] mb-4 opacity-70 align-top font-jetbrains text-accent lg:static">
            00{number}
          </span>
          <span className="mb-5 sm:mb-8 capitalize text-gray-medium heading-2">
            {name}
          </span>
          <p className="w-[290px] font-medium tracking-tighter text-gray-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
