"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "@/navigation";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Logo } from "./Logo";
import { MenuMobile } from "./MenuMobile";
import { NavLinks } from "./NavLinks";
import { SwitcherLang } from "./SwitcherLang";

export default function NavBar() {
  const [open, setToggle] = useState(false);
  const t = useTranslations("Index");
  return (
    <header className="fixed left-0 top-0 z-30 w-full bg-background border-b border-b-muted shadow-xs shadow-muted">
      <div className="max-w-360 mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <NavLinks t={t} />
        {/* gap, not space-x: v4's space-x puts the margin on the right of every
            child but the last, so the hidden md:hidden button below would leave
            12px of trailing space at desktop. gap only applies between visible
            items. */}
        <div className="flex items-center justify-center gap-1 md:gap-3">
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
