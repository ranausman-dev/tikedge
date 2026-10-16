import { createFileRoute } from "@tanstack/react-router";
import { fetchPosts } from "@/lib/sanity";

const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const posts = (await fetchPosts()).slice(0, 30);
        const items = posts
          .map(
            (p) => `<item><title>${esc(p.title)}</title><link>${origin}/blog/${p.slug}</link><guid>${origin}/blog/${p.slug}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description>${p.category ? `<category>${esc(p.category.title)}</category>` : ""}</item>`,
          )
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>TikEdge Blog</title><link>${origin}/blog</link><description>Growth playbooks from TikEdge.</description>${items}</channel></rss>`;
        return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
      },
    },
  },
});
