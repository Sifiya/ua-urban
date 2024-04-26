'use client';

import { useGetAllWords } from '@/hooks/useGetAllWords';
import React from 'react';
import { createAlphabet } from './utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AlphabetListProps {}

export const AlphabetList = ({}: AlphabetListProps) => {
  const words = useGetAllWords();
  const alphabet = createAlphabet(words);

  return (
    <Accordion type="multiple">
      {alphabet.map(([letter, words]) => (
        <AccordionItem value={letter} key={`${letter}-letter`}>
          <AccordionTrigger>
            <div className="w-64 text-start">
              {letter}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {words.map((word) => (
                <li key={word.id}>{word.word}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
