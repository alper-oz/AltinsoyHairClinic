import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("fueVsDhi", "/fue-vs-dhi");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
