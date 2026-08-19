# Heritage Discovery App Specification (MVP)

## Project Overview
**App Name:** Heritage
**Tagline:** Discover India's hidden heritage — through the eyes of the people who live there.

## Problem & Audience
- **Problem:** Most heritage-site apps only cover famous monuments. Thousands of culturally rich, unexplored sites across India have no easy way to be found, no local context, and no way to judge if a visit is safe.
- **Audience:** Indian travelers and students (18–35) looking for offbeat, culturally rich trips over crowded tourist spots.

## Core Features (MVP)
- India-only interactive map (Leaflet, bounded to India)
- Two-mode location input: "near me" (geolocation) or "planning to visit"
- Nearby-sites list sorted by distance (haversine)
- Terrain icon (hilly/watery/generic) + risk icon (green/yellow/orange/red) per site
- Site detail: photos, local reviews, optional culture note, AI summary
- Emergency button (tel:112 link)
- Homepage carousel of random hidden-place images

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Data layer: Mocked for UI, Supabase for production
- Map: react-leaflet

## Aesthetic
- Greenlight Theme (Dark, `#0A0F0D` background, `#F2F0EC` text, `#3FA34D` accent)
