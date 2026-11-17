import { LegalPage } from "@/components/legal/legal-page";
import { termsAndConditions } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: termsAndConditions.path,
});

export default function TermsAndConditionsPage() {
  return <LegalPage document={termsAndConditions} />;
}
