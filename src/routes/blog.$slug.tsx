import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { fetchPost, urlFor, formatDate } from "@/lib/sanity";
import { Header, Footer, AnimatedReveal } from "@/components/landing-page";
import { BlogCard, ArticleBody, ShareButtons, readTime } from "@/components/blog";
import { Button } from "@/components/ui/button";

const SITE = "https://tikedge.co";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await fetchPost(params.slug);
    if (!data?.post) throw notFound();
    return data as typeof data & { post: NonNullable<typeof data.post> };
  },
  staleTime: 60_000,
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | TikEdge" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const title = p.seoTitle || `${p.title} | TikEdge Blog`;
    const desc = p.seoDescription || p.excerpt || "";
    const canonical = p.canonicalUrl || `${SITE}/blog/${params.slug}`;
    const image = p.mainImage?.asset ? urlFor(p.mainImage).width(1600).height(800).fit("crop").url() : undefined;
    const article = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: desc,
      ...(image ? { image } : {}),
      author: { "@type": "Person", name: p.author?.name || "TikEdge" },
      publisher: { "@type": "Organization", name: "TikEdge" },
      datePublished: p.publishedAt,
      dateModified: p.updatedAt || p.publishedAt,
      mainEntityOfPage: canonical,
    };
    const crumbs = [["Home", SITE], ["Blog", `${SITE}/blog`]];
    if (p.category) crumbs.push([p.category.title, `${SITE}/blog/category/${p.category.slug}`]);
    crumbs.push([p.title, canonical]);
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
    };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(p.focusKeyword ? [{ name: "keywords", content: p.focusKeyword }] : []),
        { name: "robots", content: p.noIndex ? "noindex, nofollow" : "index, follow" },
        { property: "og:title", content: p.seoTitle || p.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.seoTitle || p.title },
        { name: "twitter:description", content: desc },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(article) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { post, related, prev, next } = Route.useLoaderData();
  const url = post.canonicalUrl || `${SITE}/blog/${post.slug}`;

  return (
    <>
      <Header />
      <main className="bg-background pt-28">
        <article>
          <header className="mx-auto max-w-4xl px-5 pt-10 sm:px-8">
            <AnimatedReveal>
              <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground">
                <Link to="/" className="hover:text-primary">Home</Link><ChevronRight size={12} />
                <Link to="/blog" className="hover:text-primary">Blog</Link>
                {post.category && (<><ChevronRight size={12} /><Link to="/blog/category/$slug" params={{ slug: post.category.slug }} className="hover:text-primary">{post.category.title}</Link></>)}
                <ChevronRight size={12} /><span className="line-clamp-1 text-foreground">{post.title}</span>
              </nav>
              <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-[11px] font-black uppercase text-muted-foreground hover:text-primary">
                <ArrowLeft size={14} /> Back to blog
              </Link>
              {post.category && <p className="text-[11px] font-black uppercase text-primary">{post.category.title}</p>}
              <h1 className="display mt-4 text-4xl font-black uppercase leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">{post.title}</h1>
              {post.excerpt && <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-border py-5">
                {post.author?.image?.asset ? (
                  <img src={urlFor(post.author.image).width(80).height(80).fit("crop").url()} alt={post.author.name} className="size-10 rounded-full object-cover" />
                ) : (
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">{post.author?.name?.[0] ?? "T"}</span>
                )}
                <div className="text-[11px] font-bold uppercase text-muted-foreground">
                  <span className="text-foreground">{post.author?.name ?? "TikEdge"}</span> · {formatDate(post.publishedAt)} · {readTime(post.readingTime)}
                </div>
              </div>
            </AnimatedReveal>
          </header>

          {post.mainImage?.asset && (
            <AnimatedReveal delay={100} className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
              <img
                src={urlFor(post.mainImage).width(1600).height(800).fit("crop").url()}
                srcSet={`${urlFor(post.mainImage).width(800).height(400).fit("crop").url()} 800w, ${urlFor(post.mainImage).width(1600).height(800).fit("crop").url()} 1600w`}
                sizes="(min-width:1152px) 1152px, 100vw"
                alt={post.mainImage.alt || post.title}
                width={1600}
                height={800}
                className="aspect-[2/1] w-full rounded-3xl border border-border object-cover shadow-editorial"
              />
            </AnimatedReveal>
          )}

          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <ArticleBody value={post.body} />
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-black uppercase text-secondary-foreground">#{t}</span>
                ))}
              </div>
            )}
            <div className="mt-8 border-t border-border pt-8"><ShareButtons url={url} title={post.title} /></div>
            {post.author?.bio && (
              <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-card-foreground">
                <p className="text-[10px] font-black uppercase text-primary">About the author</p>
                <p className="mt-2 font-extrabold">{post.author.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.author.bio}</p>
              </div>
            )}
          </div>
        </article>

        {(prev || next) && (
          <nav className="mx-auto grid max-w-4xl gap-4 px-5 pb-8 sm:grid-cols-2 sm:px-8" aria-label="More articles">
            {prev ? (
              <Link to="/blog/$slug" params={{ slug: prev.slug }} className="group rounded-xl border border-border bg-card p-5 text-card-foreground transition-colors hover:border-primary">
                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground"><ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Previous</span>
                <span className="mt-2 block font-extrabold">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to="/blog/$slug" params={{ slug: next.slug }} className="group rounded-xl border border-border bg-card p-5 text-right text-card-foreground transition-colors hover:border-primary">
                <span className="flex items-center justify-end gap-1 text-[10px] font-black uppercase text-muted-foreground">Next <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></span>
                <span className="mt-2 block font-extrabold">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
            <AnimatedReveal>
              <p className="text-[11px] font-black uppercase text-primary">Related articles</p>
              <h2 className="display mt-3 text-3xl font-black uppercase text-foreground sm:text-4xl">Keep reading</h2>
            </AnimatedReveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <AnimatedReveal key={p._id} delay={i * 80}><BlogCard post={p} /></AnimatedReveal>
              ))}
            </div>
          </section>
        )}

        <section className="bg-primary py-20 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <AnimatedReveal>
              <h2 className="display text-4xl font-black uppercase sm:text-6xl">Build your next revenue channel.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-primary-foreground/70">
                Add TikTok Shop to your Amazon or Shopify business, scale your existing shop or get support with compliance and suspension appeals. Start with a conversation about your brand and your goals.
              </p>
              <Button asChild variant="lime" size="lg" className="mt-8">
                <a href="mailto:hello@tikedge.co">Book a call <ArrowRight /></a>
              </Button>
            </AnimatedReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
