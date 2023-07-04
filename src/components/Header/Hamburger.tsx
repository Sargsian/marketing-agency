const Hamburger = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative z-50 h-6 w-6 text-white focus:outline-none"
    >
      <span className="sr-only invisible">Open main menu</span>
      <div className="absolute top-1/2 h-[10px] w-full -translate-y-1/2 ">
        <span
          className={`absolute top-0 block h-[2px] w-6 transform rounded bg-current transition-all duration-500 ease-in-out ${
            open ? "top-[4px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`absolute bottom-0 block h-[2px] w-6 transform rounded bg-current transition-all duration-500 ease-in-out ${
            open ? " bottom-[4px] -rotate-45" : ""
          }`}
        ></span>
      </div>
    </button>
  );
};

export default Hamburger;

// first line -translate-y-1.5
// second line opacity-0: onOpen
// third line {-rotate-45: open,  translate-y-1.5: !open}
