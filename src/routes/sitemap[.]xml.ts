import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products, categories, blogPosts } from "@/lib/shop-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: { path: string; changefreq?: string; priority?: string }[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/products", changefreq: "daily", priority: "0.9" },
          { path: "/search", changefreq: "weekly", priority: "0.5" },
          { path: "/cart", priority: "0.3" },
          { path: "/checkout", priority: "0.3" },
          { path: "/login", priority: "0.4" },
          { path: "/register", priority: "0.4" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/return-policy", priority: "0.4" },
          { path: "/privacy", priority: "0.4" },
          { path: "/terms", priority: "0.4" },
          { path: "/shipping-policy", priority: "0.4" },
        ];
        for (const c of categories) entries.push({ path: `/category/${c.slug}`, changefreq: "weekly", priority: "0.8" });
        for (const p of products) entries.push({ path: `/products/${p.slug}`, changefreq: "weekly", priority: "0.7" });
        for (const b of blogPosts) entries.push({ path: `/blog/${b.id}`, changefreq: "monthly", priority: "0.5" });

        const urls = entries.map((e) => [
          `  <url>`,
          `    <loc>${BASE_URL}${e.path}</loc>`,
          e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
          e.priority ? `    <priority>${e.priority}</priority>` : null,
          `  </url>`,
        ].filter(Boolean).join("\n"));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
