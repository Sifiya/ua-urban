import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const supabase = createClient<Database>(
  process.env.SUPABASE_API_URL || '',
  process.env.SUPABASE_API_KEY || ''
);
