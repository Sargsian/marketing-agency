import { useEffect, useLayoutEffect, useRef } from "react";

export function useOffset(pause?: boolean) {
  const timeRef = useRef({ time: 0 });
  const offsetTimeRef = useRef({ time: 0 });

  useEffect(() => {
    timeRef.current.time = new Date().getTime() / 1000;
  }, []);

  useLayoutEffect(() => {
    if (pause) {
      offsetTimeRef.current.time =
        new Date().getTime() / 1000 - offsetTimeRef.current.time;
    } else if (offsetTimeRef.current.time !== 0) {
      offsetTimeRef.current.time =
        new Date().getTime() / 1000 - offsetTimeRef.current.time;
    }
  }, [pause]);

  const animationTime = () => {
    const time = new Date().getTime() / 1000;
    const newTime = time - timeRef.current.time - offsetTimeRef.current.time;
    return newTime;
  };

  return animationTime;
}
