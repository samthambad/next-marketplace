import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

//prevents caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || '')

export async function GET() {
  try {
    const { data, error } = await supabase.from('posts').select('id').limit(1)

    if (error) throw error

    return NextResponse.json({ message: 'Database pinged successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to ping database' }, { status: 500 })
  }
}
