"use client";

import { Bookmark, Share, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SiteActionButtonsProps {
  siteId: string;
}

export function SiteActionButtons({ siteId }: SiteActionButtonsProps) {
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Heritage Site',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      alert('Site saved to your itinerary!');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 pt-2">
      <Link href={`/route?destination=${siteId}`} className="flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-bold transition hover:scale-105">
        <Navigation className="h-4 w-4" /> Start Route
      </Link>
      <button 
        onClick={handleSave}
        className={`flex items-center gap-2 border px-6 py-3 rounded-full font-bold transition ${saved ? 'bg-accent/20 border-accent text-accent' : 'bg-surface border-surface-hover text-foreground hover:bg-surface-hover'}`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
      </button>
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 bg-surface border border-surface-hover text-foreground px-6 py-3 rounded-full font-bold transition hover:bg-surface-hover"
      >
        <Share className="h-4 w-4" /> Share
      </button>
    </div>
  );
}
