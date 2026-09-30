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
      <Link href={`/site/${siteId}/ar`} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold transition hover:scale-105 shadow-lg shadow-purple-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
        AR Vision
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
