import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from '../../chunks/astro/server_DHTk6FeR.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Cms = createComponent(async ($$result, $$props, $$slots) => {
  async function getJson(url) {
    const res = await fetch(url, { headers: { accept: "application/json,text/plain,*/*" } });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text: text.slice(0, 2e3) };
  }
  const regionsUrl = "https://script.google.com/macros/s/AKfycbw9hC9cvfK2miIavrpIBJRggBaOEXxJ4yLi2FCsVqHKrEQmLGdBUQAfMZJfNbF47gEy/exec?sheet=Regions";
  const citiesUrl = "https://script.google.com/macros/s/AKfycbw9hC9cvfK2miIavrpIBJRggBaOEXxJ4yLi2FCsVqHKrEQmLGdBUQAfMZJfNbF47gEy/exec?sheet=Cities";
  const regions = await getJson(regionsUrl) ;
  const cities = await getJson(citiesUrl) ;
  return renderTemplate`<html> ${maybeRenderHead()}<body style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; padding: 16px;"> <h1>CMS Debug</h1> <h2>PUBLIC_REGIONS_JSON</h2> <div><b>URL:</b> ${String(regionsUrl)}</div> <div><b>Status:</b> ${regions.status} (${regions.ok ? "OK" : "FAIL"})</div> <pre style="white-space: pre-wrap; background:#f8fafc; padding:12px; border:1px solid #e2e8f0; border-radius:12px;">${regions.text}
    </pre> <h2>PUBLIC_CITIES_JSON</h2> <div><b>URL:</b> ${String(citiesUrl)}</div> <div><b>Status:</b> ${cities.status} (${cities.ok ? "OK" : "FAIL"})</div> <pre style="white-space: pre-wrap; background:#f8fafc; padding:12px; border:1px solid #e2e8f0; border-radius:12px;">${cities.text}
    </pre> </body></html>`;
}, "C:/projects/bcre/src/pages/debug/cms.astro", void 0);
const $$file = "C:/projects/bcre/src/pages/debug/cms.astro";
const $$url = "/debug/cms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cms,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
