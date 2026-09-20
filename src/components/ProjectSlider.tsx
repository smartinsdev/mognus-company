"use client";

import Image from "next/image";
import React from "react";

import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/6.jpg";
import image7 from "@/assets/7.jpg";
import image8 from "@/assets/8.jpg";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const images = [
  {
    src: image1,
    alt: "image 1",
  },
  {
    src: image2,
    alt: "image 2",
  },
  {
    src: image3,
    alt: "image 3",
  },
  {
    src: image4,
    alt: "image 4",
  },
  {
    src: image5,
    alt: "image 5",
  },
  {
    src: image6,
    alt: "image 6",
  },
  {
    src: image7,
    alt: "image 7",
  },
  {
    src: image8,
    alt: "image 8",
  },
];

export function ProjectSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [count, setCount] = React.useState(0);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-6">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((item) => (
            <CarouselItem
              key={item.alt}
              className="flex justify-center sm:basis-1/2 md:basis-1/3 cursor-grab"
            >
              <div className="relative overflow-hidden rounded-md group">
                <Image src={item.src} alt={item.alt} placeholder="blur" />
                <div className="absolute inset-0 w-full h-full flex items-end  bg-transparent group-hover:bg-linear-to-b group-hover:from-transparent group-hover:via-transparent group-hover:to-primary group-hover:animate-in group-hover:fade-in-0">
                  <h2 className="text-2xl relative bottom-14 pl-10 text-primary-foreground invisible group-hover:visible group-hover:animate-in group-hover:fade-in-0">
                    {item.alt}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-4 items-center">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={cn(
              "w-3 h-3 rounded-full bg-muted transition-all hover:bg-primary",
              current === index && "bg-primary h-4 w-4"
            )}
            onClick={() => api?.scrollTo(index)}
          >
            <span className="sr-only">Next Slider</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
