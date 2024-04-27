import '@testing-library/jest-dom';
import * as router from 'next-router-mock';

jest.mock('next/navigation', () => ({
  useRouter: router.useRouter,
  usePathname: jest.fn().mockReturnValue('/some-route'),
}));
