import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { fetchCategory } from "@/lib/sanity";
import { Header, Footer, AnimatedReveal } from "@/components/landing-page";
import { BlogCard } from "@/components/blog";

export const Route = createFileRoute("/blog/category/$slug")({
  loader: async ({ params }) => {
    const cat = await fetchCategory(params.slug);
    if (!cat) throw notFound();
    return cat;
  },
  staleTime: 60_000,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Category not found | TikEdge" }, { name: "robots", content: "noindex" }] };
    const desc = loaderData.description || `Articles about ${loaderData.title} from the TikEdge blog.`;
    return {
      meta: [
        { title: `${loaderData.title} Articles | TikEdge Blog` },
        { name: "description", content: desc },
        { property: "og:title", content: `${loaderData.title} — TikEdge Blog` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  return (
    <>
      <Header />
      <main className="bg-background pt-28">
        <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
          <AnimatedReveal>
            <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[11px] font-black uppercase text-muted-foreground hover:text-primary">
              <ArrowLeft size={14} /> All articles
            </Link>
            <p className="text-[11px] font-black uppercase text-primary">Category</p>
            <h1 className="display mt-4 text-5xl font-black uppercase text-foreground sm:text-6xl">{cat.title}</h1>
            {cat.description && <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{cat.description}</p>}
          </AnimatedReveal>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          {cat.posts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No articles in this category yet.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cat.posts.map((p, i) => (
                <AnimatedReveal key={p._id} delay={(i % 3) * 80}><BlogCard post={p} /></AnimatedReveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
