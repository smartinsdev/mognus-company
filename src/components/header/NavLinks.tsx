import { Link } from "@/navigation";
import {
  Formats,
  MarkupTranslationValues,
  RichTranslationValues,
  TranslationValues,
} from "next-intl";
import React, { ReactElement, ReactNodeArray } from "react";

type PropsNavLink = {
  t: {
    <TargetKey extends any>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Partial<Formats>
    ): string;
    rich<TargetKey extends any>(
      key: TargetKey,
      values?: RichTranslationValues,
      formats?: Partial<Formats>
    ): string | ReactElement | ReactNodeArray;
    markup<TargetKey extends any>(
      key: TargetKey,
      values?: MarkupTranslationValues,
      formats?: Partial<Formats>
    ): string;
    raw<TargetKey extends any>(key: TargetKey): any;
  };
};

export function NavLinks({ t }: PropsNavLink) {
  return (
    <nav className="md:flex hidden items-center justify-center text-foreground font-poppins space-x-2">
      <Link
        className="px-2 capitalize py-2 text-sm  relative after:absolute after:w-0 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        href={"/#home"}
      >
        {t("nav.home")}
      </Link>
      <Link
        className="px-2 capitalize py-2 text-sm   relative after:absolute after:w-0 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        href={"/#about"}
      >
        {t("nav.about")}
      </Link>
      <Link
        className="px-2 capitalize py-2 text-sm  relative after:absolute after:w-0 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        href={"/#service"}
      >
        {t("nav.service")}
      </Link>
      <Link
        className="px-2 capitalize py-2 text-sm  relative after:absolute after:w-0 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        href={"/#project"}
      >
        {t("nav.project")}
      </Link>
      <Link
        className="px-2 capitalize py-2 text-sm relative after:absolute after:w-0 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:transition-all hover:after:w-full"
        href={"/#contact"}
      >
        {t("nav.contact")}
      </Link>
    </nav>
  );
}
