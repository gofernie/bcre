// File: src/lib/collections.ts

/**
 * COLLECTIONS
 * - Keyed by collection_slug (used in URLs like /collections/[collection])
 * - includeAny flags should match your city/neighbourhood flags (e.g., cityRow.collection_flags)
 *
 * Notes:
 * - Removed duplicate "employment-hubs" entry (object keys must be unique).
 * - Added a small helper so pages can safely import `getCollections()` even if you later
 *   change where data comes from.
 */

export const COLLECTIONS = {
  "ski-towns": {
    title: "Ski towns",
    icon: "⛷️",
    lead: "Mountain towns where winter sports shape daily life and housing demand.",
    includeAny: ["ski_towns"],
  },

  "family-friendly": {
    title: "Family-friendly",
    icon: "👨‍👩‍👧‍👦",
    lead: "Communities with a practical day-to-day rhythm, including schools, parks, and essential services.",
    includeAny: ["family_friendly"],
  },

  "retirement-friendly": {
    title: "Retirement-friendly",
    icon: "🌤️",
    lead: "Places that appeal to downsizers with a quieter pace, walkable pockets, and lifestyle-first housing.",
    includeAny: ["retirement_friendly"],
  },

  "coastal-lifestyle": {
    title: "Coastal lifestyle",
    icon: "🌊",
    lead: "Communities where ocean access and waterfront routines shape daily life and recreation.",
    includeAny: ["coastal_lifestyle"],
  },

  "regional-hubs": {
    title: "Regional hubs",
    icon: "🏙️",
    lead: "Service centres that anchor surrounding towns with hospitals, retail, and regional amenities.",
    includeAny: ["regional_hubs"],
  },

  "employment-hubs": {
    title: "Employment hubs",
    icon: "💼",
    lead: "Cities with diversified, year-round job markets anchored by major employers and institutions.",
    includeAny: ["employment_hubs"],
  },

  "remote-work-friendly": {
    title: "Remote-work friendly",
    icon: "💻",
    lead: "Places that support home-office routines, with reliable internet and suitable housing.",
    includeAny: ["remote_work_friendly"],
  },

  "rural-acreage-living": {
    title: "Rural - acreage living",
    icon: "🌲",
    lead: "Low-density settings with larger lots, privacy, and self-serviced infrastructure like wells and septic.",
    includeAny: ["rural_acreage_living"],
  },
} as const;

export type CollectionSlug = keyof typeof COLLECTIONS;
export type CollectionDef = (typeof COLLECTIONS)[CollectionSlug];

/**
 * Future-proof accessor.
 * Today it just returns COLLECTIONS, but your pages can import this
 * so you can expand later without refactoring imports everywhere.
 */
export async function getCollections() {
  return { collections: COLLECTIONS };
}
