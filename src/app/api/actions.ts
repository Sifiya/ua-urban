'use server';
import type { Word, MinimalWord, Definition, MinimalDefinition } from '@/types/types';
import { supabase } from './supabase.init';

export const addWordWithDefinition = async (word: string, definition: string) => {
  let createdWord: Word;
  try {
    createdWord = await addWord(word);
    await addDefinition(definition, createdWord.id);
  } catch (error) {
    return { error, success: false };
  }
  return { error: null, success: true, word_id: createdWord.id };
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

export const addDefinition = async (definition: string, wordId: string): Promise<Definition> => {
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

export const getOneWord = async (id: string): Promise<MinimalWord> => {
  const { data: words, error } = await supabase.from('words').select('id,word').eq('id', id);

  if (error || !words || words.length === 0) {
    throw error || new Error('Не вдалося отримати слова');
  }

  return words[0];
};

export const getWordDefinitions = async (wordId: string): Promise<MinimalDefinition[]> => {
  const { data: definitions, error } = await supabase.from('definitions').select('id,word_id,text').eq('word_id', wordId);

  if (error || !definitions) {
    throw error || new Error('Не вдалося отримати визначення');
  }

  return definitions;
};
