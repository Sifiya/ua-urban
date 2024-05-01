import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import WordPage, { generateMetadata } from '../app/word/[wordId]/page';

jest.mock('@/app/api/actions', () => ({
  getOneWord: jest.fn().mockResolvedValue({ word: 'word' }),
  getWordDefinitions: jest.fn().mockResolvedValue(
    [
      { id: '1', text: 'Definition 1', upvotes_count: 2, downvotes_count: 1 },
      { id: '2', text: 'Definition 2', upvotes_count: 3, downvotes_count: 0 },
    ]
  ),
}));

describe('WordPage', () => {
  describe('generateMetadata', () => {
    test('should return title', async () => {
      const metadata = await generateMetadata({ params: { wordId: '1' } });
      expect(metadata.title).toEqual('word — значення слова');
    });
  });

  describe('WordPage', () => {
    test('should render', async () => {
      const jsx = await WordPage({ params: { wordId: '1' } });
      const { container } = render(jsx);
      expect(screen.getByRole('heading', { name: 'word' })).toBeInTheDocument();
      expect(await screen.findByText('Definition 1')).toBeInTheDocument();
    });
  });
});
