"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { policyNavigation } from "@/content/policy-navigation";

export function PolicyMenu() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const focusFirst = useRef(false);
  useEffect(() => setExpanded(false), [pathname]);
  useEffect(() => {
    if (!expanded) return;
    if (focusFirst.current) {
      root.current
        ?.querySelector<HTMLAnchorElement>(".policy-dropdown a")
        ?.focus();
      focusFirst.current = false;
    }
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [expanded]);

  return (
    <div
      ref={root}
      className={`policy-menu ${pathname.startsWith("/policies/") ? "is-current" : ""}`}
      onMouseEnter={() => {
        if (window.matchMedia("(min-width: 1101px) and (hover: hover)").matches)
          setExpanded(true);
      }}
      onMouseLeave={() => {
        if (!root.current?.contains(document.activeElement)) setExpanded(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setExpanded(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setExpanded(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="policy-trigger"
        aria-expanded={expanded}
        aria-controls="policy-dropdown"
        onClick={() =>
          setExpanded((current) =>
            window.matchMedia("(min-width: 1101px) and (hover: hover)").matches
              ? true
              : !current,
          )
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (expanded)
              root.current
                ?.querySelector<HTMLAnchorElement>(".policy-dropdown a")
                ?.focus();
            else {
              focusFirst.current = true;
              setExpanded(true);
            }
          }
        }}
      >
        นโยบายบริษัท <ChevronDown size={14} />
      </button>
      <div className="policy-dropdown" id="policy-dropdown" hidden={!expanded}>
        <Link
          className="policy-overview-link"
          href="/policies/"
          onClick={() => setExpanded(false)}
        >
          นโยบายบริษัททั้งหมด <ArrowUpRight size={15} />
        </Link>
        {policyNavigation.map((policy) => (
          <Link
            key={policy.slug}
            href={policy.href}
            aria-current={pathname === policy.href ? "page" : undefined}
            onClick={() => setExpanded(false)}
          >
            {policy.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
