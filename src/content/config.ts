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
        content: z.string().optional(),
        tag: z.string().optional(),
        url: z.string().optional(),
    }),
});

const about = defineCollection({
    loader: glob({ pattern: "index.json", base: "./src/content/about" }),
    schema: z.object({
        content: z.string(),
    }),
});

const skills = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
    schema: z.object({
        name: z.string(),
        category: z.string().optional(),
        level: z.string().optional(),
    }),
});

const experiences = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/experiences" }),
    schema: z.object({
        role: z.string(),
        company: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        description: z.string().optional(),
    }),
});

const contacts = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/contacts" }),
    schema: z.object({
        platform: z.string(),
        display_label: z.string(),
        url: z.string(),
    }),
});

const settings = defineCollection({
    loader: glob({ pattern: "index.json", base: "./src/content/settings" }),
    schema: z.object({
        title: z.string(),
        tagline: z.string().optional(),
    }),
});

export const collections = { projects, about, skills, experiences, contacts, settings };
