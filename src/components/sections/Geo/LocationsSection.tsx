import Dot from "src/components/Dot";
import type { CompanyTypes } from "src/components/Page";
import { usePlatform } from "src/store/PlatformContext";

type Props = {
  children: string;
  number: number;
} & CompanyTypes;

const LocationsSection = ({ children, number, companyName }: Props) => {
  const { currentPlatform } = usePlatform();

  return (
    companyName === currentPlatform && (
      <div className="relative flex w-full items-center justify-between border-t border-white border-opacity-20 py-7 text-right uppercase heading-3">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <span className="mr-1 opacity-60 heading-4">0{number}</span>
        <span className="heading-4">{children}</span>
      </div>
    )
  );
};

export default LocationsSection;
