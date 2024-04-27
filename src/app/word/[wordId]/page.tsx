import React from 'react'
import { getOneWord, getWordDefinitions } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { AddDefinition } from '@/features/AddDefinition';

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
  const [{ word }, definitions] = await Promise.all([getOneWord(wordId), getWordDefinitions(wordId)]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{word}</h1>
      {definitions.map(({ id, text }) => (
        <Card key={id} className="pt-3 pb-5 px-5">
          {text}
        </Card>
      ))}
      <AddDefinition />
    </div>
  );
}

export default WordPage;
