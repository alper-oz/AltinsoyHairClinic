import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("fiyatHesaplama", "/fiyat-hesaplama");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
