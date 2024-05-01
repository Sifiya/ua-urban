import { renderHook, waitFor } from '@testing-library/react';
import * as actions from '@/app/api/actions';
import { useGetAllWords } from './useGetAllWords';

jest.mock('@/app/api/actions', () => ({
  getAllWords: jest.fn(),
}));
const getAllWordsMock = actions.getAllWords as jest.Mock;

describe('useGetAllWords', () => {
  test('should return an array of words', async () => {
    getAllWordsMock.mockResolvedValueOnce(['word1', 'word2']);
    const hook = renderHook(() => useGetAllWords());

    await waitFor(() => expect(hook.result.current).toEqual(['word1', 'word2']));
  });

  test('should return an empty array if getAllWords fails', async () => {
    const consoleError = console.error;
    console.error = jest.fn();
  
    getAllWordsMock.mockRejectedValueOnce('error');
    const hook = renderHook(() => useGetAllWords());

    await waitFor(() => expect(hook.result.current).toEqual([]));
    expect(console.error).toHaveBeenCalled();
    console.error = consoleError;
  });
});
