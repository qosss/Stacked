# PRD.md — STACKED: Net Worth Leaderboard

> Version 1.1 | Last Updated: November 2024

---

## 1. Product Overview

### What is STACKED?

STACKED is a web-first application that displays a global public leaderboard of **exact, self-reported net worth** values. Users claim a permanent username, post their net worth (down to the cent), and see where they rank globally.

### Tagline
> "Show Your Stack"

### Tone & Positioning
- **Serious but bold** — Not a joke, but has swagger
- **Bank-grade trust** — Clean, minimal, secure feeling
- **New money energy** — Appeals to founders, crypto, FIRE community
- **Slightly provocative** — Public wealth flex, but tasteful

---

## 2. Goals

### Primary Goals (MVP)
1. **Simple public leaderboard** — Top users with exact net worth, rank, and freshness
2. **Low-friction onboarding** — Phone OTP → username → net worth → on the board
3. **Identity scarcity** — One permanent username per account creates urgency
4. **Trust foundation** — Clear messaging about self-reported data

### Secondary Goals (Post-MVP)
5. **Verification system** — Read-only financial connections (Plaid, Teller)
6. **Monetization foundation** — Gated clubs, enhanced profiles, sponsorships

### Non-Goals (MVP)
- ❌ Budgeting or expense tracking
- ❌ Social features (comments, likes, DMs)
- ❌ Username changes (self-service)
- ❌ Manual verification queue
- ❌ Native mobile apps (web-first, responsive)

---

## 3. Target Users

### Primary: The "Money-Pilled"
- **Founders & builders** — Want to flex progress publicly
- **Finance/crypto community** — Care about exact numbers
- **FIRE movement** — Track and share net worth milestones
- **Competitive types** — Gamification of wealth building

### Secondary: Observers
- Curious browsers checking the leaderboard
- Journalists/researchers studying wealth distribution
- People considering joining

### User Personas

**"Crypto Chad"** — 28, sold a startup, wants clout
- Posts $12M net worth
- Updates frequently after trades
- Wants verification badge ASAP

**"Frugal Fiona"** — 34, software engineer, FIRE journey
- Posts $890K net worth  
- Updates quarterly
- Appreciates the accountability

**"Debt Dan"** — 26, recent grad, -$84K
- Posts negative net worth
- Finds community in shared struggle
- Motivated by seeing progress

---

## 4. User Flows

### 4.1 Anonymous Visitor
```
Homepage → View leaderboard → Click user → Profile modal
                           → Click "Join" → Join flow
                           → Click "Log in" → Login flow
```

### 4.2 New User (Join)
```
Join button → Phone input → OTP verify → Choose username → Enter net worth → Homepage (logged in)
```

**Username Step Details:**
- Real-time availability check
- Format: lowercase, 3-20 chars, `[a-z0-9_]`
- Warning: "Usernames are permanent and cannot be changed"
- Confirmation required

**Net Worth Step Details:**
- Single numeric input
- USD only (MVP)
- Allows negative values (debt)
- Exact cents precision
- Max: $999,999,999,999.99

### 4.3 Returning User (Login)
```
Log in button → Phone input → OTP verify → Homepage (logged in with banner)
```

### 4.4 Logged-in User (Update)
```
Homepage → "Update Net Worth" button → Modal → Enter new value → Save → Updated rank
          User dropdown → Update Net Worth → Same modal
          User dropdown → View Profile → /u/username
          User dropdown → Log out → Homepage (logged out)
```

### 4.5 View Profile
```
Click username (table or modal) → /u/[username]
Direct URL → /u/[username]
```

---

## 5. Feature Requirements

### 5.1 Leaderboard

| Requirement | Details |
|-------------|---------|
| Sorting | Default: Net Worth (desc). Options: Last Updated, Newest |
| Columns | Rank, User (avatar + name + tags), Net Worth, Status |
| Pagination | Top 100 for MVP (infinite scroll later) |
| Refresh | Manual refresh button or auto-refresh on focus |
| Your Row | Highlighted with border + "YOU" badge when logged in |

**Row Display:**
- Rank: #1, #2, #3 get gold/silver/bronze colors
- Avatar: Circle with first letter, lime accent
- Username: @prefixed, lime on hover
- Tags: "OG" (first 1000), "EARLY" (1001-5000)
- Net Worth: Formatted with commas, cents muted
- Status: "Unverified" (MVP), "Verified" (V2)

### 5.2 Authentication

| Requirement | Details |
|-------------|---------|
| Method | Phone OTP only (no passwords) |
| OTP Length | 6 digits |
| OTP Expiry | 5 minutes |
| Rate Limiting | Max 3 OTP requests per phone per hour |
| Session | 30-day persistent, refresh on activity |

**Phone Handling:**
- Normalize to E.164 format
- Support international numbers
- Display formatted in UI

### 5.3 Username

| Requirement | Details |
|-------------|---------|
| Format | Lowercase, `[a-z0-9_]` only |
| Length | 3-20 characters |
| Uniqueness | Global, case-insensitive |
| Permanence | Cannot be changed by user |
| Reserved | Block common obscenities, "admin", "stacked", etc. |

### 5.4 Net Worth Entry

| Requirement | Details |
|-------------|---------|
| Storage | Integer cents (avoids floating point) |
| Range | -$999,999,999,999.99 to +$999,999,999,999.99 |
| Currency | USD only (MVP) |
| History | Every update creates new row |
| "Current" | Latest entry is displayed |

### 5.5 Public Profile (`/u/[username]`)

**Displayed:**
- Username with @ prefix
- Avatar (letter-based)
- Tags (OG, Early)
- Exact net worth
- Current rank
- Last updated (relative time)
- Verification status

**Not Displayed:**
- Phone number (always private)
- Full history (MVP)
- Connected accounts

### 5.6 Account Dashboard (`/me`)

**Displayed:**
- Username (read-only)
- Current net worth
- Current rank
- Last updated
- "Update Net Worth" action
- Simple history list (date + amount)

**Future:**
- Connect accounts for verification
- Export data
- Delete account

---

## 6. Pages Inventory

| Route | Auth | Description |
|-------|------|-------------|
| `/` | Public | Homepage with leaderboard |
| `/login` | Public | Login flow (redirects if logged in) |
| `/join` | Public | Signup flow (redirects if logged in) |
| `/me` | Private | Account dashboard |
| `/u/[username]` | Public | Public profile page |
| `/privacy` | Public | Privacy policy |
| `/terms` | Public | Terms of service |
| `/faq` | Public | Frequently asked questions |

---

## 7. Non-Functional Requirements

### Performance
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Leaderboard load: < 500ms (cached)

### Security
- HTTPS only
- OTP codes hashed at rest
- Phone numbers encrypted
- Rate limiting on all auth endpoints
- CSRF protection

### Privacy
- Phone number never exposed
- Only username + net worth + timestamp public
- Clear privacy policy
- GDPR-ready data export (future)

### Availability
- 99.5% uptime target
- Graceful degradation (show cached leaderboard)

---

## 8. Success Metrics

### Launch Metrics (First 30 Days)
- [ ] 1,000 registered users
- [ ] 500 users with net worth posted
- [ ] 10,000 unique visitors
- [ ] < 5% error rate on auth flow

### Engagement Metrics
- Net worth update frequency (target: monthly)
- Return visit rate (target: 40% weekly)
- Profile view rate
- Time on site

### Growth Metrics
- Viral coefficient (users inviting others)
- Organic search traffic
- Social mentions

---

## 9. Roadmap

### Phase 0: MVP (This Build)
- [x] Design mockup
- [ ] Next.js + Supabase setup
- [ ] Phone OTP authentication
- [ ] Username registration
- [ ] Net worth entry
- [ ] Public leaderboard
- [ ] Public profiles
- [ ] Static pages (privacy, terms, FAQ)

### Phase 1: Polish & Launch
- [ ] Email notifications (weekly rank updates)
- [ ] Share profile cards (OG images)
- [ ] PWA support
- [ ] Analytics integration
- [ ] Error monitoring

### Phase 2: Verification
- [ ] Plaid/Teller integration
- [ ] Verification badges
- [ ] Verified vs self-reported filtering
- [ ] Badge tiers based on verified amount

### Phase 3: Social & Monetization
- [ ] Following/followers
- [ ] Gated clubs ($1M+, $10M+, etc.)
- [ ] Enhanced profiles (custom avatars, bios)
- [ ] Sponsorship slots
- [ ] API access (paid)

---

## 10. Open Questions

1. **Abuse prevention**: How to handle fake net worth claims?
2. **Negative net worth**: Show on same leaderboard or separate?
3. **Currency expansion**: When to add non-USD support?
4. **Username disputes**: Process for trademark issues?
5. **Data deletion**: Full deletion or anonymization?

---

## 11. Appendix

### A. Competitor Analysis
- **Blind** — Anonymous salary sharing (different: not public)
- **Levels.fyi** — Compensation data (different: crowd-sourced)
- **Personal Capital** — Net worth tracking (different: private)
- **No direct competitor** for public net worth leaderboard

### B. Legal Considerations
- Self-reported disclaimer required
- No financial advice
- Terms must cover data accuracy
- May need state-specific disclosures

### C. Brand Assets
- Name: STACKED
- Domain: TBD (stacked.so, getstacked.com, etc.)
- Colors: See ui_design.md
- Logo: Wordmark in Syne Bold
