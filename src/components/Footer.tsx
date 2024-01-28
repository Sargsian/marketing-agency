import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const { t } = useTranslation("footer");

  return (
    <footer className="font-jetbrains text-base font-medium tracking-[-1px] md:text-lg">
      <div className="mx-auto py-6 sm:px-10">
        <div className="grid grid-cols-2 gap-y-16 xl:grid-cols-5 xl:gap-8">
          <div className="xl:order-none block">
            <Link href={"/"}>
              <Image src="/logo.svg" width={84} height={26} alt="logo" />
            </Link>
            <span className="mt-3 inline-block font-jetbrains text-base font-medium uppercase tracking-[-1px] text-white text-opacity-60 sm:mt-7">
              Ads Boost ltd {year} &copy;
            </span>
            <span className="block text-base">
              <span className="opacity-60">by</span>{" "}
              <a
                target="_blank"
                href="https://github.com/Sargsian"
                className="opacity-60 transition hover:opacity-100"
              >
                sargiseven
              </a>
            </span>
          </div>
          <div className="order-3 col-span-2 grid grid-cols-2 gap-y-16 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            <div className="flex sm:justify-center">
              <ul className="space-y-3">
                <li>
                  <a
                    target="_blank"
                    href="https://t.me/boostdep"
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

            <div className="flex sm:justify-center">
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
            <div className="col-span-2 flex sm:col-span-1 sm:justify-center">
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+7 911 979 11 10"
                    className="transition hover:opacity-75"
                  >
                    +7 (911) 979-11-10
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
          <div className="flex flex-col items-end space-y-3 font-jetbrains font-medium sm:whitespace-nowrap sm:text-lg xl:order-3">
            <Link
              href="/policy"
              className="text-right leading-none text-white text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100 sm:leading-normal"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              scroll={false}
              href="/policy#terms"
              className="text-right leading-none text-white text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100 sm:leading-normal"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
