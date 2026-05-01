import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("uygunDegil", "/uygun-degil");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
