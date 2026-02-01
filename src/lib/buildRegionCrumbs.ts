type Crumb = { label: string; href: string };

export function buildRegionCrumbs(region: { slug: string; name: string }): Crumb[] {
  return [
    { label: "Home", href: "/" },
    { label: "Regions", href: "/regions" },
    { label: region.name, href: `/regions/${region.slug}` },
  ];
}
