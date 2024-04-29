'use server';
import { createClient } from '@/utils/supabase/server';

export const searchWord = async (searchString: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('words')
    .select('id, word')
    .ilike('word', `%${searchString}%`)
    .limit(10)
    .order('word', { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};
