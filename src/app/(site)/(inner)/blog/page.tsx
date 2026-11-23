import { CmsUploadImage } from "@/components/media/cms-upload-image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react";
import { getActiveBlogs } from "@/lib/blogs/service";
import { formatDate, estimateReadingTime } from "@/lib/blogs/utils";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageSection } from "@/components/layout/page-section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Explore smart home articles, automation insights, architectural guides, and updates from Shreem Controls.",
  path: "/blog",
});

export const instant = false;

export default async function BlogListingPage() {
  let blogs: Awaited<ReturnType<typeof getActiveBlogs>> = [];
  let loadError = false;

  try {
    blogs = await getActiveBlogs();
  } catch {
    loadError = true;
  }

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
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          {loadError ? (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50/70 p-10 text-center">
              <h3 className="text-base font-semibold text-red-800">Unable to load articles</h3>
              <p className="mt-2 text-xs leading-relaxed text-red-700">
                Please refresh the page or try again shortly.
              </p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-[#DDECEB] bg-white/80 p-12 text-center shadow-sm backdrop-blur-xs">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#009E98]/10 text-[#009E98]">
                <Newspaper className="h-7 w-7" />
              </div>
              <h3 className="text-base font-semibold text-[#1a1f1f]">No Articles Published Yet</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#737B7A]">
                Our latest insights and guides are currently being prepared. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] shadow-[0_6px_24px_rgba(37,42,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,158,152,0.12)]"
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="relative block aspect-16/10 w-full overflow-hidden bg-slate-100"
                  >
                    <CmsUploadImage
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
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

                    <h2 className="mt-3 line-clamp-2 text-lg font-bold tracking-tight text-[#1a1f1f] transition-colors group-hover:text-[#009E98]">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-[#737B7A]">
                      {blog.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#DDECEB]/60 pt-4">
                      <span className="text-xs font-semibold text-[#009E98] transition-colors group-hover:text-[#087F7B]">
                        Read More
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
