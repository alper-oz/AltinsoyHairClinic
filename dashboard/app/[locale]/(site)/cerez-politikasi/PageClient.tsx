"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
};

export default function CerezPolitikasiPage() {
  const t = useTranslations("pages.cookies");

  const rows = t.raw("types.table.rows") as CookieRow[];
  const essentialParts = t.raw(
    "types.categories.essential.bodyParts"
  ) as string[];
  const analyticsParts = t.raw(
    "types.categories.analytics.bodyParts"
  ) as string[];

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
                {t("what.title")}
              </h2>
              <p>{t("what.body")}</p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-6">
                {t("types.title")}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="text-left py-3 pr-4 font-medium text-on-surface/60 font-body">
                        {t("types.table.headers.cookie")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-on-surface/60 font-body">
                        {t("types.table.headers.provider")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-on-surface/60 font-body">
                        {t("types.table.headers.purpose")}
                      </th>
                      <th className="text-left py-3 pl-4 font-medium text-on-surface/60 font-body">
                        {t("types.table.headers.duration")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface/70">
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className={
                          i < rows.length - 1
                            ? "border-b border-outline-variant/10"
                            : ""
                        }
                      >
                        <td className="py-3 pr-4 font-medium text-on-surface">
                          {row.name}
                        </td>
                        <td className="py-3 px-4">{row.provider}</td>
                        <td className="py-3 px-4">{row.purpose}</td>
                        <td className="py-3 pl-4">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-6">
                <div className="bg-surface-container-low p-6 rounded">
                  <h3 className="font-headline text-lg text-on-surface mb-3">
                    {t("types.categories.essential.title")}
                  </h3>
                  <p>
                    {essentialParts[0]}
                    <code className="text-primary text-sm bg-surface-container-high px-1.5 py-0.5 rounded">
                      {essentialParts[1]}
                    </code>
                    {essentialParts[2]}
                  </p>
                </div>
                <div className="bg-surface-container-low p-6 rounded">
                  <h3 className="font-headline text-lg text-on-surface mb-3">
                    {t("types.categories.analytics.title")}
                  </h3>
                  <p>
                    {analyticsParts[0]}
                    <code className="text-primary text-sm bg-surface-container-high px-1.5 py-0.5 rounded">
                      {analyticsParts[1]}
                    </code>
                    {analyticsParts[2]}
                    <code className="text-primary text-sm bg-surface-container-high px-1.5 py-0.5 rounded">
                      {analyticsParts[3]}
                    </code>
                    {analyticsParts[4]}
                  </p>
                </div>
                <div className="bg-surface-container-low p-6 rounded">
                  <h3 className="font-headline text-lg text-on-surface mb-3">
                    {t("types.categories.performance.title")}
                  </h3>
                  <p>{t("types.categories.performance.body")}</p>
                </div>
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("control.title")}
              </h2>
              <p className="mb-4">{t("control.p1")}</p>
              <p>{t("control.p2")}</p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-headline text-2xl text-on-surface mb-4">
                {t("disable.title")}
              </h2>
              <p className="mb-4">{t("disable.intro")}</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                    open_in_new
                  </span>
                  <span>
                    <strong className="text-on-surface">
                      {t("disable.browsers.chrome.label")}
                    </strong>{" "}
                    {t("disable.browsers.chrome.body")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                    open_in_new
                  </span>
                  <span>
                    <strong className="text-on-surface">
                      {t("disable.browsers.firefox.label")}
                    </strong>{" "}
                    {t("disable.browsers.firefox.body")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary/70 text-[16px] mt-0.5">
                    open_in_new
                  </span>
                  <span>
                    <strong className="text-on-surface">
                      {t("disable.browsers.safari.label")}
                    </strong>{" "}
                    {t("disable.browsers.safari.body")}
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-on-surface/60">{t("disable.note")}</p>
            </section>

            {/* 5 */}
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
                href="/gizlilik-politikasi"
                className="hover:text-primary transition-colors"
              >
                {t("footerLinks.privacy")}
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
