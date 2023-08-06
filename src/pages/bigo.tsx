import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Page from "src/components/Page";
import { type ReactElement } from "react";
import { PrimaryLayout } from "src/components/Layouts/Primary/PrimaryLayout";
import Footer from "src/components/Footer";

export const getStaticProps = async ({ locale = "rus" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};
export default function Bigo() {
  return <Page companyName="Bigo" />;
}

Bigo.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout title="Boost – Bigo">
      {page}
      <Footer />
    </PrimaryLayout>
  );
};
