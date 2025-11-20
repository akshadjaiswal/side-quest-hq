"use client";

import { Github, Coffee } from "lucide-react";

// Custom X (Twitter) Icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border bg-background py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Row - Single Line, Centered */}
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm text-foreground-secondary">
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Coffee className="h-4 w-4 text-primary animate-bounce-subtle" />
            <span>and countless side quests</span>
          </div>

          <span className="text-foreground-tertiary hidden sm:inline">•</span>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/akshadjaiswal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/akshadjaiswal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </div>

          <span className="text-foreground-tertiary hidden sm:inline">•</span>

          <span className="text-xs">© {currentYear} SideQuestHQ</span>
        </div>

        {/* Bottom Row - Centered */}
        <div className="text-center text-xs text-foreground-tertiary mt-2">
          Built by{" "}
          <a
            href="https://github.com/akshadjaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground-secondary transition-colors"
          >
            Akshad
          </a>
        </div>
      </div>
    </footer>
  );
}
