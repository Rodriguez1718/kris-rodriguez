import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = site?.toString() || url.origin;
	const siteTitle = "Kris Rodriguez";
	const siteDescription = "Design & Development";

	const projects = await getCollection("projects");
	const sorted = projects.sort(
		(a, b) =>
			new Date(b.data.published_at ?? 0).getTime() -
			new Date(a.data.published_at ?? 0).getTime(),
	);

	const items = sorted
		.map((project) => {
			if (!project.data.published_at) return null;
			const pubDate = new Date(project.data.published_at).toUTCString();

			const projectUrl = `${siteUrl}/work/${project.id}`;
			const title = escapeXml(project.data.title || "Untitled");
			const description = escapeXml(project.data.summary || "");

			return `    <item>
      <title>${title}</title>
      <link>${projectUrl}</link>
      <guid isPermaLink="true">${projectUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
		})
		.filter(Boolean)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};

const XML_ESCAPE_PATTERNS = [
	[/&/g, "&amp;"],
	[/</g, "&lt;"],
	[/>/g, "&gt;"],
	[/"/g, "&quot;"],
	[/'/g, "&apos;"],
] as const;

function escapeXml(str: string): string {
	let result = str;
	for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
		result = result.replace(pattern, replacement);
	}
	return result;
}
