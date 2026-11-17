import { EnquiryForm } from "@/components/consultation/enquiry-form";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactMap } from "@/components/contact/contact-map";
import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact us for product information, general enquiries and customer assistance.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Speak with <span className="text-[#73BDB8]">our team</span>
          </>
        }
        description="Have a question or need assistance? Get in touch with our team. We'd be happy to help."
        image="/images/solutions/Living-Room.png"
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-bottom-left">
        <HomeSectionHeading
          align="center"
          eyebrow="Contact"
          title="Get in Touch"
          description="Get in touch with us for product information, general enquiries or assistance. Our team is happy to help."
        />

        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactDetails />
          <div className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-5 shadow-[0_6px_20px_rgba(37,42,42,0.06)] sm:p-8">
            <h2 className="font-display text-[20px] tracking-[-0.03em] text-[#252A2A] sm:text-[24px]">
              Send Us a Message
            </h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#737B7A] sm:text-[14px]">
              Have a question? Fill out the form and our team will get back to you.
            </p>
            <div className="mt-6">
              <EnquiryForm
                showIntro={false}
                submitLabel="Send Enquiry"
                loadingLabel="Sending…"
                locationFieldLabel="City / Location"
                locationPlaceholder="Your city or area"
                messagePlaceholder="How can we help you today?"
                successEyebrow="Message received"
              />
            </div>
          </div>
        </div>
      </PageSection>

      <ContactMap />
    </>
  );
}
