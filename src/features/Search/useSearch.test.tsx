import { renderHook } from '@testing-library/react';

import { useSearch } from './useSearch';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({ data: 'words', refetch: jest.fn() }),
}));

describe('useSearch', () => {
  describe('initialSearch', () => {
    test('should be empty by default', () => {
      const hook = renderHook(() => useSearch());
      expect(hook.result.current.searchString).toBe('');
    });
    test('should be set by initialSearch', () => {
      const initialSearch = 'initialSearch';
      const hook = renderHook(() => useSearch(initialSearch));
      expect(hook.result.current.searchString).toBe(initialSearch);
    });
  });
});
