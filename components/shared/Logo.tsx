import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  href?: string;
  className?: string;
  withBack?: boolean;
};

export function Logo({ href = "/", className, withBack = false }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white/80 transition-opacity duration-300 hover:text-white",
        className,
      )}
    >
      {withBack ? (
        <span aria-hidden className="text-base leading-none">
          ←
        </span>
      ) : null}
      <span>A101</span>
    </Link>
  );
}
