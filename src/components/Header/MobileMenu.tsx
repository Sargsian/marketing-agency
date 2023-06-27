import { useState } from "react";
import Hamburger from "./Hamburger";
import Link from "next/link";

const menuList = [
  { name: "Работы" },
  { name: "Новости" },
  { name: "О нас" },
  { name: "Услуги" },
  { name: "Процесс" },
  { name: "Контакты" },
];

const socials = [
  { name: "Dribble" },
  { name: "Instagram" },
  { name: "Github" },
  { name: "Twitter" },
  { name: "YouTube" },
];

const MobileMenu = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`duration-400 fixed left-0 top-0 -z-10 w-full overflow-hidden bg-black transition-all md:hidden ${
        open ? "bottom-0" : "bottom-[100%]"
      }`}
    >
      <ul className="mt-[60px] cursor-default p-[18px] sm:p-10">
        {menuList.map((list, i) => (
          <li
            className="w-fit py-[6px] text-[32px] leading-[90%] tracking-[-0.96px] opacity-60 hover:cursor-pointer hover:text-accent hover:opacity-100"
            key={i}
          >
            {list.name}
          </li>
        ))}
      </ul>
      <div className="flex px-[18px] sm:px-10">
        <div className="mr-auto">
          <span>Соцсети</span>
          <ul className="mt-4 cursor-default">
            {socials.map((social, i) => (
              <li className="hover:cursor-pointer hover:text-accent" key={i}>
                {social.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span>Email</span>
          <Link
            href="mailto:aumi.digital@gmail.com"
            className="mt-4 block hover:cursor-pointer hover:text-accent"
          >
            aumi.digital@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;