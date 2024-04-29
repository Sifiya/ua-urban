'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWordDefinitions } from '@/app/api/actions';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent } from '@/components/ui/card';
import { VoteBlock } from './VoteBlock';
import { Loader } from '@/components/Loader';
import { Paragraph } from '@/components/typography';

interface DefinitionsListProps {
  wordId: string;
}

export const DefinitionsList = ({ wordId }: DefinitionsListProps) => {
  const { isAuthenticated } = useProfile()
  const { data: definitions = [], isLoading } = useQuery({
    queryKey: ['words', wordId, 'definitions'],
    queryFn: () => getWordDefinitions(wordId),
  });

  const formattedDefinitions = definitions.map((def) => ({
    ...def,
    rating: def.upvotes_count - def.downvotes_count,
  }));
  const sortedDefinitions = formattedDefinitions.sort((a, b) => b.rating - a.rating);

  if (isLoading) {
    return <Loader />;
  }

  return sortedDefinitions.map(({ id, text }) => (
    <Card key={id} className="py-3 px-5">
      <CardContent>
        <Paragraph>{text}</Paragraph>
        {isAuthenticated && (<VoteBlock definitionId={id} wordId={wordId} />)}
      </CardContent>
    </Card>
  ));
};
