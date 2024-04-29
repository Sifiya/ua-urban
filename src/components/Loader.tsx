'use client';

import React, { useEffect } from 'react';
import GridLoader from 'react-spinners/GridLoader';

export const Loader = () => {
  const [isServer, setIsServer] = React.useState(true);

  useEffect(() => {
    setIsServer(typeof window === 'undefined')
  }, [])

  if (isServer) {
    return null;
  }

  return (
    <div className="w-full flex justify-center p-10">
      <GridLoader size={15} color="#435f69" />
    </div>
  );
};
