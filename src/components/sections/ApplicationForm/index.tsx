import { useTranslation } from "next-i18next";
import Dot from "src/components/Dot";
import Form from "./Form";

const ApplicationForm = () => {
  const { t } = useTranslation("form");

  return (
    <div className="mb-10 flex flex-col text-white lg:mb-20 xl:mb-32 xl:flex-row 2xl:mb-44">
      <div className="relative inline-block flex-1 border-b border-t border-white border-opacity-20 xl:min-w-[623px]">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <Dot
          side="left"
          arbitraryVerticalSide="bottom"
          offset={33}
          showAt="xl"
        />
        <Dot side="left" verticalSide="bottom" />
        <Dot side="right" verticalSide="bottom" />
        <Dot side="right" arbitraryVerticalSide="top" offset={33} showAt="xl" />

        <h1 className="block py-6 uppercase heading-1 xl:py-7 xl:text-start">
          {t("heading")}
        </h1>
      </div>
      <div className="relative @container border-white border-opacity-20 xl:mx-0 xl:w-[910px] xl:border-b xl:border-t">
        <Dot side="right" verticalSide="top" showAt="xl" />
        <Dot side="right" verticalSide="bottom" showAt="xl" />
        <Dot
          side="right"
          arbitraryVerticalSide="bottom"
          offset={33}
          showAt="xl"
        />
        <Form />
      </div>
    </div>
  );
};

export default ApplicationForm;
