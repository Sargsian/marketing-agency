import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";
import Header from "src/components/Header";
import { PrimaryLayout } from "src/components/Layouts/Primary/PrimaryLayout";

export default function Custom404() {
  return (
    <>
    <Head>
        <title>Boost - 404</title>
        <meta name="title" content='Page doesnt exist' />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <div className="h-screen">
        <div className="w-full h-screen relative">
          <Image
            src={"/assets/images/404.png"}
            alt="404"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="absolute bottom-10 left-0 flex w-full items-center md:flex-row flex-col-reverse md:gap-0 gap-24 justify-between px-10">
          <p className="max-w-[400px] font-jost font-medium leading-[130%] tracking-[-0.8px] text-white text-opacity-70">
            You are actually lost but don&apos;t worry, you can{" "}
            <Link
              href={"/"}
              className="text-white text-opacity-70 underline underline-offset-4 transition-all hover:text-opacity-100"
            >
              click here
            </Link>{" "}
            to come back to home page and restart your experience.
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
