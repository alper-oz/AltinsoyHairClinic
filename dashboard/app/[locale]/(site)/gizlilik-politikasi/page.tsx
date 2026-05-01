import GizlilikPolitikasiPage from "./PageClient";
import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () =>
  buildPageMetadata("gizlilik", "/gizlilik-politikasi");

export default function Page() {
  return <GizlilikPolitikasiPage />;
}
