"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { cn } from "@/lib/utils";
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          Home
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Blog">
          Blog
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Login">
          Login
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/pricing">Starter</HoveredLink>
            <HoveredLink href="/pricing">Creator</HoveredLink>
            <HoveredLink href="/pricing">Studio</HoveredLink>
          </div>
        </MenuItem>
        {/* Mode Toggle */}
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </Menu>
    </div>
  );
}
