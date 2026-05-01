"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function KvkkAydinlatmaPage() {
  const t = useTranslations("pages.kvkk");

  const purposes = t.raw("purposes.list") as string[];
  const rights = t.raw("rights.list") as string[];
  const legalBasisParts = t.raw("collection.legalBasis.bodyParts") as string[];
  const noteParts = t.raw("application.noteParts") as string[];

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
            <p className="text-on-surface/60 text-sm mb-2">
              {t("header.regulationLine")}
            </p>
            <p className="text-on-surface/50 text-sm">{t("header.date")}</p>
          </header>

          <div className="space-y-12 text-on-surface/80 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("controller.title")}
              </h2>
              <p>
                {t("controller.bodyBefore")}
                <strong className="text-on-surface">
                  {t("controller.company")}
                </strong>
                {t("controller.bodyAfter")}
              </p>
            </section>

            {/* 2 */}
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

            {/* 3 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("dataTypes.title")}
              </h2>
              <div className="space-y-4">
                <div className="bg-surface-container-low p-5 rounded">
                  <h3 className="font-headline text-base text-primary mb-3">
                    {t("dataTypes.identity.label")}
                  </h3>
                  <p>{t("dataTypes.identity.body")}</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded">
                  <h3 className="font-headline text-base text-primary mb-3">
                    {t("dataTypes.contact.label")}
                  </h3>
                  <p>{t("dataTypes.contact.body")}</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded">
                  <h3 className="font-headline text-base text-primary mb-3">
                    {t("dataTypes.health.label")}
                  </h3>
                  <p>{t("dataTypes.health.body")}</p>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("transfer.title")}
              </h2>
              <p>{t("transfer.body")}</p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("collection.title")}
              </h2>
              <div className="space-y-4">
                <div className="bg-surface-container-low p-5 rounded">
                  <h3 className="font-headline text-base text-on-surface mb-2">
                    {t("collection.method.label")}
                  </h3>
                  <p>{t("collection.method.body")}</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded">
                  <h3 className="font-headline text-base text-on-surface mb-2">
                    {t("collection.legalBasis.label")}
                  </h3>
                  <p>
                    {legalBasisParts[0]}
                    <strong className="text-on-surface">
                      {legalBasisParts[1]}
                    </strong>
                    {legalBasisParts[2]}
                    <strong className="text-on-surface">
                      {legalBasisParts[3]}
                    </strong>
                    {legalBasisParts[4]}
                  </p>
                </div>
              </div>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("rights.title")}
              </h2>
              <p className="mb-4">{t("rights.intro")}</p>
              <ul className="space-y-3">
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

            {/* 7 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("application.title")}
              </h2>
              <p className="mb-4">{t("application.intro")}</p>
              <div className="bg-surface-container-low p-6 rounded space-y-3">
                <p className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                    mail
                  </span>
                  <span>
                    <strong className="text-on-surface">
                      {t("application.emailLabel")}
                    </strong>{" "}
                    <a
                      href={`mailto:${t("application.emailValue")}`}
                      className="text-primary hover:underline"
                    >
                      {t("application.emailValue")}
                    </a>
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                    mail
                  </span>
                  <span>
                    <strong className="text-on-surface">
                      {t("application.mailLabel")}
                    </strong>{" "}
                    {t("application.mailValue")}
                  </span>
                </p>
              </div>
              <p className="mt-4 text-on-surface/60">
                {noteParts[0]}
                <strong className="text-on-surface">{noteParts[1]}</strong>
                {noteParts[2]}
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-outline-variant/10">
            <div className="flex flex-wrap gap-4 text-sm text-on-surface/40">
              <Link
                href="/gizlilik-politikasi"
                className="hover:text-primary transition-colors"
              >
                {t("footerLinks.privacy")}
              </Link>
              <Link
                href="/cerez-politikasi"
                className="hover:text-primary transition-colors"
              >
                {t("footerLinks.cookies")}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
