import React from 'react';
import type { ReactNode } from 'react';

interface Header1Props {
  children: ReactNode;
}

export const Header1 = ({
  children,
}: Header1Props) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};
