# SideQuestHQ – Memorialize Every Idea

[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)  [![React 19](https://img.shields.io/badge/React-19-149ECA?style=flat&logo=react&logoColor=white)](https://react.dev/)  [![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)  [![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)

**SideQuestHQ** is a warm, story-driven platform that helps builders track every side project—launched, paused, abandoned, or shipped. It combines a beautiful dashboard, sepia-tinted graveyard mode, and public portfolio profiles so makers can **celebrate progress**, **learn from patterns**, and **honor every idea**.

> Not every project ships. Every project still matters. 🕯️

---

## 🚨 Latest Updates

- **🕯️ Graveyard** — Tombstone cards with *Why I Stopped*, *What I Learned*, and date markers  
- **📊 Quest Stats Board** — Distribution rings, usage heatmaps, and update streaks  
- **🔌 GitHub Smart Import** — Auto-detected stacks & inactivity-based status suggestions  
- **🌐 Portfolio Profiles** — `/@username` public portfolio pages  
- **🧠 Pattern Prompts** — Reflective nudges (e.g., “What blocked you?”)  
- **⚡ Dashboard Performance Boost** — Zustand + TanStack Query refactor  
- **🎨 Mobile Graveyard Layout** — Animated, responsive tombstone grid

---

## ✨ Features

### 🎯 Core Features

#### 🗃️ Project Library
- Rich card layout with stack, tags, notes, screenshots, links  
- Statuses: **Active**, **Paused**, **Shipped**, **Abandoned**  
- Auto-highlights stale or neglected quests

#### 🕯️ Graveyard Mode
- Sepia-toned memorial board  
- Animated tombstone cards  
- Fields for **Why I Stopped**, **What I Learned**, **Resurrection Path**

#### 🔌 GitHub Smart Import
- OAuth login  
- Repo scanner + auto tech stack detection  
- Prefills quest data and suggests statuses from commit activity

#### 🌐 Public Portfolio Profiles
- Maker bio + highlight reel  
- Public/hidden controls per quest  
- Clean storytelling layout at `/@username`

#### 📈 Insightful Stats
- Status breakdown + stack frequency  
- Update streaks and revival suggestions  
- Badges for “revival-worthy ideas”

---

## 🚀 Technical Highlights

- Next.js 15 App Router + Server Actions  
- Supabase for auth, database, storage, and RLS  
- Zustand + TanStack Query data layer  
- GitHub OAuth integration with repo scanning helpers  
- Framer Motion-driven UI polish  
- React Hook Form + Zod type-safe forms  
- Responsive Tailwind CSS design  
- Optimistic updates with query caching

---

## 🎨 Design & UX

### Theme & Identity
- Warm cream + caramel palette, sepia overlays, deep violet graveyard accents  
- Serif titles paired with modern sans-serif body copy

### Micro-interactions
- Animated status pills & hover states  
- Tombstones rising on scroll  
- Confetti when a quest ships

### Accessibility
- WCAG-friendly contrasts  
- Large tap targets  
- ARIA/semantic structure and descriptive copy (“RIP Project Name, paused since 2024”)

---

## 🧭 User Flow

1. Capture or import a quest  
2. Add updates, tags, screenshots, notes  
3. Pause or abandon gracefully with context  
4. Reflect and document learnings  
5. Publish your `/@username` portfolio  
6. Return when inspiration strikes again

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| Framework | Next.js 15 |
| Language | TypeScript 5 |
| UI | Tailwind CSS + shadcn/ui |
| State | Zustand + TanStack Query |
| Backend | Supabase (Postgres, Storage, Auth) |
| Auth | Supabase Auth + GitHub OAuth |
| Animations | Framer Motion |
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
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=your-session-secret
```

### 3. Run Dev Server
```bash
npm run dev
```

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── @[username]/
│   └── api/
├── components/
│   ├── dashboard/
│   ├── projects/
│   ├── graveyard/
│   ├── github/
│   └── ui/
├── lib/
├── hooks/
└── types/
```

---

## 🔍 How It Works

### Quest Lifecycle Engine
- Status logic, neglect detection, optimistic updates

### GitHub Import Engine
- OAuth flow, repo scanning, stack fingerprinting, activity-based status inference

### Graveyard Rendering
- Tombstone generator, sepia filters, motion transitions

### Stats Engine
- Tech usage aggregation, update streaks, revival scoring

---

## 📦 Deployment

### Via Vercel
1. Push the repo  
2. Add environment variables  
3. Deploy with one click

### Supabase Setup
1. Enable RLS policies  
2. Configure storage buckets  
3. Apply SQL policies + tables (see `my_docs/`)

---

## 🤝 Contributing

PRs welcome!  
Follow:
- Conventional commits  
- Prettier + ESLint  
- Type-safe changes only

---

## 📜 License

MIT License.

---


## 💬 Support

- **Bugs** → [Open an issue](https://github.com/akshadjaiswal/sidequesthq/issues)
- **Ideas** → [Start a discussion](https://github.com/akshadjaiswal/sidequesthq/discussions)
- **Questions** → Check out the docs in `my_docs/`

---

<div align="center">

**Made with ❤️ by Akshad Jaiswal**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akshadjaiswal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/akshadsantoshjaiswal)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/akshad_999)

**⭐ Star this repo if you find it useful!**

</div>
