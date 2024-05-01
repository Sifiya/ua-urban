import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import TermsPage, { metadata } from '../app/terms/page';

describe('TermsPage', () => {
  test('should render', async () => {
    const { container } = render(<TermsPage />);
    expect(screen.getByRole('heading', { name: 'Умови користування' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(metadata).toMatchInlineSnapshot(`
      {
        "title": "UA Urban - Умови користування сайтом",
      }
    `);       
  });
});
