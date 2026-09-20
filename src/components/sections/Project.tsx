import { useTranslations } from "next-intl";
import { ProjectSlider } from "../ProjectSliderLazy";

export function Project() {
  // The only section that hardcoded its English headings, so a French or
  // Portuguese visitor scrolled from translated copy into "featured works /
  // projects you may love" and back out again.
  const t = useTranslations("Index.project");

  return (
    <section id="project" className="pb-24 pt-32 min-h-dvh">
      <div className="flex  flex-col px-8 max-w-360 mx-auto gap-10">
        <div className="flex flex-col items-center gap-4">
          <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
            {t("subtitle")}
          </span>
          <h2 className="font-poppins font-extrabold text-3xl uppercase">
            {t("title")}
          </h2>
        </div>
        <ProjectSlider />
      </div>
    </section>
  );
}
