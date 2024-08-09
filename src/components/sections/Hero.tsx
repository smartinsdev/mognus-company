import Image from "next/image";
import banner from "@/assets/banner-image 1.png";
import { Button } from "../ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Index");
  return (
    <section className="min-h-dvh max-w-[1440px] mx-auto pt-28 relative flex flex-col items-center">
      <div className="flex flex-col space-y-3 relative mb-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 px-4 lg:z-10">
        <span className="uppercase animate-in fade-in-0 slide-in-from-left-10 duration-1000 text-center lg:text-start tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
          {t("hero.subtitle")}
        </span>
        <h1 className="text-4xl animate-in fade-in-0 slide-in-from-left-10 duration-1000 md:max-w-2xl  lg:max-w-[43rem] text-center lg:text-start  lg:text-5xl xl:text-7xl font-poppins leading-snug capitalize font-extrabold">
          {t.rich("hero.title", {
            guidelines: (chunks) => (
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-400 via-primary to-red-300">
                {chunks}
              </span>
            ),
          })}
        </h1>

        <p className="break-words animate-in fade-in-0 slide-in-from-left-10 duration-1000 text-center lg:text-start lg:mx-0 text-sm lg:text-base max-w-[60ch] mx-auto pt-2 text-foreground/70 leading-relaxed tracking-wider">
          {t("hero.paragraph")}
        </p>
        <div className="flex items-center justify-center lg:justify-start gap-2 pt-4 animate-in fade-in-0 slide-in-from-left-10 duration-1000">
          <Button asChild className="h-8 md:h-10">
            <Link className="uppercase text-xs" href={"/#contact"}>
              {t("hero.buttons.primary")}
            </Link>
          </Button>
          <Button variant={"outline"} className="h-8 md:h-10">
            <Link className="uppercase text-xs" href={"/#project"}>
              {t("hero.buttons.secundary")}
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative px-4 lg:absolute w-full lg:w-2/3 lg:right-0 lg:top-1/2 lg:-translate-y-1/2  overflow-hidden rounded animate-in fade-in-0 slide-in-from-right-5 duration-1000">
        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-full bg-transparent dark:bg-black/50"></div>
          <Image src={banner} alt="hero image" placeholder="blur" />
        </div>
      </div>
    </section>
  );
}
