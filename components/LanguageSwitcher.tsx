"use client";

import { useLang } from "@/lib/i18nContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => setLang("et")}
        className={`px-2 py-0.5 rounded transition-colors ${
          lang === "et"
            ? "bg-[#065F46] text-white"
            : "text-muted-foreground hover:text-[#065F46]"
        }`}
        aria-label="Eesti keel"
      >
        ET
      </button>
      <span className="text-muted-foreground/40">|</span>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-0.5 rounded transition-colors ${
          lang === "en"
            ? "bg-[#065F46] text-white"
            : "text-muted-foreground hover:text-[#065F46]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
