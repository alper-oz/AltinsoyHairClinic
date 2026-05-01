import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/i18n-metadata";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("vakaKas", "/vaka/kas-restorasyonu-400-greft");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
