import { Header } from '@/components/Header';
import { AnimatedHero } from '@/components/AnimatedHero';
import { MOCK_SITES } from '@/lib/data';
import { SiteCard } from '@/components/SiteCard';

export default function Home() {

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <section className="relative w-full px-4 pb-8 pt-6 sm:px-6 md:px-8">
          <div className="mx-auto w-full max-w-7xl relative">
            {/* Hero Section */}
            <AnimatedHero sites={MOCK_SITES} />

            {/* Featured Locations Section */}
            <div className="mx-auto w-full max-w-5xl space-y-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold text-foreground">Featured Heritage Sites</h2>
                <p className="text-foreground/60">Explore these verified historical locations</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_SITES.map(site => (
                  <SiteCard key={site.id} site={site} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
