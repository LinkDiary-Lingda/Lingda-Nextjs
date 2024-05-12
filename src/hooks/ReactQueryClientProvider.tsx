'use client';
import React from 'react';
import useApiError from './handlers/useApiError';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleError } = useApiError();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { onError: handleError },
      queries: {
        throwOnError: true,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
