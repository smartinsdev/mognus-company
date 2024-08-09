import Image from "next/image";
import banner from "@/assets/banner-image 1.png";
import { Button } from "../ui/button";
import { Link } from "@/navigation";

export function Hero() {
  return (
    <section className="min-h-dvh max-w-[1440px] mx-auto pt-28 relative flex flex-col items-center">
      <div className="flex flex-col space-y-3 relative mb-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 px-4 lg:z-10">
        <span className="uppercase text-center lg:text-start tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
          The Luxury of Made to Measure
        </span>
        <h1 className="text-3xl sm:text-4xl md:max-w-2xl  lg:max-w-[43rem] text-center lg:text-start  lg:text-5xl xl:text-7xl font-poppins leading-snug capitalize font-extrabold">
          Turn your ideas into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-400 via-primary to-red-300">
            extraordinary furniture
          </span>{" "}
          with Mognu&apos;s
        </h1>

        <p className="break-words text-center lg:text-start lg:mx-0 text-sm lg:text-base max-w-[60ch] mx-auto pt-2 text-foreground/70 leading-relaxed tracking-wider">
          We are Mognu&apos;s, a carpentry company specializing in creating
          bespoke furniture. We believe that true luxury lies in having unique
          furniture, made to measure for each client.
        </p>
        <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
          <Button asChild size={"lg"}>
            <Link href={"/#contact"}>Contact Us</Link>
          </Button>
          <Button variant={"outline"} size={"lg"}>
            <Link href={"/#project"}>See our Projects</Link>
          </Button>
        </div>
      </div>
      <div className="relative px-4 lg:absolute w-full lg:w-2/3 lg:right-0 lg:top-1/2 lg:-translate-y-1/2  overflow-hidden rounded ">
        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-full bg-transparent dark:bg-black/50"></div>
          <Image
            src={banner}
            alt="hero image"
            placeholder="blur"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
}
