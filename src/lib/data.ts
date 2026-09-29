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
      "/images/jaugada_1.jpeg",
      "/images/jaugada_2.jpeg",
      "/images/jaugada_1.jpeg"
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
      "/images/sisupalgarh_1.jpeg",
      "/images/sisupalgarh_2.jpeg",
      "/images/sisupalgarh_1.jpeg"
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
    culture_notes: "Built on the very site where the famous Kalinga War was fought in the 3rd century BC, Dhauli hill represents a major turning point in world history. It was here that Emperor Ashoka, after witnessing immense bloodshed, renounced violence and embraced Buddhism, dedicating his life to peace and dharma. The hill features ancient rock edicts where Ashoka's messages of compassion are permanently carved into stone.",
    ai_summary: "The Dhauli Shanti Stupa (Peace Pagoda) was built by the Japan Buddha Sangha in 1972. Beyond its stunning white dome and golden statues, it stands on the banks of the Daya River—which legend says turned red with blood during the Kalinga War. Today, it serves as a global symbol of peace. Visitors consistently praise the serene atmosphere, panoramic views of the river plains, and the profound historical energy of the ancient rock edicts located just below the stupa.",
    image_urls: [
      "/images/dhauli_1.jpeg",
      "/images/dhauli_2.jpeg",
      "/images/dhauli_1.jpeg"
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
      "/images/saptashrungi_1.jpeg",
      "/images/saptashrungi_2.jpeg",
      "/images/saptashrungi_1.jpeg"
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
      "/images/huma_1.jpeg",
      "/images/huma_2.jpeg",
      "/images/huma_3.jpeg"
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
      "/images/samleswari_1.jpeg",
      "/images/samleswari_2.jpeg",
      "/images/samleswari_3.jpeg"
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
      "/images/hirakud_1.jpeg",
      "/images/hirakud_2.jpeg",
      "/images/hirakud_3.jpeg"
    ],
    index_score: 91,
    nearby_places: []
  },
  {
    id: "8",
    name: "Rani ki Vav",
    region: "Patan, Gujarat",
    lat: 23.8587,
    lng: 72.1011,
    category: "monument",
    terrain_type: "generic",
    risk_level: "green",
    verification_status: "officially_verified",
    risk_factors: { structural: "green", environmental: "yellow", tourism_pressure: "orange" },
    best_time: "October - March",
    duration: "2-3 hours",
    culture_notes: "An intricately constructed stepwell acting as a subterranean water resource and storage system. Designed as an inverted temple highlighting the sanctity of water.",
    ai_summary: "An incredibly detailed stepwell containing over 500 principal sculptures. It's an architectural marvel representing the pinnacle of Maru-Gurjara architectural style.",
    image_urls: [
      "/images/ranikivav_1.jpeg",
      "/images/ranikivav_2.jpeg",
      "/images/ranikivav_1.jpeg"
    ],
    index_score: 94,
    nearby_places: []
  },
  {
    id: "9",
    name: "Living Root Bridges",
    region: "Nongriat, Meghalaya",
    lat: 25.2638,
    lng: 91.6841,
    category: "nature",
    terrain_type: "hilly",
    risk_level: "orange",
    verification_status: "community_verified",
    risk_factors: { structural: "yellow", environmental: "red", tourism_pressure: "orange" },
    best_time: "October - May",
    duration: "4-6 hours (includes trekking)",
    culture_notes: "Handmade from the aerial roots of rubber fig trees by the Khasi and Jaintia peoples. A testament to indigenous botanical engineering.",
    ai_summary: "Accessible via a challenging trek, these incredible natural bridges cross turbulent rivers. The Double Decker bridge at Nongriat is particularly famous. Visitors must respect the fragile ecosystem.",
    image_urls: [
      "/images/rootbridge_1.jpeg",
      "/images/rootbridge_2.jpeg",
      "/images/rootbridge_1.jpeg"
    ],
    index_score: 87,
    nearby_places: []
  },
  {
    id: "10",
    name: "Lepakshi Temple (Veerabhadra)",
    region: "Anantapur, Andhra Pradesh",
    lat: 13.8016,
    lng: 77.6067,
    category: "temple",
    terrain_type: "generic",
    risk_level: "green",
    verification_status: "officially_verified",
    risk_factors: { structural: "yellow", environmental: "green", tourism_pressure: "green" },
    best_time: "October - February",
    duration: "2-4 hours",
    culture_notes: "Built in the 16th century, it is famous for its hanging pillar, intricate frescoes, and the colossal monolithic Nandi (bull) statue nearby.",
    ai_summary: "A spectacular example of Vijayanagara architectural style. The hanging pillar, which does not touch the ground, remains a popular fascination for visitors.",
    image_urls: [
      "/images/lepakshi_1.jpeg",
      "/images/lepakshi_2.jpeg",
      "/images/lepakshi_1.jpeg"
    ],
    index_score: 93,
    nearby_places: []
  },
  {
    id: "11",
    name: "Kumbhalgarh Fort",
    region: "Rajsamand, Rajasthan",
    lat: 25.1481,
    lng: 73.5855,
    category: "monument",
    terrain_type: "hilly",
    risk_level: "green",
    verification_status: "officially_verified",
    risk_factors: { structural: "green", environmental: "green", tourism_pressure: "orange" },
    best_time: "October - March",
    duration: "4-5 hours",
    culture_notes: "Built during the 15th century by Rana Kumbha. It has the second-longest continuous wall in the world, often called the Great Wall of India.",
    ai_summary: "A massive, awe-inspiring hill fort in the Aravalli range. The sheer scale of its 36km wall and the numerous temples inside make it an unforgettable historical journey.",
    image_urls: [
      "/images/kumbhalgarh_1.jpeg",
      "/images/kumbhalgarh_2.jpeg",
      "/images/kumbhalgarh_1.jpeg"
    ],
    index_score: 96,
    nearby_places: []
  },
  {
    id: "12",
    name: "Kathkuni Houses",
    region: "Himachal Pradesh",
    lat: 31.1048,
    lng: 77.1734,
    category: "settlement",
    terrain_type: "hilly",
    risk_level: "yellow",
    verification_status: "community_verified",
    risk_factors: { structural: "orange", environmental: "red", tourism_pressure: "green" },
    best_time: "March - June",
    duration: "2-3 hours",
    culture_notes: "Traditional architecture constructed using alternating layers of long wood logs and stone masonry without mortar, designed to withstand intense cold and severe earthquakes.",
    ai_summary: "An indigenous architectural marvel from the Himalayas. The flexible joints and raised stone plinths are perfectly adapted to the seismic zones and snowy climate of Himachal.",
    image_urls: [
      "/images/kathkuni_1.jpeg",
      "/images/kathkuni_2.jpeg",
      "/images/kathkuni_1.jpeg"
    ],
    index_score: 85,
    nearby_places: []
  },
  {
    id: "13",
    name: "Chang Ghar",
    region: "Assam",
    lat: 26.2006,
    lng: 92.9376,
    category: "settlement",
    terrain_type: "watery",
    risk_level: "orange",
    verification_status: "oral_tradition",
    risk_factors: { structural: "yellow", environmental: "orange", tourism_pressure: "green" },
    best_time: "November - April",
    duration: "1-2 hours",
    culture_notes: "Stilt houses traditionally built by the Mising community. Built on raised bamboo or wooden stilts to combat recurring floods and extreme humidity.",
    ai_summary: "These stilted bamboo houses are brilliantly designed for flood-prone regions. The raised floors provide ventilation and keep the living areas completely dry during the monsoon.",
    image_urls: [
      "/images/changghar_1.jpeg",
      "/images/changghar_2.jpeg",
      "/images/changghar_1.jpeg"
    ],
    index_score: 82,
    nearby_places: []
  },
  {
    id: "14",
    name: "Bhunga Houses",
    region: "Kutch, Gujarat",
    lat: 23.7337,
    lng: 69.8597,
    category: "settlement",
    terrain_type: "generic",
    risk_level: "green",
    verification_status: "officially_verified",
    risk_factors: { structural: "green", environmental: "green", tourism_pressure: "yellow" },
    best_time: "October - March",
    duration: "2-3 hours",
    culture_notes: "Circular, thick mud-walled houses with lightweight conical roofs. This unique form protects the inhabitants from the extreme desert heat and provides incredible seismic stability.",
    ai_summary: "Following the devastating 2001 Gujarat earthquake, these traditional circular homes stood strong while modern concrete structures collapsed. They are a masterclass in resilient, climate-responsive design.",
    image_urls: [
      "/images/bhunga_1.jpeg",
      "/images/bhunga_2.jpeg",
      "/images/bhunga_1.jpeg"
    ],
    index_score: 95,
    nearby_places: []
  },
  {
    id: "15",
    name: "Nalukettu",
    region: "Kerala",
    lat: 10.8505,
    lng: 76.2711,
    category: "settlement",
    terrain_type: "generic",
    risk_level: "green",
    verification_status: "community_verified",
    risk_factors: { structural: "green", environmental: "green", tourism_pressure: "orange" },
    best_time: "September - March",
    duration: "2-4 hours",
    culture_notes: "Traditional ancestral homes of Kerala featuring a central open courtyard (Nadumuttam). Designed for maximum cross-ventilation in a hot, humid monsoon climate.",
    ai_summary: "The sloping tiled roofs and open central courtyard keep these houses naturally cool, even in the peak of summer. The design brilliantly funnels monsoon rain into the central basin.",
    image_urls: [
      "/images/nalukettu_1.jpeg",
      "/images/nalukettu_2.jpeg",
      "/images/nalukettu_1.jpeg"
    ],
    index_score: 90,
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
