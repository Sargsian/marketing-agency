import Head from "next/head";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Hero from "src/components/Hero";
import { createContext, useState } from "react";

interface PrimaryLayoutProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}
export const CanvasContext = createContext(false);

export const PrimaryLayout = ({
  children,
  title = "Boost Agency",
  description = "Маркетинговое агентство - Boost",
  keywords = "маркетинг, продвижение",
  type = "website",
  url = "https://boost.ru",
  image,
}: PrimaryLayoutProps) => {
  const [threeIsLoaded, setThreeIsLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="noindex,nofollow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        <link rel="icon" href="/logo.svg" />
      </Head>
      <CanvasContext.Provider value={threeIsLoaded}>
        <Header />
        {/* 3d scene and hero */}
        <Hero setThreeIsLoaded={setThreeIsLoaded} />
        <main
          id="main-content"
          className="mx-auto max-w-[1550px] px-3 font-jost sm:px-5"
        >
          {children}
        </main>
      </CanvasContext.Provider>
    </>
  );
};
