import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../app/page';

describe('MainPage', () => {
  test('should render correctly', () => {
    render(<MainPage />);
    expect(screen.getByText('Тут буде словник. Новий деплой з гітхабу.')).toBeInTheDocument();
  });
});