import Image from "next/image";
import { useRouter } from "next/router";
import Button from "src/components/Button";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const locales = [{ name: "eng" }, { name: "rus" }];

const Header = () => {
  const router = useRouter();

  const switchLanguage = () => {
    const language = router.locale === "eng" ? "rus" : "eng";
    // eslint-disable-next-line
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: language }
    );
  };

  return (
    <header className="absolute left-0 right-0 flex justify-between px-10 pt-[30px]">
      <div>
        <Image
          src="/logo.svg"
          alt="logo"
          className="mr-[50px] inline-block"
          width={59}
          height={18}
        />

        <div className="relative inline-block">
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
      <Button type="button">Close</Button>
    </header>
  );
};

export default Header;
