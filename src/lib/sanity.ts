import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";

// Public, read-only config. Project ID and dataset are not secrets.
const env = import.meta.env as Record<string, string | undefined>;
export const sanityConfig = {
  projectId: env['VITE_SANITY_PROJECT_ID'] || "kntdyc2g",
  dataset: env['VITE_SANITY_DATASET'] || "production",
  apiVersion: env['VITE_SANITY_API_VERSION'] || "2024-01-01",
};

export const sanityClient = createClient({ ...sanityConfig, useCdn: true, perspective: "published" });

const builder = createImageUrlBuilder(sanityClient);
export type SanityImage = { asset?: { _ref: string }; alt?: string; caption?: string } | null | undefined;
export function urlFor(source: NonNullable<SanityImage>) {
  return builder.image(source as never).auto("format");
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  tags?: string[];
  readingTime: number;
  author?: { name: string; image?: SanityImage } | null;
  category?: { title: string; slug: string } | null;
}

export interface Post extends PostCard {
  updatedAt?: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  author?: { name: string; image?: SanityImage; bio?: string } | null;
  category?: { _id?: string; title: string; slug: string } | null;
}

// Only published posts whose publish date has passed (scheduled posts stay hidden).
const LIVE = `_type == "post" && defined(slug.current) && publishedAt <= now()`;
const CARD = `_id, title, "slug": slug.current, excerpt, mainImage, publishedAt, tags,
  "readingTime": round(length(pt::text(body)) / 5 / 200),
  author->{name, image}, category->{title, "slug": slug.current}`;

export async function fetchPosts(): Promise<PostCard[]> {
  return sanityClient.fetch(`*[${LIVE}] | order(publishedAt desc) { ${CARD} }`);
}

export async function fetchCategory(slug: string) {
  return sanityClient.fetch<{ title: string; slug: string; description?: string; posts: PostCard[] } | null>(
    `*[_type == "category" && slug.current == $slug][0]{ title, "slug": slug.current, description,
      "posts": *[${LIVE} && references(^._id)] | order(publishedAt desc) { ${CARD} } }`,
    { slug },
  );
}

export async function fetchPost(slug: string) {
  return sanityClient.fetch<{ post: Post | null; related: PostCard[]; prev: PostCard | null; next: PostCard | null }>(
    `{
      "post": *[${LIVE} && slug.current == $slug][0]{ ${CARD}, updatedAt, body, seoTitle, seoDescription,
        focusKeyword, canonicalUrl, noIndex, author->{name, image, bio}, category->{_id, title, "slug": slug.current} }
    }{
      post,
      "related": *[${LIVE} && slug.current != $slug && (category._ref == ^.post.category._id || count((tags[])[@ in ^.^.post.tags]) > 0)]
        | order((category._ref == ^.post.category._id) desc, publishedAt desc)[0...3]{ ${CARD} },
      "prev": *[${LIVE} && publishedAt < ^.post.publishedAt] | order(publishedAt desc)[0]{ ${CARD} },
      "next": *[${LIVE} && publishedAt > ^.post.publishedAt] | order(publishedAt asc)[0]{ ${CARD} }
    }`,
    { slug },
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
