import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danışan Bilgileri | Altınsoy Hair Clinic",
  description: "Altınsoy Hair Clinic danışan bilgi formu. Kayıt oluşturun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
