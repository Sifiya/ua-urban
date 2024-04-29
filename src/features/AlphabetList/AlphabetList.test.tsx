import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { mockGetAllWords } from '@/__test__/mockActions';
import { AlphabetList } from './AlphabetList';

let user: UserEvent;

describe('AlphabetList', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
    mockGetAllWords.mockReturnValue([
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