import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("greftHesaplama", "/greft-hesaplama");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
