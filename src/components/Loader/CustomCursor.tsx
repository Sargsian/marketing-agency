import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const mainCursor = useRef<HTMLDivElement>(null);
  const secondaryCursor = useRef<HTMLDivElement>(null);
  const [isInteracted, setIsInteracted] = useState(false);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  useEffect(() => {
    const interacted = () => {
      setIsInteracted(true);
    };
    const eventListener = (e: MouseEvent) => {
      if (!mainCursor.current || !secondaryCursor.current) return;
      const { clientX, clientY } = e;

      const mouseX = clientX;
      const mouseY = clientY;

      positionRef.current.mouseX =
        mouseX - secondaryCursor.current.clientWidth / 2;
      positionRef.current.mouseY =
        mouseY - secondaryCursor.current.clientHeight / 2;
      mainCursor.current.style.transform = `translate3d(${
        mouseX - mainCursor.current.clientWidth / 2
      }px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`;
    };

    document.addEventListener("mousemove", eventListener);
    document.addEventListener("mousemove", interacted);

    return () => {
      document.removeEventListener("mousemove", eventListener);
      document.removeEventListener("mousemove", interacted);
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      if (!secondaryCursor.current) return;
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, []);

  return (
    <div
      style={
        isInteracted
          ? { position: "static" }
          : { top: "50%", left: "50%", position: "fixed" }
      }
    >
      <div className="absolute left-0 top-0" ref={mainCursor}></div>
      <div className="absolute left-[25px] top-[-35px]" ref={secondaryCursor}>
        <span className="bar bar-small bar-1" />
        <span className="bar bar-small bar-2" />
        <span className="bar bar-small bar-3" />
        <span className="bar bar-small bar-4" />
        <span className="bar bar-small bar-5" />
        <span className="bar bar-small bar-6" />
      </div>
    </div>
  );
};

export default CustomCursor;
