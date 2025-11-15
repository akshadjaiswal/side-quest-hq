// Core type definitions for SideQuestHQ

export type ProjectStatus = 'active' | 'paused' | 'abandoned' | 'shipped'

export interface UserProfile {
  id: string
  github_id: number | null
  username: string
  email: string | null
  avatar_url: string | null
  bio: string | null
  website_url: string | null
  twitter_handle: string | null
  is_profile_public: boolean
  created_at: string
  updated_at: string
}

export interface SideProject {
  id: string
  user_id: string
  name: string
  slug: string
  description: string
  status: ProjectStatus
  tech_stack: string[]
  started_date: string | null
  last_worked_date: string | null
  abandoned_date: string | null
  shipped_date: string | null
  why_stopped: string | null
  what_learned: string | null
  github_url: string | null
  live_url: string | null
  cover_image_url: string | null
  progress_percentage: number
  github_repo_id: number | null
  is_from_github: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface TechTag {
  id: string
  name: string
  category: 'framework' | 'language' | 'database' | 'tool' | null
  usage_count: number
  created_at: string
}

export interface ProjectStats {
  total: number
  active: number
  paused: number
  abandoned: number
  shipped: number
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  language: string | null
  topics: string[]
  archived: boolean
  private: boolean
}

// Form types
export interface ProjectFormData {
  name: string
  description: string
  status: ProjectStatus
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

export interface ProfileFormData {
  username: string
  bio?: string
  website_url?: string
  twitter_handle?: string
  is_profile_public: boolean
}

// API response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}
