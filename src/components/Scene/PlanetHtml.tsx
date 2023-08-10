import { Html } from "@react-three/drei";
import PlanetTitleHover from "src/components/Scene/PlanetTitleHover";
import { type Camera, type Object3D, Vector3 } from "three";

type Props = {
  hovered: boolean;
  name: "Bigo" | "Tiktok" | "Meta";
  setHovered: (state: boolean) => void;
  onClick: () => void;
};

const PlanetHtml = ({ hovered, onClick, setHovered, name }: Props) => {
  const v1 = new Vector3();

  const overrideCalculatePosition = (
    el: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    objectPos.project(camera);
    const width = size.width / 2;
    const height = size.height / 2;

    console.log([
      objectPos.x * width + width,
      window.innerHeight,
      -objectPos.y * height + height,
    ]);

    return [objectPos.x * width + width, -objectPos.y * height + height];
  };

  return (
    <Html calculatePosition={overrideCalculatePosition} as="div">
      <span
        className={`absolute right-0 top-0 inline-block h-[8px] w-[8px] rounded-full outline outline-1 outline-offset-1 outline-[#ffffff77] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:delay-150 ${
          hovered
            ? "before:h-[10px] before:w-[10px]"
            : "before:h-[6px] before:w-[6px]"
        }`}
      >
        <span
          className={`absolute right-1 top-1/4 h-[1px] w-[100px] origin-right rotate-[35deg] rounded bg-white subpixel-antialiased transition-all [backface-visibility:hidden] ${
            hovered ? "visible delay-500" : "invisible delay-[2s]"
          }`}
        >
          <span
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            className="absolute bottom-[-41px] right-[95%] inline-block h-5 min-w-[150px] -rotate-[35deg]"
          >
            <span className="font-jetbrains text-sm font-medium tracking-[-1.4px]">
              {/* TikTok Planet */}
              <span className="[backface-visibility:hidden]">
                <PlanetTitleHover onClick={onClick}>
                  {`${name} Planet`}
                </PlanetTitleHover>
              </span>
              <div className="absolute top-[30px] w-full rounded-sm bg-white p-1 text-[10px] leading-[14px] text-black [backface-visibility:hidden]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
                delectus, asperiores architecto sint hic illo impedit maiores
                reiciendis maxime in nulla labore ratione quod eveniet pariatur
                repellendus voluptas ab doloremque.
              </div>
            </span>
            <span className="absolute bottom-[-5px] left-[1px] h-[1px] w-[calc(100%)] cursor-auto rounded bg-white [backface-visibility:hidden]"></span>
          </span>
        </span>
      </span>
    </Html>
  );
};

export default PlanetHtml;
