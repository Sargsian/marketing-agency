import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Header from "src/components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "src/components/Footer";

export const getStaticProps = async ({ locale = "rus" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Policy = () => {
  const { t } = useTranslation("policy");

  const title = t("header");

  console.log(title);
  return (
    <>
      <Head>
        <title>{`Boost - ${title}`}</title>
        <meta name="title" content="Page doesnt exist" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <Image
        priority
        src={"/assets/images/404.png"}
        alt="404"
        width={1920}
        className="absolute origin-top scale-[150%] md:left-[20%] md:top-0 md:scale-100"
        height={100}
      />
      <div className="relative px-[10px] pt-[130px] font-jost md:px-10">
        <h1 className="max-w-[600px] text-[32px] font-semibold leading-none tracking-tighter drop-shadow-lg sm:text-6xl md:text-7xl md:leading-[96px] xl:text-[96px]">
          {t("title")}
        </h1>
        <div className="mt-[58px] md:mt-[100px] flex max-w-[470px] flex-col gap-[58px] md:gap-[93px] drop-shadow-lg md:drop-shadow-none">
          <div>
            <h3 className="mb-8 md:mb-[37px] uppercase heading-5">
              {t("protectionHeader")}
            </h3>
            <p className="whitespace-pre-line opacity-60 drop-shadow-md lead-1 md:drop-shadow-none">
              {t("protectionText")}
            </p>
          </div>
          <div id="terms">
            <h3 className="mb-8 md:mb-[37px] uppercase heading-5">
              {t("cookieHeader")}
            </h3>
            <p className="whitespace-pre-line opacity-60 lead-1">
              {t("cookieText1")}
            </p>
            <a
              className="uppercase link"
              href="http://www.google.com/privacy/ads/"
              target="_blank"
            >
              https://www.google.com/privacy/ads/
            </a>
            <p className="opacity-60 lead-1"> {t("cookieText2")}</p>
          </div>
          <div>
            <h3 className="mb-8 md:mb-[37px] uppercase heading-5">
              {t("confidentialInfoHeader")}
            </h3>
            <p className="opacity-60 lead-1">{t("confidentialInfoText")}</p>
          </div>
          <h2 className="uppercase heading-4">{t("appreciation")}</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;
