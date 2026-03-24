"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AriregisterSection } from "@/components/results/AriregisterSection";
import { DomainsSection } from "@/components/results/DomainsSection";
import { SocialSection } from "@/components/results/SocialSection";
import type { AriregisterResult } from "@/app/api/check/ariregister/route";
import type { DomainsResult } from "@/app/api/check/domains/route";
import type { SocialResult } from "@/app/api/check/social/route";

type LoadingState = "idle" | "loading" | "done";

interface CheckState<T> {
  state: LoadingState;
  data: T | null;
  error: string | null;
}

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [searchedName, setSearchedName] = useState("");
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
  const resultsRef = useRef<HTMLDivElement>(null);

  const isChecking = [ariregister, domains, social].some((s) => s.state === "loading");
  const hasResults = [ariregister, domains, social].some((s) => s.state !== "idle");

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    const name = query.trim();
    if (!name || name.length < 2) return;

    setSearchedName(name);
    setAriregister({ state: "loading", data: null, error: null });
    setDomains({ state: "loading", data: null, error: null });
    setSocial({ state: "loading", data: null, error: null });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    const encoded = encodeURIComponent(name);

    const fetchAriregister = fetch(`/api/check/ariregister?name=${encoded}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Viga");
        setAriregister({ state: "done", data, error: null });
      })
      .catch((err) => {
        setAriregister({ state: "done", data: null, error: err.message });
      });

    const fetchDomains = fetch(`/api/check/domains?name=${encoded}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Viga");
        setDomains({ state: "done", data, error: null });
      })
      .catch((err) => {
        setDomains({ state: "done", data: null, error: err.message });
      });

    const fetchSocial = fetch(`/api/check/social?name=${encoded}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Viga");
        setSocial({ state: "done", data, error: null });
      })
      .catch((err) => {
        setSocial({ state: "done", data: null, error: err.message });
      });

    await Promise.allSettled([fetchAriregister, fetchDomains, fetchSocial]);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sisesta ärinimi... (nt. TartuTech OÜ)"
          className="flex-1 h-12 text-base px-4"
          maxLength={100}
          disabled={isChecking}
          autoFocus
        />
        <Button
          type="submit"
          disabled={isChecking || query.trim().length < 2}
          className="h-12 px-8 text-base font-semibold bg-[#065F46] hover:bg-[#047857] text-white"
        >
          {isChecking ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Kontrollin...
            </span>
          ) : (
            "Kontrolli kättesaadavust"
          )}
        </Button>
      </form>

      {hasResults && (
        <div ref={resultsRef} className="mt-10 space-y-6">
          <p className="text-sm text-muted-foreground">
            Kontrollitakse nime:{" "}
            <span className="font-semibold text-foreground">&ldquo;{searchedName}&rdquo;</span>
          </p>
          <AriregisterSection state={ariregister.state} data={ariregister.data} error={ariregister.error} />
          <DomainsSection state={domains.state} data={domains.data} error={domains.error} />
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
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
