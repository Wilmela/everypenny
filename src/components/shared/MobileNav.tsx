"use client";

import { useState } from "react";
import NavItems from "./NavItems";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useNavContext } from "@/context";

const MobileNav = () => {
  const { toggled, setToggled } = useNavContext();

  return (
    <div className="md:hidden">
      <Image
        src={toggled ? "/assets/icons/cross.svg" : "/assets/icons/menu.svg"}
        width={32}
        height={32}
        alt="menu-icon"
        className={cn("object-contain cursor-pointer", {
          "rotate-180 duration-300": toggled,
        })}
        onClick={() => setToggled((prev) => !prev)}
      />

      <div
        className={cn("hidden", {
          "bg-black/80 absolute top-14 h-screen inset-x-0 animate-slide-down flex items-start justify-end":
            toggled,
        })}
      >
        <div className="bg-APP_GREEN/50 w-6/12 py-8 h-[30] animate-slide-left">
          <NavItems />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
