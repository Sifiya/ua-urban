import { renderHook, waitFor } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  test('should return result of a match media', async () => {
    // @ts-ignore
    matchMedia = jest.fn().mockImplementation(() => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      matches: true,
    }));
    const hook = renderHook(() => useMediaQuery('(min-width: 600px)'));
    await waitFor(() => expect(hook.result.current).toEqual(true));
  });

  test('should call onChanges', async () => {
    // @ts-ignore
    matchMedia = jest.fn().mockImplementation(() => ({
      addEventListener: jest.fn().mockImplementation((_, cb) => Promise.resolve().then(() => cb({ matches: true }))),
      removeEventListener: jest.fn(),
      matches: false,
    }));
    const hook = renderHook(() => useMediaQuery('(min-width: 600px)'));
    await waitFor(() => expect(hook.result.current).toEqual(true));
  });
});
