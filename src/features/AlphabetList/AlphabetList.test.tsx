import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import * as actions from '@/app/actions';
import { AlphabetList } from './AlphabetList';

let user: UserEvent;

jest.mock('@/app/actions', () => ({
  getAllWords: jest.fn(),
}));
const mockedGetAllWords = actions.getAllWords as jest.Mock;

describe('AlphabetList', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
    mockedGetAllWords.mockReturnValue([
      { id: 1, word: 'apple' },
      { id: 2, word: 'banana' },
      { id: 3, word: 'orange' },
    ]);
  });

  test('should render the AlphabetList component', async () => {
    render(<AlphabetList />);
    
    expect(await screen.findByText(/A/i)).toBeInTheDocument();
    expect(screen.getByText(/B/i)).toBeInTheDocument();
    expect(screen.getByText(/O/i)).toBeInTheDocument();

    await user.click(screen.getByText(/A/i));
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    await user.click(screen.getByText(/B/i));
    expect(screen.getByText(/banana/i)).toBeInTheDocument();
    await user.click(screen.getByText(/O/i));
    expect(screen.getByText(/orange/i)).toBeInTheDocument();
  });
});