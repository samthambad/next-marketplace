import { createBrowserClient } from '@supabase/ssr'
// To access Supabase from Client Components, which run in the browser
// should be same across all apps
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabaseBrowser = () => 
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  );
