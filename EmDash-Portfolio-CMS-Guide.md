# Step-by-Step Guide: Making Your Astro Portfolio CMS-Editable with EmDash

> **Assumption:** You already have an EmDash project scaffolded. This guide covers how to wire up your portfolio's sections so their content is managed through the EmDash admin panel instead of hardcoded in `.astro` files.

---

## Overview of the Approach

EmDash stores content in a live database (SQLite locally, Cloudflare D1 in production). You'll:

1. Create **collections** (content types) in the EmDash admin for each editable section
2. Add your content via the admin panel
3. Replace hardcoded values in your `.astro` pages with `getEmDashCollection()` / `getEmDashEntry()` queries
4. Generate TypeScript types so your code stays type-safe

---

## Step 1: Open the EmDash Admin Panel

Make sure your dev server is running:

```bash
npm run dev
```

Then open: **http://localhost:4321/_emdash/admin**

If this is your first time, the Setup Wizard will ask for:
- Site Title (e.g., your name)
- Tagline (e.g., "Full Stack Developer")
- Admin Email
- A passkey (uses your device's biometrics / Windows Hello — no password needed)

---

## Step 2: Create Your Collections (Content Types)

Think of a **collection** as a database table for a section of your portfolio. You'll create these in the admin UI under **Content Types**.

### 2a. `profile` — Home / Profile Section

Go to **Content Types → New Collection** and create:

| Field Name | Field Type | Notes |
|---|---|---|
| `name` | Text | Your full name |
| `title` | Text | e.g., "Frontend Developer" |
| `intro` | Rich Text | Short intro paragraph on your homepage |
| `avatar_url` | Text (URL) | Link to your profile photo |
| `resume_url` | Text (URL) | Link to your resume/CV file |

> This collection will hold **one entry** (a singleton). You can enforce this in your Astro page by fetching a single entry instead of a list.

---

### 2b. `about` — About Me Section

| Field Name | Field Type | Notes |
|---|---|---|
| `content` | Rich Text | Your full About Me text |

---

### 2c. `skills` — Skills Section

| Field Name | Field Type | Notes |
|---|---|---|
| `name` | Text | e.g., "JavaScript" |
| `category` | Text | e.g., "Frontend", "Backend", "Tools" |
| `level` | Text | e.g., "Intermediate", "Advanced" *(optional)* |

> Each skill = one entry. You'll query all skills and optionally group by category.

---

### 2d. `projects` — Projects Section

| Field Name | Field Type | Notes |
|---|---|---|
| `title` | Text | Project name |
| `description` | Rich Text | What the project is about |
| `tech_stack` | Text | e.g., "Astro, Tailwind, Node.js" |
| `github_url` | Text (URL) | GitHub link *(optional)* |
| `live_url` | Text (URL) | Live demo link *(optional)* |
| `thumbnail_url` | Text (URL) | Project screenshot *(optional)* |

---

### 2e. `experience` — Experience / OJT Section

| Field Name | Field Type | Notes |
|---|---|---|
| `company` | Text | Company / organization name |
| `role` | Text | Your job title or OJT position |
| `start_date` | Text | e.g., "Jan 2024" |
| `end_date` | Text | e.g., "May 2024" or "Present" |
| `description` | Rich Text | What you did / learned |

---

### 2f. `contact` — Contact Links Section

| Field Name | Field Type | Notes |
|---|---|---|
| `platform` | Text | e.g., "GitHub", "LinkedIn", "Email" |
| `url` | Text (URL) | The link |
| `display_label` | Text | e.g., "github.com/yourusername" |

---

## Step 3: Add Your Content in the Admin

For each collection you created:

1. Go to **Content → [Collection Name]**
2. Click **New Entry**
3. Fill in all fields
4. Click **Publish**

Repeat for every skill, project, experience entry, and contact link. Do this for `profile` and `about` once (singleton pattern).

---

## Step 4: Generate TypeScript Types

After adding your collections, run this in your terminal to generate typed interfaces:

```bash
npx emdash types
```

This creates (or updates) `.emdash/types.ts` with interfaces for all your collections, so your Astro pages get autocompletion and type checking.

---

## Step 5: Query CMS Content in Your Astro Pages

Now replace hardcoded values in your `.astro` files with live CMS data.

### Home / Profile Page (`src/pages/index.astro`)

```astro
---
import { getEmDashCollection } from "emdash";

// Fetch first entry as a singleton
const { entries: profiles } = await getEmDashCollection("profile");
const profile = profiles[0]; // only one profile entry
---

<section>
  <h1>{profile.data.name}</h1>
  <h2>{profile.data.title}</h2>
  <p>{profile.data.intro}</p>
  <a href={profile.data.resume_url}>Download Resume</a>
</section>
```

---

### About Page (`src/pages/about.astro`)

```astro
---
import { getEmDashCollection } from "emdash";
import { PortableText } from "emdash/components";

const { entries: abouts } = await getEmDashCollection("about");
const about = abouts[0];
---

<section>
  <h2>About Me</h2>
  <!-- Rich text renders via PortableText component -->
  <PortableText value={about.data.content} />
</section>
```

---

### Skills Page/Section (`src/pages/skills.astro` or a component)

```astro
---
import { getEmDashCollection } from "emdash";

const { entries: skills } = await getEmDashCollection("skills");
---

<section>
  <h2>Skills</h2>
  <ul>
    {skills.map(skill => (
      <li>
        <strong>{skill.data.name}</strong>
        {skill.data.category && <span> — {skill.data.category}</span>}
      </li>
    ))}
  </ul>
</section>
```

---

### Projects Page (`src/pages/projects.astro`)

```astro
---
import { getEmDashCollection } from "emdash";
import { PortableText } from "emdash/components";

const { entries: projects } = await getEmDashCollection("projects");
---

<section>
  <h2>Projects</h2>
  {projects.map(project => (
    <article>
      <h3>{project.data.title}</h3>
      <PortableText value={project.data.description} />
      <p>Stack: {project.data.tech_stack}</p>
      {project.data.github_url && <a href={project.data.github_url}>GitHub</a>}
      {project.data.live_url && <a href={project.data.live_url}>Live Demo</a>}
    </article>
  ))}
</section>
```

---

### Experience Page (`src/pages/experience.astro`)

```astro
---
import { getEmDashCollection } from "emdash";
import { PortableText } from "emdash/components";

const { entries: experiences } = await getEmDashCollection("experience");
---

<section>
  <h2>Experience / OJT</h2>
  {experiences.map(exp => (
    <article>
      <h3>{exp.data.role} — {exp.data.company}</h3>
      <p>{exp.data.start_date} – {exp.data.end_date}</p>
      <PortableText value={exp.data.description} />
    </article>
  ))}
</section>
```

---

### Contact Section

```astro
---
import { getEmDashCollection } from "emdash";

const { entries: contacts } = await getEmDashCollection("contact");
---

<section>
  <h2>Contact</h2>
  <ul>
    {contacts.map(link => (
      <li>
        <a href={link.data.url}>{link.data.platform}: {link.data.display_label}</a>
      </li>
    ))}
  </ul>
</section>
```

---

## Step 6: Handle Rich Text (Portable Text)

EmDash stores rich text as **Portable Text** (structured JSON), not raw HTML. Use the built-in component to render it:

```astro
---
import { PortableText } from "emdash/components";
---

<PortableText value={entry.data.your_rich_text_field} />
```

This renders headings, bold, links, lists, etc. automatically.

---

## Step 7: Verify Everything Works

1. With `npm run dev` running, visit each page of your portfolio
2. Check that all content loads from the CMS (not hardcoded)
3. Go back to the admin panel, **edit a field**, and **publish** it
4. Refresh the page — the updated content should appear immediately (EmDash fetches live from the DB, no rebuild needed)

---

## Step 8: Update `astro.config.mjs`

Make sure your config includes the EmDash integration (should already be there if you used the EmDash scaffold):

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { sqlite } from "emdash/db"; // local dev

export default defineConfig({
  integrations: [
    emdash({
      database: sqlite(), // switch to d1() for Cloudflare deployment
    }),
  ],
});
```

---

## Quick Reference: What's Now CMS-Editable

| Field | Collection | Admin Path |
|---|---|---|
| Name | `profile` | Content → profile |
| Title / Role | `profile` | Content → profile |
| Intro | `profile` | Content → profile |
| Resume link | `profile` | Content → profile |
| About content | `about` | Content → about |
| Skills | `skills` | Content → skills |
| Projects | `projects` | Content → projects |
| Experience / OJT | `experience` | Content → experience |
| Contact links | `contact` | Content → contact |

---

## Tips

- **No rebuild needed** — EmDash queries the database live, so editing content in the admin is instant.
- **Ordering** — Use the `order` field or a `sort_order` number field in your collections if you want to control display order.
- **Media** — Use the **Media Library** in the admin to upload images (avatars, project thumbnails) instead of using external URLs.
- **Re-run `npx emdash types`** every time you add or change fields in a collection to keep TypeScript types in sync.
