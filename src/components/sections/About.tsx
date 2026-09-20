import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MdCheckCircle } from "react-icons/md";
import aboutImage from "@/assets/about.png";
import { Button } from "../ui/button";

export function About() {
  const t = useTranslations("Index");

  return (
    <section
      id="about"
      className="pb-24 pt-32 min-h-dvh max-w-[1440px] px-8 mx-auto items-center lg:items-start flex flex-col lg:flex-row-reverse gap-6"
    >
      <div className="flex flex-col pt-8 items-center md:items-start lg:pt-12 gap-4">
        <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
          {t("about.subtitle")}
        </span>
        <h2 className="font-poppins font-extrabold text-3xl uppercase">
          {t("about.title")}
        </h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("about.paragraphs.first")}
        </p>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("about.paragraphs.second")}
        </p>
        <ul className="grid grid-cols-2 gap-4 my-6 w-full max-w-lg">
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.1")}
            </span>
          </li>
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.2")}
            </span>
          </li>
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.3")}
            </span>
          </li>
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.4")}
            </span>
          </li>
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.5")}
            </span>
          </li>
          <li className="flex items-center justify-start space-x-3">
            <MdCheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground capitalize tracking-wide">
              {t("about.lists.6")}
            </span>
          </li>
        </ul>
        <Button asChild variant={"outline"} size={"lg"}>
          <Link
            className="uppercase tracking-wide mt-6 self-start"
            href="https://www.fixando.pt/profile/509407/mognursquoslda?ref=award"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("about.buttontext.first")}
          </Link>
        </Button>
      </div>
      <div className="relative overflow-hidden w-full sm:w-[550px] mx-auto md:mx-0 lg:w-[660px] lg:h-[700px] object-cover">
        <Link
          href={"#/project"}
          className="absolute text-xs md:text-base text-center text-primary-foreground 
        top-[52%] left-[40%] -translate-x-1/2 -translate-y-1/2 px-6 text-nowrap 
        py-3 uppercase tracking-wide z-10 bg-primary border-8 border-primary-foreground
        hover:border-primary hover:bg-primary-foreground hover:text-primary transition-colors duration-300 select-none"
        >
          {t("about.buttontext.second")}
        </Link>
        <Image
          src={aboutImage}
          alt="illustrative image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
