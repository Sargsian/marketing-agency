import Image from "next/image";

const SliderCard = ({
  name,
  number,
  title,
  info,
}: {
  name: string;
  number: number;
  title: string;
  info: string;
}) => {
  return (
    <div
      className={`border-white border-opacity-20 py-9 sm:py-24`}
    >
      <div className="flex flex-col [@media(max-width:639px)]:items-center">
        <div className="flex max-h-[470px] flex-col">
          <div className="relative mb-6 aspect-square w-[100px] sm:mb-8 [@media(max-width:639px)]:w-full">
            <Image
              src={`/icons/${name}.svg`}
              fill
              priority
              style={{ objectFit: "contain" }}
              alt={`${title}-icon`}
            />
          </div>
          <span className="absolute right-[10px] top-[36px] mb-4 align-top font-jetbrains text-accent opacity-70">
            00{number}
          </span>
          <span className="mb-5 capitalize max-w-[290px] text-gray-medium heading-2 sm:mb-8">
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

export default SliderCard;
