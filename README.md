Axiom Pulse Token Discovery Table (Frontend Only, Mock Data)
A pixel-perfect, high-performance, fully interactive token discovery table UI—faithfully replicating the Axiom Pulse experience.

⚡️ Frontend only (no backend, all mock data)

🚀 Built with Next.js 14, TypeScript, Tailwind CSS, and best-in-class Radix UI

🟢 Live, real-time metric simulation and smooth animations

📱 Fully responsive—works beautifully down to 320px

🦽 Accessible: Keyboard, screen-reader, and color contrast tested

🚩 Features
Real-time price/volume updates (mocked, animated flashes for up/down moves)

Sorting (click any column header, with direction indicator)

Search/filter bar (instant, case-insensitive token lookup)

Tooltips (explanations on column headers and icons)

Action popovers (copy address, open in Dexscreener, trade stub)

Skeleton loading state (animated shimmer for fast feel)

Graceful error and “no results” states

Pixel-perfect UI (≤2px visual diff from Axiom Pulse, verified manually)

Fully accessible (all actions keyboard- and screen-reader-friendly)

🔧 Tech Stack
Next.js 14 + App Router

TypeScript, strict types everywhere

Tailwind CSS (utility-first, no global styles)

Radix UI / shadcn/ui (Popover, Tooltip primitives)

lucide-react (icons)

Atomic component architecture

🛠️ Getting Started
Clone, install, and run locally:

git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]
npm install
npm run dev

Open http://localhost:3000 to view in your browser.

Live: View live on Vercel

Video Demo: YouTube (1–2 min walkthrough)

📦 Project Structure

src/
  app/
    page.tsx           // Main page
  components/
    TokenTable.tsx     // Table with sorting/search/loader
    TokenRow.tsx       // One row (all metrics, actions)
    SkeletonRow.tsx
    ui/
      table.tsx
      tooltip.tsx
      popover.tsx
  hooks/
    useTokensLive.ts   // Mock tokens, live data simulation
  lib/
    utils.ts
/public

🚨 Notes
This is a frontend-only project; all data is mocked and simulates a real-time backend via local state and randomized intervals.

No API calls, no server, no authentication.

Trade modal is stubbed/inactive. External links go to Dexscreener for demo.

🧪 QA Checklist
 Pixel-perfection (≤2px diff)

 Sorting and search

 Popover, tooltip, quick actions

 Live metric flashes

 Responsive across breakpoints

 Full accessibility (keyboard/tab/focus/screenreader)

 Error, loading, and empty states

 Lighthouse score ≥90 mobile & desktop

🤝 Credits
Design inspired by Axiom Pulse

Built by Uday Sutradhar


