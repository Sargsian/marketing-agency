import Image from "next/image";
import { useRouter } from "next/router";
import Button from "src/components/Button";
import { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import MobileMenu from "./MobileMenu";
import Hamburger from "./Hamburger";
import { useTranslation } from "next-i18next";
import SmoothScrollbar from "./SmoothScrollbar";
import Sidebar from "src/components/Header/Sidebar";
import Link from "next/link";
import SidebarApplication from "src/components/Header/SidebarApplication";

const locales = [{ name: "eng" }, { name: "rus" }];

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [application, setApplication] = useState(false);
  const { t } = useTranslation("header");

  const switchLanguage = () => {
    const language = router.locale === "eng" ? "rus" : "eng";
    // eslint-disable-next-line
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: language, scroll: false }
    );
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]);

  return (
    <>
      {/* <SmoothScrollbar /> */}
      <header className="fixed left-0 right-0 z-[50] flex h-[60px] items-center justify-between pt-[30px] px-[10px] sm:px-10">
        {/* <div className="bg-clip-padding backdrop-blur-sm h-[60px] absolute top-0 left-0 w-full -z-10 backdrop-filter border-b border-white bg-opacity-10 border-opacity-20 bg-gray-400"></div> */}
        <div>
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="logo"
              className="inline-block"
              width={59}
              height={18}
            />
          </Link>
          <div className="relative ml-3 inline-block sm:ml-[50px]">
            <Listbox value={router.locale} onChange={switchLanguage}>
              <Listbox.Button className="capitalize tracking-[-0.032px] text-accent hover:cursor-pointer">
                {router.locale}
              </Listbox.Button>
              <Listbox.Options className="absolute left-0">
                {locales.map((locale, i) => (
                  <Listbox.Option
                    key={i}
                    className="capitalize hover:cursor-pointer hover:text-accent"
                    value={locale.name}
                    disabled={router.locale === locale.name}
                    style={
                      router.locale === locale.name ? { display: "none" } : {}
                    }
                  >
                    {locale.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <div className="flex h-full items-center gap-6">
          <Button
            type="button"
            onClick={() => (
              setApplication((prevState) => !prevState), setOpen(false)
            )}
          >
            {t("contact")}
          </Button>
          <Hamburger
            onClick={() => (
              setOpen((prevState) => !prevState), setApplication(false)
            )}
            open={open}
          />
          <MobileMenu closeMenu={() => setOpen(false)} open={open} />
          <Sidebar closeMenu={() => setOpen(false)} open={open} />
          <SidebarApplication
            closeApplication={() => setApplication(false)}
            open={application}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
