import '@testing-library/jest-dom';
import * as router from 'next-router-mock';


export const mockUseParams = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: router.useRouter,
  usePathname: jest.fn().mockReturnValue('/some-route'),
  useParams: mockUseParams,
}));
