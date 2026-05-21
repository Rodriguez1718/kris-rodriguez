import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";

export default defineConfig({
    output: "server",
    adapter: vercel(),
    integrations: [
        react(),
        keystatic(),
    ],
    devToolbar: { enabled: false },
});
