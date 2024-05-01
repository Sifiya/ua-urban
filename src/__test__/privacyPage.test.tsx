import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/__test__/render';
import PrivacyPage, { metadata } from '../app/privacy/page';

describe('PrivacyPage', () => {
  test('should render', async () => {
    const { container } = render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Політика конфіденційності' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(metadata).toMatchInlineSnapshot(`
      {
        "title": "UA Urban - Політика конфіденційності",
      }
    `);       
  });
});
