import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const menuList = [
  { name: "Tiktok", link: "/tiktok" },
  { name: "Bigo", link: "/bigo" },
  { name: "Meta", link: "/meta" },
];

const socials = [
  { name: "Dribble" },
  { name: "Instagram" },
  { name: "Github" },
  { name: "Twitter" },
  { name: "YouTube" },
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

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className={`duration-400 fixed left-0 top-0 -z-10 w-full overflow-hidden bg-black transition-all lg:hidden ${
        open ? "bottom-0" : "bottom-[100%]"
      }`}
    >
      <div className="flex h-screen flex-col justify-between overflow-auto">
        <ul className="mt-[60px] cursor-default p-[18px] sm:p-10">
          {menuList.map((item, i) => (
            <li
              onClick={closeMenu}
              style={
                item.link === pathname ? { color: "#FFA217", opacity: 1 } : {}
              }
              className="w-fit py-[6px] text-[32px] leading-[90%] tracking-[-0.96px] opacity-60 hover:cursor-pointer hover:text-accent hover:opacity-100"
              key={i}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex px-[18px] pb-[18px] sm:px-10">
          <div className="mr-auto">
            <span>{t("socials")}</span>
            <ul className="mt-4 cursor-default">
              {socials.map((social, i) => (
                <li className="hover:cursor-pointer hover:text-accent" key={i}>
                  {social.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <span>{t("email")}</span>
              <Link
                href="mailto:boostads.org@gmail.com"
                className="mt-2 block hover:cursor-pointer hover:text-accent"
              >
                boostads.org@gmail.com
              </Link>
            </div>
            <div className="mt-6">
              <span>{t("telegram")}</span>
              <a
                href="https://t.me/dmitriiboost"
                target="_blank"
                className="mt-2 block hover:cursor-pointer hover:text-accent"
              >
                @dmitriiboost
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
