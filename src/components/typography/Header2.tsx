import React from 'react';
import type { ReactNode } from 'react';

interface Header2Props {
  children: ReactNode;
  className?: string;
}

export const Header2 = ({
  children,
  className,
}: Header2Props) => {
  return (
    <h2 className={`
      mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0
      ${className}
    `}>
      {children}
    </h2>
  );
};
