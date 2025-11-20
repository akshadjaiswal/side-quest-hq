'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GithubIcon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGithubLogin = () => {
    setIsLoading(true)
    window.location.href = '/api/auth/github'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh */}
        <div className="gradient-mesh" />

        {/* Dot Pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Floating Orbs */}
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 floating-orb"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute bottom-32 left-10 w-80 h-80 rounded-full opacity-20 floating-orb-slow"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md glass border border-border/50">
          <CardHeader className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl"
              >
                💀
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome to <span className="text-gradient">SideQuestHQ</span>
              </CardTitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardDescription className="text-foreground-secondary text-base">
                Your side projects deserve a home, even the dead ones.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-6 text-lg glow-hover group transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <GithubIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                    Continue with GitHub
                  </>
                )}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-sm text-center text-foreground-tertiary"
            >
              By continuing, you agree to catalog all your side projects,
              <br />
              including the abandoned ones.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
