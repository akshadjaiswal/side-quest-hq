# SideQuestHQ – Memorialize Every Idea

[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)  [![React 19](https://img.shields.io/badge/React-19-149ECA?style=flat&logo=react&logoColor=white)](https://react.dev/)  [![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)  [![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)

**SideQuestHQ** is a warm, story-driven platform that helps builders track every side project—launched, paused, abandoned, or shipped. It combines a beautiful dashboard, sepia-tinted graveyard mode, and public portfolio profiles so makers can **celebrate progress**, **learn from patterns**, and **honor every idea**.

> Not every project ships. Every project still matters. 🕯️

---

## 🚨 Latest Updates

- **🕯️ Graveyard Mode** — Tombstone cards with *Why I Stopped* and *What I Learned*
- **🔌 GitHub Smart Import** — Auto-detected tech stacks from package.json, requirements.txt, etc.
- **🌐 Portfolio Profiles** — Public portfolio pages at `/username`
- **🔒 Secure API Architecture** — All data flows through Next.js API routes (DB URLs hidden from client)
- **⚡ Smart Dashboard Updates** — Optimistic updates + automatic refresh after edit/create/delete
- **🔐 Custom JWT Authentication** — Secure cookie-based sessions with GitHub OAuth

---

## ✨ Features

### 🎯 Core Features

#### 🗃️ Project Library
- Rich card layout with tech stack, description, and progress percentage
- Statuses: **Active**, **Paused**, **Shipped**, **Abandoned**
- Search and filter by status or tech stack
- Sort options for organization

#### 🕯️ Graveyard Mode
- Sepia-toned memorial board for abandoned projects
- Animated tombstone cards
- Fields for **Why I Stopped** and **What I Learned**
- Dedicated graveyard view with dark theme

#### 🔌 GitHub Smart Import
- OAuth login with GitHub
- Automatic tech stack detection from:
  - package.json (Node.js projects)
  - requirements.txt (Python)
  - go.mod, Cargo.toml, and more
- Import multiple repositories at once
- Auto-suggest "abandoned" status for inactive repos (6+ months)

#### 🌐 Public Portfolio Profiles
- Clean portfolio layout at `/username`
- Maker bio and project showcase
- Public/private controls per project
- Stats overview (total, active, paused, shipped, graveyard)
- Filter projects by status on public profile

#### 📈 Project Stats
- Status breakdown with counts
- Tech stack frequency analysis
- Visual stats overview on dashboard
- Per-project progress tracking

---

## 🚀 Technical Highlights

### Architecture
- **Next.js 15 App Router** with TypeScript
- **Secure API Layer** — All database operations through Next.js API routes
- **Custom JWT Sessions** — Cookie-based authentication with jose
- **Optimistic Updates** — Instant UI feedback with automatic data refresh
- **Smart Landing Page** — Auth-aware navigation (login vs dashboard)

### Tech Stack
- Supabase for database, storage, and OAuth provider
- TanStack Query v5 for server state management
- React Hook Form + Zod for type-safe forms
- shadcn/ui component library (20+ components)
- Framer Motion for animations
- Tailwind CSS with custom warm neutral theme

### Security & Performance
- Database URLs hidden from client (API proxy layer)
- Row Level Security (RLS) policies on Supabase
- Middleware-based route protection
- Force refetch ensures dashboard always shows fresh data
- No direct client-side Supabase queries

---

## 🎨 Design & UX

### Theme & Identity
- Warm cream + amber palette with rich brown text
- Sepia overlays and deep purple accents for graveyard
- Inter font (sans-serif) with JetBrains Mono for code

### Micro-interactions
- Animated status badges with hover states
- Smooth page transitions
- Loading states with skeleton screens
- Toast notifications for user feedback

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Clear visual hierarchy

---

## 🧭 User Flow

1. **Sign in** with GitHub OAuth
2. **Import projects** from GitHub or add manually
3. **Track progress** with status updates and notes
4. **Move to graveyard** when abandoning, with context
5. **Reflect and document** what you learned
6. **Publish** your public portfolio at `/username`
7. **Edit and update** projects as they evolve

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI | Tailwind CSS + shadcn/ui |
| State | TanStack Query v5 |
| Backend | Next.js API Routes + Supabase |
| Database | Supabase (PostgreSQL) |
| Auth | Custom JWT + GitHub OAuth |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/akshadjaiswal/sidequesthq.git
cd sidequesthq/frontend
npm install
```

### 2. Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=your-random-secret-key
```

### 3. Set Up Supabase
1. Create a Supabase project
2. Run the SQL schema from `my_docs/mvp.md`
3. Enable GitHub OAuth in Supabase Auth settings
4. Configure RLS policies

### 4. Run Dev Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (auth)/login/          # GitHub OAuth login
│   ├── (dashboard)/           # Protected routes
│   │   ├── dashboard/         # Main project gallery
│   │   ├── graveyard/         # Abandoned projects view
│   │   ├── projects/[id]/     # Project detail & edit
│   │   └── settings/          # User settings
│   ├── [username]/            # Public profile
│   ├── api/                   # API routes
│   │   ├── auth/              # Session management
│   │   ├── projects/          # Project CRUD
│   │   └── stats/             # Profile stats
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Dashboard components
│   ├── projects/              # Project components
│   ├── graveyard/             # Graveyard components
│   ├── github/                # GitHub import
│   ├── landing/               # Landing page
│   └── ui/                    # shadcn/ui components
├── hooks/
│   ├── use-projects.ts        # Project data hooks
│   ├── use-session.ts         # Auth session hook
│   └── use-auth-redirect.ts   # Smart navigation
├── lib/
│   ├── auth/                  # JWT session management
│   ├── supabase/              # Supabase clients & API wrappers
│   └── validations/           # Zod schemas
└── types/                     # TypeScript types
```

---

## 🔍 How It Works

### Secure API Architecture
```
Client Component
    ↓
TanStack Query Hook
    ↓
Fetch API Call (/api/projects)
    ↓
Next.js API Route
    ↓
Verify JWT Session
    ↓
Server-side Supabase Client
    ↓
PostgreSQL Database
```

### GitHub Import Flow
1. User authenticates with GitHub OAuth
2. App fetches user's repositories
3. Automatically detects tech stack from repo files
4. Suggests status based on last commit date
5. User selects repos to import
6. Projects created in database

### Graveyard Rendering
- Filter projects with "abandoned" status
- Apply sepia theme with dark purple accents
- Display tombstone-style cards
- Show reflection fields (Why stopped, What learned)

---

## 📦 Deployment

### Via Vercel (Recommended)
1. Push repo to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Post-Deployment
1. Update GitHub OAuth callback URL to production domain
2. Update `NEXT_PUBLIC_APP_URL` in environment variables
3. Test authentication flow
4. Enable ISR for public profiles (optional)

---

## 🤝 Contributing

PRs welcome!

**Guidelines**:
- Use TypeScript for all new code
- Follow existing code style (Prettier + ESLint)
- Test thoroughly before submitting
- Write clear commit messages
- Update documentation as needed

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 💬 Support

- **Bugs** → [Open an issue](https://github.com/akshadjaiswal/sidequesthq/issues)
- **Ideas** → [Start a discussion](https://github.com/akshadjaiswal/sidequesthq/discussions)


---

<div align="center">

**Made with ❤️ by Akshad Jaiswal**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akshadjaiswal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/akshadsantoshjaiswal)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/akshad_999)

**⭐ Star this repo if you find it useful!**

</div>
