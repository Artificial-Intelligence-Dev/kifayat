import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { blogPosts } from "@/lib/shop-data";

export const Route = createFileRoute("/blog/$postId")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.id === params.postId);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — Kifayat Blog` },
      { name: "description", content: loaderData.post.excerpt },
      { property: "og:title", content: loaderData.post.title },
      { property: "og:image", content: loaderData.post.cover },
    ] : [],
  }),
  component: Post,
  notFoundComponent: () => (
    <PageShell><div className="px-4 py-24 text-center"><h1 className="text-2xl mb-3">Post not found</h1>
      <Link to="/blog" className="text-primary hover:underline">Back to blog</Link></div></PageShell>
  ),
  errorComponent: () => <PageShell><div className="px-4 py-24 text-center">Something went wrong.</div></PageShell>,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell>
      <article className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/blog" className="text-xs text-muted-foreground hover:text-primary">← All posts</Link>
        <h1 className="text-3xl lg:text-5xl mt-4">{post.title}</h1>
        <div className="text-sm text-muted-foreground mt-3">By {post.author} · {post.date} · {post.readMins} min read</div>
        <img src={post.cover} alt={post.title} className="mt-8 w-full aspect-[16/9] object-cover rounded-2xl" />
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>{post.excerpt}</p>
          <p>Shopping online in Karachi has changed dramatically. With more delivery options, better payment methods and a wider choice of stores, the question isn't whether to shop online — it's how to do it well.</p>
          <p>Start by checking the seller's return policy, then look at reviews from buyers in your own city. Honest sellers stand behind their products and aren't afraid to show real photos and real testimonials.</p>
          <p>At Kifayat we curate every product we list, partner only with verified suppliers, and reply to every customer message — usually within an hour. That's the standard local shoppers deserve.</p>
        </div>
      </article>
    </PageShell>
  );
}
