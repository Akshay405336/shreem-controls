import { LegalPage } from "@/components/legal/legal-page";
import { cookiePolicy } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: cookiePolicy.path,
});

export default function CookiePolicyPage() {
  return <LegalPage document={cookiePolicy} showCookieSettings />;
}
