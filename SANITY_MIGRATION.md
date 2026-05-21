# Migrating Kris Portfolio from Keystatic to Sanity

This guide helps migrate the portfolio from Keystatic (local file-based CMS) to Sanity (cloud-based CMS) while keeping all animations and design intact.

## Current Setup

**Tech Stack:**
- Astro (static site generator)
- Keystatic (local CMS - doesn't work on Vercel production)
- Vercel (hosting)
- Content stored in `src/content/` as JSON files

**Content Collections:**
- Projects (portfolio items)
- Skills (tech skills)
- Experiences (work history)
- Contacts (social links)
- About (bio singleton)
- Settings (site config singleton)

**Key Features to Preserve:**
- Hero section with zoom animation on scroll
- Horizontal scroll container (About → Skills sections)
- Text scramble effect on About content
- Skills section pins then Featured work slides up
- Transparent navbar with color adaptation
- All GSAP animations
- Project cards grid
- Experience timeline
- Contact links

## Migration Steps

### 1. Install Sanity

```bash
npm install @sanity/astro sanity @sanity/client
npx sanity init
```

When prompted:
- Create new project: **Yes**
- Project name: **Kris Portfolio**
- Use default dataset: **Yes**
- Output path: **sanity**
- Template: **Clean project**

### 2. Create Sanity Schemas

Create these schema files in `sanity/schemas/`:

**`sanity/schemas/project.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text'
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number'
    }),
    defineField({
      name: 'published_at',
      title: 'Published At',
      type: 'date'
    }),
    defineField({
      name: 'featured_image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text'
    }),
    defineField({
      name: 'tag',
      title: 'Tags (comma separated)',
      type: 'string'
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url'
    })
  ]
})
```

**`sanity/schemas/skill.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Frontend, Design'
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      description: 'e.g. Advanced, Expert'
    })
  ]
})
```

**`sanity/schemas/experience.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'string'
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    })
  ]
})
```

**`sanity/schemas/contact.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contacts',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'display_label',
      title: 'Display Label',
      type: 'string',
      description: 'e.g. @username'
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url'
    })
  ]
})
```

**`sanity/schemas/about.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Bio / Content',
      type: 'text'
    })
  ]
})
```

**`sanity/schemas/settings.ts`:**
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string'
    }),
    defineField({
      name: 'tagline',
      title: 'Site Tagline',
      type: 'string'
    })
  ]
})
```

**`sanity/schemas/index.ts`:**
```typescript
import project from './project'
import skill from './skill'
import experience from './experience'
import contact from './contact'
import about from './about'
import settings from './settings'

export const schemaTypes = [
  project,
  skill,
  experience,
  contact,
  about,
  settings
]
```

### 3. Update Sanity Config

**`sanity/sanity.config.ts`:**
```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Kris Portfolio',
  projectId: 'YOUR_PROJECT_ID', // Get from sanity.io
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### 4. Create Sanity Client

**`src/lib/sanity.ts`:**
```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### 5. Update Astro Config

**`astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/static'
import react from '@astrojs/react'
import sanity from '@sanity/astro'

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    sanity({
      projectId: 'YOUR_PROJECT_ID',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    }),
  ],
  devToolbar: { enabled: false },
})
```

### 6. Update Environment Variables

**`.env`:**
```
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

**Add to Vercel:**
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

### 7. Update Data Fetching

Replace Keystatic queries with Sanity queries:

**Before (Keystatic):**
```typescript
import { getCollection } from 'astro:content'
const projects = await getCollection('projects')
```

**After (Sanity):**
```typescript
import { sanityClient } from '../lib/sanity'

const projects = await sanityClient.fetch(`
  *[_type == "project"] | order(published_at desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    client,
    year,
    published_at,
    featured_image,
    content,
    tag,
    url
  }
`)
```

### 8. Update index.astro

**Replace data fetching section:**
```typescript
---
import { sanityClient, urlFor } from '../lib/sanity'
import Base from '../layouts/Base.astro'
import ProjectCard from '../components/ProjectCard.astro'

// Fetch all data in parallel
const [projects, skills, experiences, contacts, about] = await Promise.all([
  sanityClient.fetch(`*[_type == "project"] | order(published_at desc) [0...4]`),
  sanityClient.fetch(`*[_type == "skill"] | order(_createdAt asc)`),
  sanityClient.fetch(`*[_type == "experience"] | order(_createdAt desc)`),
  sanityClient.fetch(`*[_type == "contact"] | order(_createdAt asc)`),
  sanityClient.fetch(`*[_type == "about"][0]`),
])

const featuredProjects = projects
const title = "Kris Rodriguez"
const titleWords = title.split(" ")
---
```

**Update image handling:**
```astro
{project.featured_image && (
  <img 
    src={urlFor(project.featured_image).width(800).url()} 
    alt={project.title}
  />
)}
```

### 9. Deploy Sanity Studio

```bash
cd sanity
npm run build
npx sanity deploy
```

Choose a studio hostname (e.g., `kris-portfolio`)

Access at: `https://kris-portfolio.sanity.studio`

### 10. Migrate Existing Content

Manually copy content from `src/content/` JSON files to Sanity Studio, or create a migration script:

**`scripts/migrate-to-sanity.js`:**
```javascript
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: false,
  token: 'YOUR_WRITE_TOKEN', // Get from sanity.io/manage
  apiVersion: '2024-01-01',
})

// Read and migrate projects
const projectsDir = './src/content/projects'
const projectFiles = fs.readdirSync(projectsDir)

for (const file of projectFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(projectsDir, file)))
  await client.create({
    _type: 'project',
    ...data
  })
}

console.log('Migration complete!')
```

Run: `node scripts/migrate-to-sanity.js`

## Important Notes

1. **Keep all animations** - Frontend code stays the same, only data source changes
2. **Image URLs** - Use `urlFor()` helper for Sanity images
3. **Slugs** - Sanity uses `slug.current` instead of direct slug field
4. **IDs** - Sanity uses `_id` instead of `id`
5. **Static site** - Can use `output: 'static'` with Sanity (works on Vercel)
6. **Studio access** - Anyone with studio URL can edit (add auth if needed)

## Testing

1. Run locally: `npm run dev`
2. Check all sections load correctly
3. Verify animations still work
4. Test image loading
5. Deploy to Vercel
6. Test production site

## Rollback Plan

If issues occur, revert to Keystatic:
1. Keep `src/content/` folder
2. Restore old `astro.config.mjs`
3. Remove Sanity packages
4. Use local editing only

## Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity + Astro Guide](https://docs.astro.build/en/guides/cms/sanity/)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
