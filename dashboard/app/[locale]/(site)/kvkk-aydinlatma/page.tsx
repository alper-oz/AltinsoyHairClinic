import KvkkAydinlatmaPage from "./PageClient";
import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () =>
  buildPageMetadata("kvkk", "/kvkk-aydinlatma");

export default function Page() {
  return <KvkkAydinlatmaPage />;
}
