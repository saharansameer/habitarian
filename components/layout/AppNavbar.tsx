"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextAlignJustify, X } from "lucide-react";
import { LogoutButton } from "../Auth/LogoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AppNavbarProps {
  authenticated: boolean;
}

const navItems = [
  { name: "Habits", link: "/habits" },
  { name: "Feed", link: "/feed" },
  { name: "Leaderboard", link: "/leaderboard" },
];

export function AppNavbar({ authenticated }: AppNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative w-full border-b rounded-2xl mt-2">
      <div className="mx-auto max-w-7xl px-3 py-2">
        {/* Logo */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center px-1 py-1">
            <Image src="/logo.png" alt="LOGO" width={24} height={24} />
            <span className="font-bold text-2xl text-foreground/80 mt-1">
              abitarian
            </span>
          </Link>

          {/* Nav items */}
          <div className="hidden lg:flex items-center justify-center gap-2">
            {navItems.map((item, idx) => (
              <Link
                key={`nav-${idx}`}
                href={item.link}
                className={cn(
                  "px-4 py-2 text-sm font-semibold text-muted-foreground transition-all ease-initial duration-200",
                  item.link === pathname
                    ? "text-foreground bg-muted rounded-2xl"
                    : "hover:text-foreground hover:bg-muted hover:rounded-2xl"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Sign in/out buttonn */}
          <div className="hidden lg:flex items-center gap-2">
            {authenticated ? (
              <Button variant="default" className="px-4 py-2">
                <LogoutButton />
              </Button>
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="default"
                  className="px-4 py-2 cursor-pointer font-semibold"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <TextAlignJustify className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full z-50 mx-2 mt-2 rounded-lg border bg-background p-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-${idx}`}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}

            {authenticated ? (
              <Button
                variant="default"
                className="w-full px-4 py-2 cursor-pointer font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <LogoutButton />
              </Button>
            ) : (
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                <Button
                  variant="default"
                  className="w-full px-4 py-2 cursor-pointer font-semibold"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
