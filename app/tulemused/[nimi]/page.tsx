"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SearchClient } from "@/components/SearchClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLang } from "@/lib/i18nContext";

export default function TulemustedPage({
  params,
}: {
  params: { nimi: string };
}) {
  const name = decodeURIComponent(params.nimi);
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo href="/" />
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-[#065F46] transition-colors"
            >
              ← {t.search_new_btn}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <SearchClient initialName={name} />
      </main>
    </div>
  );
}
