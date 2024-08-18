import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/6.jpg";
import image7 from "@/assets/7.jpg";
import image8 from "@/assets/8.jpg";

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
  return (
    <Carousel>
      <CarouselContent>
        {images.map((item) => (
          <CarouselItem
            key={item.alt}
            className="flex justify-center sm:basis-1/2 md:basis-1/3 cursor-grab"
          >
            <div className="relative overflow-hidden rounded-md">
              <Image src={item.src} alt={item.alt} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
