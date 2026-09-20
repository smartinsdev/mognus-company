import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Logo } from "./Logo";
import { MenuMobileToggle } from "./MenuMobileToggle";
import { NavLinks } from "./NavLinks";
import { SwitcherLang } from "./SwitcherLang";

// No longer "use client". The mobile menu's useState now lives in
// MenuMobileToggle, so Logo, NavLinks and the CTA render on the server and
// stay out of the client bundle.
export default function NavBar() {
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
          <MenuMobileToggle />
        </div>
      </div>
    </header>
  );
}
