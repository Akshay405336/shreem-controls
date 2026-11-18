import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { getBlogBySlug, getActiveBlogs } from "@/lib/blogs/service";
import { formatDate, estimateReadingTime } from "@/lib/blogs/utils";
import { sanitizeBlogContent } from "@/lib/blogs/sanitize";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageSection } from "@/components/layout/page-section";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { siteConfig } from "@/config/site";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, true);

  if (!blog) {
    return {
      title: "Article Not Found",
      description: "The requested blog article was not found or is no longer published.",
    };
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/blog/${blog.slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.coverImage],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <BlogDetailContent params={params} />
    </Suspense>
  );
}

async function BlogDetailContent({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, true);

  if (!blog) {
    notFound();
  }

  const sanitizedContent = sanitizeBlogContent(blog.content);
  const allActive = await getActiveBlogs(4);
  const relatedBlogs = allActive.filter((item) => item.id !== blog.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Blog Article"
        title={blog.title}
        description={blog.excerpt}
        image={blog.coverImage}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#087F7B] transition-colors hover:text-[#009E98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-[#DDECEB] pb-6 text-xs text-[#737B7A]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Calendar className="h-4 w-4 text-[#009E98]" />
              Published on {formatDate(blog.createdAt)}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-[#009E98]" />
              {estimateReadingTime(blog.content)}
            </span>
            {blog.updatedAt > blog.createdAt && (
              <>
                <span>·</span>
                <span className="text-[11px] text-slate-400">
                  Updated {formatDate(blog.updatedAt)}
                </span>
              </>
            )}
          </div>

          <div className="relative mb-10 aspect-16/9 w-full overflow-hidden rounded-[24px] border border-[#DDECEB] bg-slate-100 shadow-sm">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          <div className="mb-10 rounded-2xl border-l-4 border-[#009E98] bg-[#F8FCFB] p-6 shadow-xs">
            <p className="text-sm font-medium italic leading-relaxed text-[#1a1f1f] sm:text-base">
              {blog.excerpt}
            </p>
          </div>

          <article
            className="prose prose-slate max-w-none text-xs leading-relaxed text-[#1a1f1f] sm:text-sm [&_a]:font-medium [&_a]:text-[#009E98] [&_a]:underline hover:[&_a]:text-[#087F7B] [&_blockquote]:my-6 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[#009E98] [&_blockquote]:bg-[#F8FCFB] [&_blockquote]:p-4 [&_blockquote]:italic [&_blockquote]:text-[#1a1f1f] [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1a1f1f] sm:[&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#1a1f1f] sm:[&_h3]:text-xl [&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_hr]:my-8 [&_hr]:border-[#DDECEB] [&_li]:mb-1.5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-[#545E5D] [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-[#545E5D] [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[#545E5D]"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          <div className="mt-12 flex items-center justify-between border-t border-[#DDECEB] pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#087F7B] transition-colors hover:text-[#009E98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
            <span className="text-xs text-slate-400">Shreem Controls Editorial</span>
          </div>
        </div>
      </PageSection>

      {relatedBlogs.length > 0 && (
        <PageSection theme="cream-gradient" waves="bottom">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#009E98]">
                  Keep Reading
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#1a1f1f]">
                  Related Articles
                </h3>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-1.5 text-xs font-semibold text-[#009E98] hover:text-[#087F7B] sm:inline-flex"
              >
                <span>View all articles</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <Link
                    href={`/blog/${item.slug}`}
                    className="relative block aspect-16/10 w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] text-[#737B7A]">
                      {formatDate(item.createdAt)} · {estimateReadingTime(item.content)}
                    </p>
                    <h4 className="mt-2 line-clamp-2 text-sm font-bold text-[#1a1f1f] transition-colors group-hover:text-[#009E98]">
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-[#737B7A]">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      <ConsultationCtaSection />
    </>
  );
}
