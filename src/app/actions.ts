'use server';
import type { Database } from '@/types/supabase';
import type { Word, Definition } from '@/types/types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.SUPABASE_API_URL || '',
  process.env.SUPABASE_API_KEY || ''
);

export const addWordWithDefinition = async (word: string, definition: string) => {
  try {
    const createdWord: Word = await addWord(word);
    await addDefinition(definition, createdWord.id);
  } catch (error) {
    return { error, success: false };
  }
  return { error: null, success: true };
};

const addWord = async (word: string): Promise<Word> => {
  const { data: createdWord, error } = await supabase.from('words').insert([
    { word },
  ]).select();

  if (error || !createdWord) {
    throw error || new Error('Не вдалося створити слово');
  }

  return createdWord[0];
};

const addDefinition = async (definition: string, wordId: string): Promise<Definition> => {
  const { data: createdDefinition, error } = await supabase.from('definitions').insert([
    { text: definition, word_id: wordId },
  ]).select();

  if (error || !createdDefinition) {
    throw error || new Error('Не вдалося створити визначення');
  }

  return createdDefinition[0];
};

export const getAllWords = async (): Promise<Word[]> => {
  const { data: words, error } = await supabase.from('words').select('*');

  if (error || !words) {
    throw error || new Error('Не вдалося отримати слова');
  }

  return words;
};
