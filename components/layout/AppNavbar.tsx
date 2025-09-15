"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { LogoutButton } from "../Auth/LogoutButton";

interface AppNavbarProps {
  authenticated: boolean;
}

export function AppNavbar({ authenticated }: AppNavbarProps) {
  const navItems = [
    {
      name: "Habits",
      link: "/habits",
    },
    {
      name: "Feed",
      link: "/feed",
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="relative w-full border border-b rounded-2xl mt-2 shadow-2xs">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {authenticated ? (
              <NavbarButton variant="dark">
                <LogoutButton />
              </NavbarButton>
            ) : (
              <NavbarButton href="/sign-in" variant="dark" className="px-4 py-2">
                Sign in
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-muted-foreground hover:text-foreground"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            {authenticated ? (
              <NavbarButton variant="dark">
                <LogoutButton />
              </NavbarButton>
            ) : (
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="dark"
                  className="w-full px-4 py-2"
                >
                  Sign in
                </NavbarButton>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </nav>
  );
}
