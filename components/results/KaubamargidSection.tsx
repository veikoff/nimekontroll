"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18nContext";
import type { KaubamargidResult, TrademarkMatch } from "@/app/api/check/kaubamargid/route";

type LoadingState = "idle" | "loading" | "done";

interface Props {
  state: LoadingState;
  data: KaubamargidResult | null;
  error: string | null;
}

export function KaubamargidSection({ state, data, error }: Props) {
  const { t } = useLang();
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-xl">™</span>
          {t.kaubamargid_title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {state === "loading" && <LoadingRow label={t.kaubamargid_loading} />}
        {state === "done" && error && <ErrorRow message={error} />}
        {state === "done" && data && (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <StatusIcon status={data.status} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                  {data.status === "available"
                    ? t.kaubamargid_available
                    : data.status === "taken"
                    ? t.kaubamargid_taken
                    : t.kaubamargid_similar(data.similarCount)}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <StatusBadge status={data.status} t={t} />
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs border-[#065F46] text-[#065F46] hover:bg-[#065F46] hover:text-white"
                >
                  <a href={data.epaUrl} target="_blank" rel="noopener noreferrer">
                    {t.kaubamargid_check_epa}
                  </a>
                </Button>
              </div>
            </div>

            {data.matches.length > 0 && (
              <ul className="mt-2 space-y-2 border-t pt-2">
                {data.matches.map((tm) => (
                  <MatchRow key={tm.id} match={tm} t={t} />
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MatchRow({
  match,
  t,
}: {
  match: TrademarkMatch;
  t: ReturnType<typeof useLang>["t"];
}) {
  return (
    <li className="text-xs text-muted-foreground space-y-0.5">
      <p className="font-medium text-foreground text-sm">{match.verbalElement}</p>
      <p>
        {t.kaubamargid_status_label}{" "}
        <span className="text-foreground">{match.currentStatus}</span>
        {match.owner && (
          <>
            {" · "}
            {t.kaubamargid_owner_label}{" "}
            <span className="text-foreground">{match.owner}</span>
          </>
        )}
      </p>
    </li>
  );
}

function StatusIcon({ status }: { status: KaubamargidResult["status"] }) {
  if (status === "available") return <span className="text-green-600 text-xl mt-0.5">✓</span>;
  if (status === "taken")     return <span className="text-red-500 text-xl mt-0.5">✗</span>;
  if (status === "similar")   return <span className="text-yellow-500 text-xl mt-0.5">⚠</span>;
  return <span className="text-gray-400 text-xl mt-0.5">?</span>;
}

function StatusBadge({
  status,
  t,
}: {
  status: KaubamargidResult["status"];
  t: ReturnType<typeof useLang>["t"];
}) {
  if (status === "available")
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t.badge_available}</Badge>;
  if (status === "taken")
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t.badge_taken}</Badge>;
  if (status === "similar")
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{t.badge_similar}</Badge>;
  return <Badge variant="secondary">{t.badge_error}</Badge>;
}

function LoadingRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground text-sm">
      <svg className="animate-spin h-4 w-4 text-[#065F46]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
