"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DomainsResult, DomainCheck } from "@/app/api/check/domains/route";

type LoadingState = "idle" | "loading" | "done";

interface Props {
  state: LoadingState;
  data: DomainsResult | null;
  error: string | null;
}

export function DomainsSection({ state, data, error }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-xl">🌐</span>
          Domeenid
        </CardTitle>
      </CardHeader>
      <CardContent>
        {state === "loading" && <LoadingRow label="Kontrollin domeene..." />}
        {state === "done" && error && <ErrorRow message={error} />}
        {state === "done" && data && (
          <div className="space-y-3">
            {data.domains.map((d) => (
              <DomainRow key={d.tld} domain={d} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DomainRow({ domain }: { domain: DomainCheck }) {
  return (
    <div className="flex items-center gap-3">
      <StatusIcon status={domain.status} />
      <div className="flex-1 min-w-0">
        <span className="font-medium text-sm truncate block">{domain.domain}</span>
        {domain.price && (
          <span className="text-xs text-muted-foreground">{domain.price}</span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={domain.status} />
        {domain.status === "available" && domain.affiliateUrl && (
          <Button
            asChild
            size="sm"
            className="h-7 px-3 text-xs bg-[#065F46] hover:bg-[#047857] text-white"
          >
            <a href={domain.affiliateUrl} target="_blank" rel="noopener noreferrer">
              Registreeri
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: DomainCheck["status"] }) {
  if (status === "available")
    return <span className="text-green-600 text-lg">✓</span>;
  if (status === "taken")
    return <span className="text-red-500 text-lg">✗</span>;
  return <span className="text-gray-400 text-lg">?</span>;
}

function StatusBadge({ status }: { status: DomainCheck["status"] }) {
  if (status === "available")
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">VABA</Badge>;
  if (status === "taken")
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">VÕETUD</Badge>;
  return <Badge variant="secondary" className="text-xs">TEADMATA</Badge>;
}

function LoadingRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground text-sm">
      <svg
        className="animate-spin h-4 w-4 text-[#065F46]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {label}
    </div>
  );
}

function ErrorRow({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-red-600">
      <span>⚠</span>
      {message}
    </div>
  );
}
