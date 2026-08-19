"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation, MapPin, Search } from 'lucide-react';
import { MOCK_SITES } from '@/lib/data';

export function LocationInput() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNearMe = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          router.push(`/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error getting location", error);
          setLoading(false);
          alert("Could not get your location. Please select a place from the dropdown instead.");
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSelectPlace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const siteId = e.target.value;
    if (!siteId) return;
    const site = MOCK_SITES.find(s => s.id === siteId);
    if (site) {
      router.push(`/nearby?lat=${site.lat}&lng=${site.lng}`);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center min-[430px]:flex-row">
      <button
        onClick={handleNearMe}
        disabled={loading}
        className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent py-1 pl-5 pr-1 text-sm font-black text-black no-underline shadow-[0_14px_38px_rgba(63,163,77,0.22)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 min-[430px]:min-w-[11rem]"
      >
        {loading ? "Locating..." : "Find Near Me"}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-foreground transition-transform group-hover:scale-105">
          <Navigation className="h-4 w-4" />
        </span>
      </button>

      <div className="relative flex-1 sm:max-w-xs">
        <select
          onChange={handleSelectPlace}
          className="w-full appearance-none rounded-full border border-surface-hover bg-surface px-5 py-3.5 pl-12 text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent/40 focus:border-accent"
          defaultValue=""
        >
          <option value="" disabled>Planning to visit...</option>
          {MOCK_SITES.map(site => (
            <option key={site.id} value={site.id}>{site.name} ({site.region})</option>
          ))}
        </select>
        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
      </div>
    </div>
  );
}
