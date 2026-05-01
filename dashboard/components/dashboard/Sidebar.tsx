"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_GROUPS = [
  {
    label: "Genel",
    items: [
      { href: "/dashboard",               label: "Genel Bakış",      icon: "space_dashboard", exact: true },
      { href: "/dashboard/leads",          label: "Lead",             icon: "person_add"                  },
    ],
  },
  {
    label: "İçerik",
    items: [
      { href: "/dashboard/hero",           label: "Hero",             icon: "wallpaper"     },
      { href: "/dashboard/banner",         label: "Banner",           icon: "image"         },
      { href: "/dashboard/oncesi-sonrasi", label: "Öncesi Sonrası",   icon: "photo_library" },
      { href: "/dashboard/sss",            label: "SSS",              icon: "quiz"          },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/dashboard/sitemap",        label: "Sitemap",          icon: "account_tree"  },
    ],
  },
  {
    label: "Analiz",
    items: [
      { href: "/dashboard/trafik",         label: "Trafik Kanalları", icon: "bar_chart"     },
      { href: "/dashboard/sosyal-medya",   label: "Sosyal Medya",     icon: "share"         },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col h-full"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 100%)",
        borderRight: "1px solid rgba(78,70,57,0.18)",
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(78,70,57,0.15)" }}>
        <Link href="/dashboard" className="block group">
          <div className="flex items-center gap-2.5">
            {/* Mini logotype mark */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-headline font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg,#e9c176 0%,#c5a059 100%)", color: "#1a0e00" }}
            >
              A
            </div>
            <div>
              <p className="font-headline text-[15px] tracking-tight leading-none" style={{ color: "#e9c176" }}>
                ALTINSOY
              </p>
              <p className="text-[8px] tracking-[0.3em] uppercase mt-0.5 font-label" style={{ color: "#a89080" }}>
                Admin Panel
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-4 overflow-y-auto">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[9px] tracking-[0.3em] uppercase font-label" style={{ color: "#8a7a68" }}>
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(({ href, label, icon, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-label transition-all duration-200 group overflow-hidden"
                    style={{
                      background: active ? "rgba(233,193,118,0.08)" : "transparent",
                      color: active ? "#e9c176" : "#c0b0a0",
                    }}
                  >
                    {/* Active glow bar */}
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ background: "linear-gradient(180deg,#e9c176,#c5a059)" }}
                      />
                    )}
                    <MaterialIcon name={icon} active={active} />
                    <span className="tracking-wide transition-colors duration-200" style={{ color: active ? "#e9c176" : "#c0b0a0" }}>
                      {label}
                    </span>
                    {/* Hover shimmer */}
                    {!active && (
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "rgba(233,193,118,0.04)" }} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Site link */}
      <div className="px-3 pb-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-label transition-all duration-200 group"
          style={{
            background: "rgba(233,193,118,0.04)",
            border: "1px solid rgba(233,193,118,0.1)",
            color: "#a89080",
          }}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ color: "#a89080" }}>open_in_new</span>
          <span className="tracking-wider group-hover:text-primary transition-colors duration-200">Siteyi Görüntüle</span>
        </a>
      </div>

      {/* Bottom user */}
      <div
        className="px-4 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(78,70,57,0.15)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-headline font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#e9c176,#c5a059)", color: "#412d00" }}
        >
          A
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-label truncate" style={{ color: "#d1c5b4" }}>Admin</p>
          <p className="text-[10px] font-label truncate" style={{ color: "#8a7a68" }}>altinsoy.com</p>
        </div>
        <button
          className="transition-opacity hover:opacity-80"
          style={{ opacity: 0.35, color: "#c0b0a0" }}
          title="Çıkış Yap"
          onClick={handleLogout}
        >
          <MaterialIcon name="logout" active={false} size={16} />
        </button>
      </div>
    </aside>
  );
}

function MaterialIcon({
  name,
  active,
  size = 20,
}: {
  name: string;
  active: boolean;
  size?: number;
}) {
  return (
    <span
      className="material-symbols-outlined flex-shrink-0"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${active ? 1 : 0},'wght' 300,'GRAD' 0,'opsz' 24`,
        color: active ? "#e9c176" : "#c0b0a0",
      }}
    >
      {name}
    </span>
  );
}
