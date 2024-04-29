import { SearchBlockNoPopover, SearchList, SearchMainBlock } from '@/features/Search';
import { title } from 'process';
import React from 'react';

interface SearchPageProps {
  searchParams: {
    word?: string;
  };
}

export function generateMetadata({ searchParams: { word } }: SearchPageProps) {
  return {
    title: `Шукати слово ${word}`,
  };
};

const SearchPage = ({ searchParams: { word } }: SearchPageProps) => {
  return (
    <div className="flex flex-col items-center -mt-5">
      <SearchBlockNoPopover initialSearch={word} />
      <div className="w-full max-w-[700px]">
        {word && <SearchList searchString={word} />}
      </div>
    </div>
  );
};

export default SearchPage;
