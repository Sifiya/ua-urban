import * as actions from '@/app/actions';

jest.mock('@/app/actions', () => ({
  addWordWithDefinition: jest.fn(),
  getAllWords: jest.fn(),
  addDefinition: jest.fn(),
}));

export const mockAddWordWithDefinition = actions.addWordWithDefinition as jest.Mock;
export const mockGetAllWords = actions.getAllWords as jest.Mock;
export const mockAddDefinition = actions.addDefinition as jest.Mock;