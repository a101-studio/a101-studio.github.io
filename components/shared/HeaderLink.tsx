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
        "text-xs tracking-[0.22em] uppercase text-white md:text-sm drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.85)] transition-colors duration-300 hover:text-white/80",
        className,
      )}
    >
      {children}
    </Link>
  );
}
