"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Navigation, Clock, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { MOCK_SITES, getDistance, Site } from '@/lib/data';
import { MapWrapper } from '@/components/MapWrapper';

export default function RoutePlannerPage() {
  const [step, setStep] = useState(1);
  const [startLoc, setStartLoc] = useState('My Location');
  const [endLoc, setEndLoc] = useState('Bhubaneswar');
  const [preferences, setPreferences] = useState({
    history: true,
    temple: true
  });
  const [routeSites, setRouteSites] = useState<Site[]>([]);
  const [totalDist, setTotalDist] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      }, () => {
        // Fallback to Sambalpur if location blocked during demo
        setUserLocation([21.4688, 83.9744]);
      });
    }
  }, []);

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const generateRoute = () => {
    // 1. Fuzzy match typed locations to actual sites
    const findSite = (query: string) => {
      const q = query.toLowerCase();
      if (!q || q === 'my location') return null;
      return MOCK_SITES.find(s => s.name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q));
    };

    const startSite = findSite(startLoc);
    const endSite = findSite(endLoc);

    // 2. Filter remaining sites
    let filtered = MOCK_SITES.filter(site => {
      if (startSite && site.id === startSite.id) return false;
      if (endSite && site.id === endSite.id) return false;
      
      if (preferences.history && (site.category === 'monument' || site.category === 'settlement')) return true;
      if (preferences.temple && site.category === 'temple') return true;
      if (site.category === 'water') return true;
      return false;
    });

    if (filtered.length === 0) {
      filtered = MOCK_SITES.filter(s => s.id !== startSite?.id && s.id !== endSite?.id);
    }

    // 3. Mathematical Ellipse Geofence: 
    // Calculate precise coordinates to strictly exclude sites that take the user on massive detours.
    const getStartCoords = (): [number, number] => {
      if (startSite) return [startSite.lat, startSite.lng];
      if (startLoc.toLowerCase().includes('my location') && userLocation) return userLocation;
      return endSite ? [endSite.lat, endSite.lng] : [20.5937, 78.9629];
    };
    
    const getEndCoords = (): [number, number] => {
      if (endSite) return [endSite.lat, endSite.lng];
      return getStartCoords(); 
    };

    const startCoords = getStartCoords();
    const endCoords = getEndCoords();
    const directDist = getDistance(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);

    // Keep sites that don't add more than 80km to the total trip
    filtered = filtered.filter(s => {
      const distToSite = getDistance(startCoords[0], startCoords[1], s.lat, s.lng);
      const distFromSite = getDistance(s.lat, s.lng, endCoords[0], endCoords[1]);
      return (distToSite + distFromSite) <= (directDist + 80);
    });

    // 4. Sort remaining valid sites geographically to prevent zigzagging
    filtered.sort((a, b) => {
      const distA = getDistance(startCoords[0], startCoords[1], a.lat, a.lng);
      const distB = getDistance(startCoords[0], startCoords[1], b.lat, b.lng);
      return distA - distB;
    });

    // 5. Construct route array
    let selected: Site[] = [];
    if (startSite) selected.push(startSite);
    selected = [...selected, ...filtered.slice(0, 3)];
    if (endSite) selected.push(endSite);

    if (selected.length === 0) selected = filtered.slice(0, 5); // ultimate fallback

    setRouteSites(selected);

    // Calculate real distances
    let dist = 0;
    
    // Add distance from start location to first site if applicable
    if (!startSite && selected.length > 0) {
      dist += getDistance(startCoords[0], startCoords[1], selected[0].lat, selected[0].lng);
    }

    for (let i = 0; i < selected.length - 1; i++) {
      dist += getDistance(selected[i].lat, selected[i].lng, selected[i+1].lat, selected[i+1].lng);
    }
    
    // Add distance to end location if applicable
    if (!endSite && selected.length > 0) {
      dist += getDistance(selected[selected.length - 1].lat, selected[selected.length - 1].lng, endCoords[0], endCoords[1]);
    }
    
    // Add minimal 5km buffer for local city traversal
    setTotalDist(dist + 5);
    setStep(2);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background min-h-[calc(100vh-64px)] p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-4 mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Plan a Heritage Route</h1>
            <p className="text-lg text-foreground/60">Generate a personalized travel itinerary between your locations.</p>
          </div>

          {step === 1 && (
            <div className="bg-surface border border-surface-hover rounded-[2rem] p-8 shadow-xl max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
              
              <div className="space-y-4">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Start Location</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input type="text" value={startLoc} onChange={(e) => setStartLoc(e.target.value)} placeholder="e.g. Current Location" className="w-full bg-background border border-surface-hover rounded-xl py-4 pl-12 pr-4 font-medium focus:outline-none focus:border-accent" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Destination</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <input type="text" value={endLoc} onChange={(e) => setEndLoc(e.target.value)} placeholder="e.g. Bhubaneswar" className="w-full bg-background border border-surface-hover rounded-xl py-4 pl-12 pr-4 font-medium focus:outline-none focus:border-accent" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Preferences</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'history', label: '🏛️ Historical places' },
                    { key: 'temple', label: '🛕 Temples' },
                  ].map(p => (
                    <button 
                      key={p.key} 
                      onClick={() => togglePref(p.key as any)}
                      className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors ${preferences[p.key as keyof typeof preferences] ? 'bg-accent/20 border-accent text-accent' : 'bg-background border-surface-hover text-foreground/60 hover:border-foreground/30'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateRoute}
                className="w-full py-4 bg-accent text-background rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform"
              >
                Generate Route
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              
              {/* Route Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-accent/10 border border-accent/20 rounded-[2rem] p-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-2">{startLoc} to {endLoc}</h2>
                  <div className="flex flex-wrap gap-4 text-sm font-bold text-foreground/80">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" /> {totalDist.toFixed(1)} km</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-accent" /> ~{(totalDist / 40).toFixed(1)} hr driving</span>
                    <span>• {routeSites.length} heritage stops</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="px-8 py-4 bg-accent text-background rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center gap-2"
                >
                  <Navigation className="h-5 w-5" /> Start Navigation
                </button>
              </div>

              {/* Timeline */}
              <div className="max-w-2xl mx-auto space-y-6 relative before:absolute before:inset-0 before:ml-[28px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-surface before:via-surface-hover before:to-surface">
                
                {/* Dynamic Stops */}
                {routeSites.map((site, index) => {
                  let nextDist = 10;
                  if (index < routeSites.length - 1) {
                    nextDist = getDistance(site.lat, site.lng, routeSites[index+1].lat, routeSites[index+1].lng);
                  }

                  const isStart = index === 0;
                  const isEnd = index === routeSites.length - 1;
                  const emoji = site.category === 'temple' ? '🛕' : (site.category === 'water' ? '💧' : '🏛️');

                  return (
                    <div key={site.id}>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-background ${isStart || isEnd ? 'bg-surface text-foreground shadow' : 'bg-accent/20 text-accent shadow'} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold text-xl`}>
                          {isStart ? '🏁' : (isEnd ? '🎯' : emoji)}
                        </div>
                        <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${isStart || isEnd ? 'border-surface-hover bg-background' : 'border-accent/20 bg-surface shadow-lg'}`}>
                          <h3 className="font-bold text-lg">{site.name}</h3>
                          <p className="text-sm text-foreground/60 mb-2">{isStart ? 'Start Point' : (isEnd ? 'Destination' : 'Heritage Stop')}</p>
                          <Link href={`/site/${site.id}`} className="text-xs font-bold text-accent hover:underline">View details &rarr;</Link>
                        </div>
                      </div>
                      {index < routeSites.length - 1 && (
                        <div className="text-center text-sm font-bold text-accent/80 py-2">↓ {nextDist.toFixed(1)} km</div>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-[70vh] rounded-[2rem] overflow-hidden border border-surface-hover shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
              
              {/* Fake Navigation Sidebar */}
              <div className="w-full md:w-80 bg-background border-r border-surface-hover p-6 flex flex-col z-20 shadow-xl">
                <button onClick={() => setStep(2)} className="text-sm font-bold text-foreground/60 hover:text-foreground mb-8 flex items-center gap-2">
                  &larr; Exit Navigation
                </button>
                <div className="flex-1">
                  <div className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Next Stop</div>
                  <h2 className="font-serif text-3xl font-bold mb-2">{routeSites[0]?.name || endLoc}</h2>
                  
                  <div className="space-y-4 mt-8">
                    <button className="w-full py-4 bg-accent text-background rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                      <Navigation className="h-5 w-5" /> Continue
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-surface-hover relative overflow-hidden flex items-center justify-center p-2">
                <MapWrapper 
                  sites={routeSites} 
                  center={[routeSites[0]?.lat || 20.5937, routeSites[0]?.lng || 78.9629]} 
                  zoom={12} 
                />
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
