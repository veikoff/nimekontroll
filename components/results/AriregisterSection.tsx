"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AriregisterResult } from "@/app/api/check/ariregister/route";

type LoadingState = "idle" | "loading" | "done";

interface Props {
  state: LoadingState;
  data: AriregisterResult | null;
  error: string | null;
}

export function AriregisterSection({ state, data, error }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          Eesti Äriregister
        </CardTitle>
      </CardHeader>
      <CardContent>
        {state === "loading" && <LoadingRow />}
        {state === "done" && error && <ErrorRow message={error} />}
        {state === "done" && data && (
          <div className="flex items-start gap-3">
            <StatusIcon status={data.status} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{data.message}</p>

              {data.matchedName && (
                <p className="text-xs text-muted-foreground mt-1">
                  Registris:{" "}
                  <span className="font-medium text-foreground">{data.matchedName}</span>
                </p>
              )}

              {data.conflictingNames && data.conflictingNames.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {data.conflictingNames.map((n) => (
                    <li key={n} className="text-xs text-muted-foreground">
                      • {n}
                    </li>
                  ))}
                </ul>
              )}

              {data.similar > 0 && data.status === "similar" && (
                <p className="text-xs text-muted-foreground mt-1">
                  {data.similar} sarnast nime äriregistris
                </p>
              )}
            </div>
            <div className="shrink-0">
              <StatusBadge status={data.status} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusIcon({ status }: { status: AriregisterResult["status"] }) {
  if (status === "available") return <span className="text-green-600 text-xl mt-0.5">✓</span>;
  if (status === "taken")    return <span className="text-red-500 text-xl mt-0.5">✗</span>;
  if (status === "conflict") return <span className="text-red-500 text-xl mt-0.5">✗</span>;
  if (status === "similar")  return <span className="text-yellow-500 text-xl mt-0.5">⚠</span>;
  return <span className="text-gray-400 text-xl mt-0.5">?</span>;
}

function StatusBadge({ status }: { status: AriregisterResult["status"] }) {
  if (status === "available")
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">VABA</Badge>;
  if (status === "taken")
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">VÕETUD</Badge>;
  if (status === "conflict")
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">KONFLIKT</Badge>;
  if (status === "similar")
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">SARNANE</Badge>;
  return <Badge variant="secondary">VIGA</Badge>;
}

function LoadingRow() {
  return (
    <div className="flex items-center gap-3 text-muted-foreground text-sm">
      <svg className="animate-spin h-4 w-4 text-[#065F46]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Kontrollin äriregistrit...
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
