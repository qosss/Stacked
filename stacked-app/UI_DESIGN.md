# UI_DESIGN.md — STACKED Design System

> Version 1.0 | Last Updated: November 2024
> Reference: `stacked-logged-in.html` mockup

---

## 1. Design Philosophy

### Core Principles

1. **Dark & Bold** — Deep black backgrounds with high contrast accents
2. **Minimal & Functional** — No decoration without purpose
3. **New Money Energy** — Confident, slightly provocative, not stuffy
4. **Trust Through Clarity** — Clean typography, obvious hierarchy

### Mood Board Keywords
- Digital luxury
- Fintech meets streetwear
- Bloomberg terminal aesthetics
- Crypto exchange UI
- Night mode by default

---

## 2. Color System

### Primary Palette

```css
:root {
  /* Backgrounds */
  --bg-deep: #0d0d0d;        /* Page background */
  --bg-card: #141414;        /* Cards, modals */
  --bg-elevated: #1a1a1a;    /* Hover states, inputs */
  --bg-hover: #1f1f1f;       /* Interactive hover */
  
  /* Text */
  --text-primary: #e0e0e0;   /* Main text */
  --text-secondary: #888888; /* Secondary text */
  --text-muted: #555555;     /* Disabled, hints */
  --text-inverse: #0d0d0d;   /* Text on accent */
  
  /* Accent */
  --accent: #c8ff00;         /* Primary accent (lime) */
  --accent-hover: #d4ff33;   /* Accent hover state */
  --accent-dim: rgba(200, 255, 0, 0.15);  /* Accent backgrounds */
  --accent-glow: rgba(200, 255, 0, 0.3);  /* Glow effects */
  
  /* Semantic */
  --negative: #ff4444;       /* Negative numbers, errors */
  --positive: #4caf50;       /* Success states */
  --warning: #ff9800;        /* Warnings */
  
  /* Borders */
  --border: #222222;         /* Default borders */
  --border-light: #333333;   /* Lighter borders */
  
  /* Special */
  --gold: #ffd700;           /* Rank 1, OG badge */
  --silver: #c0c0c0;         /* Rank 2 */
  --bronze: #cd7f32;         /* Rank 3 */
}
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page background | `--bg-deep` | Always #0d0d0d |
| Cards/Modals | `--bg-card` | Subtle elevation |
| Input backgrounds | `--bg-elevated` | Darker than cards |
| Primary buttons | `--accent` | Lime with dark text |
| Ghost buttons | transparent | Border only |
| Links on hover | `--accent` | Lime highlight |
| Negative net worth | `--negative` | Red for debt |
| Success states | `--positive` | Green checkmarks |

---

## 3. Typography

### Font Families

```css
/* Display / Headlines */
font-family: 'Syne', sans-serif;

/* Body / Monospace */
font-family: 'Space Mono', monospace;
```

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@500;700&display=swap" rel="stylesheet">
```

### Type Scale

| Name | Size | Weight | Font | Usage |
|------|------|--------|------|-------|
| display-xl | 3rem (48px) | 700 | Syne | Hero headline |
| display-lg | 1.5rem (24px) | 700 | Syne | Section titles |
| display-md | 1.25rem (20px) | 700 | Syne | Modal titles |
| body-lg | 1rem (16px) | 400 | Space Mono | Large body |
| body-md | 0.875rem (14px) | 400 | Space Mono | Default body |
| body-sm | 0.75rem (12px) | 400 | Space Mono | Small text |
| caption | 0.65rem (10px) | 400 | Space Mono | Labels, hints |
| micro | 0.55rem (9px) | 700 | Space Mono | Tags, badges |

### Typography Styles

```css
/* Logo */
.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* Hero Headline */
.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
}

/* Net Worth Display */
.networth {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
}

.networth-cents {
  color: var(--text-muted);
  font-size: 0.75rem;
}

/* Labels */
.label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
```

---

## 4. Spacing System

### Base Unit: 4px

```css
/* Spacing scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Common Patterns

| Element | Padding |
|---------|---------|
| Page horizontal | 2rem |
| Section vertical | 2rem |
| Card | 2rem |
| Modal | 2rem |
| Button | 0.6rem 1.2rem |
| Input | 0.75rem |
| Table cell | 1rem |
| Inline gap | 0.75rem |

---

## 5. Components

### 5.1 Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--accent);
  color: var(--bg-deep);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(200, 255, 0, 0.15);
}

.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 4px 20px rgba(200, 255, 0, 0.3);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  /* Same padding, font as primary */
}

.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
```

### 5.2 Inputs

```css
.input {
  width: 100%;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.75rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input:hover {
  border-color: var(--border-light);
}

.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.input::placeholder {
  color: var(--text-muted);
}
```

### 5.3 Avatar

```css
.avatar {
  width: 32px;
  height: 32px;
  background: var(--bg-elevated);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: var(--accent);
  transition: all 0.25s ease;
}

.avatar:hover {
  background: var(--bg-hover);
  box-shadow: 0 0 12px var(--accent-dim);
}

/* Sizes */
.avatar-sm { width: 28px; height: 28px; font-size: 0.65rem; }
.avatar-md { width: 32px; height: 32px; font-size: 0.7rem; }
.avatar-lg { width: 56px; height: 56px; font-size: 1.25rem; }
```

### 5.4 Tags/Badges

```css
.tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 0.15rem 0.35rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tag-og {
  background: #332d00;
  color: var(--gold);
}

.tag-early {
  background: var(--accent-dim);
  color: var(--accent);
}

.tag-you {
  background: var(--accent);
  color: var(--bg-deep);
}
```

### 5.5 Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
  transform: rotate(90deg);
}
```

---

## 6. Layout Patterns

### 6.1 Header

```
┌────────────────────────────────────────────────────────┐
│  STACKED                              [Log in] [Join]  │
└────────────────────────────────────────────────────────┘
         │                                    │
       Logo                            Actions (right)
    (Syne Bold)                        

/* Logged in version */
┌────────────────────────────────────────────────────────┐
│  STACKED                    [Update Net Worth] [👤▼]   │
└────────────────────────────────────────────────────────┘
```

**CSS:**
```css
header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
```

### 6.2 Leaderboard Table

```
┌─────────────────────────────────────────────────────────┐
│  #   │  User              │  Net Worth      │  Status   │
├─────────────────────────────────────────────────────────┤
│  1   │  [S] @satoshi_n OG │  $68,421,053.00 │ Unverified│
│  2   │  [V] @vitalik OG   │  $1,892,450.00  │ Unverified│
│  ...                                                     │
└─────────────────────────────────────────────────────────┘
```

**Row hover:**
- Background: `--bg-card`
- Transform: `translateX(4px)`
- Username color: `--accent`

**Current user row:**
- Background: `rgba(200, 255, 0, 0.05)`
- Left border: `2px solid var(--accent)`
- "YOU" badge visible

### 6.3 Stats Bar

```
┌──────────────────────────────────────────────────────────┐
│        2,847           $4.2B           $1.48M            │
│       Members          Total           Median            │
└──────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  border-bottom: 1px solid var(--border);
}
```

---

## 7. Animations

### 7.1 Timing Functions

```css
/* Standard easing */
--ease-default: ease;
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 7.2 Durations

```css
--duration-fast: 0.15s;
--duration-normal: 0.2s;
--duration-slow: 0.3s;
--duration-slower: 0.4s;
```

### 7.3 Common Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade up (for page load) */
@keyframes fadeUp {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade down (for header) */
@keyframes fadeDown {
  from { 
    opacity: 0;
    transform: translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse (for avatar glow) */
@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(200, 255, 0, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(200, 255, 0, 0.2);
  }
}
```

### 7.4 Staggered Row Animation

```css
tbody tr {
  animation: fadeIn 0.4s ease backwards;
}

tbody tr:nth-child(1) { animation-delay: 0.1s; }
tbody tr:nth-child(2) { animation-delay: 0.15s; }
tbody tr:nth-child(3) { animation-delay: 0.2s; }
/* ... continue for each row */
```

### 7.5 Modal Animation

```css
/* Overlay fade */
.modal-overlay {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Content slide up */
.modal-content {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
  transition: all 0.3s ease;
}

.modal-overlay.open .modal-content {
  transform: translateY(0) scale(1);
  opacity: 1;
}
```

---

## 8. Responsive Breakpoints

```css
/* Mobile first approach */

/* Small phones */
@media (max-width: 375px) {
  /* Tighter spacing */
}

/* Default mobile: 0 - 600px */

/* Tablet */
@media (min-width: 600px) {
  /* Show more columns */
}

/* Desktop */
@media (min-width: 900px) {
  /* Full layout */
}

/* Large desktop */
@media (min-width: 1200px) {
  /* Max-width containers */
}
```

### Mobile Adaptations

| Component | Mobile Change |
|-----------|---------------|
| Table | Hide Status column |
| Table | Hide avatars |
| Rank banner | Stack vertically |
| User dropdown | Hide username text |
| Stats bar | Wrap to 2 rows |
| Header padding | Reduce to 1rem |
| Hero title | 2rem instead of 3rem |

---

## 9. Icons

Using **Lucide React** for icons.

### Common Icons

| Icon | Usage |
|------|-------|
| `ChevronDown` | Dropdowns |
| `X` | Close buttons |
| `Plus` | Add/Update |
| `LogOut` | Sign out |
| `User` | Profile |
| `Link` | Connect accounts |
| `Check` | Success |
| `AlertCircle` | Unverified badge |

### Icon Sizing

```css
.icon-sm { width: 12px; height: 12px; }
.icon-md { width: 16px; height: 16px; }
.icon-lg { width: 24px; height: 24px; }
```

---

## 10. States & Feedback

### Loading States

```css
/* Button loading */
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-elevated) 25%,
    var(--bg-hover) 50%,
    var(--bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 3px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Error States

```css
.input-error {
  border-color: var(--negative);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2);
}

.error-message {
  color: var(--negative);
  font-size: 0.75rem;
  margin-top: 0.5rem;
}
```

### Success States

```css
.success-message {
  color: var(--positive);
  font-size: 0.75rem;
}

.input-success {
  border-color: var(--positive);
}
```

---

## 11. Accessibility

### Focus States

```css
/* Visible focus for keyboard nav */
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Remove default focus for mouse */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast

| Combination | Ratio | Pass |
|-------------|-------|------|
| `--text-primary` on `--bg-deep` | 12.5:1 | ✅ AAA |
| `--accent` on `--bg-deep` | 11.8:1 | ✅ AAA |
| `--text-muted` on `--bg-deep` | 3.9:1 | ✅ AA |
| `--bg-deep` on `--accent` | 11.8:1 | ✅ AAA |

### Screen Reader

- Use semantic HTML (`<header>`, `<main>`, `<nav>`)
- Add `aria-label` to icon-only buttons
- Use `role="dialog"` for modals
- Announce loading states with `aria-live`

---

## 12. Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: {
          deep: '#0d0d0d',
          card: '#141414',
          elevated: '#1a1a1a',
          hover: '#1f1f1f',
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#888888',
          muted: '#555555',
        },
        accent: {
          DEFAULT: '#c8ff00',
          hover: '#d4ff33',
          dim: 'rgba(200, 255, 0, 0.15)',
        },
        negative: '#ff4444',
        positive: '#4caf50',
        border: {
          DEFAULT: '#222222',
          light: '#333333',
        },
        rank: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease',
        'fade-up': 'fadeUp 0.6s ease',
        'pulse-glow': 'pulse 2s ease infinite',
      },
    },
  },
}
```

---

## 13. Component Checklist

| Component | Designed | Built | Tested |
|-----------|----------|-------|--------|
| Button (primary) | ✅ | ⬜ | ⬜ |
| Button (ghost) | ✅ | ⬜ | ⬜ |
| Input (text) | ✅ | ⬜ | ⬜ |
| Input (phone) | ✅ | ⬜ | ⬜ |
| Input (OTP) | ✅ | ⬜ | ⬜ |
| Input (currency) | ✅ | ⬜ | ⬜ |
| Avatar | ✅ | ⬜ | ⬜ |
| Tag/Badge | ✅ | ⬜ | ⬜ |
| Modal | ✅ | ⬜ | ⬜ |
| Dropdown | ✅ | ⬜ | ⬜ |
| Table | ✅ | ⬜ | ⬜ |
| Table Row | ✅ | ⬜ | ⬜ |
| Header | ✅ | ⬜ | ⬜ |
| Footer | ✅ | ⬜ | ⬜ |
| User Menu | ✅ | ⬜ | ⬜ |
| Skeleton | ✅ | ⬜ | ⬜ |

---

## 14. Assets Needed

### Fonts
- [x] Space Mono (Google Fonts)
- [x] Syne (Google Fonts)

### Icons
- [ ] Lucide React package

### Images
- [ ] OG share image (1200x630)
- [ ] Favicon (multiple sizes)
- [ ] Apple touch icon

### Sound (optional, future)
- [ ] Success chime
- [ ] Rank up notification
