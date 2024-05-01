import { Word } from '@/types/types';
import { createAlphabet } from './utils';

describe('createAlphabet', () => {
  test('should return an array of tuples with the first letter of the word and the words', () => {
    const words = [
      { id: 1, word: 'apple' },
      { id: 2, word: 'banana' },
      { id: 3, word: 'orange' },
    ];
    const result = createAlphabet(words as unknown as Word[]);
    expect(result).toEqual([
      ['A', [{ id: 1, word: 'apple' }]],
      ['B', [{ id: 2, word: 'banana' }]],
      ['O', [{ id: 3, word: 'orange' }]],
    ]);
  });
});
