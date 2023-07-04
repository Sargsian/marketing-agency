import { appWithTranslation } from "next-i18next";
import "src/styles/globals.css";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default appWithTranslation(MyApp);
