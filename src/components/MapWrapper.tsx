"use client";

import dynamic from 'next/dynamic';
import type { Site } from '@/lib/data';

// Wrap the leaflet map to disable SSR
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full rounded-2xl bg-surface-hover animate-pulse" />
});

interface MapWrapperProps {
  sites: Site[];
  center: [number, number];
  zoom?: number;
  activeSiteId?: string | null;
  userLocation?: [number, number];
}

export function MapWrapper(props: MapWrapperProps) {
  return <Map {...props} />;
}
