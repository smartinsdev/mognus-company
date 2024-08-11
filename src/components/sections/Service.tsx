import {
  MdOutlineRestaurant,
  MdOutlineBlindsClosed,
  MdShelves,
  MdOutlineHomeRepairService,
  MdOutlineCoPresent,
  MdStarOutline,
} from "react-icons/md";

import ServiceCard from "../ServiceCard";
import { useTranslations } from "next-intl";

export function Service() {
  const t = useTranslations("Index");

  return (
    <section
      id="service"
      className="pb-24 pt-32 min-h-dvh bg-muted text-muted-foreground relative"
    >
      <div
        className="absolute top-0 left-0 -mt-20 w-full sm:-mt-32 
       lg:-mt-44 xl:-mt-48 xl:-top-10 2xl:-mt-64"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-muted"
            fill="#0099ff"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,170.7C1120,149,1280,139,1360,133.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="flex  flex-col px-8 max-w-[1440px] mx-auto text-foreground">
        <div className="flex flex-col items-center gap-4">
          <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
            {t("service.subtitle")}
          </span>
          <h2 className="font-poppins font-extrabold text-3xl uppercase">
            {t("service.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
          <ServiceCard
            Icon={MdOutlineRestaurant}
            title={t("service.cards.1.title")}
            text={t("service.cards.1.text")}
          />
          <ServiceCard
            Icon={MdOutlineBlindsClosed}
            title={t("service.cards.2.title")}
            text={t("service.cards.2.text")}
          />
          <ServiceCard
            Icon={MdShelves}
            title={t("service.cards.3.title")}
            text={t("service.cards.3.text")}
          />
          <ServiceCard
            Icon={MdOutlineHomeRepairService}
            title={t("service.cards.4.title")}
            text={t("service.cards.4.text")}
          />
          <ServiceCard
            Icon={MdOutlineCoPresent}
            title={t("service.cards.5.title")}
            text={t("service.cards.5.text")}
          />
          <ServiceCard
            Icon={MdStarOutline}
            title={t("service.cards.6.title")}
            text={t("service.cards.6.text")}
          />
        </div>
      </div>
    </section>
  );
}
