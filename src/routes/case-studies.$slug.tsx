import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";
import { Header, Footer, AnimatedReveal } from "@/components/landing-page";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} Case Study: ${loaderData.headline} | TikEdge` : "Case Study | TikEdge" },
      { name: "description", content: loaderData?.intro ?? "TikEdge case study." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — ${loaderData.headline}` : "TikEdge Case Study" },
      { property: "og:description", content: loaderData?.intro ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const study = Route.useLoaderData();
  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <Header />
      <main className="bg-background pt-28">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
          <AnimatedReveal>
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-[11px] font-black uppercase text-muted-foreground hover:text-primary">
              <ArrowLeft size={14} /> Case studies
            </Link>
            <p className="text-[11px] font-black uppercase text-primary">Illustrative case study · {study.tag}</p>
            <h1 className="display mt-4 max-w-4xl text-5xl font-black uppercase text-foreground sm:text-6xl lg:text-7xl">
              {study.name}. <span className="text-primary">{study.headline}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{study.intro}</p>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-muted-foreground">This is a sample scenario. Brand names, metrics and quotes are placeholder content, not verified client results.</p>
          </AnimatedReveal>

          <AnimatedReveal delay={120} className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-border shadow-editorial">
              <img src={study.image} alt={`${study.name} campaign`} width={1280} height={960} className="aspect-[21/9] w-full object-cover" />
            </div>
          </AnimatedReveal>

          {/* Metrics */}
          <AnimatedReveal delay={180}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-4">
              {study.metrics.map(([value, label], i) => (
                <div key={label} className="bg-card px-4 py-7 text-center">
                  <strong className="display block text-3xl font-black text-primary">{value}</strong>
                  <span className="mt-1 block text-[10px] font-bold uppercase text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
              <span className="size-2 rounded-full bg-accent" /> Illustrative growth scenario
            </p>
          </AnimatedReveal>
        </section>

        {/* Challenge */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <AnimatedReveal>
              <p className="text-[11px] font-black uppercase text-primary">The challenge</p>
              <h2 className="display mt-3 text-3xl font-black uppercase text-foreground sm:text-4xl">{study.challengeTitle}</h2>
            </AnimatedReveal>
            <AnimatedReveal delay={100}>
              <p className="text-base leading-8 text-muted-foreground">{study.challenge}</p>
            </AnimatedReveal>
          </div>
        </section>

        {/* What we did */}
        <section className="bg-foreground py-20 text-background sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <AnimatedReveal>
              <p className="text-[11px] font-black uppercase text-accent">What we did</p>
              <h2 className="display mt-3 max-w-2xl text-3xl font-black uppercase sm:text-4xl">The system behind the numbers</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-background/60">
                A coordinated approach to the priorities that matter to a brand owner: product sales, customer acquisition and sustainable margins.
              </p>
            </AnimatedReveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {study.actions.map((action, i) => (
                <AnimatedReveal key={action} delay={i * 70}>
                  <div className="flex h-full gap-4 rounded-xl border border-background/15 bg-background/5 p-6 transition-colors hover:border-accent/60">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check size={13} /></span>
                    <p className="text-sm leading-6 text-background/80">{action}</p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>

            {/* Testimonial */}
            <AnimatedReveal delay={120}>
              <figure className="mx-auto mt-16 max-w-3xl text-center">
                <Quote className="mx-auto mb-6 text-accent" size={32} />
                <blockquote className="display text-2xl font-black uppercase leading-snug sm:text-3xl">“{study.quote}”</blockquote>
                <figcaption className="mt-6 text-[11px] font-black uppercase text-background/60">
                  {study.quoteAuthor} · <span className="text-accent">{study.quoteRole}</span>
                </figcaption>
              </figure>
            </AnimatedReveal>
          </div>
        </section>

        {/* More case studies */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <AnimatedReveal>
            <p className="text-[11px] font-black uppercase text-primary">More case studies</p>
            <h2 className="display mt-3 text-3xl font-black uppercase text-foreground sm:text-4xl">Keep reading</h2>
          </AnimatedReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {others.map((c, i) => (
              <AnimatedReveal key={c.slug} delay={i * 100}>
                <Link to="/case-studies/$slug" params={{ slug: c.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-brand">
                  <div className="overflow-hidden">
                    <img loading="lazy" src={c.image} alt={`${c.name} campaign`} width={1280} height={960} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <p className="text-[10px] font-black uppercase text-primary">{c.tag}</p>
                      <h3 className="display mt-2 text-2xl font-black uppercase">{c.name}</h3>
                      <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">{c.result}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <AnimatedReveal>
              <h2 className="display text-4xl font-black uppercase sm:text-6xl">Your next revenue channel starts here.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-primary-foreground/70">
                Tell us about your DTC brand, your existing Amazon or Shopify business and your TikTok Shop goals. Whether you need a launch plan, scaling support or help with shop restrictions, we start with your priorities.
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
