import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const { t } = useTranslation("footer");

  return (
    <footer className="font-jetbrains text-base font-medium tracking-[-1px] md:text-lg">
      <div className="mx-auto px-5 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-y-14 xl:grid-cols-5 xl:gap-8">
          <div className="order-2 xl:order-none">
            <Link href={"/"}>
              <Image src="/logo.svg" width={84} height={26} alt="logo" />
            </Link>
            <span className="mt-3 inline-block font-jetbrains text-base font-medium uppercase tracking-[-1px] text-white text-opacity-60 sm:mt-7">
              Boost {year} &copy;
            </span>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            <div className="flex justify-center">
              <ul className="space-y-3">
                <li>
                  <a
                    target="_blank"
                    href="https://t.me/dmitriiboost"
                    className="transition hover:opacity-75"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <ul className="space-y-3">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Tiktok
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Bigo
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Meta
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 flex justify-center sm:col-span-1">
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+7 777 777 77 77"
                    className="transition hover:opacity-75"
                  >
                    +7 (777) 777 77-77
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:boostads.org@gmail.com"
                    className="transition hover:opacity-75"
                  >
                    boostads.org@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="order-3 flex flex-col items-end space-y-3 font-jetbrains font-medium sm:whitespace-nowrap sm:text-lg xl:order-none">
            <Link href='/policy' className="text-right leading-none text-white text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100 sm:leading-normal">
              {t("privacyPolicy")}
            </Link>
            <Link scroll={false} href='/policy#terms' className="text-right leading-none text-white text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100 sm:leading-normal">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
