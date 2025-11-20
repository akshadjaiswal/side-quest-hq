"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <nav className="glass border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">💀</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              SideQuestHQ
            </span>
          </Link>

          {/* CTA Button */}
          <Link href="/login">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 glow-hover"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
