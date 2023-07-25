import { useEffect, useState } from "react";

export function useIsVisible(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      return setIntersecting(entry.isIntersecting);
    });

    if (!ref.current) return;

    observer.observe(ref.current);
  }, [ref]);

  return isIntersecting;
}
