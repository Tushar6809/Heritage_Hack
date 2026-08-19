"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Site } from '@/lib/data';
import Link from 'next/link';
import { Mountain, Waves, MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default Leaflet icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// India bounds
const INDIA_BOUNDS = L.latLngBounds(
  L.latLng(6.4626999, 68.1097), // Southwest
  L.latLng(35.513327, 97.395358) // Northeast
);

interface MapProps {
  sites: Site[];
  center: [number, number];
  zoom?: number;
  activeSiteId?: string | null;
  userLocation?: [number, number];
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [center, zoom, map]);
  return null;
}

const getCategoryIcon = (category: string, isActive: boolean) => {
  let emoji = "📍";
  switch (category) {
    case 'monument': emoji = "🏛️"; break;
    case 'temple': emoji = "🛕"; break;
    case 'nature': emoji = "⛰️"; break;
    case 'water': emoji = "💧"; break;
    case 'food': emoji = "🍛"; break;
    case 'festival': emoji = "🎭"; break;
    case 'settlement': emoji = "🏘️"; break;
    case 'oral_history': emoji = "📜"; break;
    case 'at_risk': emoji = "⚠️"; break;
  }

  const activeStyles = isActive 
    ? "bg-accent text-background scale-125 z-50 ring-4 ring-accent/30" 
    : "bg-surface border-2 border-accent/50 hover:scale-110 text-foreground";

  return L.divIcon({
    html: `<div class="flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-out ${activeStyles}" style="width: 40px; height: 40px; font-size: 20px;">
             ${emoji}
           </div>`,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

const userIcon = L.divIcon({
  html: `<div class="flex items-center justify-center rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white transition-all duration-300" style="width: 20px; height: 20px;"></div>`,
  className: 'custom-leaflet-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function Map({ sites, center, zoom = 6, activeSiteId, userLocation }: MapProps) {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-surface-hover shadow-xl">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={4}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map tiles
        />
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={getCategoryIcon(site.category, site.id === activeSiteId)}
            zIndexOffset={site.id === activeSiteId ? 1000 : 0}
          >
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 p-1 min-w-[200px]">
                <div className="font-serif font-bold text-lg leading-tight text-foreground">{site.name}</div>
                <div className="text-xs text-foreground/60">{site.region}</div>
                <Link 
                  href={`/site/${site.id}`}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent/20 px-3 py-1.5 text-xs font-bold text-accent transition-colors hover:bg-accent/30"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon} zIndexOffset={2000}>
            <Popup className="custom-popup">
              <div className="font-bold text-foreground">You are here</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
