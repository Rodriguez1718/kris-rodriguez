import { config, collection, singleton, fields } from "@keystatic/core";
import React from "react";

export default config({
    storage: 
        import.meta.env.PROD
            ? {
                kind: "github",
                repo: {
                    owner: import.meta.env.GITHUB_REPO_OWNER!,
                    name: import.meta.env.GITHUB_REPO_NAME!,
                },
            }
            : {
                kind: "local",
            },
    ui: {
        brand: {
            name: "Kris Portfolio",
            mark: () => React.createElement(
                "a",
                {
                    href: "/",
                    target: "_blank",
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: "bold",
                        fontSize: "12px",
                        border: "1px solid currentColor",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        letterSpacing: "0.5px",
                    }
                },
                "View Site ↗"
            ),
        },
    },
    singletons: {
        about: singleton({
            label: "About Me",
            path: "src/content/about/index",
            format: { data: "json" },
            previewUrl: "/",
            schema: {
                content: fields.text({ label: "Bio / Content", multiline: true }),
            },
        }),
        settings: singleton({
            label: "Site Settings",
            path: "src/content/settings/index",
            format: { data: "json" },
            previewUrl: "/",
            schema: {
                title: fields.text({ label: "Site Title" }),
                tagline: fields.text({ label: "Site Tagline" }),
            },
        }),
    },
    collections: {
        projects: collection({
            label: "Projects",
            slugField: "title",
            path: "src/content/projects/*",
            format: { data: "json" },
            previewUrl: "/work/{slug}",
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
                content: fields.text({ label: "Content", multiline: true }),
                tag: fields.text({ label: "Tags (comma separated)" }),
                url: fields.text({ label: "Project URL" }),
            },
        }),
        skills: collection({
            label: "Skills",
            slugField: "name",
            path: "src/content/skills/*",
            format: { data: "json" },
            previewUrl: "/",
            schema: {
                name: fields.slug({ name: { label: "Name" } }),
                category: fields.text({ label: "Category (e.g. Frontend, Design)" }),
                level: fields.text({ label: "Level (e.g. Advanced, Expert)" }),
            },
        }),
        experiences: collection({
            label: "Experiences",
            slugField: "role",
            path: "src/content/experiences/*",
            format: { data: "json" },
            previewUrl: "/",
            schema: {
                role: fields.slug({ name: { label: "Role / Title" } }),
                company: fields.text({ label: "Company" }),
                start_date: fields.text({ label: "Start Date" }),
                end_date: fields.text({ label: "End Date" }),
                description: fields.text({ label: "Description", multiline: true }),
            },
        }),
        contacts: collection({
            label: "Contacts",
            slugField: "platform",
            path: "src/content/contacts/*",
            format: { data: "json" },
            previewUrl: "/",
            schema: {
                platform: fields.slug({ name: { label: "Platform" } }),
                display_label: fields.text({ label: "Display Label (e.g. @username)" }),
                url: fields.text({ label: "URL" }),
            },
        }),
    },
});
