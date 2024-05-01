import React from 'react';
import { screen, render } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import * as router from 'next/navigation';
import { BackButton } from './BackButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const useRouterMock = router.useRouter as jest.Mock;

describe('BackButton', () => {
  test('should go back on click', async () => {

    const user = userEvent.setup({ delay: null });
    const backMock = jest.fn();
    useRouterMock.mockReturnValue({
      back: backMock,
    });
    
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /назад/i });
    await user.click(button);
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
