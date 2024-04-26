import { Word } from "@/types/types";

export const createAlphabet = (words: Word[]): [string, Word[]][] => {
  const alphabetHash: Record<string, Word[]> = {};
  for (const word of words) {
    const firstLetter = word.word[0].toUpperCase();
    if (!alphabetHash[firstLetter]) {
      alphabetHash[firstLetter] = [];
    }
    alphabetHash[firstLetter].push(word);
  }
  return Object.entries(alphabetHash).sort(([a], [b]) => a.localeCompare(b, 'uk', { sensitivity: 'base' }));
};