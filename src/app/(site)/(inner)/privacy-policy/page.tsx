import { LegalPage } from "@/components/legal/legal-page";
import { privacyPolicy } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: privacyPolicy.path,
});

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
