"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Upload, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <Header />
      <main className="flex-1 bg-background min-h-[calc(100vh-64px)] p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-4 mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Community Contribution</h1>
            <p className="text-lg text-foreground/60">Help preserve hidden heritage by submitting sites, stories, and local knowledge.</p>
          </div>

          {!submitted ? (
            <div className="bg-surface border border-surface-hover rounded-[2rem] p-6 md:p-10 shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold mb-8">Add a Heritage Site</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                
                <div className="space-y-4">
                  <label className="text-sm font-bold text-foreground/80">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['🏛️ Monument', '🎭 Festival', '🎨 Craft', '🍛 Food', '📜 Story', '🏘️ Architecture', '🌿 Nature'].map(c => (
                      <label key={c} className="flex items-center gap-2 p-3 rounded-xl border border-surface-hover bg-background cursor-pointer hover:border-accent">
                        <input type="radio" name="category" className="accent-accent" required />
                        <span className="text-sm font-bold">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-foreground/80">Name</label>
                  <input type="text" placeholder="e.g. Ancient Stepwell of Village X" className="w-full bg-background border border-surface-hover rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-accent" required />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-foreground/80">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                    <input type="text" placeholder="Pin on map or type address..." className="w-full bg-background border border-surface-hover rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:border-accent" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-foreground/80">Description & Local Story</label>
                  <textarea rows={4} placeholder="Share the history or local stories behind this place..." className="w-full bg-background border border-surface-hover rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-accent" required></textarea>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-foreground/80">Photos / Evidence</label>
                  <label className="block border-2 border-dashed border-surface-hover rounded-xl p-8 text-center hover:border-accent hover:bg-surface-hover transition-colors cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    {selectedFile ? (
                      <div className="text-accent flex flex-col items-center">
                        <CheckCircle className="h-8 w-8 mx-auto mb-3" />
                        <p className="font-bold">{selectedFile.name}</p>
                        <p className="text-xs mt-1">Ready to submit</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto mb-3 text-foreground/40" />
                        <p className="font-bold text-foreground/80">Click to upload photos</p>
                        <p className="text-xs text-foreground/50 mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full py-4 bg-accent text-background rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform">
                    Submit for Verification
                  </button>
                  <p className="text-center text-xs text-foreground/50 mt-4">
                    Submissions enter the <span className="text-risk-yellow font-bold">🟡 Under Verification</span> state until reviewed by the community.
                  </p>
                </div>

              </form>
            </div>
          ) : (
            <div className="bg-surface border border-surface-hover rounded-[2rem] p-12 text-center shadow-xl animate-in zoom-in-95 duration-500">
              <CheckCircle className="h-16 w-16 text-risk-green mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Submission Received!</h2>
              <p className="text-foreground/80 mb-8 max-w-md mx-auto">
                Thank you for contributing to the preservation of India's hidden heritage. Your submission is now in the verification queue.
              </p>
              
              <div className="flex justify-center gap-4">
                <Link href="/nearby" className="px-6 py-3 bg-surface-hover border border-surface rounded-xl font-bold hover:bg-surface-hover/80 transition-colors">
                  Explore Map
                </Link>
                <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-accent text-background rounded-xl font-bold hover:scale-[1.02] transition-transform">
                  Submit Another
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
