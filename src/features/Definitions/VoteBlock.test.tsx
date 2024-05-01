import React from 'react';
import { screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { render } from '@/__test__/render';
import * as profileHook from '@/hooks/useProfile';
import * as voteApi from '@/app/api/vote.api';
import { VoteBlock } from './VoteBlock';

let user: UserEvent;

jest.mock('@/app/api/vote.api', () => ({
  setVote: jest.fn(),
  getMyVote: jest.fn(),
}));
const setVoteMock = voteApi.setVote as jest.Mock;
const getMyVoteMock = voteApi.getMyVote as jest.Mock;
jest.mock('@/hooks/useProfile', () => ({
  useProfile: jest.fn(),
}));
const useProfileMock = profileHook.useProfile as jest.Mock;

describe('VoteBlock', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });

  test('should render vote block', async () => {
    useProfileMock.mockReturnValue({ isAuthenticated: false });
    getMyVoteMock.mockResolvedValue({ vote: null });

    render(
      <VoteBlock
        wordId="1"
        definitionId="1"
        upvotes={2}
        downvotes={1}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Проголосувати за визначення' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Проголосувати проти визначення' })).toBeInTheDocument();
  });

  test('buttons should be disabled if not authenticated', async () => {
    getMyVoteMock.mockResolvedValue({ vote: null });
    useProfileMock.mockReturnValue({ isAuthenticated: false });
    render(
      <VoteBlock
        wordId="1"
        definitionId="1"
        upvotes={2}
        downvotes={1}
      />
    );

    expect(screen.getByRole('button', { name: 'Проголосувати за визначення' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Проголосувати проти визначення' })).toBeDisabled();
  });

  test('should call setVote with up', async () => {
    getMyVoteMock.mockResolvedValue({ vote: { vote: 'down' } });
    useProfileMock.mockReturnValue({ isAuthenticated: true });
    setVoteMock.mockResolvedValue({});
    render(
      <VoteBlock
        wordId="1"
        definitionId="1"
        upvotes={2}
        downvotes={1}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Проголосувати за визначення' }));
    expect(setVoteMock).toHaveBeenCalledWith('1', 'up');
  });

  test('should call setVote with down', async () => {
    getMyVoteMock.mockResolvedValue({ vote: { vote: 'up' } });
    useProfileMock.mockReturnValue({ isAuthenticated: true });
    setVoteMock.mockResolvedValue({});
    render(
      <VoteBlock
        wordId="1"
        definitionId="1"
        upvotes={2}
        downvotes={1}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Проголосувати проти визначення' }));
    expect(setVoteMock).toHaveBeenCalledWith('1', 'down');
  });
});
