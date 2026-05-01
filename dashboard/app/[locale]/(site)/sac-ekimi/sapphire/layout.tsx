import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () => buildPageMetadata("sapphire", "/sac-ekimi/sapphire");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
