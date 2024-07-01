import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('id')
      .limit(1)

    if (error) throw error

    res.status(200).json({ message: 'Database pinged successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to ping database' })
  }
}