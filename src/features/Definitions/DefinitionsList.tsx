'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWordDefinitions } from '@/app/api/actions';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/card';
import GridLoader from 'react-spinners/GridLoader';
import { VoteBlock } from './VoteBlock';

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
    return (
      <div className="w-full flex justify-center p-10">
        <GridLoader size={15} color="#435f69" />
      </div>
    );
  }

  return sortedDefinitions.map(({ id, text }) => (
    <Card key={id} className="py-3 px-5">
      <p>
        {text}
      </p>
      {isAuthenticated && (<VoteBlock definitionId={id} wordId={wordId} />)}
    </Card>
  ));
};
