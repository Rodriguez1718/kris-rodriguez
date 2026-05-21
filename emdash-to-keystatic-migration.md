# Migrate Astro Portfolio from emdash/Cloudflare to Keystatic/Vercel

## Context

This is an Astro 6 portfolio site that was using:
- `emdash` CMS with `@emdash-cms/cloudflare`
- `@astrojs/cloudflare` adapter
- Cloudflare D1 (database) and R2 (media storage)
- `src/worker.ts` as the Cloudflare Workers entrypoint
- `src/live.config.ts` for live content collections
- `wrangler.jsonc` for Cloudflare config

The goal is to migrate to:
- **Keystatic** CMS (file-based, with admin UI at `/keystatic`)
- **`@astrojs/vercel`** adapter
- Content stored as JSON files in `src/content/projects/`
- Deployed on **Vercel**

---

## Step 1 — Swap dependencies

```bash
npm remove @astrojs/cloudflare @emdash-cms/cloudflare emdash
npm install @astrojs/vercel @keystatic/core @keystatic/astro
```

---

## Step 2 — Replace `astro.config.mjs`

Replace the entire file with:

```js
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import { defineConfig, fontProviders } from "astro/config";
import keystatic from "@keystatic/astro";

export default defineConfig({
    output: "hybrid",
    adapter: vercel(),
    image: {
        layout: "constrained",
        responsiveStyles: true,
    },
    integrations: [
        react(),
        keystatic(),
    ],
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Playfair Display",
            cssVariable: "--font-serif",
            weights: [400, 500, 600, 700],
            fallbacks: ["serif"],
        },
    ],
    devToolbar: { enabled: false },
});
```

---

## Step 3 — Create `keystatic.config.ts` in the project root

```ts
import { config, collection, fields } from "@keystatic/core";

export default config({
    storage: {
        kind: "local",
    },
    collections: {
        projects: collection({
            label: "Projects",
            slugField: "title",
            path: "src/content/projects/*",
            format: { data: "json" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                summary: fields.text({ label: "Summary", multiline: true }),
                client: fields.text({ label: "Client" }),
                year: fields.integer({ label: "Year" }),
                published_at: fields.date({ label: "Published At" }),
                featured_image: fields.image({
                    label: "Featured Image",
                    directory: "public/images/projects",
                    publicPath: "/images/projects/",
                }),
            },
        }),
    },
});
```

---

## Step 4 — Create Keystatic route files

Create `src/pages/keystatic/[...params].astro`:

```astro
---
export const prerender = false;
---
```

Create `src/pages/api/keystatic/[...params].ts`:

```ts
import { makeRouteHandler } from "@keystatic/astro/api";
import config from "../../../keystatic.config";

export const { GET, POST } = makeRouteHandler({ config });
```

---

## Step 5 — Replace `src/live.config.ts` with `src/content/config.ts`

Delete `src/live.config.ts` and create `src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        summary: z.string().optional(),
        client: z.string().optional(),
        year: z.number().optional(),
        published_at: z.string().optional(),
        featured_image: z.string().optional(),
    }),
});

export const collections = { projects };
```

---

## Step 6 — Update `src/pages/index.astro`

Replace emdash imports and data fetching with Astro content collections.

**Remove:**
```ts
import { getEmDashCollection, getSiteSettings } from "emdash";

const [settings, { entries: featuredProjects, cacheHint }] = await Promise.all([
    getSiteSettings(),
    getEmDashCollection("projects", {
        orderBy: { published_at: "desc" },
        limit: 4,
    }),
]);

if (import.meta.env.PROD && Astro.cache?.enabled) {
    Astro.cache.set(cacheHint);
}
```

**Replace with:**
```ts
import { getCollection } from "astro:content";

const allProjects = await getCollection("projects");
const featuredProjects = allProjects
    .sort((a, b) =>
        new Date(b.data.published_at ?? 0).getTime() -
        new Date(a.data.published_at ?? 0).getTime()
    )
    .slice(0, 4);
```

Also remove any reference to `settings?.title` and `settings?.tagline` — either hardcode those values or create a separate `settings.json` file in `src/content/`.

Field mappings stay the same — `project.data.title`, `project.data.summary`, `project.data.featured_image`, `project.data.client`, `project.data.year` all work as before.

---

## Step 7 — Update any other pages that use emdash

Search for all emdash imports across the project:

```bash
grep -r "from \"emdash\"" src/
grep -r "getEmDashCollection\|getEmDashEntry\|getSiteSettings" src/
```

For each file found, replace the emdash call with the equivalent `getCollection` or `getEntry` from `astro:content`. Pattern:

- `getEmDashCollection("projects", ...)` → `getCollection("projects")`
- `getEmDashEntry("projects", slug)` → `getEntry("projects", slug)`

---

## Step 8 — Delete Cloudflare-specific files

```bash
rm src/worker.ts
rm src/live.config.ts
rm wrangler.jsonc
rm .dev.vars
```

---

## Step 9 — Create the content directory

```bash
mkdir -p src/content/projects
mkdir -p public/images/projects
```

If migrating content from `seed/seed.json`, convert each project entry to an individual JSON file at `src/content/projects/<slug>.json` matching the schema defined in Step 5.

---

## Step 10 — Test locally

```bash
npx astro dev
```

- Site: `http://localhost:4321`
- Keystatic admin UI: `http://localhost:4321/keystatic`

Use the admin UI to add/edit projects. Each entry saves as a JSON file in `src/content/projects/`.

---

## Step 11 — Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Astro. No environment variables needed for local storage mode.

---

## Notes

- The Keystatic admin UI is available in production at `yoursite.vercel.app/keystatic`. To protect it, add Keystatic's GitHub auth mode for production (see [Keystatic docs](https://keystatic.com/docs/github-mode)).
- Images uploaded via the admin are saved to `public/images/projects/` and committed to the repo.
- If you need site-wide settings (title, tagline), create a `src/content/settings.json` file and load it with `import settings from "../content/settings.json"`.
