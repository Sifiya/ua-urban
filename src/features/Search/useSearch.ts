import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchWord } from '@/app/api/search.api';

export const useSearch = (initialSearch?: string) => {
  const [searchString, setSearchString] = useState(() => initialSearch || '');

  const { data: words, refetch } = useQuery({
    enabled: false,
    queryKey: ['searchWord', JSON.stringify(searchString)],
    queryFn: async () => searchWord(searchString),
  });

  useEffect(() => {
    if (searchString.length > 0) {
      refetch();
    } 
  }, [searchString, refetch]);

  return {
    searchString,
    setSearchString,
    words,
  };
};
