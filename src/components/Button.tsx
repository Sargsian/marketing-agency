type Props = {
  children: string;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  classNames?: string;
};

const Button = ({ children, onClick, type, disabled, classNames }: Props) => {
  const conditions = `${type === "submit" ? "h-[44px]" : "h-[26px]"} ${
    disabled
      ? "pointer-events-none border bg-neutral-900 border-white text-white opacity-[40%]"
      : "bg-accent text-black"
  }`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`rounded-md px-[13px] text-sm transition-[background] hover:bg-[#AA6600] ${conditions} ${classNames || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
