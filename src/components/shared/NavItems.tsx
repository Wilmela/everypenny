"use client";

import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionUl } from "../blocks/Blocks";
import { useState } from "react";
import { useNavContext } from "@/context";

type NavLink = (typeof NAV_LINKS)[number];
const NavItems = () => {
  const pathname = usePathname();
  const { setToggled } = useNavContext();

  return (
    <nav>
      <MotionUl
        className="flex flex-col md:flex-row items-center gap-4 z-10"
        whileInView={{ y: [100, 0] }}
      >
        {NAV_LINKS.map((link: NavLink) => {
          const isActive = link.route === pathname;

          return (
            <li
              key={link.label}
              className={cn(
                " text-white uppercase hover:text-green-200 ease-in duration-100 cursor-pointer",
                {
                  underline: isActive,
                }
              )}
              onClick={() => setToggled(false)}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
      </MotionUl>
    </nav>
  );
};

export default NavItems;
