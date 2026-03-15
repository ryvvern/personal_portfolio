import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPosts, type BlogPostMeta, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on interface systems, frontend craft, motion, and product design.",
};

function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card className="glass-panel border-border/60 bg-card/70 py-0 transition-transform duration-300 hover:-translate-y-1">
      <CardHeader className="gap-4 px-6 py-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="text-border">/</span>
          <span>{post.readTime}</span>
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}`} className="animated-underline">
            {post.title}
          </Link>
        </CardTitle>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {post.description}
        </p>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 px-6 pb-6">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="container-shell section-space pt-32">
      <Reveal>
        <SectionHeading
          eyebrow="Writing"
          title="Field notes on building interfaces that feel intentional."
          description="Short essays on motion systems, frontend architecture, and the small details that make software feel crafted."
        />
      </Reveal>
      <div className="mt-12 grid gap-6">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
