import { a5 as createComponent, ae as maybeRenderHead, a1 as addAttribute, aq as renderTemplate, a4 as createAstro } from './astro/server_cX2-w8Hx.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { title, summary, featuredImage, href, client, year, categories, tags } = Astro2.props;
  const allTags = [...categories || [], ...tags || []];
  const imgSrc = typeof featuredImage === "string" ? featuredImage : featuredImage?.src ?? null;
  const imgAlt = typeof featuredImage === "object" && featuredImage !== null ? featuredImage.alt ?? title : title;
  return renderTemplate`${maybeRenderHead()}<article class="project-card" data-astro-cid-mspuyifq> <a${addAttribute(href, "href")} class="card-link" data-astro-cid-mspuyifq> <div class="card-image" data-astro-cid-mspuyifq> ${imgSrc ? renderTemplate`<img${addAttribute(imgSrc, "src")}${addAttribute(imgAlt, "alt")} loading="lazy" data-astro-cid-mspuyifq>` : renderTemplate`<div class="card-image-placeholder" aria-hidden="true" data-astro-cid-mspuyifq></div>`} <div class="card-overlay" data-astro-cid-mspuyifq> <span class="card-view" data-astro-cid-mspuyifq>View Project</span> </div> </div> <div class="card-content" data-astro-cid-mspuyifq> <h2 class="card-title" data-astro-cid-mspuyifq>${title}</h2> <div class="card-meta" data-astro-cid-mspuyifq> ${client && renderTemplate`<span class="card-client" data-astro-cid-mspuyifq>${client}</span>`} ${client && year && renderTemplate`<span class="card-separator" data-astro-cid-mspuyifq>·</span>`} ${year && renderTemplate`<span class="card-year" data-astro-cid-mspuyifq>${year}</span>`} </div> ${summary && renderTemplate`<p class="card-summary" data-astro-cid-mspuyifq>${summary}</p>`} ${allTags.length > 0 && renderTemplate`<div class="card-categories" data-astro-cid-mspuyifq> ${allTags.map((tag) => renderTemplate`<span class="card-category" data-astro-cid-mspuyifq>${tag}</span>`)} </div>`} </div> </a> </article> `;
}, "C:/Users/rodriguez/kris-portfolio/src/components/ProjectCard.astro", void 0);

export { $$ProjectCard as $ };
