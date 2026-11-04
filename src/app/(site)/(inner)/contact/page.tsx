import { EnquiryForm } from "@/components/consultation/enquiry-form";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactMap } from "@/components/contact/contact-map";
import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Shreem Controls for consultations, project enquiries and smart-home guidance.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLead="Speak with our"
        titleAccent="smart living team"
        description="Share your project details and we will connect you with a Shreem Controls specialist."
        image="/images/solutions/Living-Room.png"
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-bottom-left">
        <HomeSectionHeading
          align="center"
          eyebrow="Get in Touch"
          titleLead="Consultation and"
          titleAccent="project enquiries"
          description="Use the form below or contact us directly for smart-home enquiries."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactDetails />
          <div className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-6 shadow-[0_6px_20px_rgba(37,42,42,0.06)] sm:p-8">
            <h2 className="font-display text-[22px] text-[#252A2A]">Enquiry form</h2>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </PageSection>

      <ContactMap />
    </>
  );
}
