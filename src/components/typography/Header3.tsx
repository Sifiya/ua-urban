import React from 'react';
import type { ReactNode } from 'react';

interface Header3Props {
  children: ReactNode;
}

export const Header3 = ({
  children,
}: Header3Props) => {
  return (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};
