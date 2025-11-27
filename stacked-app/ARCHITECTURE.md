# ARCHITECTURE.md — STACKED Technical Architecture

> Version 1.0 | Last Updated: November 2024

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Web App   │  │  Mobile Web │  │  Future PWA │              │
│  │  (Next.js)  │  │  (Responsive)│  │             │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       HOSTING (Vercel)                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Next.js 15 (App Router)                                │   │
│  │  - Server Components (default)                          │   │
│  │  - Client Components (interactive)                      │   │
│  │  - API Routes (minimal, mostly Supabase direct)        │   │
│  │  - Edge Middleware (auth checks)                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Supabase)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │     Auth     │  │   Storage    │          │
│  │   Database   │  │  (Phone OTP) │  │  (Future)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │  Realtime    │  │    Edge      │                            │
│  │ (Future)     │  │  Functions   │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Twilio    │  │    Plaid     │  │   Resend     │          │
│  │  (SMS OTP)   │  │ (V2 Verify)  │  │  (Emails)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

### Frontend
| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 15 | React framework with App Router |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | Custom + shadcn/ui | Reusable components |
| State | React Context | Simple global state |
| Forms | React Hook Form | Form handling |
| Validation | Zod | Schema validation |
| Icons | Lucide React | Icon library |

### Backend
| Layer | Technology | Purpose |
|-------|------------|---------|
| BaaS | Supabase | All-in-one backend |
| Database | PostgreSQL | Primary data store |
| Auth | Supabase Auth | Phone OTP authentication |
| API | Supabase Client | Direct database access |
| Edge Functions | Deno (Supabase) | Custom server logic |

### Infrastructure
| Layer | Technology | Purpose |
|-------|------------|---------|
| Hosting | Vercel | Frontend deployment |
| CDN | Vercel Edge Network | Static asset caching |
| DNS | Vercel/Cloudflare | Domain management |
| Monitoring | Vercel Analytics | Performance tracking |
| Error Tracking | Sentry (future) | Error monitoring |

### External Services
| Service | Provider | Purpose |
|---------|----------|---------|
| SMS | Twilio | OTP delivery |
| Email | Resend | Transactional emails |
| Verification | Plaid (V2) | Financial account linking |

---

## 3. Database Schema

### Tables

```sql
-- ============================================
-- PROFILES
-- Extends Supabase auth.users with app data
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT username_format CHECK (
    username ~ '^[a-z0-9_]{3,20}$'
  ),
  CONSTRAINT username_not_reserved CHECK (
    username NOT IN ('admin', 'stacked', 'support', 'help', 'api')
  )
);

-- Index for username lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);

-- ============================================
-- NET WORTH ENTRIES
-- Historical log of all net worth updates
-- ============================================
CREATE TABLE public.net_worth_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount_cents BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT amount_range CHECK (
    amount_cents BETWEEN -99999999999999 AND 99999999999999
  )
);

-- Index for user's history (most recent first)
CREATE INDEX idx_net_worth_user_date 
  ON public.net_worth_entries(user_id, created_at DESC);

-- ============================================
-- VIEWS
-- ============================================

-- Current net worth per user (latest entry)
CREATE VIEW public.current_net_worth AS
SELECT DISTINCT ON (user_id)
  user_id,
  amount_cents,
  created_at as last_updated
FROM public.net_worth_entries
ORDER BY user_id, created_at DESC;

-- Leaderboard with ranks
CREATE VIEW public.leaderboard AS
SELECT
  p.id as user_id,
  p.username,
  p.created_at as joined_at,
  cnw.amount_cents,
  cnw.last_updated,
  CASE 
    WHEN p.id IN (
      SELECT id FROM public.profiles 
      ORDER BY created_at LIMIT 1000
    ) THEN 'og'
    WHEN p.id IN (
      SELECT id FROM public.profiles 
      ORDER BY created_at LIMIT 5000
    ) THEN 'early'
    ELSE NULL
  END as tag,
  ROW_NUMBER() OVER (ORDER BY cnw.amount_cents DESC) as rank
FROM public.profiles p
JOIN public.current_net_worth cnw ON p.id = cnw.user_id;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.net_worth_entries ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read, only owner can update
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Net worth: Anyone can read, only owner can insert
CREATE POLICY "Net worth entries are viewable by everyone"
  ON public.net_worth_entries FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own net worth"
  ON public.net_worth_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Get user rank
CREATE FUNCTION public.get_user_rank(user_uuid UUID)
RETURNS INTEGER AS $$
  SELECT rank::INTEGER
  FROM public.leaderboard
  WHERE user_id = user_uuid;
$$ LANGUAGE SQL STABLE;

-- Check username availability
CREATE FUNCTION public.is_username_available(desired_username TEXT)
RETURNS BOOLEAN AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE LOWER(username) = LOWER(desired_username)
  );
$$ LANGUAGE SQL STABLE;

-- ============================================
-- TRIGGERS
-- ============================================

-- Update profile timestamp on change
CREATE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create profile on user signup
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Profile created separately during onboarding
  -- This trigger is placeholder for future auto-setup
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Entity Relationship Diagram

```
┌─────────────────────┐       ┌─────────────────────┐
│    auth.users       │       │      profiles       │
│  (Supabase Auth)    │       │                     │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │──────▶│ id (PK, FK)         │
│ phone               │       │ username            │
│ created_at          │       │ created_at          │
│ ...                 │       │ updated_at          │
└─────────────────────┘       └──────────┬──────────┘
                                         │
                                         │ 1:N
                                         ▼
                              ┌─────────────────────┐
                              │  net_worth_entries  │
                              ├─────────────────────┤
                              │ id (PK)             │
                              │ user_id (FK)        │
                              │ amount_cents        │
                              │ created_at          │
                              └─────────────────────┘
```

---

## 4. API Design

### Supabase Client Usage

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Key Operations

```typescript
// Authentication
await supabase.auth.signInWithOtp({ phone: '+1234567890' })
await supabase.auth.verifyOtp({ phone, token, type: 'sms' })
await supabase.auth.signOut()

// Profile
await supabase.from('profiles').insert({ id: userId, username })
await supabase.from('profiles').select().eq('username', username).single()

// Net Worth
await supabase.from('net_worth_entries').insert({ user_id, amount_cents })
await supabase.from('net_worth_entries')
  .select()
  .eq('user_id', userId)
  .order('created_at', { ascending: false })

// Leaderboard
await supabase.from('leaderboard')
  .select()
  .order('rank')
  .limit(100)

// Username check
await supabase.rpc('is_username_available', { desired_username: 'test' })
```

---

## 5. Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │     │  Next.js │     │ Supabase │     │  Twilio  │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ Enter phone    │                │                │
     │───────────────▶│                │                │
     │                │ signInWithOtp  │                │
     │                │───────────────▶│                │
     │                │                │ Send SMS       │
     │                │                │───────────────▶│
     │                │                │                │
     │                │      OK        │                │
     │                │◀───────────────│                │
     │  Show OTP UI   │                │                │
     │◀───────────────│                │                │
     │                │                │                │
     │ Enter OTP      │                │                │
     │───────────────▶│                │                │
     │                │  verifyOtp     │                │
     │                │───────────────▶│                │
     │                │                │                │
     │                │    Session     │                │
     │                │◀───────────────│                │
     │   Logged In    │                │                │
     │◀───────────────│                │                │
     │                │                │                │
```

---

## 6. Folder Structure

```
stacked/
├── .env.local                 # Environment variables
├── .env.example               # Template for env vars
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png          # Social share image
│   └── fonts/                # Self-hosted fonts (if any)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── loading.tsx       # Loading UI
│   │   ├── error.tsx         # Error UI
│   │   ├── not-found.tsx     # 404 page
│   │   ├── globals.css       # Global styles
│   │   │
│   │   ├── (auth)/           # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── join/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/      # Protected route group
│   │   │   ├── layout.tsx    # Auth check wrapper
│   │   │   └── me/
│   │   │       └── page.tsx
│   │   │
│   │   ├── u/
│   │   │   └── [username]/
│   │   │       └── page.tsx  # Public profile
│   │   │
│   │   └── (static)/         # Static pages group
│   │       ├── privacy/
│   │       │   └── page.tsx
│   │       ├── terms/
│   │       │   └── page.tsx
│   │       └── faq/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/               # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── user-menu.tsx
│   │   │
│   │   ├── leaderboard/      # Leaderboard feature
│   │   │   ├── table.tsx
│   │   │   ├── row.tsx
│   │   │   ├── sort-select.tsx
│   │   │   └── rank-badge.tsx
│   │   │
│   │   ├── profile/          # Profile feature
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   └── net-worth-display.tsx
│   │   │
│   │   └── auth/             # Auth feature
│   │       ├── phone-input.tsx
│   │       ├── otp-input.tsx
│   │       ├── username-input.tsx
│   │       └── net-worth-input.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts     # Browser client
│   │   │   ├── server.ts     # Server client
│   │   │   └── middleware.ts # Auth middleware
│   │   │
│   │   ├── utils/
│   │   │   ├── format.ts     # Number/date formatting
│   │   │   ├── validation.ts # Zod schemas
│   │   │   └── cn.ts         # Class name helper
│   │   │
│   │   └── constants.ts      # App constants
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-leaderboard.ts
│   │   └── use-profile.ts
│   │
│   ├── contexts/
│   │   └── auth-context.tsx
│   │
│   └── types/
│       ├── database.ts       # Supabase generated types
│       └── index.ts          # App types
│
├── supabase/
│   ├── config.toml           # Supabase local config
│   ├── seed.sql              # Seed data
│   └── migrations/
│       └── 001_initial.sql   # Initial schema
│
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── UI_DESIGN.md
    └── TODO.md
```

---

## 7. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=STACKED

# Feature flags (optional)
NEXT_PUBLIC_ENABLE_VERIFICATION=false
```

---

## 8. Deployment

### Vercel Deployment

```yaml
# vercel.json (if needed)
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### CI/CD Pipeline

```
Push to main → Vercel Build → Deploy Preview → Production
                    │
                    ├── Type Check (tsc)
                    ├── Lint (eslint)
                    └── Build (next build)
```

---

## 9. Security Considerations

### Authentication
- [x] Phone OTP (no passwords to steal)
- [x] Rate limiting on OTP requests
- [x] Short OTP expiry (5 min)
- [ ] Account lockout after failed attempts

### Data Protection
- [x] RLS policies on all tables
- [x] Phone numbers never exposed in API
- [x] HTTPS enforced
- [ ] Encrypt phone at rest (Supabase handles)

### Input Validation
- [x] Username format validation
- [x] Net worth range validation
- [x] Phone number normalization
- [x] Zod schemas on all inputs

---

## 10. Performance Optimizations

### Caching Strategy
- Leaderboard: Cache for 60s, revalidate on update
- Profiles: Cache for 5min, stale-while-revalidate
- Static pages: Full static generation

### Database
- Indexes on frequently queried columns
- Materialized view for leaderboard (if needed)
- Connection pooling via Supabase

### Frontend
- Server Components by default
- Client Components only for interactivity
- Image optimization via Next.js
- Font subsetting

---

## 11. Monitoring & Observability

### Metrics to Track
- Auth success/failure rate
- API response times
- Leaderboard query performance
- Error rates by endpoint

### Tools
- Vercel Analytics (performance)
- Supabase Dashboard (database)
- Sentry (errors, future)
- LogRocket (sessions, future)

---

## 12. Future Architecture Considerations

### Phase 2: Verification
- Add `verification_status` to profiles
- Add `verified_accounts` table for Plaid connections
- Edge function for Plaid webhook handling

### Phase 3: Scale
- Consider read replicas if needed
- CDN for leaderboard API
- WebSocket for real-time updates

### Phase 4: Mobile
- React Native app sharing Supabase backend
- Push notifications via Expo
