import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/i18n-metadata";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("vakaDhiSakal", "/vaka/dhi-sakal-1800-greft");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
