import type { CompanyTypes } from "src/components/Page";
import { usePlatform } from "src/store/PlatformContext";

type Props = {
  continent?: string;
  children: string;
} & CompanyTypes;

const SidebarSection = ({ companyName, children, continent }: Props) => {
  const { currentPlatform } = usePlatform();
  const childrenArr = children.split(",");
  const wrappableString = childrenArr.map((country, i) => (
    <span key={i}>
      {country}
      {childrenArr.length - 1 === i ? "" : ","}&#8203;
    </span>
  ));
  return (
    companyName === currentPlatform && (
      <div className="mb-5 uppercase text-black">
        <p className="text-lg font-medium leading-[140%] tracking-[-0.81px]">
          {continent}:
        </p>
        <div className="text-sm">
          <>{wrappableString}</>
        </div>
      </div>
    )
  );
};

export default SidebarSection;
