# Technology Stack

This document outlines the core technologies, libraries, and frameworks used in the Heritage project.

## Core Framework & Language
- **[Next.js](https://nextjs.org/) (v16.3.0)**: The React framework for the web. We are utilizing the App Router architecture for routing and server/client component rendering.
- **[React](https://react.dev/) (v19.2.8)**: The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/) (v5.x)**: Strongly typed programming language that builds on JavaScript, used for type safety across the application.

## Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/) (v4.x)**: A utility-first CSS framework for rapid UI development, configured via PostCSS.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React, used for smooth, declarative animations.
- **[Lucide React](https://lucide.dev/)**: A beautiful and consistent icon toolkit.
- **UI Utilities**: `clsx` and `tailwind-merge` are used for dynamic class name construction and merging Tailwind utility classes without conflicts.

## Backend & Database
- **[Supabase](https://supabase.com/)**: The open source Firebase alternative. We use `@supabase/supabase-js` for database interactions (PostgreSQL), authentication, and storage.

## Mapping & Geospatial
- **[Leaflet](https://leafletjs.com/)**: The leading open-source JavaScript library for mobile-friendly interactive maps.
- **[React-Leaflet](https://react-leaflet.js.org/)**: React components for Leaflet maps, enabling declarative map rendering.

## Tooling & Linting
- **ESLint (v9.x)**: Used to find and fix problems in the JavaScript/TypeScript code. Configured with `eslint-config-next`.
- **Node.js Types (`@types/node`)**: Provides TypeScript definitions for Node.js built-in modules.
