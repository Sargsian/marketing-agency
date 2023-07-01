import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html data-overlayscrollbars-initialize>
      <Head />
      <body id='body' data-overlayscrollbars-initialize>
        <Main />
        <NextScript />
        <Script
          onLoad={() => console.log("script loaded")}
          src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
