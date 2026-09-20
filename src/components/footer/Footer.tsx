import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdMailOutline, MdOutlinePinDrop } from "react-icons/md";
import { Link } from "@/navigation";

// The footer renders on every page, including the three policy pages, so its
// hrefs are rooted (`/#about`, not `#about`) and go through next-intl's Link.
// With plain next/link the section anchors did nothing outside the homepage,
// and the legal links pointed at unprefixed paths that only resolved because
// src/proxy.ts redirected them — a wasted round trip on every click.
//
// Every label was hardcoded English until now, on a site that otherwise
// translates into three languages. Most of them needed no new strings: the
// quick links are the nav's own labels, and the legal links reuse each policy
// page's `title`, which keeps the link and the heading it leads to from
// drifting apart.
export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Index.nav");
  const terms = useTranslations("terms");

  return (
    <footer className="bg-[#0c0a09] py-12">
      <div className="max-w-360 px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:justify-items-center items-start">
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-neutral-100 text-2xl">Mognu&apos;s Company</h2>
          <p className="text-neutral-600 max-w-[50ch]">{t("tagline")}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg">{t("quickLinks")}</h2>
          <Link
            href="/#about"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4 capitalize"
          >
            {nav("about")}
          </Link>
          <Link
            href="/#service"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4 capitalize"
          >
            {nav("service")}
          </Link>
          <Link
            href="/#project"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4 capitalize"
          >
            {nav("project")}
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4 capitalize"
          >
            {nav("contact")}
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg">{t("legal")}</h2>
          <Link
            href="/terms-of-services"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            {terms("services.title")}
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            {terms("privacy.title")}
          </Link>
          <Link
            href="/cookies-policy"
            className="text-sm text-neutral-400 hover:underline hover:underline-offset-4"
          >
            {terms("cookies.title")}
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-lg capitalize">{t("info")}</h2>
          <div className="flex items-center text-sm text-neutral-400 gap-2 mb-1">
            <MdMailOutline size={18} />
            <span>suport@mongnus.com</span>
          </div>
          <div className="flex items-center text-sm text-neutral-400 gap-2">
            <MdOutlinePinDrop size={18} />
            <span>
              N125, 8125 Quarteira
              <br />
              Portugal
            </span>
          </div>
          <div className="flex items-center text-sm text-neutral-400 gap-2">
            <MdOutlinePinDrop size={18} />
            <span>
              8/10 Rue de la mare Blanche
              <br />
              77186 Noisiel, France
            </span>
          </div>
          <div className="flex gap-4 text-neutral-200">
            <Link
              href="https://www.instagram.com/mognuscompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-950 transition-colors"
            >
              <span className="sr-only">Instagram Mognus Company</span>
              <FaInstagram size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100093159309878"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-950 transition-colors"
            >
              <span className="sr-only">Facebook Mognus Company</span>

              <FaFacebook size={18} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-t-neutral-900 pt-4 text-center text-xs text-muted-foreground">
        {/* The year was written as a literal 2024 and had been wrong for two
            years. Every page here is prerendered, so this resolves at build
            time rather than per request: it is right as of the last deploy and
            goes stale each January until the next one. That is a much smaller
            window than "whenever someone notices", and the alternative — a
            client-side Date — would render a different year on the server than
            in the browser and trip hydration. */}
        <p>
          &copy; {new Date().getFullYear()} Mognu&apos;s Company. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
