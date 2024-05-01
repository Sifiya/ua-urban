import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import * as actions from '@/app/api/actions';
import { DefinitionsList } from './DefinitionsList';

jest.mock('./VoteBlock', () => ({
  VoteBlock: () => <div>VoteBlock</div>,
}));
jest.mock('@/app/api/actions', () => ({
  getWordDefinitions: jest.fn(),
}));
const getWordDefinitionsMock = actions.getWordDefinitions as jest.Mock;

describe('DefinitionsList', () => {
  afterEach(() => {
    getWordDefinitionsMock.mockReset();
  });

  test('should render definitions list', async () => {
    const definitions = [
      { id: '1', text: 'Definition 1', upvotes_count: 2, downvotes_count: 1 },
      { id: '2', text: 'Definition 2', upvotes_count: 3, downvotes_count: 0 },
    ];
    getWordDefinitionsMock.mockResolvedValue(definitions);

    const { container } = render(<DefinitionsList wordId="1" />);

    expect(await screen.findByText('Definition 1')).toBeInTheDocument();
    expect(screen.getByText('Definition 2')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
