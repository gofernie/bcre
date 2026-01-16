import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_DHTk6FeR.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Ping = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1>PING OK</h1> <p>If you can see this, routing is working.</p>`;
}, "C:/projects/bcre/src/pages/ping.astro", void 0);

const $$file = "C:/projects/bcre/src/pages/ping.astro";
const $$url = "/ping";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ping,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
