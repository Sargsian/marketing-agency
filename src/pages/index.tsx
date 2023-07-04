import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Page from "src/components/Page";
import type { ReactElement } from "react";
import { PrimaryLayout } from "src/components/Layouts/Primary/PrimaryLayout";

export const getStaticProps = async ({ locale = "rus" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};
export default function Home() {
  return <Page companyName="Tiktok" />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
