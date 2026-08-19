// Mock Data for the MVP demo to avoid needing a real DB connection immediately

export type SiteCategory = 'monument' | 'temple' | 'nature' | 'water' | 'food' | 'festival' | 'settlement' | 'oral_history' | 'at_risk';
export type VerificationStatus = 'under_verification' | 'community_verified' | 'officially_verified' | 'oral_tradition';

export interface NearbyPlace {
  id: string;
  name: string;
  type: 'food' | 'artisan' | 'heritage';
  distanceKm: number;
}

export interface Site {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  category: SiteCategory;
  terrain_type: 'hilly' | 'watery' | 'generic';
  risk_level: 'green' | 'yellow' | 'orange' | 'red';
  verification_status: VerificationStatus;
  risk_factors: {
    structural: 'green' | 'yellow' | 'orange' | 'red';
    environmental: 'green' | 'yellow' | 'orange' | 'red';
    tourism_pressure: 'green' | 'yellow' | 'orange' | 'red';
  };
  best_time: string;
  duration: string;
  culture_notes: string;
  ai_summary: string;
  image_urls: string[];
  index_score: number;
  nearby_places: NearbyPlace[];
}

export interface Review {
  id: string;
  site_id: string;
  author_name: string;
  review_text: string;
  created_at: string;
}

export const MOCK_SITES: Site[] = [
  {
    id: "1",
    name: "Jaugada (Ruined Fortress)",
    region: "Ganjam, Odisha",
    lat: 19.5333,
    lng: 84.8167,
    category: "monument",
    terrain_type: "hilly",
    risk_level: "yellow",
    verification_status: "officially_verified",
    risk_factors: { structural: "orange", environmental: "green", tourism_pressure: "green" },
    best_time: "October - March",
    duration: "2-3 hours",
    culture_notes: "Once a provincial Mauryan fortified capital of Kalinga. Famous for the stone-cut edicts in Prakrit of the emperor Ashoka.",
    ai_summary: "Jaugada is a ruined fortress in Odisha. It lies 35 km from Brahmapur. Despite historical descriptions of fortification towers and moats, the remains are difficult to visualize today. It is near the great Shiva temple Kaleswar & Rameswar.",
    image_urls: [
      "/images/jaugada_1.png",
      "/images/jaugada_2.png",
      "/images/jaugada_3.png"
    ],
    index_score: 85,
    nearby_places: []
  },
  {
    id: "2",
    name: "Sisupalgarh",
    region: "Bhubaneswar, Odisha",
    lat: 20.2285,
    lng: 85.8505,
    category: "settlement",
    terrain_type: "generic",
    risk_level: "orange",
    verification_status: "officially_verified",
    risk_factors: { structural: "red", environmental: "yellow", tourism_pressure: "orange" },
    best_time: "October - February",
    duration: "1-2 hours",
    culture_notes: "This defensive settlement originated prior to the Mauryan empire and had an ancient population of 20,000 to 25,000.",
    ai_summary: "The remains of the ancient city Sisupalgarh have been discovered near Bhubaneswar. On the basis of architectural patterns, historians claim it flourished between the 5th century BC and 4th century AD.",
    image_urls: [
      "/images/sisupalgarh_1.png",
      "/images/sisupalgarh_2.png",
      "/images/sisupalgarh_3.png"
    ],
    index_score: 92,
    nearby_places: []
  },
  {
    id: "3",
    name: "Dhauli Shanti Stupa",
    region: "Bhubaneswar, Odisha",
    lat: 20.1923,
    lng: 85.8394,
    category: "monument",
    terrain_type: "hilly",
    risk_level: "green",
    verification_status: "officially_verified",
    risk_factors: { structural: "green", environmental: "green", tourism_pressure: "yellow" },
    best_time: "November - March",
    duration: "1-2 hours",
    culture_notes: "Built on the site where the famous Kalinga War was fought, commemorating Ashoka's mission of peace.",
    ai_summary: "The Dhauli Shanti Stupa (Peace Pagoda) was built by the Japan Buddha Sangha in 1972. It is built on the site of the bloodiest war in Indian history, the Kalinga War, which ended with a successful mission of peace.",
    image_urls: [
      "/images/dhauli_1.png",
      "/images/dhauli_2.png",
      "/images/dhauli_3.png"
    ],
    index_score: 88,
    nearby_places: []
  },
  {
    id: "4",
    name: "Saptashrungi Temple",
    region: "Nashik, Maharashtra",
    lat: 20.3920,
    lng: 73.8960,
    category: "temple",
    terrain_type: "hilly",
    risk_level: "yellow",
    verification_status: "community_verified",
    risk_factors: { structural: "green", environmental: "orange", tourism_pressure: "red" },
    best_time: "September - February",
    duration: "3-4 hours",
    culture_notes: "A major pilgrimage site located on seven hills, dedicated to the Goddess Saptashrungi Nivasini.",
    ai_summary: "Saptashrungi is a site of Hindu pilgrimage situated 60 kilometers from Nashik. According to Hindu traditions, the goddess Saptashrungi Nivasini dwells within the seven mountain peaks. It is a highly revered Shakti Peetha.",
    image_urls: [
      "/images/saptashrungi_1.png",
      "/images/saptashrungi_2.png",
      "/images/saptashrungi_3.png"
    ],
    index_score: 82,
    nearby_places: []
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    site_id: "1",
    author_name: "Rahul M.",
    review_text: "The rock edicts here are fascinating. So much history hidden in plain sight.",
    created_at: new Date().toISOString()
  },
  {
    id: "r2",
    site_id: "3",
    author_name: "Priya S.",
    review_text: "The peace pagoda really lives up to its name. A very serene environment with an incredible view.",
    created_at: new Date().toISOString()
  }
];

// Helper to get distance (Haversine)
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}
