import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import ApplicationForm from "src/components/sections/ApplicationForm";
import Form from "src/components/sections/ApplicationForm/Form";

const SidebarApplication = ({
  open,
  closeApplication,
}: {
  open: boolean;
  closeApplication: () => void;
}) => {
  const { t } = useTranslation("header");

  return (
    <>
      {open && (
        <div
          onClick={closeApplication}
          className="fixed inset-0 -z-20"
          aria-hidden="true"
        />
      )}
      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Menu>
          <div className="fixed bottom-0 right-0 top-0 -z-10 flex w-full max-w-[660px] flex-col overflow-auto bg-[hsl(0,0%,7%)] py-[95px] font-jost shadow-2xl">
            <div className="mx-auto flex h-full w-full sm:pl-[136px] sm:pr-10 flex-col justify-between px-[10px] sm:mx-0">
              <div className="mb-1 w-full border-b pb-1 uppercase text-white opacity-30 heading-5">
                <span className="cursor-default">{t("applicationHeader")}</span>
              </div>
              <div className="w-full @container">
                <Form sidebar />
                {/* <span className="mt-[-42px] block">
                  Нажимая “Отправить” вы соглашаетесь с обработкой персональных
                  данных
                </span> */}
              </div>
            </div>
          </div>
        </Menu>
      </Transition>
    </>
  );
};

export default SidebarApplication;
