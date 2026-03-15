import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container-shell section-space pt-32">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">/</span>
            Back to writing
          </Link>
          <header className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span>{formatDate(post.frontmatter.date)}</span>
              <span className="text-border">/</span>
              <span>{post.frontmatter.readTime}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-balance md:text-6xl">
              {post.frontmatter.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {post.frontmatter.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>
          <article className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
            {post.content}
          </article>
        </div>
      </Reveal>
    </main>
  );
}
