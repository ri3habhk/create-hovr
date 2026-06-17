# Plan — Landing, info pages, and fixes

## 1. Landing page (`src/pages/Index.tsx`)
- Remove `<CreatorShowcase />` (sample creators section).
- Wrap each remaining section (`PaymentSection`, `CreatePortfolioSection`, `HowItWorksSection`) in a clickable `<Link>` covering the whole section. Remove the inner "Create Portfolio" button (section itself becomes the click target).
- Subscription plan cards already navigate on click — keep, but expand features (see #4).

## 2. Global scroll-to-top on navigation
- Add a `ScrollToTop` component (uses `useLocation` + `window.scrollTo(0,0)`) and mount it inside `<BrowserRouter>` in `src/App.tsx`. Guarantees every route change snaps to the top.

## 3. Three new info pages + routes
Add to `src/App.tsx`:
- `/payments-info` → **PaymentsInfo.tsx**: explains escrow, 30/70 split, dispute resolution, supported methods, refund policy.
- `/start-creating` → **StartCreating.tsx**: how to build a portfolio, what to upload, tips, CTA to `/auth`.
- `/how-it-works` → **HowItWorks.tsx** (new full page with animated step-by-step explanations using existing `useScrollAnimation` hook + tailwind transitions).

Each page reuses `Navigation` + `Footer` and matches existing minimalist visual identity.

## 4. Subscription plans — expand features
In `src/components/SubscriptionSection.tsx` add 3–5 more features per plan, e.g.:
- Creator: + Priority profile placement, Verified badge, Lower platform fee (5%), Custom domain portfolio, Direct payouts to UPI/bank.
- Client: + AI creator matching, Dedicated account manager, Bulk project posting, Contract templates, Priority dispute resolution.

Cards already route to `/payment` on click — keep that behavior.

## 5. Post Projects page (`src/pages/PostProject.tsx`)
- Make the three value props ("AI-Powered Matching", "Save Time & Money", "Transparent Pricing") visually prominent: larger cards, gradient/accent borders, icon emphasis.
- In Browse Active Projects list:
  - Replace any `$` with `₹` (INR).
  - Wrap each project card in a `<Link to="/projects">` (or to a project detail route if available) so the whole card is clickable.
  - Render `freelancer_type` as a vertical list (`flex-col` with badges/dots) instead of dash-separated inline.
  - Restructure each card into a two-column layout: details left, **budget on the right**, larger font, highlighted (accent background + bold).

## 6. Find Creators (`src/pages/CreatorsBrowse.tsx`)
- Fix broken filters (debug current filter wiring; ensure state updates trigger refetch/filter of the creators list).
- Apply gradient text styling **only** to creator display names (`bg-gradient-to-r ... bg-clip-text text-transparent`). All other text stays solid.

## 7. Client Dashboard (`src/components/ClientDashboard.tsx`)
- In the "Your Projects" list, for each project also load + display the **assigned creator** (from `project_claims` where `status = 'accepted'`). Show name + avatar inline on the project card.

## Technical notes
- Section-as-link: wrap with `<Link className="block">` and keep inner card styles, add `hover:` cues so clickability is obvious.
- ScrollToTop component:
  ```tsx
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
  };
  ```
- Gradient name util: define a small class in `index.css` (e.g. `.gradient-name`) using existing brand tokens — no hardcoded hex.
- Currency: search/replace `$` in `PostProject.tsx` browse list only (not in form labels that reference dollars — none expected, but verified before edit).
- No DB schema changes required.

## Out of scope (confirm if you want these too)
- Real project detail page (project cards will link to `/projects` listing — let me know if you want a dedicated `/projects/:id` page instead).
- Animated SVG/Lottie for How It Works page — will use CSS/Tailwind animations unless you want Lottie.
