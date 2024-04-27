import React, { ReactNode } from 'react';
import { render as libRender } from '@testing-library/react';
import { Providers } from '@/components/Providers';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Providers isTest>{children}</Providers>;
};

export const render = (ui: ReactNode) => {
  return libRender(ui, {
    wrapper: Wrapper,
  });
};
