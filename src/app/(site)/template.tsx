import { PageTransition } from "@/components/layout/page-transition";

/** Site-wide page shell (transitions only; header offset lives on PageHero / inner layout). */
export default function SiteTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageTransition>{children}</PageTransition>;
}
