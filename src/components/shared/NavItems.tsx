"use client";

import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionUl } from "../blocks/Blocks";
import { useNavContext } from "@/context";

type NavLink = (typeof NAV_LINKS)[number];
const NavItems = ({ userId, role }: { userId: string; role: string }) => {
  const pathname = usePathname();
  const { setToggled } = useNavContext();

  return (
    <nav>
      <MotionUl
        className="flex flex-col md:flex-row items-center gap-4 z-10"
        animate={{ y: [100, 0] }}
      >
        {role === "admin"
          ? NAV_LINKS.map((link: NavLink) => {

              return (
                <li
                  key={link.label}
                  className={cn(
                    "text-primary-foreground uppercase hover:text-green-200 focus-visible:bg-green-200 ease-in duration-100 cursor-pointer",
                    {
                      underline: pathname === link.route,
                    }
                  )}
                  onClick={() => setToggled(false)}
                >
                  <Link
                    href={
                      link.route === "/profile" && userId !== undefined
                        ? `${link.route}/${userId}`
                        : link.route
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })
          : NAV_LINKS.slice(0, NAV_LINKS.length - 1).map((link: NavLink) => {
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
                  <Link
                    href={
                      link.route === "/profile"
                        ? `${link.route}/${userId}`
                        : link.route
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
      </MotionUl>
    </nav>
  );
};

export default NavItems;
