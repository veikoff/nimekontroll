"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/i18nContext";
import type { SocialResult, SocialCheck } from "@/app/api/check/social/route";

type LoadingState = "idle" | "loading" | "done";

interface Props {
  state: LoadingState;
  data: SocialResult | null;
  error: string | null;
}

const PLATFORM_ICONS: Record<string, string> = {
  Facebook: "📘",
  Instagram: "📸",
  LinkedIn: "💼",
  "X/Twitter": "🐦",
};

export function SocialSection({ state, data, error }: Props) {
  const { t } = useLang();
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-xl">📱</span>
          {t.social_title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {state === "loading" && <LoadingRow label={t.social_loading} />}
        {state === "done" && error && <ErrorRow message={error} />}
        {state === "done" && data && (
          <div className="space-y-3">
            {data.platforms.map((p) => (
              <PlatformRow key={p.platform} platform={p} t={t} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PlatformRow({
  platform,
  t,
}: {
  platform: SocialCheck;
  t: ReturnType<typeof useLang>["t"];
}) {
  const icon = PLATFORM_ICONS[platform.platform] ?? "🔗";
  return (
    <div className="flex items-center gap-3">
      <StatusIcon status={platform.status} />
      <div className="flex-1 min-w-0">
        <span className="font-medium text-sm">
          {icon} {platform.platform}
        </span>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:underline block truncate"
        >
          {platform.handle}
        </a>
      </div>
      <StatusBadge status={platform.status} t={t} />
    </div>
  );
}

function StatusIcon({ status }: { status: SocialCheck["status"] }) {
  if (status === "available")
    return <span className="text-green-600 text-lg">✓</span>;
  if (status === "taken")
    return <span className="text-red-500 text-lg">✗</span>;
  return <span className="text-gray-400 text-lg">?</span>;
}

function StatusBadge({
  status,
  t,
}: {
  status: SocialCheck["status"];
  t: ReturnType<typeof useLang>["t"];
}) {
  if (status === "available")
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">{t.badge_available}</Badge>;
  if (status === "taken")
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">{t.badge_taken}</Badge>;
  return <Badge variant="secondary" className="text-xs">{t.badge_unknown}</Badge>;
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
