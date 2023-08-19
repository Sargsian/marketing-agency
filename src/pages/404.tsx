import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { type SSRConfig } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "src/components/Header";

export const getStaticProps = async ({ locale = "rus" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
  // console.log(locale) // Logs current locale
  // // ...
};

export default function Custom404(props: SSRConfig) {
  const locale = props._nextI18Next?.initialLocale;

  let message;

  if (locale === "eng") {
    message = (
      <span>
        You are actually lost but don&apos;t worry, you can{" "}
        <Link
          href={"/"}
          className="text-white text-opacity-70 underline underline-offset-4 transition-all hover:text-opacity-100"
        >
          click here
        </Link>{" "}
        to come back to home page and restart your experience.
      </span>
    );
  } else {
    message = (
      <span>
        Вы на самом деле заблудились, но не волнуйтесь, вы можете{" "}
        <Link
          href={"/"}
          className="text-white text-opacity-70 underline underline-offset-4 transition-all hover:text-opacity-100"
        >
          нажать здесь,
        </Link>{" "}
        чтобы вернуться на домашнюю страницу и начать заново.
      </span>
    );
  }

  return (
    <>
      <Head>
        <title>{`${
          locale === "eng" ? "Page doesn't exist" : "Страница не существует"
        }`}</title>
        <meta name="title" content="Page doesnt exist" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <div className="h-screen">
        <div className="relative h-screen w-full">
          <Image
            src={"/assets/images/404.png"}
            alt="404"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="absolute bottom-10 left-0 flex w-full flex-col-reverse items-center justify-between gap-24 px-10 md:flex-row md:gap-0">
          <p className="max-w-[400px] font-jost font-medium leading-[130%] tracking-[-0.8px] text-white text-opacity-70">
            {message}
          </p>
          <div className="drop-shadow-lg">
            <p className="font-jost text-[96px] font-semibold leading-[100%] tracking-[-4.8px]">
              404
              <span className="text-[96px] text-accent">.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
