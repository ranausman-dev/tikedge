import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { fetchPosts } from "@/lib/sanity";
import { Header, Footer, AnimatedReveal } from "@/components/landing-page";
import { BlogCard } from "@/components/blog";
import { Button } from "@/components/ui/button";

const PAGE = 9;

export const Route = createFileRoute("/blog/")({
  loader: () => fetchPosts(),
  staleTime: 60_000,
  head: () => ({
    meta: [
      { title: "TikTok Shop Growth Insights for DTC Brand Owners | TikEdge" },
      { name: "description", content: "Insights for DTC brand owners on TikTok Shop growth, creator sales, channel alignment and shop health." },
      { property: "og:title", content: "TikEdge — Insights for DTC Brand Owners" },
      { property: "og:description", content: "Explore TikTok Shop as an additional revenue channel for your brand, alongside Amazon and Shopify." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const categories = useMemo(() => {
    const m = new Map<string, string>();
    posts.forEach((p) => p.category && m.set(p.category.slug, p.category.title));
    return [...m.entries()];
  }, [posts]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) =>
      [p.title, p.category?.title, ...(p.tags ?? [])].some((v) => v?.toLowerCase().includes(s)),
    );
  }, [posts, q]);

  return (
    <>
      <Header />
      <main className="bg-background pt-28">
        <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
          <AnimatedReveal>
            <p className="text-[11px] font-black uppercase text-primary">The TikEdge blog</p>
            <h1 className="display mt-4 max-w-4xl text-5xl font-black uppercase text-foreground sm:text-6xl lg:text-7xl">
              Your brand. <span className="text-primary">Your next stage.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Practical perspectives for DTC brand owners building TikTok Shop alongside Amazon and Shopify — from creator-led sales to profitable scale and healthier shop operations.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={100} className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
                placeholder="Search titles, categories, tags"
                aria-label="Search articles"
                className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-card-foreground outline-none transition-colors focus:border-primary"
              />
            </label>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map(([slug, title]) => (
                  <Link key={slug} to="/blog/category/$slug" params={{ slug }} className="rounded-full border border-border px-4 py-2 text-[10px] font-black uppercase transition-colors hover:border-primary hover:text-primary">
                    {title}
                  </Link>
                ))}
              </div>
            )}
          </AnimatedReveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              {posts.length === 0 ? "No articles published yet — check back soon." : "No articles match your search."}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, shown).map((p, i) => (
                <AnimatedReveal key={p._id} delay={(i % 3) * 80}><BlogCard post={p} /></AnimatedReveal>
              ))}
            </div>
          )}
          {filtered.length > shown && (
            <div className="mt-12 text-center">
              <Button size="lg" variant="dark" onClick={() => setShown((s) => s + PAGE)}>Load more articles</Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
