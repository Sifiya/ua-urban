import React from 'react';
import type { ReactNode } from 'react';

interface Header3Props {
  children: ReactNode;
  className?: string;
}

export const Header3 = ({
  children,
  className,
}: Header3Props) => {
  return (
    <h3 
      className={`
        mt-8 scroll-m-20 text-2xl font-semibold tracking-tight
        ${className}
      `}
    >
      {children}
    </h3>
  );
};
