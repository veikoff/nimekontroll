import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ href = "/", size = "md" }: LogoProps) {
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const iconSize = size === "sm" ? "w-5 h-5 text-xs" : size === "lg" ? "w-8 h-8 text-base" : "w-6 h-6 text-sm";

  const content = (
    <span className="flex items-center gap-1.5">
      <span className={`${iconSize} bg-[#065F46] text-white rounded-md flex items-center justify-center font-bold shrink-0`}>
        ✓
      </span>
      <span className={`${textSize} font-bold tracking-tight`}>
        <span className="text-[#065F46]">nime</span>
        <span className="bg-[#065F46] text-white px-1 py-0.5 rounded-sm">kontroll</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
}
