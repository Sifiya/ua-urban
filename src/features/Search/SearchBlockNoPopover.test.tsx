import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { SearchBlockNoPopover } from './SearchBlockNoPopover';

let user: UserEvent;

describe('SearchBlockNoPopover', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });
  
  test('renders with initialSearch', () => {
    render(<SearchBlockNoPopover initialSearch="initialSearch" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Пошук');
    expect(screen.getByRole('textbox')).toHaveValue('initialSearch');
    expect(screen.getByRole('button')).toHaveTextContent('Пошук');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/search?word=initialSearch');
  });

  test('renders without initialSearch', () => {
    render(<SearchBlockNoPopover />);
    expect(screen.getByRole('heading')).toHaveTextContent('Пошук');
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button')).toHaveTextContent('Пошук');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/search?word=');
  });

  test('renders with new search string', async () => {
    render(<SearchBlockNoPopover />);
    
    await user.type(screen.getByRole('textbox'), 'newSearchString');
    expect(screen.getByRole('textbox')).toHaveValue('newSearchString');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/search?word=newSearchString');
  });
});
