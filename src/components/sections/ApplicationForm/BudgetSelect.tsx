import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { type BudgetType } from "src/components/sections/ApplicationForm/Form";

const budget = [{ budget: "500$" }, { budget: "1000$" }, { budget: "10000$" }];

type Props = {
  selectedBudget: BudgetType;
  isValid: boolean;
  setSelectedBudget: (budget: BudgetType) => void;
};

const BudgedSelect = ({
  selectedBudget,
  setSelectedBudget,
  isValid,
}: Props) => {
  const { t } = useTranslation("form");
  return (
    <Listbox value={selectedBudget} onChange={setSelectedBudget}>
      {({ open }) => (
        <div className="relative mb-1 flex flex-1 flex-col font-jetbrains">
          <span
            className={`inline-block subtitle ${
              isValid ? "text-green-500" : ""
            }`}
          >
            {t("budget")}
            <span className="absolute top-[-7px] pl-1">*</span>
          </span>
          <span
            className={`absolute bottom-2 right-0 text-xs font-medium ${
              isValid ? "text-green-500" : ""
            }`}
          >
            {open ? "[-]" : "[+]"}
          </span>
          <Listbox.Button
            className={`border-b border-opacity-40 bg-transparent py-2 text-start text-sm outline-none ${
              isValid
                ? "border-green-500 text-green-500"
                : "border-white text-white"
            }`}
          >
            {selectedBudget?.budget}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute top-[calc(100%+13px)] z-10 max-h-60 w-full rounded-md bg-black text-base text-white focus:outline-none sm:text-sm"
            >
              {budget.map((item, amountIdx) => (
                <Listbox.Option
                  key={amountIdx}
                  className={({ active }) =>
                    `relative mb-[5px] cursor-pointer select-none overflow-hidden rounded-[3px] border border-white border-opacity-40 px-[10px] py-[5px] before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-black ${
                      active ? "bg-[#595953] bg-opacity-20" : "bg-black"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`flex w-full truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <span className="mr-auto inline-block">Budget</span>
                        {item.budget}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default BudgedSelect;
