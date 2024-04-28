import React from 'react'
import { getOneWord } from '@/app/api/actions';
import { AddDefinition } from '@/features/AddDefinition';
import { DefinitionsList } from '@/features/Definitions';

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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{word}</h1>
      <DefinitionsList wordId={wordId} />
      <AddDefinition />
    </div>
  );
}

export default WordPage;
