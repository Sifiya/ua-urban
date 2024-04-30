import React from 'react'
import { getOneWord } from '@/app/api/actions';
import { AddDefinition } from '@/features/AddDefinition';
import { DefinitionsList } from '@/features/Definitions';
import { Header1 } from '@/components/typography';
import { BackButton } from '@/features/BackButton';

interface WordPageProps {
  params: {
    wordId: string;
  }
}

export async function generateMetadata ({ params: { wordId }}: WordPageProps) {
  const { word } = await getOneWord(wordId);
  return {
    title: `${word} — значення слова`
  }
}

const WordPage = async ({ params: { wordId }}: WordPageProps) => {
  const { word } = await getOneWord(wordId);
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <BackButton className="-ml-4" />
      </div>

      <Header1>{word}</Header1>
      <DefinitionsList wordId={wordId} />
      <AddDefinition />
    </div>
  );
}

export default WordPage;
