"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function GizlilikPolitikasiPage() {
  const t = useTranslations("pages.privacy");

  const dataCollected = t.raw("dataCollected.list") as string[];
  const purposes = t.raw("purposes.list") as string[];
  const rights = t.raw("rights.list") as string[];
  const retentionParts = t.raw("retention.bodyParts") as string[];

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-on-surface/50 hover:text-primary transition-colors tracking-wider uppercase mb-12"
        >
          <span className="material-symbols-outlined text-[14px]">
            arrow_back
          </span>
          {t("header.backHome")}
        </Link>

        <article>
          <header className="mb-12">
            <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">
              {t("header.eyebrow")}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight mb-4">
              {t("header.title")}
            </h1>
            <p className="text-on-surface/50 text-sm">{t("header.updated")}</p>
          </header>

          <div className="space-y-12 text-on-surface/80 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("controller.title")}
              </h2>
              <div className="bg-surface-container-low p-6 rounded space-y-2">
                <p>
                  <strong className="text-on-surface">
                    {t("controller.companyLabel")}
                  </strong>{" "}
                  {t("controller.companyValue")}
                </p>
                <p>
                  <strong className="text-on-surface">
                    {t("controller.emailLabel")}
                  </strong>{" "}
                  <a
                    href={`mailto:${t("controller.emailValue")}`}
                    className="text-primary hover:underline"
                  >
                    {t("controller.emailValue")}
                  </a>
                </p>
                <p>
                  <strong className="text-on-surface">
                    {t("controller.phoneLabel")}
                  </strong>{" "}
                  <a
                    href={`tel:${t("controller.phoneValue").replace(/\s/g, "")}`}
                    className="text-primary hover:underline"
                  >
                    {t("controller.phoneValue")}
                  </a>
                </p>
              </div>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("dataCollected.title")}
              </h2>
              <p className="mb-4">{t("dataCollected.intro")}</p>
              <ul className="space-y-2">
                {dataCollected.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                      check
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("purposes.title")}
              </h2>
              <p className="mb-4">{t("purposes.intro")}</p>
              <ul className="space-y-2">
                {purposes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                      check
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("legalBasis.title")}
              </h2>
              <div className="space-y-4">
                <div className="bg-surface-container-low p-5 rounded">
                  <p>
                    <strong className="text-on-surface">
                      {t("legalBasis.consent.label")}
                    </strong>{" "}
                    {t("legalBasis.consent.body")}
                  </p>
                </div>
                <div className="bg-surface-container-low p-5 rounded">
                  <p>
                    <strong className="text-on-surface">
                      {t("legalBasis.contract.label")}
                    </strong>{" "}
                    {t("legalBasis.contract.body")}
                  </p>
                </div>
              </div>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("sharing.title")}
              </h2>
              <p>{t("sharing.body")}</p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("retention.title")}
              </h2>
              <p>
                {retentionParts[0]}
                <strong className="text-on-surface">
                  {retentionParts[1]}
                </strong>
                {retentionParts[2]}
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("rights.title")}
              </h2>
              <p className="mb-4">{t("rights.intro")}</p>
              <ul className="space-y-2">
                {rights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("contact.title")}
              </h2>
              <p>
                {t("contact.body")}{" "}
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="text-primary hover:underline"
                >
                  {t("contact.email")}
                </a>
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-outline-variant/10">
            <div className="flex flex-wrap gap-4 text-sm text-on-surface/40">
              <Link
                href="/cerez-politikasi"
                className="hover:text-primary transition-colors"
              >
                {t("footerLinks.cookies")}
              </Link>
              <Link
                href="/kvkk-aydinlatma"
                className="hover:text-primary transition-colors"
              >
                {t("footerLinks.kvkk")}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
