// import { gsap } from "gsap"

const getCanvasPixelColor = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number
) => {
  // if it's not a context, it's probably a canvas element
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // extract the pixel data from the canvas
  const pixel = ctx.getImageData(x, y, 1, 1).data;

  // set each color property
  const r = pixel[0]?.toString();
  const g = pixel[1]?.toString();
  const b = pixel[2]?.toString();
  const a = pixel[3]?.toString();

  // convenience CSS strings

  return {
    r: r === "0" ? "00" : r || "00",
    g: g === "0" ? "00" : g || "00",
    b: b === "0" ? "00" : b || "00",
    a: a === "0" ? "00" : a || "00",
  };
};

function getElementPosition(canvas: HTMLCanvasElement) {
  let curleft = 0,
    curtop = 0;
  if (canvas.offsetParent) {
    do {
      curleft += canvas.offsetLeft;
      curtop += canvas.offsetTop;
    } while ((canvas = canvas.offsetParent));
    return { x: curleft, y: curtop };
  }
  return { x: 0, y: 0 };
}

export const pixelColorHandler = (e: MouseEvent) => {
  const element = document.getElementById(
    "screenshot-root"
  ) as HTMLCanvasElement;
  const pos = getElementPosition(element);

  const color = getCanvasPixelColor(element, e.pageX - pos.x, e.pageY - pos.y);
  return color;
};
