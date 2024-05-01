import React from 'react';
import { render, screen } from '@testing-library/react';
import { LinkBanner } from './LinkBanner';

const mockHeadersGet = jest.fn();
jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: mockHeadersGet,
  })),
}));

describe('LinkBanner', () => {
  test('should render nothing if no header provided', () => {
    mockHeadersGet.mockReturnValue(null);
    render(<LinkBanner />);
    expect(screen.queryByText('Сайт переїхав на')).toBeNull();
  });

  test('should render nothing if host is official', () => {
    mockHeadersGet.mockReturnValue('www.urban.in.ua');
    render(<LinkBanner />);
    expect(screen.queryByText('Сайт переїхав на')).toBeNull();
  });

  test('should render link banner if host is not official', () => {
    mockHeadersGet.mockReturnValue('www.example.com');
    render(<LinkBanner />);
    expect(screen.getByText('Сайт переїхав на')).toBeInTheDocument();
    expect(screen.getByText('www.urban.in.ua')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://www.urban.in.ua');
  });
});
