import beautyImage from "@/assets/case-beauty.jpg";
import fashionImage from "@/assets/case-fashion.jpg";
import drinkImage from "@/assets/case-drink.jpg";

export interface CaseStudy {
  slug: string;
  image: string;
  name: string;
  tag: string;
  problem: string;
  strategy: string;
  result: string;
  headline: string;
  intro: string;
  metrics: Array<[string, string]>;
  status: string;
  challengeTitle: string;
  challenge: string;
  actions: string[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "luma-skin",
    image: beautyImage,
    name: "Luma Skin",
    tag: "Beauty / Paid social",
    problem: "Creative fatigue",
    strategy: "Creator-led product stories",
    result: "4.2X ROAS",
    headline: "4.2X ROAS on paid social.",
    intro:
      "Rebuilt Luma Skin's entire paid social engine around creator-led product stories — turning a fatigued ad account into a compounding growth channel in under six months.",
    metrics: [
      ["4.2X", "ROAS achieved"],
      ["-38%", "Cost per acquisition"],
      ["6 mo", "To full rebuild"],
      ["120+", "Creator assets tested"],
    ],
    status: "Still scaling",
    challengeTitle: "Strong product. Exhausted creative.",
    challenge:
      "Luma Skin came to us with a great product and a loyal customer base, but their paid social had plateaued. The same three polished brand ads had been running for months, frequency was climbing, and acquisition costs kept rising. They needed a content engine — not another one-off ad — without losing the premium feel of the brand.",
    actions: [
      "Full creative audit and repositioning around customer problems, not product features",
      "A creator-powered content flywheel producing a continuous stream of authentic product stories",
      "Structured creative testing: new hooks, formats and angles shipped every single week",
      "Paid amplification behind proven creator winners instead of polished brand ads",
      "Landing page alignment so the story in the ad continued seamlessly to checkout",
      "Data-driven iteration: doubling down on the creators, formats and angles driving the highest return",
    ],
    quote:
      "TikEdge helped us unlock the real potential of paid social — scaling our sales through smart creative testing and top-tier creator partnerships. They move fast, know what works, and truly feel like an extension of our team.",
    quoteAuthor: "Sara M.",
    quoteRole: "Founder, Luma Skin",
  },
  {
    slug: "form-athletics",
    image: fashionImage,
    name: "Form Athletics",
    tag: "Fashion / UGC",
    problem: "Low engagement",
    strategy: "Social-first launch system",
    result: "+186% CVR",
    headline: "+186% conversion rate.",
    intro:
      "Turned Form Athletics' silent social channels into a social-first launch system — UGC at the core, community at the edge, and a conversion rate that nearly tripled.",
    metrics: [
      ["+186%", "Conversion rate"],
      ["3.1M", "Organic views"],
      ["90 d", "To new system"],
      ["45+", "Creators activated"],
    ],
    status: "Still scaling",
    challengeTitle: "Great gear. No one talking about it.",
    challenge:
      "Form Athletics had quality products and decent traffic, but engagement was flat and their launches landed quietly. Content was brand-polished and interchangeable with every competitor. They needed a system that made real people the face of the brand — and turned that attention into orders.",
    actions: [
      "A social-first launch framework: every drop built around creator seeding and UGC volume",
      "Recruited and onboarded 45+ fitness creators into a self-sustaining content engine",
      "Community-driven formats — try-ons, training diaries, honest reviews — engineered to convert",
      "Shoppable content paths connecting viral moments directly to product pages",
      "Weekly performance reviews to scale winning formats and cut what didn't move numbers",
    ],
    quote:
      "Our launches used to disappear into the feed. Now every drop has a wave of creator content behind it, and the numbers speak for themselves. Best decision we made this year.",
    quoteAuthor: "James T.",
    quoteRole: "Founder, Form Athletics",
  },
  {
    slug: "fizzy",
    image: drinkImage,
    name: "Fizzy",
    tag: "CPG / TikTok Shop",
    problem: "Slow acquisition",
    strategy: "Performance creator engine",
    result: "$420K revenue",
    headline: "$420K in TikTok Shop revenue.",
    intro:
      "Built Fizzy's TikTok Shop from zero to $420K in revenue through a performance creator engine — affiliate scale, shoppable content and paid amplification running as one system.",
    metrics: [
      ["$420K", "Shop revenue"],
      ["800+", "Affiliate videos"],
      ["5 mo", "Zero to scale"],
      ["Top 10", "Category ranking"],
    ],
    status: "Still scaling",
    challengeTitle: "A drink everyone loves. A shop nobody visited.",
    challenge:
      "Fizzy had strong retail presence but their TikTok Shop was an afterthought — a handful of listings, no creators, no content, no momentum. Acquisition was slow and expensive. The infrastructure had to be built from scratch: shop setup, an affiliate programme, and a content engine that could keep the brand visible every single day.",
    actions: [
      "Full shop setup and optimisation: listings, offers and storefront built to convert",
      "A creator-powered affiliate flywheel recruiting hundreds of affiliates into a content engine",
      "Content velocity at scale: a continuous stream of authentic creator videos keeping Fizzy visible",
      "Paid amplification behind proven creator winners, not polished brand ads",
      "Data-driven optimisation: doubling down on the creators, formats and bundles driving the highest return",
    ],
    quote:
      "We went from a shop nobody visited to a top-10 category ranking. The affiliate engine they built just keeps compounding — it truly runs like a system, not a campaign.",
    quoteAuthor: "Alina K.",
    quoteRole: "Founder, Fizzy",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
