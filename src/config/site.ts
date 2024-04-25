export const siteConfig = {
  name: "Every Penny",
  shortDesc: "Save up and grow!",
  author: 'EveryPenny.NG',
  author2: 'Techmela services',
  longDesc:
    "We are a team solely focussed on helping you save up for your dream projects. Grow your finance by simply committing to any of our plans.",
  url:
    process.env.NODE_ENV === "production"
      ? "everypenny.ng"
      : "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;
