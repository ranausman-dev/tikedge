import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CirclePlay,
  Menu, Music2, Sparkles, X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/case-studies";
import logoAsset from "@/assets/tikedge-logo.jpeg.asset.json";
import reviewVideo1 from "@/assets/review-1.mp4.asset.json";
import reviewVideo2 from "@/assets/review-2.mp4.asset.json";
import reviewVideo3 from "@/assets/review-3.mp4.asset.json";
import reviewVideo4 from "@/assets/review-4.mp4.asset.json";
import reviewVideo5 from "@/assets/review-5.mp4.asset.json";

const nav = ["Process", "Results", "About", "FAQ", "Blog"];
const navHref = (item: string) => (item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`);

function Logo({ light = false }: { light?: boolean }) {
  return <a href="/#top" className={`flex items-center gap-2.5 font-black uppercase ${light ? "text-background" : "text-foreground"}`}><img src={logoAsset.url} alt="TikEdge logo" width={36} height={36} className="size-9 rounded-full object-cover ring-2 ring-primary"/><span>Tik<span className="text-accent">Edge</span></span></a>;
}

export function AnimatedReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && setVisible(true), { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${className} reveal ${visible ? "is-visible" : ""}`}>{children}</div>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 mx-auto max-w-7xl px-4 transition-all duration-300 ${compact ? "pt-2" : "pt-5"}`}>
    <div className={`grid grid-cols-[minmax(0,1fr)_auto] items-center rounded-full border border-border/70 bg-background/90 px-4 shadow-nav backdrop-blur-xl transition-all md:grid-cols-[1fr_auto_1fr] ${compact ? "h-14" : "h-16"}`}>
      <Logo />
      <nav className="hidden items-center gap-7 md:flex">{nav.map(item => <a key={item} href={navHref(item)} className="nav-link text-[11px] font-bold uppercase text-muted-foreground hover:text-primary">{item}</a>)}</nav>
      <div className="hidden justify-end md:flex"><Button asChild size="lg"><a href="/#contact">Book a call <ArrowRight/></a></Button></div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</Button>
    </div>
    <div className={`mt-2 overflow-hidden rounded-2xl border border-border bg-background shadow-nav transition-all duration-300 md:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"}`}>
      <nav className="flex flex-col p-3">{nav.map(item => <a key={item} onClick={() => setOpen(false)} href={navHref(item)} className="rounded-xl px-4 py-3 text-sm font-bold uppercase hover:bg-secondary hover:text-primary">{item}</a>)}<Button asChild className="mt-2" size="lg"><a href="/#contact">Book a call <ArrowRight/></a></Button></nav>
    </div>
  </header>;
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`mb-5 flex items-center gap-2 text-[11px] font-black uppercase ${dark ? "text-accent" : "text-primary"}`}><span className="h-px w-8 bg-current"/>{children}</div>;
}

export function SectionHeading({ eyebrow, title, copy, dark = false, centered = false }: { eyebrow: string; title: string; copy?: string; dark?: boolean; centered?: boolean }) {
  return <AnimatedReveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><Eyebrow dark={dark}>{eyebrow}</Eyebrow><h2 className={`display text-4xl font-black uppercase sm:text-5xl lg:text-6xl ${dark ? "text-background" : "text-foreground"}`}>{title}</h2>{copy && <p className={`mt-5 max-w-2xl text-base leading-7 ${dark ? "text-background/65" : "text-muted-foreground"} ${centered ? "mx-auto" : ""}`}>{copy}</p>}</AnimatedReveal>;
}

function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    setValue(0);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{value}</>;
}

function Hero() {
  return <section id="top" className="relative overflow-hidden bg-background">
    <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 size-96 rounded-full bg-secondary/60 blur-3xl" />
    <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-accent/10 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pt-40">
      <div className="animate-hero-in">
        <div className="mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-border bg-card px-4 py-2 shadow-nav">
          <span className="grid size-6 place-items-center rounded-full bg-foreground text-background"><Music2 size={13} /></span>
          <span className="text-sm font-black text-foreground">TikTok Shop + Affiliate Partner</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">US · UK · EU</span>
        </div>
        <h1 className="display max-w-6xl text-[clamp(2.75rem,7.5vw,7.5rem)] font-black uppercase text-foreground">We've driven <span className="text-accent"><CountUp to={100} />M+</span> on TikTok Shop. Your brand is next.</h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">The team behind 50+ DTC brands. Launch TikTok Shop alongside Amazon and Shopify, scale your shop toward seven figures a month, or clear compliance, category approvals and suspensions — always built around your margins.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button asChild variant="lime" size="lg"><a href="/#contact">Apply now <ArrowRight className="transition-transform group-hover:translate-x-1" /></a></Button>
          <Button asChild variant="outline" size="lg"><a href="/#custom-offer">Forecast your revenue</a></Button>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <div className="flex -space-x-2">{["A", "J", "M"].map(v => <span key={v} className="grid size-9 place-items-center rounded-full border-2 border-background bg-secondary text-[10px] font-black">{v}</span>)}</div>
          <p className="text-xs leading-5 text-muted-foreground"><strong className="block text-foreground">Built for DTC brand owners</strong>Your goals. Your margins. Your next stage of growth.</p>
        </div>
      </div>
    </div>
  </section>;
}

function TrustSection() {
  const stats = [["Launch","Your next sales channel"],["Scale","Your existing TikTok Shop"],["Connect","Amazon + Shopify"],["Recover","Shop health & appeals"]];
  return <section className="border-y border-border bg-card"><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"><p className="mb-8 text-center text-[10px] font-black uppercase text-muted-foreground">For brand owners ready for their next revenue channel</p><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-4">{stats.map(([value,label], i) => <AnimatedReveal key={label} delay={i*80} className="bg-card px-4 py-7 text-center"><strong className="display block text-3xl font-black text-primary">{value}</strong><span className="mt-1 block text-[10px] font-bold uppercase text-muted-foreground">{label}</span></AnimatedReveal>)}</div></div></section>;
}

const growth = [
  ["01","Shop readiness","Review your products, eligibility, margins and shop health."],
  ["02","Creator sales","Put your products in the hands of relevant creators and affiliates."],
  ["03","Paid growth","Amplify winning content with TikTok Shop ads built around your margins."],
  ["04","Channel alignment","Align your TikTok Shop operations with your Amazon and Shopify business."],
  ["05","Scale & protect","Improve performance, monitor shop health and address policy issues."],
];
function GrowthSystem() {
  return <section id="process" className="overflow-hidden bg-secondary py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading centered eyebrow="Your growth engine" title="One system. Built around your shop." copy="From your first TikTok Shop sale to your next stage of scale, every decision starts with your products, customers and profitability."/>
    <div className="relative mx-auto mt-16 hidden h-[640px] max-w-5xl lg:block"><div className="diagram-lines absolute inset-0"><svg viewBox="0 0 1000 640" className="h-full w-full" aria-hidden="true"><g className="diagram-base" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 7"><path d="M500 320 L250 145"/><path d="M500 320 L750 145"/><path d="M500 320 L180 455"/><path d="M500 320 L820 455"/><path d="M500 320 L500 585"/></g><g className="diagram-runners" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"><path pathLength="1" d="M500 320 L250 145"/><path pathLength="1" d="M500 320 L750 145"/><path pathLength="1" d="M500 320 L180 455"/><path pathLength="1" d="M500 320 L820 455"/><path pathLength="1" d="M500 320 L500 585"/></g></svg></div><div className="pulse-soft absolute left-1/2 top-1/2 grid size-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-center text-primary-foreground shadow-brand"><div><Sparkles className="mx-auto mb-2"/><strong className="display text-2xl font-black uppercase">TikTok Shop<br/>Growth</strong></div></div>{growth.map((item,i) => <GrowthNode key={item[1]} item={item} index={i}/>)}</div>
    <div className="relative mt-12 space-y-3 border-l-2 border-primary/30 pl-6 lg:hidden">{growth.map((item,i) => <AnimatedReveal key={item[1]} delay={i*80}><div className="relative rounded-xl border border-border bg-card p-5 shadow-sm before:absolute before:-left-[31px] before:top-7 before:size-3 before:rounded-full before:bg-primary"><span className="text-xs font-black text-primary">{item[0]}</span><h3 className="mt-1 text-lg font-black uppercase">{item[1]}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item[2]}</p></div></AnimatedReveal>)}</div>
  </div></section>;
}
function GrowthNode({ item, index }: { item: string[]; index: number }) {
  const positions = ["left-[6%] top-[7%]","right-[6%] top-[7%]","left-0 top-[59%]","right-0 top-[59%]","left-1/2 bottom-0 -translate-x-1/2"];
  return <AnimatedReveal delay={index*100} className={`growth-node growth-node-${index + 1} absolute w-64 ${positions[index]}`}><div className="group growth-node-card rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-brand"><span className="text-xs font-black text-primary">{item[0]}</span><h3 className="mt-1 font-black uppercase">{item[1]}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{item[2]}</p></div></AnimatedReveal>;
}

function ProcessSection() {
  const phases = [["01","Assess","Start with your goals, margins, existing channels and any shop restrictions."],["02","Prepare","Build your launch or recovery plan, strengthen listings and align fulfilment."],["03","Activate","Bring creators, affiliates and paid campaigns together to drive product sales."],["04","Scale","Grow what works, protect margins and monitor shop health as volume increases."]];
  return <section className="bg-foreground py-24 text-background sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading dark eyebrow="Your path forward" title="From where you are to where you want to grow"/><div className="timeline mt-16 grid gap-10 md:grid-cols-4">{phases.map(([n,title,copy],i) => <AnimatedReveal key={title} delay={i*100} className="relative"><div className="mb-7 flex items-center gap-4"><span className="display text-5xl font-black text-accent">{n}</span><span className="h-px flex-1 bg-background/20"/></div><p className="text-[10px] font-bold uppercase text-primary">Phase {n}</p><h3 className="mt-2 text-xl font-black uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-background/55">{copy}</p></AnimatedReveal>)}</div><div className="mt-20 border-t border-background/15 pt-8"><p className="display max-w-xl text-2xl font-black uppercase sm:text-3xl">Your ambition sets the direction. <span className="text-accent">Your numbers guide the decisions.</span></p></div></div></section>;
}

const plans = [
  {name:"TikTok Shop Influencer Outreach",price:"$500",desc:"Reach buyers through creators who understand your products and speak to your customers.",features:["Creators matched to your brand","Daily affiliate outreach","Product sample coordination","Creator sales tracking","Weekly progress reporting"]},
  {name:"TikTok Shop VA",price:"$800",desc:"Free up your time with a dedicated operator focused on your shop’s day-to-day performance.",features:["Day-to-day shop operations","Creator relationship management","Product listing optimization","Campaign coordination","Shop health monitoring","Weekly strategy call"],featured:true},
  {name:"TikTok Shop Ads",price:"$300",desc:"Give your best products and creator content more reach with campaigns focused on profitable sales.",features:["TikTok Shop campaign setup","Product-led creative testing","Spend & margin reviews","Audience testing","Sales performance reporting"]},
];
export function PricingCard({ plan }: { plan: typeof plans[number] }) { return <article className={`group flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-brand ${plan.featured ? "border-accent bg-accent text-accent-foreground shadow-lime" : "border-border bg-card text-card-foreground"}`}><p className="min-h-12 text-sm font-black uppercase">{plan.name}</p><div className="my-5 border-y border-current/15 py-5"><strong className="display text-5xl font-black">{plan.price}</strong><span className="text-xs font-bold uppercase"> / month</span></div><p className="text-sm leading-6 opacity-65">{plan.desc}</p><ul className="my-7 space-y-3">{plan.features.map(f=><li key={f} className="flex gap-2 text-xs font-semibold"><span className={`grid size-5 shrink-0 place-items-center rounded-full ${plan.featured ? "bg-foreground text-background" : "bg-secondary text-primary"}`}><Check size={12}/></span>{f}</li>)}</ul><Button asChild variant={plan.featured ? "dark" : "default"} size="lg" className="mt-auto w-full"><a href="/#contact">Get started <ArrowRight className="transition-transform group-hover:translate-x-1"/></a></Button></article>; }
function Pricing() { return <section className="bg-foreground py-24 text-background sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading dark centered eyebrow="Choose your support" title="The right support for your next stage" copy="Choose focused help for creators, daily operations or ads. Need a full growth plan, category approval support or a suspension review? Let’s discuss your shop first."/><div className="mt-14 grid items-stretch gap-5 md:grid-cols-3">{plans.map(p=><PricingCard key={p.name} plan={p}/>)}</div><CustomOffer/></div></section>; }

const customServices = [
  ["Violation removal", 120], ["Category approval", 70], ["Brand approval", 250],
  ["Affiliate management", 500], ["Ad management only", 400], ["CRM management", 400],
  ["Compliance management", 300], ["Creator hunting", 300], ["UGC campaign launch & management", 500],
] as const;

function CustomOffer() {
  const [selected, setSelected] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const total = customServices.filter(([n]) => selected.includes(n)).reduce((s, [, p]) => s + p, 0);
  const toggle = (n: string) => setSelected(s => s.includes(n) ? s.filter(x => x !== n) : [...s, n]);
  const book = () => {
    const o = origin.trim().slice(0, 80), p = phone.trim().slice(0, 25);
    if (!o) return setError("Please enter your country / origin.");
    if (!/^\+?[0-9\s()-]{7,20}$/.test(p)) return setError("Please enter a valid phone number.");
    if (!selected.length) return setError("Please pick at least one service.");
    setError("");
    const body = `Custom offer request\n\nOrigin: ${o}\nPhone: ${p}\n\nServices:\n${customServices.filter(([n]) => selected.includes(n)).map(([n, pr]) => `- ${n}: $${pr}`).join("\n")}\n\nTotal: $${total}\n\nI'd like to book a call.`;
    window.location.href = `mailto:hello@tikedge.co?subject=${encodeURIComponent("Custom offer — book a call")}&body=${encodeURIComponent(body)}`;
  };
  const input = "h-12 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none focus:border-primary";
  return <AnimatedReveal><div id="custom-offer" className="mt-10 overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-colors duration-300 hover:border-primary/60">
    <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="custom-offer-panel" className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-10 sm:py-8">
      <span className="min-w-0">
        <span className="text-xs font-black uppercase text-accent">Custom offer</span>
        <span className="display mt-3 block text-3xl font-black uppercase sm:text-4xl">Build your own package</span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">{selected.length ? `${selected.length} service${selected.length === 1 ? "" : "s"} selected — your total is $${total}.` : "Pick only the services you need and your price updates instantly."}</span>
      </span>
      <span className="flex shrink-0 items-center gap-3">
        {selected.length > 0 && <span className="display hidden text-2xl font-black text-accent sm:block">${total}</span>}
        <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open ? "rotate-180 border-primary bg-secondary" : "border-border bg-background"}`}><ChevronDown size={18}/></span>
      </span>
    </button>
    <div id="custom-offer-panel" inert={!open} className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
      <div className="overflow-hidden">
        <div className="grid gap-10 border-t border-border px-6 pb-6 pt-8 sm:px-10 sm:pb-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">{customServices.map(([n, p]) => { const on = selected.includes(n); return <button type="button" key={n} onClick={() => toggle(n)} aria-pressed={on} className={`flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${on ? "border-primary bg-secondary shadow-brand" : "border-border bg-background hover:border-primary"}`}><span className="flex items-center gap-3"><span className={`grid size-5 shrink-0 place-items-center rounded-full border ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{on && <Check size={12}/>}</span>{n}</span><span className="display text-lg font-black text-accent">${p}</span></button>; })}</div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-foreground p-6 text-background">
        <label className="text-xs font-black uppercase">Your origin / country<input className={`${input} mt-2`} value={origin} maxLength={80} onChange={e => setOrigin(e.target.value)} placeholder="e.g. United States"/></label>
        <label className="text-xs font-black uppercase">Phone number<input className={`${input} mt-2`} type="tel" value={phone} maxLength={25} onChange={e => setPhone(e.target.value)} placeholder="+1 555 123 4567"/></label>
        <div className="mt-2 border-y border-background/15 py-5"><p className="text-xs font-bold uppercase text-background/60">{selected.length} service{selected.length === 1 ? "" : "s"} selected</p><p className="display mt-2 text-5xl font-black text-accent">${total}</p></div>
        {error && <p role="alert" className="text-sm font-semibold text-accent">{error}</p>}
        <Button type="button" variant="lime" size="lg" className="mt-auto w-full" onClick={book}>Book a call <ArrowRight/></Button>
      </div>
        </div>
      </div>
    </div>
  </div></AnimatedReveal>;
}

const cases = caseStudies;
export function CaseStudyCard({ study, index }: { study: typeof cases[number]; index: number }) { return <AnimatedReveal delay={index*100}><article className={`group grid gap-0 overflow-hidden rounded-xl border border-border bg-card ${index===0 ? "lg:grid-cols-[1.35fr_.65fr]" : ""}`}><div className="overflow-hidden"><img loading="lazy" src={study.image} alt={`${study.name} campaign`} width={1280} height={960} className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="flex flex-col p-6"><p className="text-[10px] font-black uppercase text-primary">{study.tag}</p><h3 className="display mt-3 text-3xl font-black uppercase">{study.name}</h3><dl className="mt-7 space-y-4 text-sm"><div><dt className="text-[10px] font-bold uppercase text-muted-foreground">Problem</dt><dd className="mt-1 font-semibold">{study.problem}</dd></div><div><dt className="text-[10px] font-bold uppercase text-muted-foreground">Strategy</dt><dd className="mt-1 font-semibold">{study.strategy}</dd></div><div><dt className="text-[10px] font-bold uppercase text-muted-foreground">Result</dt><dd className="display mt-1 text-2xl font-black text-primary">{study.result}</dd></div></dl><Link to="/case-studies/$slug" params={{ slug: study.slug }} className="mt-auto flex items-center gap-2 pt-8 text-xs font-black uppercase hover:text-primary">View case study <ArrowRight className="transition-transform group-hover:translate-x-1" size={16}/></Link></div></article></AnimatedReveal>; }
function CaseStudies() { return <section id="results" className="bg-background py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="Growth scenarios" title="Your products. More ways to grow." copy="Illustrative case studies showing how creator content and commerce can support a brand’s next stage. The names, metrics and quotes below are sample content, not verified client results."/><div className="mt-14 grid gap-5 lg:grid-cols-2">{cases.map((c,i)=><div key={c.name} className={i===0 ? "lg:col-span-2" : ""}><CaseStudyCard study={c} index={i}/></div>)}</div></div></section>; }

const reviews = [
  { video: reviewVideo1.url, name: "Sara M.", brand: "Luma Skin", result: "4.2X ROAS" },
  { video: reviewVideo2.url, name: "James T.", brand: "Form Athletics", result: "+186% CVR" },
  { video: reviewVideo3.url, name: "Alina K.", brand: "Fizzy", result: "$420K revenue" },
  { video: reviewVideo4.url, name: "Daniel R.", brand: "Nova Supplements", result: "+312% sales" },
  { video: reviewVideo5.url, name: "Mira H.", brand: "Atelier Studio", result: "2.8X revenue" },
];

function VideoReviewCard({ review, index }: { review: (typeof reviews)[number]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <AnimatedReveal delay={index * 80} className="w-[230px] shrink-0 snap-start sm:w-[270px]">
    <figure className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-brand">
      <div className="relative overflow-hidden rounded-t-2xl">
        <video ref={videoRef} src={review.video} muted loop playsInline preload="metadata" className="aspect-square w-full object-cover" aria-label={`Video review from ${review.name}`}/>
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[9px] font-black uppercase text-accent-foreground shadow-lime">{review.result}</span>
      </div>
      <figcaption className="flex items-center gap-3 p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-black text-primary">{review.name.charAt(0)}</span>
        <span><strong className="block text-xs font-black uppercase">{review.name}</strong><span className="text-[10px] font-bold uppercase text-muted-foreground">{review.brand}</span></span>
      </figcaption>
    </figure>
  </AnimatedReveal>;
}

function VideoReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTrack = (dir: number) => trackRef.current?.scrollBy({ left: dir * 620, behavior: "smooth" });
  return <section id="reviews" className="overflow-hidden bg-background py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Brand perspectives" title="Growth starts with your goals" copy="Your priorities come first: more sales, healthier margins and less operational friction. Review names and result labels below are placeholders awaiting verified client details."/>
        <div className="hidden shrink-0 gap-2 pb-1 md:flex">
          <Button variant="outline" size="icon" onClick={() => scrollTrack(-1)} aria-label="Previous reviews"><ChevronLeft/></Button>
          <Button variant="outline" size="icon" onClick={() => scrollTrack(1)} aria-label="Next reviews"><ChevronRight/></Button>
        </div>
      </div>
    </div>
    <div ref={trackRef} className="mx-auto mt-12 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {reviews.map((r, i) => <VideoReviewCard key={r.name} review={r} index={i}/>)}
    </div>
  </section>;
}

const faqs = [
  ["Is this for established DTC brands or new TikTok Shops?", "Both. If you already sell through Amazon or Shopify, we can help you plan TikTok Shop as an additional revenue channel. If your shop is already live, we start with the barriers to your next stage of growth."],
  ["Can you connect TikTok Shop with Amazon and Shopify?", "We help align your product catalog, inventory and fulfilment workflows across channels. The right setup depends on your market, account eligibility and the integrations your business uses; we review those before recommending a connection."],
  ["Can you help me reach seven figures in monthly revenue?", "That can be the target we plan toward, not a promise. We assess demand, margins, stock, creator performance, advertising budget and fulfilment capacity to build a realistic scale plan for your business."],
  ["Can you help with compliance and category approval?", "We can review policy notices, identify documentation gaps and help prepare category approval submissions or corrective action plans. TikTok determines eligibility and makes the final approval decision."],
  ["Can you reopen a suspended TikTok Shop?", "We can review the suspension notice, help address the underlying issues and prepare an evidence-led appeal through official channels. Reinstatement is not guaranteed, and we do not bypass platform rules."],
];

function FAQ() {
  return <section id="faq" className="bg-secondary py-24 sm:py-32"><div className="mx-auto max-w-5xl px-5 sm:px-8"><SectionHeading eyebrow="Your questions" title="Clarity before you commit" copy="Straight answers for brand owners evaluating their next step."/><div className="mt-12 divide-y divide-border border-y border-border">{faqs.map(([question,answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-bold [&::-webkit-details-marker]:hidden">{question}<ChevronRight className="size-5 shrink-0 text-primary transition-transform group-open:rotate-90"/></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></div></section>;
}

function FinalCTA() { return <section id="contact" className="overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32"><div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8"><div className="float-slow absolute -left-5 top-0 size-20 rounded-full border-[14px] border-accent/80"/><div className="float-reverse absolute -right-3 bottom-0 size-10 rotate-12 bg-accent"/><AnimatedReveal><p className="mb-5 text-xs font-black uppercase text-accent">Your brand. Your next revenue channel.</p><h2 className="display text-5xl font-black uppercase sm:text-7xl">What’s next for your TikTok Shop?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">Launch alongside Amazon and Shopify, scale the shop you already have, or work through a compliance or suspension issue. Tell us where you are and what you want to achieve — we’ll help you identify the next move.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="lime" size="lg"><a href="mailto:hello@tikedge.co">Book a call <ArrowRight/></a></Button><Button asChild variant="soft" size="lg"><a href="#results">See our work</a></Button></div></AnimatedReveal></div></section>; }

export function Footer() { const cols = [["Company","About","Work","Process","Contact"],["Resources","Case Studies","FAQ","Insights"]]; return <footer id="about" className="bg-foreground py-16 text-background"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.5fr_2fr] lg:px-10"><div><Logo light/><p className="mt-5 max-w-xs text-sm leading-6 text-background/55">For DTC brand owners building TikTok Shop into an additional revenue channel — with support for launch, scale and shop recovery.</p><a className="mt-5 inline-block text-sm font-bold text-accent" href="mailto:hello@tikedge.co">hello@tikedge.co</a></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{cols.map(([title,...links])=><div key={title}><h3 className="mb-4 text-[10px] font-black uppercase text-accent">{title}</h3><ul className="space-y-3">{links.map(l=><li key={l}><a href={l==="FAQ" ? "/#faq" : l==="Work" || l==="Case Studies" ? "/#results" : l==="Process" ? "/#process" : l==="Contact" ? "/#contact" : l==="Insights" ? "/blog" : "/#about"} className="text-sm text-background/60 hover:text-background">{l}</a></li>)}</ul></div>)}</div></div><div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-background/15 px-5 pt-7 text-[10px] uppercase text-background/45 sm:flex-row sm:justify-between sm:px-8 lg:px-10"><span>© 2026 TikEdge. All rights reserved.</span><div className="flex gap-5"><a href="#top">Privacy policy</a><a href="#top">Terms</a><a href="#top">Instagram</a><a href="#top">TikTok</a></div></div></footer>; }

export default function LandingPage() { return <><Header/><main><Hero/><TrustSection/><VideoReviews/><GrowthSystem/><ProcessSection/><Pricing/><CaseStudies/><FAQ/><FinalCTA/></main><Footer/></>; }