import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { HeaderMenu } from './HeaderMenu';

let user: UserEvent;

const useMediaQueryMock = jest.fn();
jest.mock('@/hooks/useMediaQuery', () => ({ useMediaQuery: jest.fn().mockImplementation(() => useMediaQueryMock()) }));
const useProfileMock = jest.fn();
jest.mock('@/hooks/useProfile', () => ({ useProfile: jest.fn().mockImplementation(() => useProfileMock() ) }));
const useQueryClientMock = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn().mockImplementation(() => useQueryClientMock())
}));
const signOutMock = jest.fn();
jest.mock('@/app/api/auth.api', () => ({
  signOut: jest.fn().mockImplementation(() => signOutMock())
}));

describe('HeaderMenu', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
    useProfileMock.mockReturnValue({ isAuthenticated: false });
  });

  afterEach(() => {
    useProfileMock.mockReset();
    signOutMock.mockClear();
  });

  describe('on mobile', () => {
    const getHambugerButton = () => screen.getByRole('button', { name: 'Відкрити меню' });
    const clickHambugerButton = async () => user.click(getHambugerButton());

    beforeEach(() => {
      useMediaQueryMock.mockReturnValue(false);
    });

    test('renders dropdown menu', () => {
      const wrapper = render(<HeaderMenu />);

      // Assert
      expect(getHambugerButton()).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(wrapper).toMatchSnapshot();
    });

    test('shows full menu after click on burger icon', async () => {
      render(<HeaderMenu />);

      // Act
      await clickHambugerButton();

      // Assert
      expect(await screen.findByRole('group')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'На головну' })).toBeInTheDocument();
    });

    test('if user is not authenticated, should show according buttons', async () => {
      useProfileMock.mockReturnValue({ isAuthenticated: false });
      render(<HeaderMenu />);

      // Act
      await clickHambugerButton();

      // Assert
      await screen.findByRole('group');
      expect(screen.queryByRole('link', { name: 'Додати слово' })).not.toBeInTheDocument();
      expect(screen.getByText('Вхід')).toBeInTheDocument();
      expect(screen.getByText('Реєстрація')).toBeInTheDocument();
    });

    test('if user is authenticated, should show according buttons', async () => {
      useProfileMock.mockReset();
      const email = 'fakemail@mail.com';
      useProfileMock.mockReturnValue({ isAuthenticated: true, email });
      render(<HeaderMenu />);

      // Act
      await clickHambugerButton();

      // Assert
      await screen.findByRole('group');
      expect(screen.getByRole('link', { name: 'Додати слово' })).toBeInTheDocument();
      expect(screen.getByText('Вийти')).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
      expect(screen.queryByText('Вхід')).not.toBeInTheDocument();
      expect(screen.queryByText('Реєстрація')).not.toBeInTheDocument();
    });
  });

  describe('on desktop', () => {
    beforeEach(() => {
      useMediaQueryMock.mockReturnValue(true);
    });

    test('renders navigation menu', () => {
      render(<HeaderMenu />);

      // Assert
      expect(screen.queryByRole('button', { name: 'Відкрити меню' })).not.toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('if user is not authenticated, should show according buttons', async () => {
      useProfileMock.mockReturnValue({ isAuthenticated: false });
      render(<HeaderMenu />);

      // Assert
      expect(screen.queryByRole('link', { name: 'Додати слово' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Вхід' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Реєстрація' })).toBeInTheDocument();
    });

    test('if user is authenticated, should show according buttons', async () => {
      useProfileMock.mockReset();
      const email = 'fakemail@mail.com';
      useProfileMock.mockReturnValue({ isAuthenticated: true, email });
      render(<HeaderMenu />);

      // Assert
      expect(screen.getByRole('link', { name: 'Додати слово' })).toBeInTheDocument();
      expect(screen.getByText('Вийти')).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
      expect(screen.queryByText('Вхід')).not.toBeInTheDocument();
      expect(screen.queryByText('Реєстрація')).not.toBeInTheDocument();
    });
  });

  describe('sign out', () => {
    test('should sign out user', async () => {
      useMediaQueryMock.mockReturnValue(true);
      let invalidateQueriesMock = jest.fn();
      useQueryClientMock.mockReturnValue({ invalidateQueries: invalidateQueriesMock });
      useProfileMock.mockReturnValue({ isAuthenticated: true, email: 'fakemail@mail.com' });
      signOutMock.mockResolvedValue({});
      render(<HeaderMenu />);

      // Act
      await user.click(screen.getByRole('button', { name: 'Вийти' }));
      expect(signOutMock).toHaveBeenCalledTimes(1);
      expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['profile'] });
    });

    test('should log error if sign out failed', async () => {
      useMediaQueryMock.mockReturnValue(true);
      let invalidateQueriesMock = jest.fn();
      useQueryClientMock.mockReturnValue({ invalidateQueries: invalidateQueriesMock });
      useProfileMock.mockReturnValue({ isAuthenticated: true, email: 'fakemail@mail.com' });

      const error = new Error('Some error');
      signOutMock.mockResolvedValue({ error });

      render(<HeaderMenu />);
      await user.click(screen.getByRole('button', { name: 'Вийти' }));
      expect(signOutMock).toHaveBeenCalledTimes(1);
      expect(invalidateQueriesMock).not.toHaveBeenCalled();
    });
  });
});

