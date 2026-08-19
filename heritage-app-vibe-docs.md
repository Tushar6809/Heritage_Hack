# Heritage Discovery App — Vibe Coding Docs (MVP, trimmed)

Paste this whole file at the start of your Antigravity/AI agent conversation and say: "Here are my project documents. Use these as the source of truth for everything you build."

---

## 01 — PRD

**App Name:** [Your team/site name — this is also your big hero headline]
**Tagline:** Discover India's hidden heritage — through the eyes of the people who live there.

**Problem:** Most heritage-site apps only cover famous monuments. Thousands of culturally rich, unexplored sites across India have no easy way to be found, no local context, and no way to judge if a visit is safe.

**Target User:** Indian travelers and students (18–35) who want offbeat, culturally rich trips over crowded tourist spots.

**Core Value Proposition:** Locally-sourced stories + honest terrain/safety context + AI-summarized culture, scoped to India only.

**Core Features (MVP only):**
- India-only interactive map (Leaflet, bounded to India)
- Two-mode location input: "near me" (geolocation) or "planning to visit" (pick from curated list)
- Nearby-sites list sorted by distance
- Terrain icon (hilly/watery/generic) + risk icon (green/yellow/orange/red) per site
- Site detail: photos, local reviews, optional culture note, AI summary
- Emergency button (tel: link)
- Homepage carousel of random hidden-place images

**Out of Scope:** Login/accounts, non-India locations, booking/payment, live crowd-sourced updates, user-submitted reviews (v2 only — cut for demo).

**User Stories:**
- As a traveler, I want to pick a place I'm visiting and see nearby hidden sites sorted by distance.
- As a traveler, I want a risk icon on each site so I know if it's safe before planning.
- As a user in distress, I want a one-tap emergency button.

**Success Metric (demo):** Full flow works live: search → nearby list → site detail → AI summary, with zero live-API dependency during the demo.

---

## 02 — TRD

**Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
**Backend:** None separate — call Supabase directly from the Next.js client. No custom API routes needed for MVP.
**Database:** Supabase (PostgreSQL) — sites, reviews
**Auth:** None
**Hosting:** Vercel (frontend), Supabase (DB + storage)
**Map:** Leaflet + react-leaflet, OpenStreetMap tiles (free, no key)
**AI Summary:** Generated once offline via Groq or Gemini free tier, saved into the DB — never called live in the demo
**Key Libraries:** react-leaflet, framer-motion, lucide-react
**Env Variables:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Constraints:** Free tier only. No live AI calls during demo. Mobile-responsive.

---

## 03 — App Flow

**Pages:**
- `/` — Home (site name hero, two input boxes, carousel)
- `/nearby?lat=&lng=` — Nearby sites, sorted by distance
- `/site/[id]` — Site detail (photos, reviews, culture, AI summary, terrain/risk icons)

**First Screen:** Home — big site name, tagline, two input boxes, carousel below.

**Core Journey 1 ("planning to visit"):** pick from dropdown → map flies to location → nearby list renders → tap a site → detail page.

**Core Journey 2 ("near me"):** geolocation permission → same nearby-list flow using device coords.

**Empty State:** no nearby sites → "No hidden sites found nearby" + link to curated list.
**Error State:** geolocation denied → prompt "planning to visit" dropdown instead.
**Emergency button:** always visible, opens `tel:112` directly — not a page redirect.

---

## 04 — UI/UX Design Brief

Match the aesthetic you liked on Greenlight: dark, minimalist, one accent color, clean sans-serif type, generous whitespace, subtle card shadows — no separate light-mode variant needed for MVP.

**Background:** `#0A0F0D` (near-black, slight warmth)
**Text:** `#F2F0EC`
**Accent (single):** pick one — e.g. `#3FA34D` (heritage green, ties into your "safe" risk color) or a warm ochre if you want heritage/culture to read differently from Greenlight's eco-green
**Risk Colors (fixed):** Green `#3FA34D`, Yellow `#E0B93A`, Orange `#E0812E`, Red `#D9433E`
**Font:** Inter (UI + body); optional serif for the hero site name only, for a "heritage" feel
**Border Radius:** 12px
**Reference:** Greenlight (greenlightapp.vercel.app) — copy its card layout, spacing rhythm, and restrained use of color
**Mobile:** single-column, carousel swipeable, map full-width

---

## 05 — Backend Schema

**Table: sites**
`id (uuid), name (text), region (text), lat (float), lng (float), terrain_type (text), risk_level (text), culture_notes (text, nullable), ai_summary (text, nullable), image_urls (text[]), hidden (boolean default true), created_at (timestamp)`

**Table: reviews**
`id (uuid), site_id (FK → sites.id), author_name (text), review_text (text), created_at (timestamp)`

**Relationships:** `reviews.site_id → sites.id` (many-to-one)
**Auth:** None — both tables public-read
**Row Level Security:** Public read only; writes done manually via Supabase dashboard while seeding data
**File Storage:** Supabase Storage `/sites/{site_id}/{filename}`, URLs stored directly in `sites.image_urls`

---

## 06 — Implementation Plan

**Phase 1 — Setup:** Init Next.js, Tailwind, react-leaflet, framer-motion, lucide-react, Supabase client, env vars. Done: app boots.

**Phase 2 — Data:** Create `sites` + `reviews` tables, public-read RLS, seed 20–30 real sites with images/reviews. Run the offline AI-summary script once, save results into `sites.ai_summary`. Done: all data queryable, no live AI calls remain.

**Phase 3 — Map:** Leaflet map bounded to India, custom terrain+risk marker icons. Done: map loads centered on India, can't pan outside it.

**Phase 4 — Core Flow:** Home page (hero, two inputs, carousel) → nearby list (haversine sort) → site detail page (photos, reviews, culture, AI summary, emergency button). Done: full click-through works.

**Phase 5 — Polish:** Apply palette/fonts, loading/empty/error states, mobile pass. Done: looks intentional on phone and desktop.

**Phase 6 — Deploy:** Push to Vercel, connect Supabase prod, verify env vars live. Done: deployed link matches localhost behavior.

**Done Criteria:** A judge can pick a location, see nearby hidden sites with terrain/risk icons, open one, read a story + AI summary, and tap the emergency button — no live API failures.
