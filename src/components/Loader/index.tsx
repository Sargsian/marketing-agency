import { useProgress } from "@react-three/drei";
import Image from "next/image";
import CustomCursor from "src/components/Loader/CustomCursor";
import LoadingSpinner from "src/components/LoadingSpinner";

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  const links = {
    tiktok: "https://boost-ads.io/tiktok",
    bigo: "https://boost-ads.io/bigo",
    meta: "https://boost-ads.io/meta",
  };

  return (
    <div className="absolute inset-0 z-[50000000] flex items-center justify-center bg-black">
      <span className="absolute top-[34px] block h-[37px] w-[63px]">
        <Image
          src={"/icons/loadingAngles.svg"}
          width={63}
          height={37}
          priority
          alt="loading-angles"
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent subtitle">
          {progress.toFixed(0)}%
        </span>
      </span>
      <div className="relative h-[1px] w-full max-w-[1220px]">
        <span className="absolute block h-full w-full bg-accent opacity-40"></span>
        <span
          style={{ width: `${progress.toFixed(0)}%` }}
          className="absolute block h-full bg-accent"
        ></span>
        <div className="mt-3 flex w-full items-center justify-between">
          <div className="flex gap-2">
            <Image
              src={"/icons/loadingIcon.svg"}
              width={12}
              height={6}
              priority
              alt="loading-icon"
            />
            <span className="text-accent subtitle">Loading</span>
          </div>
          <div>
            <span className="text-accent subtitle">
              {progress < 33
                ? links.tiktok
                : progress > 33 && progress < 66
                ? links.bigo
                : links.meta}
            </span>
          </div>
        </div>
      </div>
      <CustomCursor />
    </div>
  );
};

export default Loader;
