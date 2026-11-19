# 👑 Muse Management — OnlyFans Agency Intelligence Dashboard

A production-grade, executive dashboard built for OnlyFans agency operators to monitor creator portfolios, chatter team performance, marketing campaign attribution, and chargeback financial risks. Powered by the **Infloww OpenAPI v1**.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat&logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-3-22c55e?style=flat)

---

## 🎯 What Makes an OnlyFans Agency Tick?

An OnlyFans agency operates at the intersection of **creator talent**, **24/7 chatter sales teams**, and **paid/organic marketing funnels**. This dashboard focuses strictly on the metrics that drive agency profit and risk management:

1. **Revenue Velocity & Breakdown:** Real-time visibility into whether gross revenue is driven by recurring fan subscriptions, high-margin pay-per-view (PPV) messaging, or direct tips.
2. **Creator Portfolio Matrix:** Individual creator gross, month-over-month growth trajectories, active fan subscriber counts, and assigned primary chatters.
3. **Chatter Team ROI & Shift Performance:** Chatters are the primary sales engine of any OF agency. We track messages dispatched, unlocked PPV content volume, conversion percentage, and average response speed.
4. **Marketing Links & Funnel Attribution:** Granular tracking of TikTok viral links, Instagram bio funnels, Reddit megathreads, and promotional free trial links (directly querying `/marketing-assets` and `/marketing-analytics`).
5. **Chargeback & Fraud Risk Monitor:** Monitoring chargeback rates per creator against the 1.0% payment processing safety threshold to prevent merchant account suspension (integrating `/chargeback-analytics`).

---

## 🏛️ Architecture & Security

```
Browser (React / Tailwind UI)
       │
       ▼
Next.js API Server Proxy (/api/creators, /api/marketing, /api/chargebacks)
       │ (Hides Infloww API Key & Agency OID from client bundles)
       ▼
Infloww OpenAPI v1 (https://openapi.infloww.com/v1)
       │
       ├── GET /creator-information
       ├── GET /marketing-assets
       ├── GET /marketing-analytics
       └── GET /chargeback-analytics
```

> **Security First:** The Infloww read-only API key and Agency OID are kept exclusively in server-side Next.js route handlers (`/api/*`), completely shielded from browser network inspection and client bundle leaks.

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- Node.js 20+ installed
- npm or pnpm

### 2. Clone & Install
```bash
git clone <your-repo-url>
cd muse-dashboard
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of `muse-dashboard`:
```env
INFLOWW_API_BASE_URL=https://openapi.infloww.com/v1
INFLOWW_API_KEY=st_ifw_1223928978604066s6OdeNV481aZdibLITSC0S7nXYy72PAo9VFNARFKR
INFLOWW_AGENCY_OID=1223928978604066
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📊 Dashboard Modules

| Section | Description | API Endpoint / Source |
|---|---|---|
| **Executive Overview** | Top-level KPI summary cards: Monthly Gross, Active Fans, Marketing ROI, Chargeback Rate | Aggregated Metrics |
| **Revenue Analytics** | Multi-layer area chart showing Subscriptions vs. Chatter PPVs vs. Tips + Donut Creator Share | Infloww Revenue Velocity |
| **Creator Portfolio** | Sortable, searchable table with creator metrics, growth sparklines, and risk alerts | `GET /creator-information` |
| **Marketing Attribution** | Tracking links, free trials, and promotions with clicks, conversions, and attributed revenue | `GET /marketing-assets`, `GET /marketing-analytics` |
| **Chatter Team Leaderboard** | Shift efficiency, messages sent, response latency, and direct sales volume | Infloww Operations Metrics |
| **Chargeback Monitor** | Incident feed, dispute statuses (disputed, resolved, lost), and creator risk flags | `GET /chargeback-analytics` |

---

## 🚢 Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Add the environment variables:
   - `INFLOWW_API_KEY`
   - `INFLOWW_AGENCY_OID`
   - `INFLOWW_API_BASE_URL`
4. Click **Deploy** — your live demo URL is ready in under 2 minutes!

---

Built for **Muse Management** assessment.
