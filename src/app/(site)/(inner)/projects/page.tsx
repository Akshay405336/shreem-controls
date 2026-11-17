import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { ProjectsShowcaseVideo } from "@/components/projects/projects-showcase-video";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Explore Shreem Controls smart-home project showcases across residential and commercial spaces.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        titleLead="Architectural smart-home"
        titleAccent="experiences"
        description="A portfolio of Shreem Controls installations across residential, villa and presentation environments."
        image="/images/Sunset-Smart.png"
        variant="image"
      />
      <ProjectsShowcaseVideo />
      <ProjectsGallery />
      <ConsultationCtaSection />
    </>
  );
}
