'use client';

import React, { ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleAnalytics } from '@next/third-parties/google';

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
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <QueryClientProvider client={queryClient}>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {children}
    </QueryClientProvider>
  );
};
