import React from 'react';
import type { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export const Paragraph = ({
  children,
  className,
}: ParagraphProps) => {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
};
