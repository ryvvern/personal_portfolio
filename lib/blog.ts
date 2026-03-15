import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
};

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(blogDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const source = await fs.readFile(path.join(blogDirectory, file), "utf8");
        const { data } = matter(source);

        return {
          slug,
          ...(data as BlogFrontmatter),
        };
      })
  );

  return posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
      components: mdxComponents,
    });

    return {
      slug,
      content,
      frontmatter,
    };
  } catch {
    return null;
  }
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
