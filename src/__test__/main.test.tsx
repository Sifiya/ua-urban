import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../app/page';

describe('MainPage', () => {
  test('should render correctly', () => {
    render(<MainPage />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent('Тут буде словник. Новий деплой з гітхабу.');
  });
});