import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import { userEvent, UserEvent } from '@testing-library/user-event';
import * as searchApi from '@/app/api/search.api';

import { useSearch } from './useSearch';

let user: UserEvent;

jest.mock('@/app/api/search.api', () => ({
  searchWord: jest.fn(),
}));
const searchWordMock = searchApi.searchWord as jest.Mock;

const TestComponent = () => {
  const { searchString, setSearchString, words } = useSearch();
  return (
    <div>
      <input
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div>{JSON.stringify(words)}</div>
    </div>
  );
};

describe('useSearch api', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });

  test('should call refetch on searchString change', async () => {
    searchWordMock.mockResolvedValue('words');
    render(<TestComponent />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'searchString');
    expect(searchWordMock).toHaveBeenCalledWith('searchString');
    expect(await screen.findByText('"words"')).toBeInTheDocument();
  });
});
