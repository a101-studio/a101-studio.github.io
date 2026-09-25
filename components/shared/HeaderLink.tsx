import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeaderLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function HeaderLink({ href, children, className }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[10px] tracking-[0.32em] uppercase text-white/70 drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.55)] transition-colors duration-300 hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
