/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode, useState } from 'react';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { notification } from 'core/notification';

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  // useState чтобы не создавать новый QueryClient на каждый рендер
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError(error, query) {
            // глобальная обработка ошибок запросов
            // показываем тост только если явно пометили meta
            if (!query.meta?.showErrorToast) return;

            let message = 'Request error';

            if (axios.isAxiosError(error)) {
              message = (error.response?.data as any)?.message || error.message || message;
            } else if (error instanceof Error) {
              message = error.message;
            }

            notification.error({ message });
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
