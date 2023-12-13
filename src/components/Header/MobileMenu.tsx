import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const menuList = [
  { name: "TikTok", link: "/tiktok" },
  { name: "Bigo", link: "/bigo" },
  { name: "Meta", link: "/meta" },
];

const MobileMenu = ({
  open,
  closeMenu,
}: {
  open: boolean;
  closeMenu: () => void;
}) => {
  const { t } = useTranslation("header");
  const { pathname } = useRouter();

  return (
    <div
      className={`duration-400 fixed left-0 top-0 -z-10 w-full overflow-hidden bg-black transition-all lg:hidden ${
        open ? "bottom-0" : "bottom-[100%]"
      }`}
    >
      <div className="flex h-screen flex-col overflow-auto pt-24">
        <div className="mx-auto mb-[38px] w-[calc(100%-20px)] uppercase text-white opacity-30 subtitle">
          <span className="cursor-default">{t("navigation")}</span>
          <span className="mt-2 block h-[1px] w-full bg-white"></span>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <ul className="cursor-default p-[10px] sm:p-10">
            {menuList.map((item, i) => (
              <li
                onClick={closeMenu}
                style={
                  item.link === pathname ? { color: "#FFA217", opacity: 1 } : {}
                }
                className="mb-5 w-fit font-jost text-[36px] font-semibold leading-[100%] tracking-[-1.8px] hover:cursor-pointer hover:text-accent hover:opacity-100"
                key={i}
              >
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="p-[10px] uppercase">
            <div className="mb-[30px] cursor-default opacity-30 heading-5">
              {t("banks")}
            </div>
            <span className="text-sm">
              <p>ADS BOOST LTD</p>
              <p>
                Address: Prodromou, 75, Oneworld Parkview House, 4th floor,
                2063, Nicosia
              </p>
              <p>VAT No.: 10431912X</p>
              <p>REG number: HE 431912</p>
            </span>
          </div>
          <div className="p-[10px] pb-[21px]">
            <span className="mb-[23px] inline-block uppercase opacity-30 subtitle">
              {t("contacts")}
            </span>
            <div className="flex flex-col justify-between gap-y-1 [@media(min-width:320px)]:flex-row">
              <Link
                href="mailto:boostads.org@gmail.com"
                className="inline-block font-jetbrains text-sm font-medium uppercase underline hover:cursor-pointer hover:text-accent"
              >
                boostads.org@gmail.com
              </Link>
              <a
                href="https://t.me/boostdep"
                target="_blank"
                className="inline-block font-jetbrains text-sm font-medium uppercase underline hover:cursor-pointer hover:text-accent"
              >
                telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
