"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_SITES } from '@/lib/data';

export default function VirtualTourPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const site = MOCK_SITES.find(s => s.id === params.id);
  
  const demoLocations = [
    { name: 'Actual Site', lat: site?.lat || 0, lng: site?.lng || 0 },
    { name: 'Qutub Minar', lat: 28.5245, lng: 77.1855 },
    { name: 'Taj Mahal', lat: 27.1751, lng: 78.0421 },
    { name: 'Red Fort', lat: 28.6562, lng: 77.2410 }
  ];

  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !site) return null;

  const activeLat = demoLocations[activeDemo].lat;
  const activeLng = demoLocations[activeDemo].lng;

  return (
    <>
      <Header />
      <main className="bg-background h-[calc(100vh-64px)] flex flex-col relative overflow-hidden">
        
        {/* Top Bar */}
        <div className="absolute top-0 w-full z-10 bg-gradient-to-b from-black/80 to-transparent p-6 flex flex-wrap gap-4 justify-between items-center text-white">
          <Link href={`/site/${params.id}`} className="hover:text-accent font-bold flex items-center gap-2 backdrop-blur-md bg-black/40 px-4 py-2 rounded-full border border-white/10">
            &larr; Exit Virtual Tour
          </Link>
          
          <div className="flex items-center gap-4">
            <select 
              value={activeDemo}
              onChange={(e) => setActiveDemo(Number(e.target.value))}
              className="text-sm font-bold bg-black/40 backdrop-blur-md text-accent border border-accent/30 px-4 py-2 rounded-xl focus:outline-none focus:border-accent"
            >
              {demoLocations.map((loc, i) => (
                <option key={loc.name} value={i} className="bg-gray-900">{loc.name}</option>
              ))}
            </select>
            <div className="font-serif text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent hidden sm:block">
              360° STREET VIEW
            </div>
          </div>
        </div>

        {/* 360 Street View Container */}
        <div className="flex-1 w-full h-full relative bg-gray-900">
          <iframe 
            src={`https://maps.google.com/maps?q=&layer=c&cbll=${activeLat},${activeLng}&cbp=11,0,0,0,0&output=svembed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          {/* Scanning Overlay Effects (Optional, for sci-fi feel) */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-accent/20 m-4 rounded-[2rem]">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent rounded-tl-[2rem]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent rounded-tr-[2rem]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent rounded-bl-[2rem]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent rounded-br-[2rem]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
