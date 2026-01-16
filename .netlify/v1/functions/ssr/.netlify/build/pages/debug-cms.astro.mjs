import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_DHTk6FeR.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$DebugCms = createComponent(async ($$result, $$props, $$slots) => {
  async function getJson(url) {
    const res = await fetch(url, { headers: { accept: "application/json,text/plain,*/*" } });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text: text.slice(0, 1500) };
  }
  const regionsUrl = "https://script.google.com/macros/s/AKfycbw9hC9cvfK2miIavrpIBJRggBaOEXxJ4yLi2FCsVqHKrEQmLGdBUQAfMZJfNbF47gEy/exec?sheet=Regions";
  const citiesUrl = "https://script.google.com/macros/s/AKfycbw9hC9cvfK2miIavrpIBJRggBaOEXxJ4yLi2FCsVqHKrEQmLGdBUQAfMZJfNbF47gEy/exec?sheet=Cities";
  const regions = await getJson(regionsUrl) ;
  const cities = await getJson(citiesUrl) ;
  return renderTemplate`${maybeRenderHead()}<h1>CMS DEBUG</h1> <h2>PUBLIC_REGIONS_JSON</h2> <p><b>URL:</b> ${regionsUrl}</p> <p><b>Status:</b> ${regions.status}</p> <pre>${regions.text}</pre> <h2>PUBLIC_CITIES_JSON</h2> <p><b>URL:</b> ${citiesUrl}</p> <p><b>Status:</b> ${cities.status}</p> <pre>${cities.text}</pre>`;
}, "C:/projects/bcre/src/pages/debug-cms.astro", void 0);
const $$file = "C:/projects/bcre/src/pages/debug-cms.astro";
const $$url = "/debug-cms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DebugCms,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
