import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

const config = { className: ".os-theme-light" };

type SmoothScrollargs = {
  animationTime: number;
  stepSize: number;
  accelerationDelta: number;
  accelerationMax: number;
  keyboardSupport: boolean;
  arrowScroll: number;
  pulseAlgorithm: boolean;
  pulseScale: number;
  pulseNormalize: number;
  touchpadSupport: boolean;
};

declare global {
  interface Window {
    SmoothScroll: (arg: SmoothScrollargs) => void;
  }
}

const SmoothScrollbar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js";
    script.async = true;
    document.body.appendChild(script);
    const SmoothScroll = window.SmoothScroll;
    SmoothScroll({
      animationTime: 800,
      stepSize: 75,
      accelerationDelta: 30,
      accelerationMax: 2,
      keyboardSupport: true,
      arrowScroll: 50,
      pulseAlgorithm: true,
      pulseScale: 4,
      pulseNormalize: 1,
      touchpadSupport: true,
    });
  }, []);

  return null;
};

export default SmoothScrollbar;
