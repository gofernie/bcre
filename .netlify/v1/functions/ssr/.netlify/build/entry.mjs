import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D8RcMiEO.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/cities/_city_.astro.mjs');
const _page2 = () => import('./pages/debug/cities.astro.mjs');
const _page3 = () => import('./pages/debug/cms.astro.mjs');
const _page4 = () => import('./pages/debug-cms.astro.mjs');
const _page5 = () => import('./pages/ping.astro.mjs');
const _page6 = () => import('./pages/regions/_region_.astro.mjs');
const _page7 = () => import('./pages/regions.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/cities/[city].astro", _page1],
    ["src/pages/debug/cities.astro", _page2],
    ["src/pages/debug/cms.astro", _page3],
    ["src/pages/debug-cms.astro", _page4],
    ["src/pages/ping.astro", _page5],
    ["src/pages/regions/[region].astro", _page6],
    ["src/pages/regions/index.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9acf557d-3382-47ee-963a-f14fc8647786"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
