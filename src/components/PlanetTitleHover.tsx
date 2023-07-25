import { gsap } from "gsap";
import { type MouseEvent } from "react";

const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

const PlanetTitleHover = ({ children }: { children: string }) => {
  const shuffleChars = (e: MouseEvent) => {
    const target = e.currentTarget.childNodes;
    target.forEach((char) => {
      const onCompleteHandler = (charElement: HTMLSpanElement) => {
        gsap.set(char, {
          innerHTML: charElement.dataset.initial,
          delay: 0.03,
        });
      };
      if (char.textContent === " ") {
        return;
      }
      gsap.killTweensOf(char);
      gsap.fromTo(
        char,
        {
          opacity: 0,
        },
        {
          duration: 0.03,
          innerHTML: () =>
            lettersAndSymbols[
              Math.floor(Math.random() * lettersAndSymbols.length)
            ],
          repeat: 3,
          repeatRefresh: true,
          opacity: 1,
          repeatDelay: 0.05,
          onComplete: () => onCompleteHandler(char as HTMLSpanElement),
        }
      );
    });
  };

  return (
    <span onMouseEnter={shuffleChars}>
      {children.split("").map((char, i) => (
        <span key={i} data-initial={char}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default PlanetTitleHover;
