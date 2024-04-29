import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

export const Loader = () => {
  return (
    <div className="w-full flex justify-center p-10">
      <GridLoader size={15} color="#435f69" />
    </div>
  );
};
