import Dot from "src/components/Dot";
import Button from "src/components/Button";
import Input from "src/components/sections/ApplicationForm/Input";
import { useTranslation } from "next-i18next";
import { EventHandler, FormEvent, FormEventHandler, useState } from "react";

const ApplicationForm = () => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation("form");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mb-10 flex flex-col text-white lg:mb-20 xl:mb-32 xl:flex-row 2xl:mb-44">
      <div className="relative inline-block flex-1 border-b border-t border-white border-opacity-20">
        <Dot side="left" verticalSide="top" />
        <Dot side="right" verticalSide="top" />
        <Dot
          side="left"
          arbitraryVerticalSide="bottom"
          offset={33}
          showAt="xl"
        />
        <Dot side="left" verticalSide="bottom" />
        <Dot side="right" verticalSide="bottom" />
        <Dot side="right" arbitraryVerticalSide="top" offset={33} showAt="xl" />

        <h1 className="block py-6 uppercase heading-1 xl:py-7 xl:text-start">
          {t("heading")}
        </h1>
      </div>
      <div className="relative border-white border-opacity-20 px-3 xl:mx-0 xl:w-[910px] xl:border-b xl:border-t">
        <Dot side="right" verticalSide="top" showAt="xl" />
        <Dot side="right" verticalSide="bottom" showAt="xl" />
        <Dot
          side="right"
          arbitraryVerticalSide="bottom"
          offset={33}
          showAt="xl"
        />
        <form
          className="mx-auto flex max-w-[600px] flex-col gap-[59px] py-[66px]"
          action=""
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-5">
            <Input name="name" />
            <Input name="telegram" />
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-5">
            <Input placeholder="500$" name="budget" />
            <Input name="email" />
          </div>
          <div className="flex flex-col">
            <label
              className="relative mb-[5px] font-jetbrains text-sm font-medium"
              htmlFor="message"
            >
              {t("message")}
              <span className="absolute top-[-7px] pl-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={1}
              onChange={(e) => setMessage(e.currentTarget.value)}
              cols={37}
              placeholder={t("messagePlaceholder")}
              className="border-b border-white border-opacity-40 bg-transparent py-2 placeholder-white placeholder-opacity-50 outline-none"
            ></textarea>
          </div>
          <div className="flex w-full items-center gap-[7px]">
            <span className="relative flex-1 after:absolute after:right-0 after:top-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-40 xl:hidden">
              <Dot verticalSide="top" side="right" />
            </span>
            <Button classNames="flex-[2]" disabled={!message} type="submit">
              {t("button")}
            </Button>
            <span className="relative flex-1 after:absolute after:right-0 after:top-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-40 xl:hidden">
              <Dot verticalSide="top" side="left" />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
