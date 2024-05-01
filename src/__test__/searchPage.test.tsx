import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import SearchPage, { generateMetadata } from '../app/search/page';

describe('SearchPage', () => {
  describe('generateMetadata', () => {
    test('should return title', async () => {
      const metadata = await generateMetadata({ searchParams: { word: 'word' } });
      expect(metadata.title).toEqual('Шукати слово word');
    });
  });

  describe('SearchPage', () => {
    test('should render', async () => {
      const { container } = render(<SearchPage searchParams={{ word: '' } }/>);
      expect(container).toMatchSnapshot();
    });
  });
});
