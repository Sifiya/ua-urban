import React from 'react';
import { screen, act } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import { mockAddDefinition, mockGetUser } from '@/__test__/mockActions';
import { render } from '@/__test__/render';
import { mockUseParams } from '../../../jest.setup';

import { AddDefinition } from './AddDefinition';

let user: UserEvent;

const getButton = async () => screen.findByText('+ Додати визначення');

describe('AddDefinition', () => {
  beforeEach(() => {
    user = userEvent.setup({ delay: null });
    mockUseParams.mockReturnValue({ wordId: '1' });
    mockGetUser.mockResolvedValue({ isAuthenticated: true, email: 'fakemail' });
  });

  afterEach(() => {
    mockAddDefinition.mockReset();
    mockUseParams.mockReset();
  });

  test('should render a button', async () => {
    render(<AddDefinition />);
    expect(await getButton()).toBeInTheDocument();
  });

  test('should show a form when the button is clicked', async () => {
    render(<AddDefinition />);
    const button = await getButton();
    await act(async () => {
      await user.click(button);
    });
    expect(screen.getByText('Визначення')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Додати' })).toBeInTheDocument();
  });

  test('should send a request to add a definition', async () => {
    mockAddDefinition.mockResolvedValueOnce({ text: 'Hello' });

    render(<AddDefinition />);
    await user.click(await getButton());

    const definition = 'Hello, world!';
    await user.click(screen.getByLabelText('Визначення'));
    await user.paste(definition);
    await user.click(screen.getByRole('button', { name: 'Додати' }));
    expect(mockAddDefinition).toHaveBeenCalledWith(definition, expect.any(String));
    expect(mockAddDefinition).toHaveBeenCalledTimes(1);
  });

  test('should show an error when definition is not added', async () => {
    const errorMessage = 'Some error';
    mockAddDefinition.mockRejectedValueOnce(new Error(errorMessage));

    render(<AddDefinition />);
    await user.click(await getButton());

    const definition = 'Hello, world!';
    await user.click(screen.getByLabelText('Визначення'));
    await user.paste(definition);
    await user.click(screen.getByRole('button', { name: 'Додати' }));
    
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
