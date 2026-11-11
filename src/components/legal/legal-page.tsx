import Link from "next/link";

import { PageSection } from "@/components/layout/page-section";
import { CookieSettingsButton } from "@/components/legal/cookie-consent-banner";
import { legalContact, type LegalDocument } from "@/data/legal";

type LegalPageProps = {
  document: LegalDocument;
  showCookieSettings?: boolean;
};

export function LegalPage({ document, showCookieSettings = false }: LegalPageProps) {
  return (
    <>
      <PageSection theme="cream-gradient" waves="none" className="pb-8 pt-16 sm:pb-10 sm:pt-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
          Legal Information
        </p>
        <h1 className="mt-4 max-w-3xl text-[32px] font-semibold tracking-[-0.04em] text-[#252A2A] sm:text-[40px] lg:text-[44px]">
          {document.title}
        </h1>
        <p className="mt-5 max-w-3xl text-[14px] leading-[1.8] text-[#737B7A] sm:text-[15px]">
          {document.introduction}
        </p>
        <p className="mt-4 text-[12px] text-[#9AA3A2]">
          Last updated: <span className="font-medium text-[#555E5D]">{document.lastUpdated}</span>
        </p>
      </PageSection>

      <PageSection theme="white" waves="bottom" scene="orb-top-right">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087F7B]">
              On this page
            </p>
            <nav aria-label={`${document.title} sections`} className="mt-4 space-y-2">
              {document.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-[13px] leading-[1.5] text-[#555E5D] transition hover:text-[#009E98]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
            {showCookieSettings ? (
              <div className="mt-6 border-t border-[#E8F1F0] pt-4">
                <CookieSettingsButton />
              </div>
            ) : null}
          </aside>

          <div className="max-w-3xl space-y-10">
            {document.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#252A2A] sm:text-[22px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[13px] leading-[1.8] text-[#737B7A] sm:text-[14px]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.subsections?.map((subsection) => (
                    <div
                      key={subsection.title}
                      className="rounded-[16px] border border-[#E8F1F0] bg-[#FCFCFA] px-4 py-4 sm:px-5"
                    >
                      <h3 className="text-[14px] font-semibold text-[#252A2A]">
                        {subsection.title}
                      </h3>
                      <div className="mt-2 space-y-3">
                        {subsection.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section
              id="company-contact"
              className="scroll-mt-28 rounded-[20px] border border-[#DDECEB] bg-[#F8FBFA] px-5 py-6 sm:px-6"
            >
              <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#252A2A]">
                Contact Shreem Controls
              </h2>
              <p className="mt-2 text-[13px] leading-[1.7] text-[#737B7A] sm:text-[14px]">
                Smart home automation, security and connected control solutions.
              </p>
              <dl className="mt-5 space-y-3 text-[13px] text-[#555E5D] sm:text-[14px]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#087F7B]">
                    Company
                  </dt>
                  <dd className="mt-1 font-medium text-[#252A2A]">{legalContact.companyName}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#087F7B]">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${legalContact.phoneTel}`}
                      className="font-medium text-[#252A2A] transition hover:text-[#009E98]"
                    >
                      {legalContact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#087F7B]">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${legalContact.email}`}
                      className="font-medium text-[#252A2A] transition hover:text-[#009E98]"
                    >
                      {legalContact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#087F7B]">
                    Address
                  </dt>
                  <dd className="mt-1 space-y-0.5 font-medium text-[#252A2A]">
                    {legalContact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#087F7B]">
                    Website
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={legalContact.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#252A2A] transition hover:text-[#009E98]"
                    >
                      {legalContact.websiteLabel}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-[12px] leading-[1.7] text-[#9AA3A2]">
                These pages are intended as a professional website policy starting point. Final
                legal review is recommended before publication.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
                <Link href="/privacy-policy" className="font-medium text-[#087F7B] hover:text-[#009E98]">
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="font-medium text-[#087F7B] hover:text-[#009E98]"
                >
                  Terms and Conditions
                </Link>
                <Link href="/cookie-policy" className="font-medium text-[#087F7B] hover:text-[#009E98]">
                  Cookie Policy
                </Link>
              </div>
            </section>
          </div>
        </div>
      </PageSection>
    </>
  );
}
