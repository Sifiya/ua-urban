import { BackButton } from '@/features/BackButton';
import { SearchBlockNoPopover, SearchList } from '@/features/Search';
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
    <div className="flex flex-col items-center">
      <div className="w-full -mb-5">
        <BackButton className="-ml-4" />
      </div>
      <SearchBlockNoPopover initialSearch={word} />
      <div className="w-full max-w-[700px]">
        {word && <SearchList searchString={word} />}
      </div>
    </div>
  );
};

export default SearchPage;
