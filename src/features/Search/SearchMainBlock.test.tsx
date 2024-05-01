import React from 'react';
import { screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { render } from '@/__test__/render';
import * as searchApi from '@/app/api/search.api';

import { SearchMainBlock } from './SearchMainBlock';

let user: UserEvent;

jest.mock('@/app/api/search.api', () => ({
  searchWord: jest.fn(),
}));
const searchWordMock = searchApi.searchWord as jest.Mock;

describe('SearchMainBlock', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });

  afterEach(() => {
    searchWordMock.mockReset();
  });

  test('should render search main block', () => {
    render(<SearchMainBlock />);
    expect(screen.getByRole('heading', { name: 'Пошук' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Шукати слово...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Пошук' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/search?word=');
  });

  test('should open popover on search', async () => {
    searchWordMock.mockResolvedValue([ { id: 1, word: 'word1' } ]);
    render(<SearchMainBlock />);
    await user.type(screen.getByPlaceholderText('Шукати слово...'), 'test');
    expect(searchWordMock).toHaveBeenCalledWith('test');
    expect(await screen.findByText('word1')).toBeInTheDocument();
  });
});
