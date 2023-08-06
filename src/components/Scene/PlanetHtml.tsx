import { Html } from "@react-three/drei";
import PlanetTitleHover from "src/components/Scene/PlanetTitleHover";

type Props = {
  hovered: boolean;
  name: "Bigo" | "Tiktok" | "Meta";
  setHovered: (state: boolean) => void;
  onClick: () => void;
};

const PlanetHtml = ({ hovered, onClick, setHovered, name }: Props) => {
  return (
    <Html distanceFactor={40} center as="div" className="h-20 bg-red-300">
      <span
        className={`absolute bottom-16 right-16 inline-block h-[8px] w-[8px] rounded-full outline outline-1 outline-offset-1 outline-[#ffffff77] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:delay-150 ${
          hovered
            ? "before:h-[10px] before:w-[10px]"
            : "before:h-[6px] before:w-[6px]"
        }`}
      >
        <span
          className={`absolute right-1 top-1/4 h-[1px] w-[100px] origin-right rotate-[35deg] rounded bg-white transition-all delay-500 ${
            hovered ? "visible" : "invisible"
          }`}
        >
          <span
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            className="absolute bottom-[-41px] right-[95%] inline-block h-5 min-w-[150px] -rotate-[35deg]"
          >
            <span className="font-jetbrains text-sm font-medium tracking-[-1.4px]">
              {/* TikTok Planet */}
              <span>
                <PlanetTitleHover onClick={onClick}>
                  {`${name} Planet`}
                </PlanetTitleHover>
              </span>
              <div className="absolute top-[30px] w-full rounded-sm bg-white p-1 text-[10px] leading-[14px] text-black antialiased">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
                delectus, asperiores architecto sint hic illo impedit maiores
                reiciendis maxime in nulla labore ratione quod eveniet pariatur
                repellendus voluptas ab doloremque.
              </div>
            </span>
            <span className="absolute bottom-[-5px] left-[1px] h-[1px] w-[calc(100%)] cursor-auto rounded bg-white"></span>
          </span>
        </span>
      </span>
    </Html>
  );
};

export default PlanetHtml;
