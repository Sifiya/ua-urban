const useAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };

  return {
    accessToken,
    setAccessToken
  };
};
