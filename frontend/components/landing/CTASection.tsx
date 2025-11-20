"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #D97706 0%, #EA580C 50%, #B45309 100%)',
        }}
      >
        {/* Animated background orb */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 15s ease-in-out infinite'
          }}
        />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Honor Your Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90 font-normal">
            Join developers who are proud of their creative attempts, successes,
            and failures
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="inline-flex items-center gap-2 px-10 py-6 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-background-secondary transition-all duration-200 hover:shadow-xl hover:scale-105 group"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-white/70 font-normal">
            Free forever • No credit card required • 2 minute setup
          </p>
        </div>
      </motion.div>
    </section>
  );
}
