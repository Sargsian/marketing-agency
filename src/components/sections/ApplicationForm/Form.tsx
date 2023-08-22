import Button from "src/components/Button";
import { useRef, useState } from "react";
import BudgedSelect from "./BudgetSelect";
import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Dot from "src/components/Dot";

export type BudgetType = {
  budget: string;
};

type formData = {
  name: string;
  email: string;
  telegram: string;
  message: string;
};

export type submitType = formData & BudgetType;

const Form = ({ sidebar }: { sidebar?: boolean }) => {
  const [selectedBudget, setSelectedBudget] = useState({ budget: "500$" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation("form");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const schema: ZodType<formData> = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    telegram: z.string().startsWith("@").min(6),
    message: z.string().min(10),
  });

  const {
    register,
    getFieldState,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid },
  } = useForm<formData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      message: "",
      name: "",
      telegram: "",
    },
  });

  const checkboxHandler = () => {
    setTermsAccepted(!termsAccepted);
  };

  const submitData = async (data: formData) => {
    if (isValid && termsAccepted) {
      setLoading(true);
      const res = await fetch("/api/formSender", {
        method: "POST",
        body: JSON.stringify({
          data: {
            email: data.email,
            message: data.message,
            name: data.name,
            telegram: data.telegram,
            budget: selectedBudget.budget,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (res.status === 200) {
        setTermsAccepted(false)
        if (sidebar) {
          setShowModal(true);
        } else {
          void router.replace("/success");
        }
      }

      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="relative mx-auto flex max-w-[600px] flex-col gap-10 overflow-hidden py-[66px] @sm:gap-[59px]"
    >
      <div
        className={`absolute left-0 top-0 z-30 h-full w-full overflow-hidden bg-[#111] transition-all ${
          showModal ? "visible translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="absolute top-1/3 -translate-y-1/2 text-center">
          <h4 className="mb-6 uppercase heading-4">
            {t('successHeader')}
          </h4>
          <p className="opacity-40">
            {t('successText')}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 @sm:flex-row @sm:gap-5">
        <div className="relative flex flex-1 flex-col">
          <label
            className={`subtitle ${
              dirtyFields.name && !errors.name && !getFieldState("name").invalid
                ? "text-green-500"
                : errors.name
                ? "text-red-500"
                : "text-white"
            }`}
            htmlFor="name"
          >
            {t("name")} <span className="absolute top-[-7px] pl-1">*</span>
            {errors.name && (
              <span className="absolute right-0 top-[0px] pl-1 text-red-500">
                {t("wrongInput")}
              </span>
            )}
          </label>
          <input
            className={`negateAutofillStyles border-b border-opacity-40 bg-transparent py-2 text-sm placeholder-white placeholder-opacity-50 outline-none ${
              dirtyFields.name && !errors.name && !getFieldState("name").invalid
                ? "border-green-500 text-green-500"
                : errors.name
                ? "border-red-500 text-red-500"
                : "border-white text-white"
            } ${sidebar ? "negateSidebarColor" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <span className="pl-1 text-red-500">{t("nameError")}</span>
          )}
        </div>
        <div className="relative flex flex-1 flex-col">
          <label
            className={`subtitle ${
              dirtyFields.telegram &&
              !errors.telegram &&
              !getFieldState("telegram").invalid
                ? "text-green-500"
                : errors.telegram
                ? "text-red-500"
                : "text-white"
            }`}
            htmlFor="telegram"
          >
            {t("telegram")} <span className="absolute top-[-7px] pl-1">*</span>
            {errors.telegram && (
              <span className="absolute right-0 top-[0px] pl-1 text-red-500">
                {t("wrongInput")}
              </span>
            )}
          </label>
          <input
            className={`negateAutofillStyles border-b border-opacity-40 bg-transparent py-2 text-sm placeholder-white placeholder-opacity-50 outline-none ${
              dirtyFields.telegram &&
              !errors.telegram &&
              !getFieldState("telegram").invalid
                ? "border-green-500 text-green-500"
                : errors.telegram
                ? "border-red-500 text-red-500"
                : "border-white text-white"
            } ${sidebar ? "negateSidebarColor" : ""}`}
            {...register("telegram")}
          />
          {errors.telegram && (
            <span className="pl-1 text-red-500">{t("usernameError")}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10 @sm:flex-row @sm:gap-5">
        <BudgedSelect
          selectedBudget={selectedBudget}
          setSelectedBudget={setSelectedBudget}
          isValid={isValid}
        />
        <div className="relative flex flex-1 flex-col">
          <label
            className={`subtitle ${
              dirtyFields.email &&
              !errors.email &&
              !getFieldState("email").invalid
                ? "text-green-500"
                : errors.email
                ? "text-red-500"
                : "text-white"
            }`}
            htmlFor="email"
          >
            {t("email")} <span className="absolute top-[-7px] pl-1">*</span>
            {errors.email && (
              <span className="absolute right-0 top-[0px] pl-1 text-red-500">
                {t("wrongInput")}
              </span>
            )}
          </label>
          <input
            className={`negateAutofillStyles border-b border-opacity-40 bg-transparent py-2 text-sm placeholder-white placeholder-opacity-50 outline-none ${
              dirtyFields.email &&
              !errors.email &&
              !getFieldState("email").invalid
                ? "border-green-500 text-green-500"
                : errors.email
                ? "border-red-500 text-red-500"
                : "border-white text-white"
            } ${sidebar ? "negateSidebarColor" : ""}`}
            {...register("email")}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          className={`relative mb-[5px] font-jetbrains text-sm font-medium ${
            dirtyFields.message &&
            !errors.message &&
            !getFieldState("message").invalid
              ? "text-green-500"
              : errors.message
              ? "text-red-500"
              : "text-white"
          }`}
          htmlFor="message"
        >
          {t("message")}
          <span className="absolute top-[-7px] pl-1">*</span>
          {errors.message && (
            <span className="absolute right-0 top-[0px] pl-1 text-red-500">
              {t("wrongInput")}
            </span>
          )}
        </label>
        <textarea
          id="message"
          rows={1}
          cols={37}
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className={`mb-[32px] border-b border-opacity-40 bg-transparent py-2 placeholder-white placeholder-opacity-50 outline-none ${
            dirtyFields.message &&
            !errors.message &&
            !getFieldState("message").invalid
              ? "border-green-500 text-green-500"
              : errors.message
              ? "border-red-500 text-red-500"
              : "border-white text-white"
          }`}
        ></textarea>
        {errors.message && (
          <span className="mb-[32px] mt-[-32px] pl-1 text-red-500">
            {t("messageError")}
          </span>
        )}
        <div className="flex items-center gap-[10px]">
          <input
            id="agree"
            ref={inputRef}
            type="checkbox"
            onChange={checkboxHandler}
            className="h-4 w-4 rounded accent-accent @sm:h-[18px] @sm:w-[18px]"
          />
          <label
            htmlFor="agree"
            onClick={(e) => {
              if (!inputRef.current) return;
              inputRef.current.checked = !inputRef.current.checked;
              checkboxHandler();
              e.preventDefault();
            }}
            className="text-white text-opacity-60 subtitle"
          >
            {t("terms")}
          </label>
        </div>
      </div>
      <div className="relative z-50 flex w-full items-center gap-[7px]">
        <span className="relative flex-1 after:absolute after:right-0 after:top-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-40 @[469px]:hidden">
          <Dot verticalSide="top" side="right" />
        </span>
        {showModal ? (
          <Button
            classNames="flex-[2]"
            disabled={false}
            type="submit"
            onClick={() => setShowModal(false)}
          >
            {t('hide')}
          </Button>
        ) : (
          <Button
            classNames="flex-[2]"
            disabled={!isValid || !termsAccepted}
            loading={loading}
            type="submit"
          >
            {t("button")}
          </Button>
        )}

        <span className="relative flex-1 after:absolute after:right-0 after:top-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-40 @[469px]:hidden">
          <Dot verticalSide="top" side="left" />
        </span>
      </div>
    </form>
  );
};

export default Form;
