// Form validation schemas using Zod
import { z } from 'zod'

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name must be less than 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),

  status: z.enum(['active', 'paused', 'abandoned', 'shipped'], {
    required_error: 'Please select a status',
  }),

  tech_stack: z
    .array(z.string())
    .min(1, 'Add at least one technology')
    .max(10, 'Maximum 10 technologies allowed'),

  started_date: z.string().optional(),

  last_worked_date: z.string().optional(),

  why_stopped: z
    .string()
    .max(300, 'Must be less than 300 characters')
    .optional(),

  what_learned: z
    .string()
    .max(500, 'Must be less than 500 characters')
    .optional(),

  github_url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  live_url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  progress_percentage: z
    .number()
    .min(0, 'Progress must be between 0 and 100')
    .max(100, 'Progress must be between 0 and 100')
    .optional()
    .default(0),

  is_public: z.boolean().optional().default(true),
})

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),

  bio: z
    .string()
    .max(200, 'Bio must be less than 200 characters')
    .optional(),

  website_url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  twitter_handle: z
    .string()
    .max(15, 'Twitter handle must be less than 15 characters')
    .regex(/^@?[a-zA-Z0-9_]+$/, 'Invalid Twitter handle')
    .optional()
    .or(z.literal('')),

  is_profile_public: z.boolean().default(true),
})

export const githubImportSchema = z.object({
  repo_ids: z
    .array(z.number())
    .min(1, 'Select at least one repository'),

  default_status: z.enum(['active', 'paused', 'abandoned', 'shipped']),

  make_public: z.boolean().default(true),
})

export type ProjectFormData = {
  name: string
  description: string
  status: 'active' | 'paused' | 'abandoned' | 'shipped'
  tech_stack: string[]
  started_date?: string
  last_worked_date?: string
  why_stopped?: string
  what_learned?: string
  github_url?: string
  live_url?: string
  progress_percentage: number
  is_public: boolean
}

export type ProfileFormData = z.infer<typeof profileFormSchema>
export type GitHubImportData = z.infer<typeof githubImportSchema>
