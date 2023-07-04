import Image from "next/image";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const year = new Date().getFullYear();

  const { t } = useTranslation("footer");

  return (
    <footer className="font-jetbrains text-base font-medium tracking-[-1px] md:text-lg">
      <div className="mx-auto px-5 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-5 lg:gap-8">
          <div className="order-2 lg:order-none">
            <Image src="/logo.svg" width={84} height={26} alt="logo" />
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
          <div className="order-3 flex items-end flex-col font-jetbrains font-medium sm:text-lg lg:order-none">
            <p className="text-white w-fit text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100">
              {t("privacyPolicy")}
            </p>
            <p className="text-white w-fit text-right text-opacity-60 transition hover:cursor-pointer hover:text-opacity-100">
              {t("terms")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
