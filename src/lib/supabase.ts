import { createClient } from '@supabase/supabase-js';

// These will be undefined if not provided in env, which we will handle gracefully in the app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to determine if we are running in mock mode
export const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
