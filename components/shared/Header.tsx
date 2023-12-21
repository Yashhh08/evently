import { sidebarLinks } from "@/constants/sidebarLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ui/ModeToggle";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-3 border-b h-14">
      <div className="flex items-center justify-center gap-2">
        <Image src={"/images/favicon.ico"} alt="logo" height={24} width={24} />
        <Link
          href={"/"}
          className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent"
        >
          Evently
        </Link>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center justify-center gap-5 font-semibold max-md:hidden">
          {sidebarLinks.map((link) => {
            return (
              <Link
                href={link.path}
                key={link.label}
                className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
              >
                <div className="scale-110">{link.image}</div>
                <p>{link.label}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-4 max-sm:gap-1">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <Button size={"sm"} className="font-semibold">
              <Link href="/sign-in">Log In</Link>
            </Button>
          </SignedOut>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Header;
