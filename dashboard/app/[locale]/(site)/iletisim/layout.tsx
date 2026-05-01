import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("iletisim", "/iletisim");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
