import { ProjectSlider } from "../ProjectSlider";

export function Project() {
  return (
    <section id="project" className="pb-24 pt-32 min-h-dvh">
      <div className="flex  flex-col px-8 max-w-[1440px] mx-auto gap-10">
        <div className="flex flex-col items-center gap-4">
          <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
            featured works
          </span>
          <h2 className="font-poppins font-extrabold text-3xl uppercase">
            projects you may love
          </h2>
        </div>
        <ProjectSlider />
      </div>
    </section>
  );
}
