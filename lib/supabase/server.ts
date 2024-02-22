'use server'
// To access Supabase from Server Components, Server Actions, and Route Handlers, 
// which run only on the server.
// should be same across all apps
// https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=server-component&framework=nextjs
import { createServerClient } from "@supabase/ssr"
import { cookies } from 'next/headers'

export const supabaseServer = () => {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const cookieStore = cookies()
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
    )
    
  }