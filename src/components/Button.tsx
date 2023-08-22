import Image from "next/image";

type Props = {
  children: string;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  classNames?: string;
};

const Button = ({
  children,
  onClick,
  type,
  disabled,
  classNames,
  loading,
}: Props) => {
  const conditions = `${type === "submit" ? "h-[44px]" : "h-[26px]"} ${
    disabled || loading
      ? "pointer-events-none border bg-neutral-900 border-white text-white opacity-[40%]"
      : "bg-accent text-black"
  }`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`relative rounded-md px-[13px] text-sm transition-[background] active:bg-[#AA6600] [@media(hover:hover)]:hover:bg-[#AA6600] ${conditions} ${
        classNames || ""
      }`}
    >
      {loading && (
        <Image
          src={"/icons/loadingSpinner.svg"}
          className="absolute left-1/2 -translate-x-1/2"
          height={24}
          width={24}
          alt="loading spinner"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
