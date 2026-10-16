import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TikEdge — TikTok Shop Growth & Recovery for DTC Brands" },
      { name: "description", content: "Build TikTok Shop as an additional revenue channel alongside Amazon and Shopify. Launch, scale and get support with compliance, category approvals and suspension appeals." },
      { property: "og:title", content: "TikEdge — Your Next Revenue Channel" },
      { property: "og:description", content: "Client-focused TikTok Shop launch, growth and recovery support for DTC brand owners selling through Amazon and Shopify." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
