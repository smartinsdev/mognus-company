import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Replaces public/robot.txt, which was never served: the filename was missing
// its `s`, so /robots.txt 404'd and the rules below reached no crawler.
//
// Four groups of rules from that file are deliberately not carried over:
//
//   - Disallow /js/, /css/, /images/ — none of those paths exist. Next serves
//     its assets from /_next/, and blocking the CSS and JS a page needs is
//     what makes Google render it wrong, so these were a liability even if the
//     paths had been real.
//   - Disallow *.pdf$ / *.doc$ / *.zip$ — the site serves no such files.
//   - `User-agent: Slurp / Disallow: /` — that is Yahoo, blocked outright.
//   - BadBot / EvilBot — placeholder names from whatever template this came
//     from. No crawler identifies itself as either, and a crawler that ignores
//     robots.txt is not stopped by a line in robots.txt.
//
// Crawl-delay for Yandex and Baidu is also dropped: Google ignores the
// directive entirely, and a four-page static site has no crawl budget to
// protect.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Tells the crawlers that honour it which of the two hosts is canonical,
    // matching the `alternates.canonical` the pages emit.
    host: SITE_URL,
  };
}
