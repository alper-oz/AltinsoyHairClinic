"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type QuickKey = "price" | "fueDhi" | "pain" | "results" | "analysis";

const QUICK_KEYS: QuickKey[] = ["price", "fueDhi", "pain", "results", "analysis"];
const QUICK_ICONS: Record<QuickKey, string> = {
  price: "💰",
  fueDhi: "🔬",
  pain: "💉",
  results: "⏱️",
  analysis: "📋",
};

interface Message {
  text: string;
  sender: "bot" | "user";
}

type Locale = (typeof routing.locales)[number];

export default function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale() as Locale;

  const priceUrl = getPathname({ locale, href: "/fiyat" });
  const compareUrl = getPathname({ locale, href: "/fue-vs-dhi" });
  const analysisUrl = getPathname({ locale, href: "/sac-analizi" });

  function localizeUrls(template: string): string {
    return template
      .replace(/\{priceUrl\}/g, priceUrl)
      .replace(/\{compareUrl\}/g, compareUrl)
      .replace(/\{analysisUrl\}/g, analysisUrl);
  }

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Locale değiştiğinde greeting'i o dilde sıfırla. greeting HTML içerdiği için t.raw().
  useEffect(() => {
    setMessages([
      { text: t.raw("greeting") as string, sender: "bot" },
      { text: t("greetingFollowup"), sender: "bot" },
    ]);
    setInitialized(true);
  }, [t]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open]);

  function getResponseForKey(key: QuickKey): string {
    return localizeUrls(t.raw(`responses.${key}`) as string);
  }

  function getDefaultResponse(): string {
    return localizeUrls(t.raw("defaultResponse") as string);
  }

  function findMatchingKey(text: string): QuickKey | null {
    // Quick-reply başlıkları ile eşleşen serbest metin sorgularını yakala
    const norm = text.toLowerCase().trim();
    for (const key of QUICK_KEYS) {
      const reply = (t.raw(`quickReplies.${key}`) as string)
        .toLowerCase()
        .replace(/[?!.,؟]/g, "")
        .trim();
      if (norm.includes(reply) || reply.includes(norm)) return key;
    }
    return null;
  }

  function sendQuickReply(key: QuickKey) {
    const question = t.raw(`quickReplies.${key}`) as string;
    setInput("");
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text: getResponseForKey(key), sender: "bot" }]);
    }, 900 + Math.random() * 600);
  }

  function sendMessage() {
    const msg = input.trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);
    setTyping(true);
    const matched = findMatchingKey(msg);
    setTimeout(() => {
      setTyping(false);
      const response = matched ? getResponseForKey(matched) : getDefaultResponse();
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 900 + Math.random() * 600);
  }

  if (!initialized) return null;

  return (
    <>
      <button
        className={`chat-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t("openLabel")}
      >
        {!open && <span className="chat-pulse" />}
        <span className="material-symbols-outlined">{open ? "close" : "chat"}</span>
      </button>

      <div
        className={`chat-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label={t("dialogLabel")}
      >
        <div className="chat-header">
          <div className="chat-avatar">A</div>
          <div className="chat-header-info">
            <p className="chat-header-title">{t("headerTitle")}</p>
            <div className="chat-header-status">
              <span className="chat-status-dot" />
              {t("online")}
            </div>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label={t("closeLabel")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
          </button>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          <div className="chat-disclaimer">{t("disclaimer")}</div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg ${m.sender}`}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
          ))}
          {typing && (
            <div className="chat-msg bot">
              <div className="typing-indicator">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="chat-quick-replies">
          {QUICK_KEYS.map((key) => (
            <button
              key={key}
              className="chat-quick-btn"
              onClick={() => sendQuickReply(key)}
            >
              {QUICK_ICONS[key]} {t(`quickReplies.${key}`)}
            </button>
          ))}
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder={t("inputPlaceholder")}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              aria-label={t("sendLabel")}
            >
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
          </div>
        </div>

        <div className="chat-footer">
          <span className="chat-footer-text">{t("footerText")}</span>
        </div>
      </div>
    </>
  );
}
