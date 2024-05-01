import React from 'react';
import { screen, render } from '@testing-library/react';
import * as searchApi from '@/app/api/search.api';
import { SearchList } from './SearchList';

jest.mock('@/app/api/search.api', () => ({
  searchWord: jest.fn()
}));
const searchWordMock = searchApi.searchWord as jest.Mock;

describe('SearchList', () => {
  test('should render search results', async () => {
    searchWordMock.mockResolvedValue([
      { id: 1, word: 'word1' },
      { id: 2, word: 'word2' }
    ]);

    const jsx = await SearchList({ searchString: 'test' });
    render(jsx);

    expect(searchWordMock).toHaveBeenCalledWith('test', true);

    expect(screen.getByText('word1')).toBeInTheDocument();
    expect(screen.getByText('word2')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'word1' })).toHaveAttribute('href', '/word/1');
    expect(screen.getByRole('link', { name: 'word2' })).toHaveAttribute('href', '/word/2');
  });
});
