import { useEffect, useState } from 'react';
import { getAllWords } from '@/app/api/actions';
import type { Word } from '@/types/types';

export const useGetAllWords = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await getAllWords();
        setWords(words);
      } catch (error) {
        console.error(error);
      };
    };
    fetchWords();
  }, [setWords]);

  return words;
};
