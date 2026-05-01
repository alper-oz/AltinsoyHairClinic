import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("oncesiSonrasi", "/oncesi-sonrasi");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
