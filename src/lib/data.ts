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
      "/images/jaugada_1.jpg",
      "/images/jaugada_2.jpg",
      "/images/jaugada_3.jpg"
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
      "/images/sisupalgarh_1.jpg",
      "/images/sisupalgarh_2.jpg",
      "/images/sisupalgarh_3.jpg"
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
      "/images/dhauli_1.jpg",
      "/images/dhauli_2.jpg",
      "/images/dhauli_3.jpg"
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
      "/images/saptashrungi_1.jpg",
      "/images/saptashrungi_2.jpg",
      "/images/saptashrungi_3.jpg"
    ],
    index_score: 82,
    nearby_places: []
  },
  {
    id: "5",
    name: "Leaning Temple of Huma",
    region: "Sambalpur, Odisha",
    lat: 21.2722,
    lng: 83.8961,
    category: "temple",
    terrain_type: "watery",
    risk_level: "yellow",
    verification_status: "officially_verified",
    risk_factors: { structural: "orange", environmental: "yellow", tourism_pressure: "green" },
    best_time: "October - March",
    duration: "1-2 hours",
    culture_notes: "Dedicated to Lord Bimaleshwar (Shiva), it is one of the world's rare leaning structures, featuring a stable tilt that has remained unchanged for generations.",
    ai_summary: "Located on the banks of the Mahanadi River, the Leaning Temple of Huma is a unique architectural marvel. The structural tilt is profound, yet the temple has remained stable for centuries.",
    image_urls: [
      "/images/huma_1.jpg",
      "/images/huma_2.jpg",
      "/images/huma_3.jpg"
    ],
    index_score: 89,
    nearby_places: []
  },
  {
    id: "6",
    name: "Samleswari Temple",
    region: "Sambalpur, Odisha",
    lat: 21.4688,
    lng: 83.9744,
    category: "temple",
    terrain_type: "generic",
    risk_level: "green",
    verification_status: "community_verified",
    risk_factors: { structural: "green", environmental: "green", tourism_pressure: "orange" },
    best_time: "September - March",
    duration: "2-3 hours",
    culture_notes: "Dedicated to Goddess Samaleswari (Mother of the Universe). She is the most revered deity in western Odisha after Lord Jagannath.",
    ai_summary: "Situated on the banks of the Mahanadi River, this temple holds profound religious significance across western Odisha and Chhattisgarh. The architecture and spiritual ambiance attract thousands of devotees.",
    image_urls: [
      "/images/samleswari_1.jpg",
      "/images/samleswari_2.jpg",
      "/images/samleswari_3.jpg"
    ],
    index_score: 95,
    nearby_places: []
  },
  {
    id: "7",
    name: "Hirakud Dam",
    region: "Sambalpur, Odisha",
    lat: 21.5294,
    lng: 83.8741,
    category: "water",
    terrain_type: "watery",
    risk_level: "yellow",
    verification_status: "officially_verified",
    risk_factors: { structural: "yellow", environmental: "orange", tourism_pressure: "green" },
    best_time: "Monsoon (July - September) or Winter",
    duration: "3-4 hours",
    culture_notes: "The world's longest earthen dam, built across the Mahanadi River in 1957. A major multipurpose project for flood control and irrigation.",
    ai_summary: "A monumental engineering achievement of modern India. The views from the Gandhi Minar and Nehru Minar towers are spectacular, especially during the monsoon when the reservoir is full.",
    image_urls: [
      "/images/hirakud_1.jpg",
      "/images/hirakud_2.jpg",
      "/images/hirakud_3.jpg"
    ],
    index_score: 91,
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
