'use server';
import { createClient } from '@/utils/supabase/server';

export const searchWord = async (searchString: string, noLimit: boolean = false) => {
  const supabase = createClient();
  let query = supabase
    .from('words')
    .select('id, word')
    .ilike('word', `%${searchString}%`);

  if (!noLimit) {
    query = query.limit(10);
  }
    
  query = query.order('word', { ascending: true });

  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data;
};
