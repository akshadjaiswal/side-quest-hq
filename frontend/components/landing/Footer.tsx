"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background-secondary/50 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">💀</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  SideQuestHQ
                </span>
              </div>
              <p className="text-foreground-secondary leading-relaxed font-normal">
                Your side projects deserve a home, even the dead ones. Catalog,
                honor, and learn from every attempt.
              </p>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-foreground-secondary font-normal">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/graveyard"
                    className="hover:text-primary transition-colors"
                  >
                    Graveyard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-primary transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-foreground-secondary font-normal">
                <li>
                  <a
                    href="https://github.com/akshadjaiswal/side-quest-hq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border pt-8 text-center text-foreground-secondary font-normal">
            <p className="mb-2">
              &copy; 2025 SideQuestHQ. All rights reserved.
            </p>
            <p className="text-sm mb-2">
              Built with ❤️ by{" "}
              <a
                href="https://github.com/akshadjaiswal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Akshad on GitHub"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Akshad</span>
              </a>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://github.com/akshadjaiswal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-foreground-secondary hover:text-primary transition-colors hover:scale-110 transform duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/akshadjaiswal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="text-foreground-secondary hover:text-primary transition-colors hover:scale-110 transform duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
