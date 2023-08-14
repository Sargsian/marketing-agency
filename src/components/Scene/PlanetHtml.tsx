import { Html } from "@react-three/drei";
import {
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("hero");

  const overrideCalculatePosition = (
    el: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    objectPos.project(camera);
    const width = size.width / 2;
    const height = size.height / 2;

    return [objectPos.x * width + width, -objectPos.y * height + height];
  };

  const mobileAndTabletCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substring(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent);
    return check;
  };

  const htmlRef = useCallback((node: HTMLElement | null) => {
    if (mobileAndTabletCheck() && node) {
      node.style.pointerEvents = "none";
    }
  }, []);

  return (
    <Html calculatePosition={overrideCalculatePosition} ref={htmlRef} as="div">
      <span
        className={`absolute right-0 top-0 inline-block h-[8px] w-[8px] rounded-full font-jetbrains outline outline-1 outline-offset-1 outline-[#ffffff77] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:delay-150 ${
          hovered
            ? "before:h-[10px] before:w-[10px]"
            : "before:h-[6px] before:w-[6px]"
        }`}
      >
        <span
          className={`pointer-events-none absolute right-[calc(100%+3px)] h-2 rotate-1 font-jost transition-opacity ${
            !hovered ? "opacity-100 delay-[2s]" : "opacity-0 delay-500"
          }`}
        >
          {name}
        </span>
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
            <span className="text-sm font-medium tracking-[-1.4px]">
              {/* TikTok Planet */}
              <span className="[backface-visibility:hidden]">
                <PlanetTitleHover onClick={onClick}>
                  {`${t("planet")} ${name}`}
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
