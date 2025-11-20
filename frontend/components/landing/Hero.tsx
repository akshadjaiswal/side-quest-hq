"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Github, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero() {
  return (
    <section className="relative container mx-auto px-4 lg:px-6 pt-16 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground-secondary">
              Built for Developers
            </span>
          </div>
        </motion.div>

        {/* Main Heading with Gradient Text */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
        >
          Your side projects deserve a home,
          <br />
          <span className="text-gradient font-bold">
            even the dead ones
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          A beautiful platform where developers catalog all their side projects
          - active, paused, abandoned, or shipped. Honor the attempts, learn
          from patterns, and give your ideas a second chance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 glow-hover flex items-center gap-2 justify-center group"
            >
              Start Tracking Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 glass rounded-xl font-semibold text-lg transition-all duration-200 border-2 border-border hover:border-primary hover:scale-105"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm"
        >
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-status-active" />
            <span className="text-foreground-secondary font-medium">
              <strong className="text-foreground font-semibold">Free & Open Source</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-status-active" />
            <span className="text-foreground-secondary font-medium">
              <strong className="text-foreground font-semibold">GitHub Integration</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-status-active" />
            <span className="text-foreground-secondary font-medium">
              <strong className="text-foreground font-semibold">Privacy First</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
