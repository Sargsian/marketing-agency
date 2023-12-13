import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

const menuList = [
  { name: "Tiktok", link: "/tiktok" },
  { name: "Bigo", link: "/bigo" },
  { name: "Meta", link: "/meta" },
];

const Sidebar = ({
  open,
  closeMenu,
}: {
  open: boolean;
  closeMenu: () => void;
}) => {
  const { t } = useTranslation("header");
  const { pathname } = useRouter();

  return (
    <div className="hidden lg:block">
      {open && (
        <div
          onClick={closeMenu}
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
          <div className="fixed bottom-0 right-0 top-0 -z-10 flex w-[660px] flex-col bg-[#111] py-[95px] font-jost shadow-2xl">
            <div className="ml-[136px] flex h-full w-[435px] flex-col justify-between">
              <div className="mb-14 w-full border-b pb-1 uppercase text-white opacity-30 heading-5">
                <span className="cursor-default">{t("navigation")}</span>
              </div>
              <div>
                <ul>
                  {menuList.map((item, i) => (
                    <li
                      onClick={closeMenu}
                      className="group relative mb-6 w-fit heading-2 hover:cursor-pointer"
                      key={i}
                    >
                      <span
                        className={`${
                          pathname === item.link ? "absolute" : "static"
                        } left-[-38px] top-1/2 h-[11px] w-[11px] rounded-full bg-white group-hover:absolute`}
                      ></span>
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto uppercase">
                <div className="mb-[30px]">
                  <div className="mb-[30px] cursor-default opacity-30 heading-5">
                    {t("banks")}
                  </div>
                  <span className="text-sm">
                    <p>ADS BOOST LTD</p>
                    <p>
                      Address: Prodromou, 75, Oneworld Parkview House, 4th
                      floor, 2063, Nicosia
                    </p>
                    <p>VAT No.: 10431912X</p>
                    <p>REG number: HE 431912</p>
                  </span>
                </div>
                <div className="mb-[30px] cursor-default opacity-30 heading-5">
                  {t("contacts")}
                </div>
                <div className="flex justify-between">
                  <Link
                    className="font-jetbrains text-sm font-medium tracking-[-0.7px] underline transition hover:opacity-75"
                    href="mailto:boostads.org@gmail.com"
                  >
                    boostads.org@gmail.com
                  </Link>
                  <a
                    href="https://t.me/boostdep"
                    target="_blank"
                    className="font-jetbrains text-sm font-medium tracking-[-0.7px] underline transition hover:opacity-75"
                  >
                    telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Menu>
      </Transition>
    </div>
  );
};

export default Sidebar;
