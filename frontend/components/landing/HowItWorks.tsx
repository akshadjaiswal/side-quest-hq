"use client";

import { motion } from "framer-motion";
import { Sparkles, LayoutGrid } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Sign In with GitHub",
    description:
      "Connect your GitHub account to get started. Import your existing repositories or start from scratch.",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    delay: 0.1,
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Add Your Projects",
    description:
      "Catalog your side projects with rich details, tech stacks, progress updates, and learnings from each attempt.",
    bgColor: "bg-status-active/10",
    textColor: "text-status-active",
    delay: 0.2,
  },
  {
    icon: <LayoutGrid className="h-8 w-8" />,
    title: "Share Your Portfolio",
    description:
      "Get a beautiful public profile to showcase your work. Share your journey with the world or keep it private.",
    bgColor: "bg-status-shipped/10",
    textColor: "text-status-shipped",
    delay: 0.3,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background-secondary/50 py-16 md:py-24 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-foreground-secondary font-normal">
              Get started in three simple steps
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: step.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center group"
              >
                <div
                  className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.number ? (
                    <span className={`text-3xl font-bold ${step.textColor}`}>
                      {step.number}
                    </span>
                  ) : (
                    <div className={step.textColor}>{step.icon}</div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed font-normal">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
