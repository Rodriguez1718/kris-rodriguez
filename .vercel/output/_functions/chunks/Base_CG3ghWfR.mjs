import { a5 as createComponent, aq as renderTemplate, am as renderScript, ao as renderSlot, a1 as addAttribute, aj as renderHead, a4 as createAstro } from './astro/server_cX2-w8Hx.mjs';
import 'piccolore';
import 'clsx';
import { a as getEntry } from './_astro_content_C2NIkkJy.mjs';
/* empty css                           */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { title, description, image, type = "website" } = Astro2.props;
  const settingsEntry = await getEntry("settings", "index");
  const siteTitle = settingsEntry?.data?.title || "Kris Rodriguez";
  const siteTagline = settingsEntry?.data?.tagline || "Design & Development";
  const fullTitle = title ? `${title} \u2014 ${siteTitle}` : siteTitle;
  const siteDescription = description || siteTagline;
  const navLinks = [
    { label: "Work", url: "/work" },
    { label: "About", url: "/#about" },
    { label: "Contact", url: "/#contact" }
  ];
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-5hce7sga> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', ">", '<meta property="og:type"', '><meta property="og:title"', '><meta property="og:description"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Syne:wght@400..800&display=swap" rel="stylesheet"><link rel="alternate" type="application/rss+xml"', ' href="/rss.xml"><script>\n			// Apply theme immediately to prevent flash\n			(function () {\n				var c = document.cookie;\n				var i = c.indexOf("theme=");\n				var theme = i >= 0 ? c.slice(i + 6).split(";")[0] : null;\n				if (theme === "dark" || theme === "light") {\n					document.documentElement.classList.add(theme);\n				} else if (\n					window.matchMedia("(prefers-color-scheme: dark)").matches\n				) {\n					document.documentElement.classList.add("dark");\n				}\n			})();\n		<\/script>', '</head> <body data-astro-cid-5hce7sga> <header class="site-header" data-astro-cid-5hce7sga> <nav class="nav" data-astro-cid-5hce7sga> <a href="/" class="site-title" data-astro-cid-5hce7sga>', '</a> <div class="nav-links" data-astro-cid-5hce7sga> ', ' <a href="/keystatic" class="nav-admin" data-astro-cid-5hce7sga>Admin</a> </div> </nav> </header> <main data-astro-cid-5hce7sga> ', ' </main> <footer class="site-footer" data-astro-cid-5hce7sga> <div class="footer-content" data-astro-cid-5hce7sga> <div class="footer-brand" data-astro-cid-5hce7sga> <span class="footer-logo" data-astro-cid-5hce7sga>', '</span> <p class="footer-tagline" data-astro-cid-5hce7sga>', '</p> </div> <div class="footer-right" data-astro-cid-5hce7sga> <div class="theme-switcher" data-astro-cid-5hce7sga> <button type="button" class="theme-btn" data-theme="light" aria-label="Light mode" data-astro-cid-5hce7sga>Light</button> <button type="button" class="theme-btn" data-theme="dark" aria-label="Dark mode" data-astro-cid-5hce7sga>Dark</button> <button type="button" class="theme-btn" data-theme="system" aria-label="System theme" data-astro-cid-5hce7sga>System</button> </div> <p class="footer-powered" data-astro-cid-5hce7sga>\nBuilt with <a href="https://astro.build" data-astro-cid-5hce7sga>Astro</a> </p> </div> </div> </footer> ', "   </body> </html>"])), fullTitle, addAttribute(siteDescription, "content"), image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`, addAttribute(type, "content"), addAttribute(fullTitle, "content"), addAttribute(siteDescription, "content"), addAttribute(`${siteTitle} RSS Feed`, "title"), renderHead(), siteTitle, navLinks.map((item) => renderTemplate`<a${addAttribute(item.url, "href")} data-astro-cid-5hce7sga>${item.label}</a>`), renderSlot($$result, $$slots["default"]), siteTitle, siteTagline, renderScript($$result, "C:/Users/rodriguez/kris-portfolio/src/layouts/Base.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/rodriguez/kris-portfolio/src/layouts/Base.astro", void 0);

export { $$Base as $ };
