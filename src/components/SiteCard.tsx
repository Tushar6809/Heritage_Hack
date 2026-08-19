import Link from 'next/link';
import { MapPin, Mountain, Waves, Navigation } from 'lucide-react';
import type { Site } from '@/lib/data';

interface SiteCardProps {
  site: Site;
  distance?: number;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function SiteCard({ site, distance, isActive, onMouseEnter, onMouseLeave }: SiteCardProps) {
  return (
    <Link 
      href={`/site/${site.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] border transition-all hover:shadow-lg ${isActive ? 'border-accent bg-surface-hover shadow-lg' : 'border-surface-hover bg-surface hover:border-surface-hover/80'}`}
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-hover">
        {site.image_urls[0] && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${site.image_urls[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        
        {/* Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          <RiskBadge level={site.risk_level} />
          <TerrainBadge type={site.terrain_type} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
            {site.name}
          </h3>
          <div className="flex h-8 items-center justify-center rounded-full border border-accent/20 bg-accent/10 px-2.5 text-sm font-black text-accent">
            {site.index_score}
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{site.region}</span>
        </div>

        {distance !== undefined && (
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent">
            <Navigation className="h-4 w-4" />
            {distance.toFixed(1)} km away
          </div>
        )}
      </div>
    </Link>
  );
}

function RiskBadge({ level }: { level: Site['risk_level'] }) {
  const styles = {
    green: 'bg-risk-green/15 text-risk-green border-risk-green/20',
    yellow: 'bg-risk-yellow/15 text-risk-yellow border-risk-yellow/20',
    orange: 'bg-risk-orange/15 text-risk-orange border-risk-orange/20',
    red: 'bg-risk-red/15 text-risk-red border-risk-red/20',
  };
  
  const labels = {
    green: 'Safe',
    yellow: 'Moderate',
    orange: 'Caution',
    red: 'High Risk',
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md ${styles[level]}`}>
      {labels[level]}
    </div>
  );
}

function TerrainBadge({ type }: { type: Site['terrain_type'] }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-surface-hover/50 bg-background/50 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-md">
      {type === 'hilly' && <Mountain className="h-3 w-3" />}
      {type === 'watery' && <Waves className="h-3 w-3" />}
      {type === 'generic' && <MapPin className="h-3 w-3" />}
      <span className="capitalize">{type}</span>
    </div>
  );
}
