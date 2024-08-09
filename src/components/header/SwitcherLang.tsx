"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsTranslate } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/navigation";

export function SwitcherLang() {
  const t = useTranslations("SwitchLang");
  const pathname = usePathname();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-2 focus:ring-3 focus:ring-ring"
          variant={"outline"}
          size={"icon"}
          title={t("title")}
        >
          <BsTranslate className="size-6 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: "en" })}
          className="cursor-pointer first-letter:uppercase"
        >
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: "fr" })}
          className="cursor-pointer first-letter:uppercase"
        >
          {t("fr")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: "pt" })}
          className="cursor-pointer first-letter:uppercase"
        >
          {t("pt")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
