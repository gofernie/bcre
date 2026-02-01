// src/lib/seo.ts

type PageKind = "city" | "region" | "neighbourhood" | "generic";

const s = (v: any) => String(v ?? "").trim();

function cleanSpaces(text: string) {
  return s(text).replace(/\s+/g, " ").trim();
}

/**
 * Word-safe truncation with an ellipsis.
 * Normalizes whitespace first (line breaks from Sheets become spaces).
 */
export function truncateForMeta(text: string, max = 155) {
  const clean = cleanSpaces(text);
  if (!clean) return "";
  if (clean.length <= max) return clean;

  const clipped = clean.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const out = (lastSpace > 60 ? clipped.slice(0, lastSpace) : clipped).trim();

  return out + "…";
}

function firstSentence(text: string) {
  const clean = cleanSpaces(text);
  if (!clean) return "";
  // Split on sentence-ish punctuation; keep it simple + robust.
  const m = clean.match(/^(.{1,220}?)([.!?])(\s|$)/);
  if (m?.[1]) return (m[1] + (m[2] ?? "")).trim();
  return clean;
}

/**
 * Use this for PageHeader lead text (subtitle).
 * If subtitle missing, derive from intro in a calm, short form.
 */
export function leadFrom({
  subtitle,
  intro,
  fallback,
  max = 80,
}: {
  subtitle?: string;
  intro?: string;
  fallback: string;
  max?: number;
}) {
  const sub = s(subtitle);
  if (sub) return sub;

  const introLine = firstSentence(intro || "");
  if (introLine) {
    // For leads, avoid ellipsis if we can; but keep it short.
    const clean = cleanSpaces(introLine);
    if (clean.length <= max) return clean;

    const clipped = clean.slice(0, max);
    const lastSpace = clipped.lastIndexOf(" ");
    return (lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped).trim() + "…";
  }

  return fallback;
}

/**
 * Region-aware default meta templates.
 * Used when intro is missing or too thin.
 */
function regionDefaultMeta(regionSlug: string, kind: PageKind) {
  const r = s(regionSlug).toLowerCase();

  // Keep these broad + evergreen (no fragile claims).
  const BASE: Record<string, { city: string; region: string }> = {
    kootenays: {
      city: "Explore homes, condos, and lifestyle guides across Kootenays communities - mountain towns, lakes, and year-round recreation.",
      region:
        "Browse Kootenays real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    okanagan: {
      city: "Explore Okanagan real estate by city - lake access, neighbourhood feel, and housing options across the valley.",
      region:
        "Browse Okanagan real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    "lower-mainland": {
      city: "Explore Lower Mainland real estate by city - neighbourhood context, housing options, and local lifestyle guides.",
      region:
        "Browse Lower Mainland real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    "vancouver-island": {
      city: "Explore Vancouver Island real estate by city - coastal lifestyle, neighbourhood feel, and housing options.",
      region:
        "Browse Vancouver Island real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    "northern-bc": {
      city: "Explore Northern BC real estate by city - community hubs, housing options, and practical local context.",
      region:
        "Browse Northern BC real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    "thompson-nicola": {
      city: "Explore Thompson - Nicola real estate by city - neighbourhood context, housing options, and lifestyle guides.",
      region:
        "Browse Thompson - Nicola real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
    cariboo: {
      city: "Explore Cariboo real estate by city - community context, housing options, and outdoor lifestyle guides.",
      region:
        "Browse Cariboo real estate by city and neighbourhood - market context, lifestyle guides, and inventory embeds added over time.",
    },
  };

  const hit = BASE[r];
  if (!hit) {
    return kind === "region"
      ? "Browse BC real estate by region, city, and neighbourhood - market context and inventory embeds added over time."
      : "Explore BC real estate by city - neighbourhood context, housing options, and local lifestyle guides.";
  }

  return kind === "region" ? hit.region : hit.city;
}

/**
 * Build a meta description with:
 * - intro (preferred)
 * - region-aware template fallback
 * - dedupe guard to keep city metas distinct
 */
export function buildMetaDescription({
  kind,
  intro,
  subtitle,
  cityPretty,
  regionPretty,
  regionSlug,
  max = 155,
}: {
  kind: PageKind;
  intro?: string;
  subtitle?: string;
  cityPretty?: string;
  regionPretty?: string;
  regionSlug?: string;
  max?: number;
}) {
  const introText = cleanSpaces(intro || "");
  const subText = cleanSpaces(subtitle || "");
  const city = s(cityPretty);
  const region = s(regionPretty);
  const rslug = s(regionSlug);

  // 1) Prefer intro if it has some substance.
  let base =
    introText.length >= 40
      ? introText
      : regionDefaultMeta(rslug, kind);

  // 2) If intro is missing, we can optionally fold in subtitle as a starter.
  // (But keep it natural - avoid "Fernie: Ski town..." awkwardness.)
  if (!introText && subText) {
    base = `${subText}. ${base}`;
  }

  // 3) Truncate to meta length.
  let meta = truncateForMeta(base, max);

  // 4) Dedupe guard:
  // If meta ends up too generic, or basically equals subtitle, add a unique tail.
  // This prevents a bunch of identical metas when intros are blank or repetitive.
  const tooGeneric =
    meta.length < 70 ||
    (!!subText && truncateForMeta(subText, max) === meta) ||
    meta === truncateForMeta(regionDefaultMeta(rslug, kind), max);

  if (tooGeneric && city && region) {
    const tail = `${city}, ${region}`;
    // Add tail only if it doesn't already contain it.
    if (!meta.toLowerCase().includes(tail.toLowerCase())) {
      // Ensure final output still respects max.
      meta = truncateForMeta(`${meta.replace(/…$/, "")} - ${tail}`, max);
    }
  }

  return meta || (city && region ? `Browse ${city} real estate in ${region}.` : "Browse BC real estate.");
}
