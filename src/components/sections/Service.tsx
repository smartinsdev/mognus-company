import { useTranslations } from "next-intl";
import {
  MdOutlineBlindsClosed,
  MdOutlineCoPresent,
  MdOutlineHomeRepairService,
  MdOutlineRestaurant,
  MdShelves,
  MdStarOutline,
} from "react-icons/md";
import ServiceCard from "../ServiceCard";

export function Service() {
  const t = useTranslations("Index");

  return (
    <section
      id="service"
      className="pb-24 pt-32 min-h-dvh bg-muted text-muted-foreground"
    >
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
