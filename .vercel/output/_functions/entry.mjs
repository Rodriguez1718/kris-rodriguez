import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BGnovuXO.mjs';
import { manifest } from './manifest_Dfr8VQO3.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page6 = () => import('./pages/rss.xml.astro.mjs');
const _page7 = () => import('./pages/work/_slug_.astro.mjs');
const _page8 = () => import('./pages/work.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["node_modules/@keystatic/astro/internal/keystatic-api.js", _page3],
    ["src/pages/contact.astro", _page4],
    ["node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page5],
    ["src/pages/rss.xml.ts", _page6],
    ["src/pages/work/[slug].astro", _page7],
    ["src/pages/work/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1a00b025-6d84-48dc-9632-f9e8728b4f24",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
