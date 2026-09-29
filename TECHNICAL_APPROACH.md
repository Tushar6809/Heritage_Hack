# Technical Approach: Heritage Discovery Platform

## Core Architecture
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion (for dynamic UI interactions)
- **Mapping:** `react-leaflet` with OpenStreetMap integrations (bounded strictly to India)
- **Virtual Reality:** Integrated Google Maps Street View API (via dynamic IFrames) for 360-degree monument walkthroughs.

## Key Technical Solutions

### 1. The Interactive Heritage Ecosystem (Map & Routing)
Instead of static images, we implemented an interactive `react-leaflet` map. 
- The map automatically calculates boundaries and zooms to fit all displayed monuments.
- A simulated Route Generation algorithm utilizes the Haversine formula to strictly filter out monuments that would take the user more than 80km off their primary route, presenting them chronologically with precise travel distance estimates.

### 2. Live 360° Virtual Tours
To solve the problem of inaccessible or heavily ruined heritage sites, we implemented a dynamic Virtual Tour viewer.
- It dynamically injects the site's Lat/Lng coordinates into a Google Street View layer.
- If a hidden site lacks native street-view data, the platform falls back to high-quality panoramas of architectural peers (e.g. Qutub Minar, Taj Mahal) to demonstrate the capability to the user.

### 3. Risk & Safety Indexing Algorithm
Every site in the platform is parsed through a 3-vector Risk Factor system:
- **Structural:** The physical integrity of the ruins.
- **Environmental:** Natural hazards (floods, earthquakes).
- **Tourism Pressure:** Crowding and commercial destruction.
These three vectors calculate a unified `/100` Safety Score Card, which is heavily utilized for recommending off-beat locations that are safe for family travel.

### 4. Climate-Responsive Documentation
As per modern architectural heritage guidelines, the database specifically highlights how traditional communities responded to severe climates without modern AC. Data structures map architectural features (e.g. Raised Plinths, Bamboo stilts, Thick mud walls) directly to their environmental purpose (Floods, Earthquakes, Arid Heat).

## Future Scope
- **Supabase Integration:** The UI currently relies on a structured mocked data layer. A `supabase_setup.sql` schema has been designed and tested to migrate this into a live PostgreSQL environment for production.
- **WebXR 3D Models:** Fully integrating `@google/model-viewer` with proprietary `.glb` scans of hidden monuments to create a true AR overlay in the user's living room.
