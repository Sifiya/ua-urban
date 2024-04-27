'use client';

import React, { ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  isTest?: boolean;
  children: ReactNode;
}

export const Providers = ({ isTest, children }: ProvidersProps) => {
  const queryClient = useMemo(() => new QueryClient(isTest ? {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  } : {}), [ isTest ]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
