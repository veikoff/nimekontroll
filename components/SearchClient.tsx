"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AriregisterSection } from "@/components/results/AriregisterSection";
import { DomainsSection } from "@/components/results/DomainsSection";
import { SocialSection } from "@/components/results/SocialSection";
import { KaubamargidSection } from "@/components/results/KaubamargidSection";
import { useLang } from "@/lib/i18nContext";
import type { AriregisterResult } from "@/app/api/check/ariregister/route";
import type { DomainsResult } from "@/app/api/check/domains/route";
import type { SocialResult } from "@/app/api/check/social/route";
import type { KaubamargidResult } from "@/app/api/check/kaubamargid/route";

type LoadingState = "idle" | "loading" | "done";

interface CheckState<T> {
  state: LoadingState;
  data: T | null;
  error: string | null;
}

interface Props {
  initialName?: string;
}

export function SearchClient({ initialName }: Props) {
  const { t } = useLang();
  const [query, setQuery] = useState(initialName ?? "");
  const [searchedName, setSearchedName] = useState("");
  const [copied, setCopied] = useState(false);
  const [ariregister, setAriregister] = useState<CheckState<AriregisterResult>>({
    state: "idle",
    data: null,
    error: null,
  });
  const [domains, setDomains] = useState<CheckState<DomainsResult>>({
    state: "idle",
    data: null,
    error: null,
  });
  const [social, setSocial] = useState<CheckState<SocialResult>>({
    state: "idle",
    data: null,
    error: null,
  });
  const [kaubamargid, setKaubamargid] = useState<CheckState<KaubamargidResult>>({
    state: "idle",
    data: null,
    error: null,
  });
  const resultsRef = useRef<HTMLDivElement>(null);

  const isChecking = [ariregister, domains, social, kaubamargid].some((s) => s.state === "loading");
  const hasResults = [ariregister, domains, social, kaubamargid].some((s) => s.state !== "idle");
  const allDone = [ariregister, domains, social, kaubamargid].every((s) => s.state === "done");

  async function runSearch(name: string) {
    setSearchedName(name);
    setAriregister({ state: "loading", data: null, error: null });
    setDomains({ state: "loading", data: null, error: null });
    setSocial({ state: "loading", data: null, error: null });
    setKaubamargid({ state: "loading", data: null, error: null });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    const encoded = encodeURIComponent(name);

    await Promise.allSettled([
      fetch(`/api/check/ariregister?name=${encoded}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Viga");
          setAriregister({ state: "done", data, error: null });
        })
        .catch((err) => setAriregister({ state: "done", data: null, error: err.message })),

      fetch(`/api/check/domains?name=${encoded}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Viga");
          setDomains({ state: "done", data, error: null });
        })
        .catch((err) => setDomains({ state: "done", data: null, error: err.message })),

      fetch(`/api/check/social?name=${encoded}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Viga");
          setSocial({ state: "done", data, error: null });
        })
        .catch((err) => setSocial({ state: "done", data: null, error: err.message })),

      fetch(`/api/check/kaubamargid?name=${encoded}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Viga");
          setKaubamargid({ state: "done", data, error: null });
        })
        .catch((err) => setKaubamargid({ state: "done", data: null, error: err.message })),
    ]);
  }

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    const name = query.trim();
    if (!name || name.length < 2) return;
    await runSearch(name);
  }

  // Auto-käivitab otsingu kui initialName on antud (shareable URL)
  useEffect(() => {
    if (initialName && initialName.trim().length >= 2) {
      runSearch(initialName.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleShare() {
    const url = `${window.location.origin}/tulemused/${encodeURIComponent(searchedName)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="w-full">
      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search_placeholder}
          className="flex-1 h-12 text-base px-4"
          maxLength={100}
          disabled={isChecking}
          autoFocus={!initialName}
        />
        <Button
          type="submit"
          disabled={isChecking || query.trim().length < 2}
          className="h-12 px-8 text-base font-semibold bg-[#065F46] hover:bg-[#047857] text-white"
        >
          {isChecking ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {t.search_checking}
            </span>
          ) : (
            t.search_btn
          )}
        </Button>
      </form>

      {hasResults && (
        <div ref={resultsRef} className="mt-10 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              {t.search_checking_name}{" "}
              <span className="font-semibold text-foreground">&ldquo;{searchedName}&rdquo;</span>
            </p>
            {allDone && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="h-8 px-3 text-xs border-[#065F46] text-[#065F46] hover:bg-[#065F46] hover:text-white"
              >
                {copied ? t.search_share_copied : t.search_share_btn}
              </Button>
            )}
          </div>
          <AriregisterSection state={ariregister.state} data={ariregister.data} error={ariregister.error} />
          <DomainsSection state={domains.state} data={domains.data} error={domains.error} />
          <KaubamargidSection state={kaubamargid.state} data={kaubamargid.data} error={kaubamargid.error} />
          <SocialSection state={social.state} data={social.data} error={social.error} />
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
