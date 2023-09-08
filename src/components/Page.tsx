import { useEffect } from "react";
import Advantages from "src/components/sections/Advantages";
import ApplicationForm from "src/components/sections/ApplicationForm";
import Company from "src/components/sections/Company/Index";
import Geo from "src/components/sections/Geo";
import HowToStart from "src/components/sections/HowToStart";
import NextView from "src/components/sections/NextView";
import PriceList from "src/components/sections/PriceList";
import { usePlatformDispatch } from "src/store/PlatformContext";

export type CompanyTypes = { companyName: "Tiktok" | "Bigo" | "Meta" };

const Page = ({ companyName }: CompanyTypes) => {
  const dispatch = usePlatformDispatch();

  useEffect(() => {
    dispatch({
      type: "platform",
      payload: {
        currentPlatform: companyName,
      },
    });
  }, [companyName, dispatch]);

  return (
    <>
      <ApplicationForm />
      <Company companyName={companyName} />
      <Geo companyName={companyName} />
      <Advantages companyName={companyName} />
      <PriceList companyName={companyName} />
      <HowToStart />
      <ApplicationForm />
      <NextView companyName={companyName} />
    </>
  );
};

export default Page;
