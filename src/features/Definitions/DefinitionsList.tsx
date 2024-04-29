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
    queryKey: ['word', wordId, 'definitions'],
    queryFn: () => getWordDefinitions(wordId),
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-10">
        <GridLoader size={15} color="#435f69" />
      </div>
    );
  }

  return definitions.map(({ id, text }) => (
    <Card key={id} className="py-3 px-5">
      <p>
        {text}
      </p>
      {isAuthenticated && (<VoteBlock definitionId={id} wordId={wordId} />)}
    </Card>
  ));
};
