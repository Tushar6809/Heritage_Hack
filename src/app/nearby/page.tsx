"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteCard } from '@/components/SiteCard';
import { MOCK_SITES, getDistance, type Site } from '@/lib/data';
import { MapWrapper } from '@/components/MapWrapper';

function NearbyContent() {
  const searchParams = useSearchParams();
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // Default India center
  const [userLocation, setUserLocation] = useState<[number, number]>([20.5937, 78.9629]);
  const [nearbySites, setNearbySites] = useState<(Site & { distance: number })[]>([]);
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Historical', 'Nature', 'Food', 'Festivals', 'At Risk'];
  const categoryMap: Record<string, string[]> = {
    'Historical': ['monument', 'settlement', 'oral_history'],
    'Nature': ['nature', 'water'],
    'Food': ['food'],
    'Festivals': ['festival'],
    'At Risk': ['at_risk']
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        }
      );
    }
  }, []);

  useEffect(() => {
    let referencePoint = userLocation;
    
    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCenter([lat, lng]);
        referencePoint = [lat, lng];
      }
    } else {
      setCenter(userLocation);
    }
    
    const sorted = MOCK_SITES.map(site => ({
      ...site,
      distance: getDistance(referencePoint[0], referencePoint[1], site.lat, site.lng)
    })).sort((a, b) => a.distance - b.distance);
    
    setNearbySites(sorted);
  }, [latParam, lngParam, userLocation]);

  return (
    <>
      {/* Sidebar - List View */}
      <div className="w-full border-r border-surface-hover bg-background md:w-[400px] lg:w-[450px] flex flex-col h-[50vh] md:h-full">
        <div className="p-4 border-b border-surface-hover bg-surface/50 backdrop-blur-md">
          <h2 className="font-serif text-2xl font-bold">Nearby Heritage</h2>
          <p className="text-sm text-foreground/60">{nearbySites.length} sites discovered near you</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${filter === c ? 'bg-accent text-background' : 'bg-surface hover:bg-surface-hover text-foreground/80'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {nearbySites.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center">
              <p className="font-semibold text-foreground">No hidden sites found nearby.</p>
              <p className="mt-1 text-sm text-foreground/60">Try searching a different location.</p>
            </div>
          ) : (
            nearbySites
              .filter(site => {
                if (filter === 'All') return true;
                const mappedCats = categoryMap[filter] || [];
                return mappedCats.includes(site.category);
              })
              .map(site => (
              <SiteCard 
                key={site.id} 
                site={site} 
                distance={site.distance}
                isActive={activeSiteId === site.id}
                onMouseEnter={() => {
                  setActiveSiteId(site.id);
                  setCenter([site.lat, site.lng]);
                }}
                onMouseLeave={() => setActiveSiteId(null)}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Content - Map */}
      <div className="flex-1 p-2 md:p-4 h-[50vh] md:h-full bg-surface-hover">
        <MapWrapper 
          sites={nearbySites.filter(site => filter === 'All' ? true : (categoryMap[filter] || []).includes(site.category))} 
          center={center} 
          activeSiteId={activeSiteId}
          userLocation={userLocation}
        />
      </div>
    </>
  );
}

export default function NearbyPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
          <NearbyContent />
        </Suspense>
      </main>
    </>
  );
}
