import Head from "next/head";
import Image from "next/image";
import Header from "src/components/Header";

const success = () => {
  return (
    <>
      <Head>
        <title>Boost - Success</title>
        <meta name="title" content="Page doesnt exist" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <div className="relative h-screen w-full">
        <Image
          src={"/assets/images/success.png"}
          alt="404"
          style={{ objectFit: "contain" }}
          fill
        />
        <div className="absolute top-1/2 flex left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
          <h1 className="w-full font-jost text-[80px] [@media_(max-width:400px)]:whitespace-normal whitespace-nowrap md:text-[96px] font-semibold leading-[100%] tracking-[-5px]">
            Thank you
          </h1>
          <h3 className="max-w-[370px] mt-[40px] heading-5">
            We will review your request and get back to you as soon as possible
          </h3>
        </div>
      </div>
    </>
  );
};

export default success;
