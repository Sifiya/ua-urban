'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWordDefinitions } from '@/app/api/actions';
import { Card } from '@/components/ui/card';
import GridLoader from 'react-spinners/GridLoader';

interface DefinitionsListProps {
  wordId: string;
}

export const DefinitionsList = ({ wordId }: DefinitionsListProps) => {
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
    <Card key={id} className="pt-3 pb-5 px-5">
      {text}
    </Card>
  ));
};
