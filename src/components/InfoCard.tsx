import Image from "next/image";

const InfoCard = ({ text }: { text: string }) => {
  return (
    <div className="flex h-[160px] w-[290px] items-center justify-between rounded-[5px] bg-gray-light p-[5px] text-center">
      <Image
        src={"/icons/angles-left.svg"}
        width={7}
        height={150}
        className=""
        alt="diagonal-arrow"
      />
      <p className=" text-lg uppercase font-jetbrains leading-[130%] font-medium tracking-[-0.81px]">{text}</p>
      <Image
        src={"/icons/angles-left.svg"}
        width={7}
        height={150}
        className="rotate-180"
        alt="diagonal-arrow"
      />
    </div>
  );
};

export default InfoCard;
