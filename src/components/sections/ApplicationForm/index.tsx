import Dot from "src/components/Dot";
import Button from "src/components/Button";
import { useTranslation } from "next-i18next";
import { type FormEvent, useState, SyntheticEvent } from "react";
import BudgedSelect from "src/components/sections/ApplicationForm/BudgetSelect";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

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

const ApplicationForm = () => {
  const { t } = useTranslation("form");
  const [selectedBudget, setSelectedBudget] = useState({ budget: "500$" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

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

  const submitData = async (data: formData) => {
    console.log(data);
    // return;
    if (isValid && termsAccepted) {
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
          "Content-type": "application/json",
        },
      });
      
      reset();

      if (res.status === 200) {
        void router.push("/success");
      }
    }
  };

  return (
    <div className="mb-10 flex flex-col text-white lg:mb-20 xl:mb-32 xl:flex-row 2xl:mb-44">
      <div className="relative inline-block flex-1 border-b border-t border-white border-opacity-20 xl:min-w-[623px]">
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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(submitData)}
          className="mx-auto flex max-w-[600px] flex-col gap-[59px] py-[66px]"
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-5">
            <div className="relative flex flex-1 flex-col">
              <label
                className={`subtitle ${
                  dirtyFields.name &&
                  !errors.name &&
                  !getFieldState("name").invalid
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
                    Wrong
                  </span>
                )}
              </label>
              <input
                className={`border-b border-white border-opacity-40 bg-transparent py-2 text-sm text-white placeholder-white placeholder-opacity-50 outline-none ${
                  dirtyFields.name &&
                  !errors.name &&
                  !getFieldState("name").invalid
                    ? "border-green-500 text-green-500"
                    : errors.name
                    ? "border-red-500 text-red-500"
                    : "border-white text-white"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <span className="pl-1 text-red-500">
                  Name must be at least 2 characters long
                </span>
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
                {t("telegram")}{" "}
                <span className="absolute top-[-7px] pl-1">*</span>
                {errors.telegram && (
                  <span className="absolute right-0 top-[0px] pl-1 text-red-500">
                    Wrong
                  </span>
                )}
              </label>
              <input
                className={`border-b border-opacity-40 bg-transparent py-2 text-sm placeholder-white placeholder-opacity-50 outline-none ${
                  dirtyFields.telegram &&
                  !errors.telegram &&
                  !getFieldState("telegram").invalid
                    ? "border-green-500 text-green-500"
                    : errors.telegram
                    ? "border-red-500 text-red-500"
                    : "border-white text-white"
                }`}
                {...register("telegram")}
              />
              {errors.telegram && (
                <span className="pl-1 text-red-500">
                  username must start with &quot;@&quot; and be at least 5
                  characters long
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-5">
            <BudgedSelect
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
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
                    Wrong
                  </span>
                )}
              </label>
              <input
                className={`border-b border-opacity-40 bg-transparent py-2 text-sm placeholder-white placeholder-opacity-50 outline-none ${
                  dirtyFields.email &&
                  !errors.email &&
                  !getFieldState("email").invalid
                    ? "border-green-500 text-green-500"
                    : errors.email
                    ? "border-red-500 text-red-500"
                    : "border-white text-white"
                }`}
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
                  Wrong
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
                Message must be at least 10 characters long
              </span>
            )}
            <div className="flex items-center gap-[10px]">
              <input
                id="agree"
                type="checkbox"
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 rounded accent-accent sm:h-[18px] sm:w-[18px]"
              />
              <label
                htmlFor="agree"
                className="text-white text-opacity-60 subtitle"
              >
                I agree to all Term, Privacy Policy
              </label>
            </div>
          </div>

          <div className="flex w-full items-center gap-[7px]">
            <span className="relative flex-1 after:absolute after:right-0 after:top-[-1px] after:h-[1px] after:w-full after:bg-white after:bg-opacity-40 xl:hidden">
              <Dot verticalSide="top" side="right" />
            </span>
            <Button
              classNames="flex-[2]"
              disabled={!isValid || !termsAccepted}
              type="submit"
            >
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
