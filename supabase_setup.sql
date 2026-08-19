-- Run this entirely in the Supabase SQL Editor

-- 1. Drop existing table to ensure schema matches the new image_urls array
DROP TABLE IF EXISTS heritage_sites;

-- 2. Create the heritage_sites table
CREATE TABLE heritage_sites (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  category TEXT,
  risk_level TEXT,
  image_urls TEXT[]
);

-- 3. Insert the user-provided locations with accurate multiple images
INSERT INTO heritage_sites (name, description, lat, lng, category, risk_level, image_urls) VALUES
(
  'Jaugada (Ruined Fortress)', 
  'Once a provincial Mauryan fortified capital of Kalinga. Famous for the stone-cut edicts in Prakrit of the emperor Ashoka.', 
  19.5333, 84.8167, 'monument', 'yellow', 
  ARRAY['https://upload.wikimedia.org/wikipedia/commons/2/2f/Jaugada_Rock_Inscription_of_Ashoka.jpg', 'https://upload.wikimedia.org/wikipedia/commons/5/52/Jaugada_2018.jpg', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Jaugada_rock_with_Ashoka_Major_Rock_Edict.jpg']
),
(
  'Sisupalgarh', 
  'This defensive settlement originated prior to the Mauryan empire and had an ancient population of 20,000 to 25,000.', 
  20.2285, 85.8505, 'settlement', 'orange', 
  ARRAY['https://upload.wikimedia.org/wikipedia/commons/a/af/Sisupalagada_Bhubaneswar.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/90/Sisupalgarh_fortified_urban_center.jpg', 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ancient_remains_inside_rampart_of_Sisupalgarh_-_6.JPG']
),
(
  'Dhauli Shanti Stupa', 
  'Built on the site where the famous Kalinga War was fought, commemorating Ashoka''s mission of peace.', 
  20.1923, 85.8394, 'monument', 'green', 
  ARRAY['https://upload.wikimedia.org/wikipedia/commons/5/5e/Historical_landmark_in_Dhauli_Shanti_Stupa_4.jpg', 'https://upload.wikimedia.org/wikipedia/commons/0/05/Dhauli_Shanti_Stupa%2C_Bhubaneswar.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/da/Dhauli_shanti_stupa.jpg']
),
(
  'Saptashrungi Temple', 
  'A major pilgrimage site located on seven hills, dedicated to the Goddess Saptashrungi Nivasini.', 
  20.3920, 73.8960, 'temple', 'yellow', 
  ARRAY['https://upload.wikimedia.org/wikipedia/commons/8/85/Saptashrungi_Devi_Temple.jpg', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Funicular_Train_at_Saptashrungi_Gad.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Saptashrungi_Temple_at_Night.jpg']
);
