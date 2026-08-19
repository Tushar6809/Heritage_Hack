export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-4xl font-bold text-foreground sm:text-5xl">
          About Heritage
        </h1>
        
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            Heritage is dedicated to helping travelers and locals discover the hidden cultural gems of India. 
            While major monuments get all the attention, there are thousands of culturally rich, unexplored 
            sites across the country that have no easy way to be found.
          </p>
          
          <p>
            We aim to change that by providing a platform that not only points you to these hidden locations 
            but also gives you local context, real-time distance calculations, and risk assessments to ensure 
            your visits are safe and culturally respectful.
          </p>
          
          <div className="rounded-2xl bg-surface p-8 mt-12 border border-surface-hover">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-base">
              To preserve and promote India's offbeat heritage sites by encouraging responsible tourism 
              and supporting the local communities that protect them.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
