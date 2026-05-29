import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		imageService: "passthrough",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			siteUrl: "https://kris-rodriguez.krisjohn-rodriguez.workers.dev",
			database: d1({ binding: "DB", session: "auto" }),
		}),
	],
	devToolbar: { enabled: false },
	vite: {
		ssr: {
			noExternal: true,
		},
	},
});
