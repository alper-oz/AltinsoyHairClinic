import CerezPolitikasiPage from "./PageClient";
import { buildPageMetadata } from "@/lib/i18n-metadata";

export const generateMetadata = () =>
  buildPageMetadata("cerez", "/cerez-politikasi");

export default function Page() {
  return <CerezPolitikasiPage />;
}
