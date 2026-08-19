-- Create sites table
CREATE TABLE public.sites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  region text NOT NULL,
  lat float NOT NULL,
  lng float NOT NULL,
  terrain_type text NOT NULL, -- 'hilly', 'watery', 'generic'
  risk_level text NOT NULL, -- 'green', 'yellow', 'orange', 'red'
  culture_notes text,
  ai_summary text,
  image_urls text[],
  hidden boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid REFERENCES public.sites(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  review_text text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.sites FOR SELECT
  USING (true);

CREATE POLICY "Public reviews are viewable by everyone."
  ON public.reviews FOR SELECT
  USING (true);
