"use client";

import { Github, Twitter, Coffee } from "lucide-react";

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background-secondary/30 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Cute Message */}
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <span>Built with</span>
            <Coffee className="h-4 w-4 text-primary animate-bounce-subtle" />
            <span>and countless side quests</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akshadjaiswal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground-secondary hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/akshadjaiswal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
              className="text-foreground-secondary hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-foreground-tertiary">
            © {currentYear} SideQuestHQ
          </div>
        </div>

        {/* Built by */}
        <div className="mt-4 text-center text-xs text-foreground-tertiary">
          <a
            href="https://github.com/akshadjaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground-secondary transition-colors"
          >
            Built by <span className="font-medium">Akshad</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
