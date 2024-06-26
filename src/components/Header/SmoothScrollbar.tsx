import { ReactNode, useEffect } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

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

const SmoothScrollbar = ({children}: {children: ReactNode}) => {
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: { theme: "os-theme-light" },
      overflow: { x: "visible-hidden" },
    },
    defer: true,
  });

  const initializeSmoothScroll = () => {
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
  };

  useEffect(() => {
    console.log('smoothScrollbar')
    initializeSmoothScroll();
    initialize({
      target: document.body,
      cancel: {
        nativeScrollbarsOverlaid: true,
        body: null,
      },
    });
  }, []);

  return <>{children}</>;
};

export default SmoothScrollbar;
