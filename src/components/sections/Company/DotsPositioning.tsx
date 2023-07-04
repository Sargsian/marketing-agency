import Dot from "src/components/Dot";
import type { CompanyTypes } from "src/components/Page";

const DotsPositioning = ({
  number,
  companyName,
}: {
  number: number;
  companyName: CompanyTypes;
}) => {
  return (
    <>
      {companyName.companyName === "Tiktok" && number === 1 && (
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
    </>
  );
};

export default DotsPositioning;
