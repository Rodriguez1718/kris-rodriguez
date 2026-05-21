import { a5 as createComponent, ah as renderComponent, aq as renderTemplate, a4 as createAstro, ae as maybeRenderHead, a1 as addAttribute } from '../../chunks/astro/server_cX2-w8Hx.mjs';
import 'piccolore';
import { a as getEntry, g as getCollection } from '../../chunks/_astro_content_C2NIkkJy.mjs';
import { $ as $$Base } from '../../chunks/Base_CG3ghWfR.mjs';
import { $ as $$ProjectCard } from '../../chunks/ProjectCard_BsHjHDV2.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const project = await getEntry("projects", slug);
  if (!project) {
    return Astro2.redirect("/404");
  }
  const allProjects = await getCollection("projects");
  const otherProjects = allProjects.filter((p) => p.id !== project.id).sort(
    (a, b) => new Date(b.data.published_at ?? 0).getTime() - new Date(a.data.published_at ?? 0).getTime()
  ).slice(0, 2);
  function getImageSrc(img) {
    if (!img || typeof img !== "object") return void 0;
    const image = img;
    return typeof image.src === "string" ? image.src : void 0;
  }
  const featuredImgSrc = getImageSrc(project.data.featured_image);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": project.data.title, "description": project.data.summary, "image": featuredImgSrc, "data-astro-cid-by4zwojz": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="project" data-astro-cid-by4zwojz> <header class="project-header" data-astro-cid-by4zwojz> <div class="project-meta" data-astro-cid-by4zwojz> ${project.data.client && renderTemplate`<span class="project-client" data-astro-cid-by4zwojz> ${project.data.client} </span>`} ${project.data.client && project.data.year && renderTemplate`<span class="meta-separator" data-astro-cid-by4zwojz>·</span>`} ${project.data.year && renderTemplate`<span class="project-year" data-astro-cid-by4zwojz> ${project.data.year} </span>`} </div> <h1 class="project-title" data-astro-cid-by4zwojz> ${project.data.title} </h1> ${project.data.summary && renderTemplate`<p class="project-summary" data-astro-cid-by4zwojz> ${project.data.summary} </p>`} ${project.data.url && renderTemplate`<a${addAttribute(project.data.url, "href")} class="project-link" target="_blank" rel="noopener noreferrer" data-astro-cid-by4zwojz>
View Live Project →
</a>`} </header> ${project.data.featured_image && renderTemplate`<div class="featured-image" data-astro-cid-by4zwojz> <img${addAttribute(getImageSrc(project.data.featured_image), "src")}${addAttribute(
    typeof project.data.featured_image === "object" ? project.data.featured_image.alt ?? project.data.title : project.data.title,
    "alt"
  )} loading="lazy" data-astro-cid-by4zwojz> </div>`} ${project.data.content && renderTemplate`<div class="project-content" data-astro-cid-by4zwojz> <p data-astro-cid-by4zwojz>${project.data.content}</p> </div>`} </article> ${otherProjects.length > 0 && renderTemplate`<section class="more-projects" data-astro-cid-by4zwojz> <div class="more-inner" data-astro-cid-by4zwojz> <h2 class="more-title" data-astro-cid-by4zwojz>More Work</h2> <div class="more-grid" data-astro-cid-by4zwojz> ${otherProjects.map((p) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "title": p.data.title ?? "Untitled", "summary": p.data.summary, "featuredImage": p.data.featured_image ?? null, "href": `/work/${p.id}`, "client": p.data.client, "year": p.data.year, "tags": p.data.tag ? p.data.tag.split(",").map((t) => t.trim()) : [], "data-astro-cid-by4zwojz": true })}`)} </div> </div> </section>`}` })} `;
}, "C:/Users/rodriguez/kris-portfolio/src/pages/work/[slug].astro", void 0);

const $$file = "C:/Users/rodriguez/kris-portfolio/src/pages/work/[slug].astro";
const $$url = "/work/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
