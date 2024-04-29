'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllWords } from '@/app/api/actions';
import { createAlphabet } from './utils';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';

interface AlphabetListProps {}

export const AlphabetList = ({}: AlphabetListProps) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['words'],
    queryFn: () => getAllWords(),
  });
  const alphabet = createAlphabet(data);

  if (isLoading) {
    return <Loader />;
  }

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
                <li key={word.id}>
                  <Link href={`/word/${word.id}`}>
                    <Button variant="link">
                      {word.word}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
