"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { sidebarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <div className="hidden max-md:block text-center">
      <Sheet>
        <SheetTrigger className="flex justify-center items-center ml-2">
          <GiHamburgerMenu />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col gap-5 pt-10">
          {sidebarLinks.map((link) => {
            let active = false;

            if (link.path === pathName) {
              active = true;
            }

            return (
              <SheetClose asChild key={link.label}>
                <Link
                  href={link.path}
                  className={`flex justify-start items-center gap-4 font-medium text-lg ${
                    active ? "text-primary font-bold" : ""
                  }`}
                >
                  {link.image}
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
