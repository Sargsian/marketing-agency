interface sideProps {
  side: "left" | "right";
}

interface verticalSideProps extends sideProps {
  verticalSide: "top" | "bottom";
  arbitraryVerticalSide?: never;
  offset?: never;
}

interface showAtProps {
  showAt?: "sm" | "md" | "lg" | "xl" | "2xl" | "all";
  hideAt?: never;
}

interface hideAtProps {
  hideAt?: "sm" | "md" | "lg" | "xl" | "2xl";
  showAt?: never;
}

interface arbitraryVerticalSideProps extends sideProps {
  verticalSide?: never;
  arbitraryVerticalSide: "top" | "bottom";
  offset: number;
}

type Props = sideProps &
  (verticalSideProps | arbitraryVerticalSideProps) &
  (showAtProps | hideAtProps);

const Dot = ({
  side,
  arbitraryVerticalSide,
  verticalSide,
  offset,
  showAt,
  hideAt,
}: Props) => {
  const showAtBreakpoints = {
    sm: "sm:inline hidden",
    md: "md:inline hidden",
    lg: "lg:inline hidden",
    xl: "xl:inline hidden",
    "2xl": "2xl:inline hidden",
    all: "inline",
  };

  const hideAtBreakpoints = {
    sm: "inline sm:hidden",
    md: "inline md:hidden",
    lg: "inline lg:hidden",
    xl: "inline xl:hidden",
    "2xl": "inline 2xl:hidden",
  };

  const dotStyles = () => {
    if (arbitraryVerticalSide) {
      return {
        [arbitraryVerticalSide]: `calc(50% - ${offset + 2}px)`,
      };
    } else return { [verticalSide]: "-2px" };
  };

  return (
    <>
      {arbitraryVerticalSide && (
        <span
          style={{
            [arbitraryVerticalSide === "top"
              ? "bottom"
              : "top"]: `calc(50% + ${offset}px)`,
            [side]: "-1px",
            height: `calc(50% - ${offset}px)`,
          }}
          className={`absolute z-20 w-[1px] bg-white bg-opacity-20 ${
            showAtBreakpoints[showAt || "all"]
          }`}
        />
      )}

      <span
        style={{
          ...dotStyles(),
          [side]: "-2px",

          backgroundColor: "#FFA217",
        }}
        className={`absolute z-20 h-[3px] w-[3px] bg-accent ${
          showAtBreakpoints[showAt || "all"]
        } ${hideAt ? hideAtBreakpoints[hideAt] : ""}`}
      />
    </>
  );
};

export default Dot;
