import { useCookies } from 'next-client-cookies';

export const useAccessToken = () => {
  const cookies = useCookies();
  const accessToken = cookies.get('access_token');

  return {
    accessToken,
  };
};
