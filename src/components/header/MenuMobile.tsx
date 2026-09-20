import { Dispatch, SetStateAction } from "react";

import { Link } from "@/navigation";
import {
  MdOutlineHome,
  MdOutlineGroup,
  MdOutlineMiscellaneousServices,
  MdOutlineElectricBolt,
  MdAlternateEmail,
} from "react-icons/md";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

type PropsMenuMobile = {
  open: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

export function MenuMobile({ open, setToggle }: PropsMenuMobile) {
  const t = useTranslations("Index");
  return (
    <>
      <div
        data-state={open ? "open" : "closed"}
        onClick={() => setToggle((value) => !value)}
        className="absolute top-0 left-0 h-dvh overflow-hidden w-full bg-background/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <aside
        data-state={open ? "open" : "closed"}
        className="absolute top-0 right-0 h-dvh w-1/2 bg-foreground overflow-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-0"
      >
        <div className="w-full grid grid-cols-1 gap-3 px-3 pt-28 text-secondary">
          <Link
            onClick={() => setToggle((value) => !value)}
            href={"/#home"}
            className="flex items-center font-semibold capitalize py-2 px-1 text-lg rounded-md justify-start space-x-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MdOutlineHome className="size-7 text-muted transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t("nav.home")}
            </span>
          </Link>
          <Link
            onClick={() => setToggle((value) => !value)}
            href={"/#about"}
            className="flex items-center font-semibold capitalize py-2 px-1 text-lg rounded-md justify-start space-x-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MdOutlineGroup className="size-7 transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t("nav.about")}
            </span>
          </Link>
          <Link
            onClick={() => setToggle((value) => !value)}
            href={"/#service"}
            className="flex items-center font-semibold capitalize py-2 px-1 text-lg rounded-md justify-start space-x-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MdOutlineMiscellaneousServices className="size-7 transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t("nav.service")}
            </span>
          </Link>
          <Link
            onClick={() => setToggle((value) => !value)}
            href={"/#project"}
            className="flex items-center font-semibold capitalize py-2 px-1 text-lg rounded-md justify-start space-x-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MdOutlineElectricBolt className="size-7 transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t("nav.project")}
            </span>
          </Link>
          <Link
            onClick={() => setToggle((value) => !value)}
            href={"/#contact"}
            className="flex items-center font-semibold capitalize py-2 px-1 text-lg rounded-md justify-start space-x-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MdAlternateEmail className="size-7 transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t("nav.contact")}
            </span>
          </Link>
          <Button asChild>
            <Link
              className="uppercase tracking-wide mt-6"
              href="https://www.fixando.pt/profile/509407/mognursquoslda?ref=award"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("nav.order")}
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
