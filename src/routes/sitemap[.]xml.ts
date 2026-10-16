import { createFileRoute } from "@tanstack/react-router";
import { fetchPosts } from "@/lib/sanity";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const posts = await fetchPosts();
        const cats = [...new Set(posts.map((p) => p.category?.slug).filter(Boolean))];
        const urls = [
          `${origin}/`,
          `${origin}/blog`,
          ...caseStudies.map((c) => `${origin}/case-studies/${c.slug}`),
          ...cats.map((c) => `${origin}/blog/category/${c}`),
        ].map((u) => `<url><loc>${u}</loc></url>`);
        const postUrls = posts.map((p) => `<url><loc>${origin}/blog/${p.slug}</loc><lastmod>${p.publishedAt}</lastmod></url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...urls, ...postUrls].join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
      },
    },
  },
});
