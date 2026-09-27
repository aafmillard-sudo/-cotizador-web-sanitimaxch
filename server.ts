import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Read-only client for fetching public data (e.g. the Servicios catalog)
// from Server Components. Uses the public publishable key only.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  )
}
