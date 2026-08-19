import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { MOCK_SITES, MOCK_REVIEWS, type Site } from '@/lib/data';
import { MapPin, Navigation, BookOpen, ShieldCheck, AlertTriangle, Calendar, Clock, Compass, Share, Bookmark, Users, Info } from 'lucide-react';
import { MapWrapper } from '@/components/MapWrapper';
import Link from 'next/link';

export default async function SitePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const site = MOCK_SITES.find(s => s.id === resolvedParams.id);
  
  if (!site) {
    notFound();
  }

  const reviews = MOCK_REVIEWS.filter(r => r.site_id === site.id);

  // Helper for Verification Status
  const getVerificationBadge = (status: Site['verification_status']) => {
    switch(status) {
      case 'officially_verified': return { icon: <ShieldCheck className="h-4 w-4"/>, text: "Officially Verified", color: "text-risk-green border-risk-green/30 bg-risk-green/10" };
      case 'community_verified': return { icon: <ShieldCheck className="h-4 w-4"/>, text: "Community Verified", color: "text-accent border-accent/30 bg-accent/10" };
      case 'under_verification': return { icon: <Info className="h-4 w-4"/>, text: "Under Verification", color: "text-risk-yellow border-risk-yellow/30 bg-risk-yellow/10" };
      case 'oral_tradition': return { icon: <Users className="h-4 w-4"/>, text: "Oral Tradition", color: "text-foreground/80 border-surface-hover bg-surface" };
    }
  };

  const verBadge = getVerificationBadge(site.verification_status);

  // Helper for Risk Color
  const getRiskColor = (level: string) => {
    switch(level) {
      case 'green': return "text-risk-green";
      case 'yellow': return "text-risk-yellow";
      case 'orange': return "text-risk-orange";
      case 'red': return "text-risk-red";
      default: return "text-foreground";
    }
  };

  const getRiskLabel = (level: string) => {
    switch(level) {
      case 'green': return "Low";
      case 'yellow': return "Moderate";
      case 'orange': return "High";
      case 'red': return "Critical";
      default: return "Unknown";
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pb-20">
        
        {/* Top Navigation Bar */}
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center text-sm font-medium text-foreground/80">
          <Link href="/nearby" className="hover:text-foreground flex items-center gap-2">
            &larr; Back to List
          </Link>
          <Link href="/nearby" className="hover:text-foreground flex items-center gap-2">
            <Compass className="h-4 w-4" /> Open Full Map
          </Link>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{site.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <span className="capitalize px-3 py-1 bg-surface-hover rounded-md text-foreground">{site.category} Heritage</span>
                  <span className="flex items-center gap-1 text-accent">⭐ 4.7 (182 reviews)</span>
                  <span className="flex items-center gap-1 text-foreground/60"><MapPin className="h-4 w-4" /> {site.region}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`/route?destination=${site.id}`} className="flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-bold transition hover:scale-105">
                  <Navigation className="h-4 w-4" /> Start Route
                </Link>
                <button className="flex items-center gap-2 bg-surface border border-surface-hover text-foreground px-6 py-3 rounded-full font-bold transition hover:bg-surface-hover">
                  <Bookmark className="h-4 w-4" /> Save
                </button>
                <button className="flex items-center gap-2 bg-surface border border-surface-hover text-foreground px-6 py-3 rounded-full font-bold transition hover:bg-surface-hover">
                  <Share className="h-4 w-4" /> Share
                </button>
              </div>

              {/* About & Info Provenance */}
              <div className="pt-6 border-t border-surface-hover">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 text-xs font-bold ${verBadge.color}`}>
                  {verBadge.icon} {verBadge.text}
                </div>
                <h2 className="text-xl font-bold mb-3">About this site</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {site.culture_notes}
                </p>
              </div>
            </div>

            {/* Hero Image / Map Container */}
            <div className="w-full lg:w-[500px] space-y-4">
              <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden bg-surface shadow-2xl">
                {site.image_urls[0] && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${site.image_urls[0]})` }}
                  />
                )}
              </div>
              <div className="h-[200px] w-full rounded-3xl overflow-hidden border border-surface-hover shadow-lg">
                <MapWrapper sites={[site]} center={[site.lat, site.lng]} zoom={13} activeSiteId={site.id} />
              </div>
            </div>
            
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Risk Breakdown */}
            <div className="rounded-[2rem] bg-surface p-6 md:p-8 border border-surface-hover shadow-xl">
              <h3 className="flex items-center gap-2 font-bold text-lg mb-6">
                <AlertTriangle className="h-5 w-5 text-foreground/60" /> Preservation Risk
              </h3>
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-surface-hover">
                <span className="text-foreground/80">Overall Status</span>
                <span className={`font-black text-xl uppercase ${getRiskColor(site.risk_level)}`}>
                  {getRiskLabel(site.risk_level)}
                </span>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Structural condition</span>
                  <span className={`px-2 py-1 rounded bg-background/50 ${getRiskColor(site.risk_factors.structural)}`}>{getRiskLabel(site.risk_factors.structural)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Environmental threat</span>
                  <span className={`px-2 py-1 rounded bg-background/50 ${getRiskColor(site.risk_factors.environmental)}`}>{getRiskLabel(site.risk_factors.environmental)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Tourism pressure</span>
                  <span className={`px-2 py-1 rounded bg-background/50 ${getRiskColor(site.risk_factors.tourism_pressure)}`}>{getRiskLabel(site.risk_factors.tourism_pressure)}</span>
                </div>
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="rounded-[2rem] bg-surface p-6 md:p-8 border border-surface-hover shadow-xl">
              <h3 className="flex items-center gap-2 font-bold text-lg mb-6">
                <Calendar className="h-5 w-5 text-foreground/60" /> Best Time to Visit
              </h3>
              <div className="text-2xl font-black text-accent mb-6">
                {site.best_time}
              </div>
              <ul className="space-y-3 text-sm text-foreground/80 mb-6">
                <li>🌡️ Comfortable weather</li>
                <li>👥 Moderate crowd</li>
                <li>📸 Good photography conditions</li>
              </ul>
              <div className="pt-6 border-t border-surface-hover">
                <div className="flex items-center gap-2 text-foreground/60 text-sm mb-1">
                  <Clock className="h-4 w-4" /> Recommended duration
                </div>
                <div className="font-bold">{site.duration}</div>
              </div>
            </div>

            {/* AI Review Summary */}
            <div className="rounded-[2rem] bg-accent/5 p-6 md:p-8 border border-accent/20 shadow-xl">
              <h3 className="flex items-center gap-2 font-bold text-lg mb-6 text-accent">
                <BookOpen className="h-5 w-5" /> AI Visitor Summary
              </h3>
              <div className="space-y-4 text-sm text-foreground/90">
                <div>
                  <strong className="block text-foreground mb-1">Visitors most frequently praised:</strong>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    <li>Architecture and history</li>
                    <li>Peaceful surroundings</li>
                    <li>Cultural authenticity</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-accent/10">
                  <strong className="block text-foreground mb-1">Overall:</strong>
                  <p>{site.ai_summary}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stories & Nearby Ecosystem */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl mt-16">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Community Stories */}
            <div className="flex-1 space-y-8">
              <h2 className="font-serif text-3xl font-bold">Stories from the Community</h2>
              <div className="space-y-6">
                {/* Mocked Community Stories instead of generic reviews */}
                <div className="p-6 rounded-2xl bg-surface border border-surface-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold">👤 Local Historian</div>
                    <div className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">✓ Community Verified</div>
                  </div>
                  <p className="text-foreground/80 italic">"My grandfather used to tell me that during the rainy season, the water from the nearby river would flow directly into the lower chambers of this site. It was an ancient cooling system."</p>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-surface-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold">👤 Traveling Scholar</div>
                  </div>
                  <p className="text-foreground/80 italic">"The stonework here is identical to some of the ruins found 50km away, suggesting a single dynasty ruled this entire corridor. A must-visit."</p>
                </div>
              </div>
            </div>

            {/* Nearby Ecosystem */}
            <div className="w-full lg:w-[400px]">
              <h2 className="font-serif text-3xl font-bold mb-8">What's Nearby</h2>
              
              <div className="space-y-8">
                {/* Dynamically render nearby places from mock data */}
                {site.nearby_places && site.nearby_places.length > 0 ? (
                  <div className="space-y-4">
                    {site.nearby_places.map(place => (
                      <div key={place.id} className="flex items-center justify-between p-4 rounded-xl border border-surface-hover bg-background hover:bg-surface transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-lg">
                            {place.type === 'food' ? '🍛' : place.type === 'artisan' ? '🎨' : '🏛️'}
                          </div>
                          <div>
                            <div className="font-bold">{place.name}</div>
                            <div className="text-xs text-accent uppercase tracking-wider font-semibold">{place.type}</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-foreground/60">{place.distanceKm} km</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center border border-dashed border-surface-hover rounded-2xl text-foreground/60">
                    <p>No verified local experiences registered yet.</p>
                    <button className="mt-4 text-sm font-bold text-accent hover:underline">Suggest a nearby business</button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </main>
    </>
  );
}
