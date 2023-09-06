import Head from "next/head";
import Header from "src/components/Header";
import Hero from "src/components/Hero";
import { SceneProvider } from "src/store/SceneContext";

interface PrimaryLayoutProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}

export const PrimaryLayout = ({
  children,
  title = "BOOST - Mobile App Marketing Agency",
  description = "Promote your mobile apps and brands worldwide on the leading ad platforms and social media.",
  keywords = "маркетинг, продвижение, marketing, promotion",
  type = "website",
  url = "https://boost-ads.io/",
  image = '/assets/images/metaImage.jpg',
}: PrimaryLayoutProps) => {
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
      <Header />
      {/* 3d scene and hero */}
      <SceneProvider>
        <Hero />
      </SceneProvider>
      <main
        id="main-content"
        className="mx-auto max-w-[1550px] px-3 font-jost sm:px-5"
      >
        {children}
      </main>
    </>
  );
};
