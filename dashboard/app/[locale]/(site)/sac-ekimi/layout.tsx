import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("sacEkimi", "/sac-ekimi");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
