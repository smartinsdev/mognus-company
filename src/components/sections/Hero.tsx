import Image from "next/image";
import { useTranslations } from "next-intl";
import banner from "@/assets/banner.webp";
import { Link } from "@/navigation";
import { Button } from "../ui/button";

export function Hero() {
  const t = useTranslations("Index");
  return (
    <section
      id="home"
      className="min-h-dvh max-w-360 mx-auto pt-28 relative flex flex-col items-center"
    >
      <div className="flex flex-col space-y-3 relative mb-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 px-4 lg:z-10">
        <span className="uppercase animate-in fade-in-0 slide-in-from-left-10 duration-1000 text-center lg:text-start tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
          {t("hero.subtitle")}
        </span>
        {/* lg:leading-none is explicit because Tailwind v3 let the line-height
            bundled with lg:text-5xl / xl:text-7xl override leading-snug, while
            v4 does not. Without it the headline gains 27px per line at lg and
            up. Mobile keeps leading-snug, which matched v3 already. */}
        <h1 className="text-4xl animate-in fade-in-0 slide-in-from-left-10 duration-1000 md:max-w-2xl  lg:max-w-172 text-center lg:text-start  lg:text-5xl xl:text-7xl font-poppins leading-snug lg:leading-none capitalize font-extrabold">
          {t("hero.title")}
        </h1>

        <p className="wrap-break-word animate-in fade-in-0 slide-in-from-left-10 duration-1000 text-center lg:text-start lg:mx-0 text-sm lg:text-base max-w-prose mx-auto pt-2 text-foreground dark:text-foreground/70 leading-relaxed tracking-wider">
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
          <div className="absolute top-0 left-0 h-full w-full bg-transparent lg:bg-white/15 dark:bg-black/50"></div>
          {/* preload, not priority: the latter is deprecated since Next 16.
              This is the LCP element, so it goes in the <head> instead of
              waiting to be discovered in the <body>.

              sizes matters as much as preload here: without it Next emits a
              1x/2x srcSet only, so a phone at DPR 2 downloads the 1920px
              variant (68KB) instead of the 828px one (25KB). The widths below
              track the container: full width until lg, then lg:w-2/3 of the
              max-w-360 (1440px) section, which caps at 960px. */}
          <Image
            src={banner}
            alt="hero image"
            placeholder="blur"
            preload
            sizes="(min-width: 1440px) 960px, (min-width: 1024px) 66vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
