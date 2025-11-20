"use client";

import { motion } from "framer-motion";
import { BookMarked, Github, LayoutGrid, Lock, BarChart3 } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <BookMarked className="h-7 w-7" />,
    title: "Catalog Everything",
    description:
      "Add all your side projects with rich details - tech stack, dates, learnings, and why you stopped. Keep track of your creative journey.",
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
    delay: 0.1,
  },
  {
    icon: <span className="text-3xl">⚰️</span>,
    title: "Honor the Graveyard",
    description:
      "A special view for abandoned projects that turns your graveyard into a badge of honor, not shame. Learn from what didn't work.",
    iconBgColor: "bg-graveyard-accent/10",
    iconColor: "text-graveyard-accent",
    delay: 0.2,
  },
  {
    icon: <Github className="h-7 w-7" />,
    title: "GitHub Integration",
    description:
      "Import repos automatically, detect tech stacks, and keep everything in sync with your GitHub profile. One-click setup.",
    iconBgColor: "bg-status-active/10",
    iconColor: "text-status-active",
    delay: 0.3,
  },
  {
    icon: <LayoutGrid className="h-7 w-7" />,
    title: "Public Portfolio",
    description:
      "Share your projects with a beautiful public profile. Perfect for showcasing your work to potential employers or collaborators.",
    iconBgColor: "bg-status-shipped/10",
    iconColor: "text-status-shipped",
    delay: 0.4,
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: "Project Insights",
    description:
      "Track your project statistics, completion rates, and technology usage. Understand your patterns and improve over time.",
    iconBgColor: "bg-status-paused/10",
    iconColor: "text-status-paused",
    delay: 0.5,
  },
  {
    icon: <Lock className="h-7 w-7" />,
    title: "Privacy Controls",
    description:
      "Full control over what's public and what's private. Keep sensitive projects hidden while sharing your best work.",
    iconBgColor: "bg-status-abandoned/10",
    iconColor: "text-status-abandoned",
    delay: 0.6,
  },
];

export function Features() {
  return (
    <section id="features" className="relative container mx-auto px-4 lg:px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose SideQuestHQ?
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto font-normal">
            Everything you need to catalog, honor, and learn from your side
            projects
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
