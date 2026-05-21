import { a5 as createComponent, ah as renderComponent, aq as renderTemplate, a4 as createAstro, ae as maybeRenderHead, a1 as addAttribute, l as Fragment } from '../chunks/astro/server_cX2-w8Hx.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_C2NIkkJy.mjs';
import { $ as $$Base } from '../chunks/Base_CG3ghWfR.mjs';
import { $ as $$ProjectCard } from '../chunks/ProjectCard_BsHjHDV2.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const activeTag = Astro2.url.searchParams.get("tag");
  const allProjects = await getCollection("projects");
  const sorted = allProjects.sort(
    (a, b) => new Date(b.data.published_at ?? 0).getTime() - new Date(a.data.published_at ?? 0).getTime()
  );
  const tags = [
    ...new Set(
      sorted.flatMap(
        (p) => p.data.tag ? p.data.tag.split(",").map((t) => t.trim()) : []
      ).filter(Boolean)
    )
  ];
  const sortedProjects = activeTag ? sorted.filter((p) => {
    if (!p.data.tag) return false;
    const projTags = p.data.tag.split(",").map((t) => t.trim().toLowerCase());
    return projTags.includes(activeTag.toLowerCase());
  }) : sorted;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": activeTag ? `${activeTag} \u2014 Work` : "Work", "data-astro-cid-57l5znwr": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="work-header" data-astro-cid-57l5znwr> <h1 data-astro-cid-57l5znwr>Projects</h1> <p class="work-intro" data-astro-cid-57l5znwr>
A selection of projects showcasing web development, UI design, and
			creative digital experiences.
</p> ${tags.length > 0 && renderTemplate`<nav class="tag-filters" aria-label="Filter by tag" data-astro-cid-57l5znwr> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/work?tag=${tag}`, "href")}${addAttribute([
    "tag-filter",
    { active: activeTag?.toLowerCase() === tag.toLowerCase() }
  ], "class:list")} data-astro-cid-57l5znwr> ${tag} </a>`)} ${activeTag && renderTemplate`<a href="/work" class="tag-clear" aria-label="Clear filter" data-astro-cid-57l5znwr>
Clear
</a>`} </nav>`} </section> ${sortedProjects.length > 0 ? renderTemplate`<section class="projects" data-astro-cid-57l5znwr> <div class="projects-grid" data-astro-cid-57l5znwr> ${sortedProjects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "title": project.data.title ?? "Untitled", "summary": project.data.summary, "featuredImage": project.data.featured_image ?? null, "href": `/work/${project.id}`, "client": project.data.client, "year": project.data.year, "tags": project.data.tag ? project.data.tag.split(",").map((t) => t.trim()) : [], "data-astro-cid-57l5znwr": true })}`)} </div> </section>` : renderTemplate`<section class="empty-state" data-astro-cid-57l5znwr> ${activeTag ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-57l5znwr": true }, { "default": async ($$result3) => renderTemplate` <p data-astro-cid-57l5znwr>No projects found with this tag.</p> <a href="/work" class="btn" data-astro-cid-57l5znwr>
View all projects
</a> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-57l5znwr": true }, { "default": async ($$result3) => renderTemplate` <p data-astro-cid-57l5znwr>
No projects yet. Add your first project in the admin
							panel.
</p> <a href="/keystatic" class="btn" data-astro-cid-57l5znwr>
Add a project
</a> ` })}`} </section>`}` })} `;
}, "C:/Users/rodriguez/kris-portfolio/src/pages/work/index.astro", void 0);

const $$file = "C:/Users/rodriguez/kris-portfolio/src/pages/work/index.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
