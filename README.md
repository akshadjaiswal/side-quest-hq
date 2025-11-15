# SideQuestHQ 💀

> Your side projects deserve a home, even the dead ones.

A beautiful platform where developers catalog all their side projects - active, paused, abandoned, or shipped. Honor the attempts, learn from patterns, and give your ideas a second chance.

## Features

✅ **Project Management** - Add, edit, and track all your side projects with rich details
✅ **Status Tracking** - Active, Paused, Abandoned, or Shipped - be honest about where things stand
✅ **Graveyard View** - A special dark-themed view to honor your abandoned projects
✅ **GitHub Integration** - Import repos automatically with tech stack detection
✅ **Public Profiles** - Share your creative journey with a beautiful portfolio page
✅ **Search & Filter** - Find projects by status, tech stack, or keywords
✅ **Stats Dashboard** - Visualize your project distribution and most-used technologies

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS with warm neutral theme, shadcn/ui components
- **State Management**: Zustand + TanStack Query
- **Database & Auth**: Supabase (PostgreSQL + Auth + Storage)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- A GitHub OAuth app (for authentication and repo import)

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the SQL schema from `my_docs/mvp.md` in your Supabase SQL editor to create tables:
   - `user_profiles`
   - `side_projects`
   - `tech_tags`

3. Enable GitHub OAuth in Supabase:
   - Go to Authentication > Providers
   - Enable GitHub provider
   - Add your GitHub OAuth credentials

### 2. GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth app with:
   - Homepage URL: `http://localhost:3000` (or your domain)
   - Authorization callback URL: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
3. Copy the Client ID and Client Secret
4. Add them to your Supabase GitHub provider settings

### 3. Environment Setup

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 4. Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## Project Structure

```
frontend/
├── app/
│   ├── (auth)/               # Auth pages (login)
│   ├── (dashboard)/          # Protected dashboard pages
│   ├── @[username]/          # Public profile pages
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── dashboard/            # Dashboard-specific components
│   ├── projects/             # Project components (cards, forms, etc.)
│   ├── graveyard/            # Graveyard-themed components
│   └── github/               # GitHub integration UI
├── lib/
│   ├── supabase/             # Supabase client setup
│   ├── github/               # GitHub API wrapper
│   ├── utils/                # Utility functions
│   ├── validations/          # Zod schemas
│   └── design-tokens.ts      # Design system tokens
├── hooks/                    # React hooks (TanStack Query)
└── types/                    # TypeScript type definitions
```

## Key Features Guide

### Adding a Project

1. Click "Add Project" on the dashboard
2. Fill in project details (name, description, tech stack, etc.)
3. Set status (Active, Paused, Abandoned, Shipped)
4. Add optional fields like GitHub URL, progress %, learnings

### GitHub Import

1. Click "Import from GitHub"
2. Select repositories to import
3. Tech stack is auto-detected from `package.json`, `requirements.txt`, etc.
4. Choose default status for imported projects
5. Projects with no activity in 6+ months are suggested as "Paused"

### Graveyard View

- Navigate to "Graveyard" in sidebar
- See all abandoned projects in a special dark purple theme
- Each project displayed as a tombstone with "RIP" and dates
- Shows "Why I Stopped" and "What I Learned" prominently

### Public Profile

1. Go to Settings
2. Toggle "Public Profile" on
3. Customize bio, website, Twitter handle
4. Share your profile at `/@your_username`
5. Individual projects can be hidden from public view

## Design System

The app uses a **warm neutral color palette**:

- **Background**: Cream/beige tones (#FDFCFB, #F9F7F4)
- **Text**: Rich browns (#292524, #57534E)
- **Primary**: Warm amber (#D97706)
- **Graveyard Theme**: Deep purple with sepia overlay

## Database Schema

See `my_docs/mvp.md` for the complete database schema, including:
- Tables and relationships
- Row Level Security (RLS) policies
- Indexes for performance

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

Update your environment variables:
- `NEXT_PUBLIC_APP_URL` to your Vercel domain
- Update GitHub OAuth callback URL

## Contributing

This is a personal project, but feedback and suggestions are welcome! Open an issue or reach out.

## License

MIT

---

Built with ❤️ (and a lot of abandoned side projects)
