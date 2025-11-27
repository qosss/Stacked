# TODO.md — STACKED UI/UX Implementation

> Reference HTML mockup: `stacked-logged-in.html`
> This file guides Claude through implementing the full UI/UX in Next.js + Tailwind CSS

---

## Phase 1: Project Setup & Foundation ✅

### 1.1 Initialize Project
- [x] Create Next.js 15 app with App Router
- [x] Install dependencies: Tailwind CSS, shadcn/ui (optional), lucide-react
- [x] Configure custom fonts: `Space Mono` (mono), `Syne` (display)
- [x] Set up CSS variables matching the design system (see ui_design.md)

### 1.2 Global Styles & Theme
- [x] Create `globals.css` with CSS variables from mockup
- [x] Set up dark theme as default (no light mode for MVP)
- [x] Configure Tailwind with custom colors: `bg-deep`, `accent`, `negative`, etc.
- [ ] Add subtle noise texture overlay (optional, low priority)

### 1.3 Layout Components
- [x] Create root layout with font imports
- [x] Create `<Header />` component (logged-out version)
- [x] Create `<Header />` component (logged-in version with user dropdown)
- [x] Create `<Footer />` component
- [x] Create `<Modal />` reusable component with animations

---

## Phase 2: Core Pages ✅

### 2.1 Homepage `/`
- [x] Hero section: "SHOW YOUR STACK" headline with lime accent
- [x] Stats bar: Members, Total, Median (use placeholder data)
- [x] Leaderboard table component
  - [x] Rank column (gold/silver/bronze for top 3)
  - [x] User cell (avatar, username, tags)
  - [x] Net worth cell (with cents styling)
  - [x] Status column
- [x] Sort dropdown (Net Worth, Last Updated, Newest)
- [x] Row hover effects (slide right, color change)
- [x] Row click → opens profile modal
- [x] Staggered fade-in animation on load

### 2.2 Login Flow `/login`
- [x] Phone number input screen
- [x] OTP verification screen (6-digit input)
- [x] Step indicator dots
- [x] Form validation states
- [x] Loading states for buttons
- [x] Error message display

### 2.3 Signup/Join Flow `/join`
- [x] Step 1: Phone number input
- [x] Step 2: OTP verification
- [x] Step 3: Username selection
  - [x] Real-time availability check (mock for now)
  - [x] Username format validation (lowercase, 3-20 chars, a-z0-9_)
  - [ ] "Usernames are permanent" warning
- [x] Step 4: Net worth entry
  - [x] Currency input with formatting
  - [x] Allow negative values
  - [ ] Cents precision
- [x] Success state → redirect to homepage with banner

### 2.4 Profile Page `/u/[username]`
- [x] Public profile layout
- [x] Large avatar with initial
- [x] Username display with @ prefix
- [x] OG/Early badge (if applicable)
- [x] Net worth display (large, prominent)
- [x] Rank display
- [x] Last updated timestamp
- [x] Verification status badge
- [x] 404 handling for non-existent usernames

### 2.5 Account Dashboard `/me`
- [x] Redirect to login if not authenticated
- [x] Current rank banner (same as homepage when logged in)
- [x] Username display (read-only)
- [x] Current net worth display
- [x] "Update Net Worth" button → modal
- [x] Net worth history list (simple, chronological)
- [ ] Account settings section (placeholder)

---

## Phase 3: Static Pages

### 3.1 Privacy Policy `/privacy`
- [ ] Create static page layout template
- [ ] Privacy policy content (use standard template)
- [ ] Sections:
  - [ ] Information We Collect
  - [ ] How We Use Your Information
  - [ ] What's Public vs Private
  - [ ] Data Security
  - [ ] Third-Party Services
  - [ ] Your Rights
  - [ ] Contact Information
- [ ] Last updated date

### 3.2 Terms of Service `/terms`
- [ ] Terms content (use standard template)
- [ ] Sections:
  - [ ] Acceptance of Terms
  - [ ] Account Registration
  - [ ] Username Policy
  - [ ] Self-Reported Data Disclaimer
  - [ ] Prohibited Conduct
  - [ ] Termination
  - [ ] Disclaimers
  - [ ] Limitation of Liability
  - [ ] Changes to Terms
- [ ] Last updated date

### 3.3 FAQ `/faq`
- [ ] Accordion-style FAQ component
- [ ] Questions to include:
  - [ ] What is STACKED?
  - [ ] How do I calculate my net worth?
  - [ ] Are the numbers verified?
  - [ ] Can I change my username?
  - [ ] Is my phone number public?
  - [ ] How do I update my net worth?
  - [ ] What does "OG" mean?
  - [ ] Can I delete my account?
  - [ ] How is rank calculated?
  - [ ] What's coming next? (verification, etc.)

### 3.4 Contact `/contact` (optional for MVP)
- [ ] Simple contact form or email link
- [ ] Social links (if any)

---

## Phase 4: Modals & Overlays

### 4.1 Login Modal
- [ ] Phone input with country code
- [ ] "Send Code" button
- [ ] Loading state
- [ ] Transition to OTP input

### 4.2 Join Modal
- [ ] Multi-step flow (3 steps)
- [ ] Step indicator
- [ ] Back button functionality
- [ ] Progress persistence

### 4.3 Update Net Worth Modal
- [ ] Show current value
- [ ] Input field pre-filled
- [ ] "Save Changes" button
- [ ] Success feedback (close + toast or inline)

### 4.4 Profile Modal (Quick View)
- [ ] Avatar with initial
- [ ] Username
- [ ] Tag badges
- [ ] Net worth
- [ ] Rank
- [ ] Unverified status
- [ ] "View Full Profile" link (optional)

---

## Phase 5: Components Library

### 5.1 Buttons
- [ ] `<Button variant="primary" />` — lime background
- [ ] `<Button variant="ghost" />` — outline style
- [ ] `<Button variant="danger" />` — red for destructive
- [ ] Loading spinner state
- [ ] Disabled state
- [ ] Hover/active animations

### 5.2 Inputs
- [ ] Text input with focus glow
- [ ] Phone input with formatting
- [ ] Currency input with $ prefix and cents
- [ ] OTP input (6 boxes)
- [ ] Error state styling

### 5.3 User Components
- [ ] `<Avatar />` — circle with initial, optional image
- [ ] `<Username />` — with @ prefix styling
- [ ] `<Tag />` — OG, Early, You variants
- [ ] `<NetWorth />` — formatted with cents muted
- [ ] `<Rank />` — with medal colors for top 3

### 5.4 Feedback
- [ ] Toast notifications
- [ ] Inline error messages
- [ ] Success checkmarks
- [ ] Loading skeletons

### 5.5 Navigation
- [ ] User dropdown menu
- [ ] Mobile hamburger menu (if needed)
- [ ] Breadcrumbs (for static pages)

---

## Phase 6: Interactions & Polish

### 6.1 Animations
- [ ] Page transitions (fade)
- [ ] Modal open/close (scale + fade)
- [ ] Row hover (translateX)
- [ ] Button hover (lift + glow)
- [ ] Staggered list animations
- [ ] Loading skeleton pulse

### 6.2 Responsive Design
- [ ] Mobile: hide Status column in table
- [ ] Mobile: hide avatar in rows
- [ ] Mobile: stack rank banner vertically
- [ ] Mobile: full-width modals
- [ ] Tablet: adjust spacing
- [ ] Test on 320px, 375px, 768px, 1024px, 1440px

### 6.3 Accessibility
- [ ] Keyboard navigation for modals (Escape to close)
- [ ] Focus trapping in modals
- [ ] Aria labels for interactive elements
- [ ] Color contrast compliance (lime on dark)
- [ ] Screen reader testing

### 6.4 Loading States
- [ ] Skeleton for leaderboard rows
- [ ] Skeleton for profile page
- [ ] Button loading spinners
- [ ] Page loading indicator

---

## Phase 7: State Management (Mock Data)

### 7.1 Mock Data Files
- [ ] `data/users.ts` — sample user profiles
- [ ] `data/leaderboard.ts` — sorted net worth list
- [ ] `data/currentUser.ts` — logged-in user state

### 7.2 Context Providers
- [ ] `AuthContext` — mock auth state (logged in/out)
- [ ] `ModalContext` — global modal management
- [ ] `UserContext` — current user data

### 7.3 Hooks
- [ ] `useAuth()` — get auth state
- [ ] `useModal()` — open/close modals
- [ ] `useLeaderboard()` — get leaderboard data

---

## Phase 8: Final QA

### 8.1 Visual QA
- [ ] Compare every page to HTML mockup
- [ ] Check all spacing/padding matches
- [ ] Verify all colors are correct
- [ ] Test all hover/active states
- [ ] Check typography sizes

### 8.2 Functional QA
- [ ] All links work
- [ ] All modals open/close
- [ ] All forms show validation
- [ ] Keyboard navigation works
- [ ] No console errors

### 8.3 Cross-Browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## File Structure (Target)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Homepage
│   ├── login/page.tsx
│   ├── join/page.tsx
│   ├── me/page.tsx              # Account dashboard
│   ├── u/[username]/page.tsx    # Public profile
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── faq/page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Avatar.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageLayout.tsx
│   ├── leaderboard/
│   │   ├── LeaderboardTable.tsx
│   │   ├── LeaderboardRow.tsx
│   │   └── SortDropdown.tsx
│   ├── profile/
│   │   ├── ProfileCard.tsx
│   │   └── ProfileModal.tsx
│   └── auth/
│       ├── LoginModal.tsx
│       ├── JoinModal.tsx
│       ├── PhoneInput.tsx
│       └── OTPInput.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── ModalContext.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useModal.ts
├── data/
│   ├── users.ts
│   └── leaderboard.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

---

## Notes for Claude

1. **Always match the mockup** — The HTML file is the source of truth for visuals
2. **Use semantic HTML** — Proper headings, labels, buttons (not divs)
3. **Mobile-first** — Build mobile layout first, enhance for desktop
4. **No backend yet** — All data is mocked, auth is simulated
5. **Keep it simple** — Don't over-engineer, this is MVP
6. **Comment complex code** — Especially animations and state logic
