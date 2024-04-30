'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllWords } from '@/app/api/actions';
import { createAlphabet } from './utils';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  if (!alphabet.length) {
    return null;
  }

  return (
    <Tabs defaultValue={`${alphabet[0][0]}-tab`}>
      <TabsList className="flex flex-wrap h-fit">
      {alphabet.map(([letter]) => (
        <TabsTrigger key={`${letter}-letter-tabname`} value={`${letter}-tab`}>
          {letter}
        </TabsTrigger>
      ))}
      </TabsList>
      {alphabet.map(([letter, words]) => (
        <TabsContent key={`${letter}-tab-content`} value={`${letter}-tab`}>
          <ul className="flex flex-wrap">
            {words.map((word) => (
            <li key={word.id} className="w-fit">
              <Link href={`/word/${word.id}`}>
                <Button variant="link">
                  {word.word}
                </Button>
              </Link>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
    );
};
