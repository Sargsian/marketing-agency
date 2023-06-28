import { useTranslation } from "next-i18next";

const Input = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder?: string;
}) => {
  const { t } = useTranslation("form");
  return (
    <div className="relative flex flex-1 flex-col">
      <label className="subtitle" htmlFor="">
        {t(name)} <span className="absolute top-[-7px] pl-1">*</span>
      </label>
      <input
        className="border-b border-white border-opacity-40 bg-transparent py-2 text-sm text-white placeholder-white placeholder-opacity-50 outline-none"
        type="text"
        placeholder={placeholder}
      />
      {name.toLowerCase() === "budget" && (
        <span className="absolute bottom-2 right-0 font-jetbrains text-xs font-medium">
          [+]
        </span>
      )}
    </div>
  );
};

export default Input;
