import React from 'react';
import type { ReactNode } from 'react';

interface Header1Props {
  children: ReactNode;
  className?: string;
}

export const Header1 = ({
  children,
  className,
}: Header1Props) => {
  return (
    <h1 className={`
      scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl
      ${className}
    `}>
      {children}
    </h1>
  );
};
