"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      className="glass rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group"
    >
      <div
        className={`w-14 h-14 ${iconBgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-foreground-secondary leading-relaxed font-normal">
        {description}
      </p>
    </motion.div>
  );
}
