import { getUser } from '@/app/api/auth.api';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUser(),
  });

  return {
    isAuthenticated: data?.isAuthenticated,
    email: data?.email,
  };
};
