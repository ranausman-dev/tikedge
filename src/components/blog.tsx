import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { ArrowRight, Check, Link2 } from "lucide-react";
import { urlFor, formatDate, type PostCard } from "@/lib/sanity";

export function readTime(n: number) {
  return `${Math.max(1, n || 0)} min read`;
}

export function BlogCard({ post }: { post: PostCard }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-brand"
    >
      <div className="overflow-hidden bg-secondary">
        {post.mainImage?.asset ? (
          <img
            loading="lazy"
            src={urlFor(post.mainImage).width(800).height(500).fit("crop").url()}
            srcSet={`${urlFor(post.mainImage).width(480).height(300).fit("crop").url()} 480w, ${urlFor(post.mainImage).width(800).height(500).fit("crop").url()} 800w`}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            alt={post.mainImage.alt || post.title}
            width={800}
            height={500}
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="display grid aspect-[16/10] place-items-center bg-foreground text-3xl font-black uppercase text-primary">TikEdge</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.category && <p className="text-[10px] font-black uppercase text-primary">{post.category.title}</p>}
        <h3 className="display mt-2 text-xl font-black uppercase leading-tight">{post.title}</h3>
        {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-[10px] font-bold uppercase text-muted-foreground">
          <span>{post.author?.name ? `${post.author.name} · ` : ""}{formatDate(post.publishedAt)} · {readTime(post.readingTime)}</span>
          <ArrowRight size={16} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="display mt-12 text-3xl font-black uppercase text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="display mt-10 text-2xl font-black uppercase text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-8 text-lg font-extrabold text-foreground">{children}</h4>,
    normal: ({ children }) => <p className="mt-5 text-base leading-8 text-muted-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="display my-10 border-l-4 border-primary pl-6 text-2xl font-black uppercase leading-snug text-foreground">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-muted-foreground marker:text-primary">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-7 text-muted-foreground marker:font-bold marker:text-primary">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href || "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-bold text-primary underline underline-offset-4">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <figure className="my-10">
          <img loading="lazy" src={urlFor(value).width(1200).url()} alt={value.alt || ""} className="w-full rounded-2xl border border-border" />
          {value.caption && <figcaption className="mt-3 text-center text-xs font-bold uppercase text-muted-foreground">{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

export function ArticleBody({ value }: { value?: PortableTextBlock[] | undefined }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ["X", `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
  ];
  const btn = "rounded-full border border-border px-4 py-2 text-[10px] font-black uppercase transition-colors hover:border-primary hover:text-primary";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10px] font-black uppercase text-muted-foreground">Share</span>
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={btn}>{label}</a>
      ))}
      <button
        type="button"
        className={`${btn} inline-flex items-center gap-1`}
        onClick={() => {
          navigator.clipboard?.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? <Check size={12} /> : <Link2 size={12} />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
