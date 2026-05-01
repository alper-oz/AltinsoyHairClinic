"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("_vsid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("_vsid", id);
    }
    return id;
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sid = getSessionId();

    const ping = () => {
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid, page: pathname }),
        keepalive: true,
      }).catch(() => {});
    };

    ping();
    const interval = setInterval(ping, 30_000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
