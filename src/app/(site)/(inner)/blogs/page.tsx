import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react";
import { getActiveBlogs } from "@/lib/blogs/service";
import { formatDate, estimateReadingTime } from "@/lib/blogs/utils";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageSection } from "@/components/layout/page-section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blogs & Insights",
  description:
    "Explore smart home articles, automation insights, architectural guides, and updates from Shreem Controls.",
  path: "/blogs",
});

export const instant = false;

export default async function BlogsPage() {
  const blogs = await getActiveBlogs();

  return (
    <>
      <PageHero
        eyebrow="Insights & Stories"
        title={
          <>
            Smart living &{" "}
            <span className="text-[#009E98]">automation</span>
          </>
        }
        description="Thoughtful articles, architectural insights, and practical guides to elevate your intelligent living spaces."
        image="/images/solutions/Control-Panel.png"
        variant="image"
      />

      <PageSection theme="cream-gradient" waves="bottom" rings scene="orb-top-right">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-[#DDECEB] bg-white/80 p-12 text-center shadow-sm backdrop-blur-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#009E98]/10 text-[#009E98] mb-4">
                <Newspaper className="h-7 w-7" />
              </div>
              <h3 className="text-base font-semibold text-[#1a1f1f]">No Articles Published Yet</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#737B7A]">
                Our latest insights and guides are currently being prepared. Please check back soon or browse our resources hub.
              </p>
              <Link
                href="/resources"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#087F7B]/30 bg-[#009E98] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#087F7B]"
              >
                <span>Browse Resources</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] shadow-[0_6px_24px_rgba(37,42,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,158,152,0.12)]"
                >
                  {/* Card Cover Image */}
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="relative block aspect-16/10 w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-[11px] font-medium text-[#737B7A]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#009E98]" />
                        {formatDate(blog.createdAt)}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#009E98]" />
                        {estimateReadingTime(blog.content)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-lg font-bold tracking-tight text-[#1a1f1f] group-hover:text-[#009E98] transition-colors line-clamp-2">
                      <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-2 text-xs leading-relaxed text-[#737B7A] line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Read Article Link */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#DDECEB]/60 pt-4">
                      <span className="text-xs font-semibold text-[#009E98] transition-colors group-hover:text-[#087F7B]">
                        Read Article
                      </span>
                      <div className="flex size-7 items-center justify-center rounded-full border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
