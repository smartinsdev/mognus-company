"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "../ui/button";
import { Link } from "@/navigation";
import { IoMenu, IoClose } from "react-icons/io5";

import { SwitcherLang } from "./SwitcherLang";
import { NavLinks } from "./NavLinks";
import { Logo } from "./Logo";
import { ModeToggle } from "../ModeToggle";
import { MenuMobile } from "./MenuMobile";

export default function NavBar() {
  const [open, setToggle] = useState(false);
  const t = useTranslations("Index");
  return (
    <header className="fixed left-0 top-0 z-30 w-full bg-background border-b border-b-muted shadow-sm shadow-muted">
      <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <NavLinks t={t} />
        <div className="flex items-center justify-center space-x-1 md:space-x-3">
          <SwitcherLang />
          <ModeToggle />
          <Button asChild size={"sm"}>
            <Link
              className="uppercase tracking-wide max-sm:hidden "
              href="https://www.fixando.pt/profile/509407/mognursquoslda?ref=award"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("nav.order")}
            </Link>
          </Button>
          <Button
            onClick={() => setToggle((value) => !value)}
            variant={"ghost"}
            size={"icon"}
            className="md:hidden relative z-50"
          >
            {open ? (
              <IoClose className="size-6 text-background animate-in fade-in" />
            ) : (
              <IoMenu className="size-6 text-foreground animate-in fade-in" />
            )}
          </Button>
        </div>
      </div>
      {open && <MenuMobile open={open} setToggle={setToggle} />}
    </header>
  );
}
