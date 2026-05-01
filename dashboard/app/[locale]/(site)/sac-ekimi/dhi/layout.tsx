import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("dhi", "/sac-ekimi/dhi");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
