import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { notification } from '@/core/notification';
import { GithubUser, githubApi } from '@/shared/api/github';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const useGithubUser = (rawUsername?: string) => {
  const username = rawUsername?.trim() || '';
  const debouncedUsername = useDebounce(username, 500);

  const query = useQuery<GithubUser, AxiosError>({
    queryKey: ['githubUser', debouncedUsername],
    queryFn: () => githubApi.getUser(debouncedUsername),
    enabled: !!debouncedUsername,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!query.error || !debouncedUsername) return;

    const err = query.error;
    const status = err.response?.status;

    if (status === 404) {
      notification.error({ message: 'Пользователь не найден на GitHub' });
      return;
    }

    const message = err.message || 'Не удалось загрузить данные с GitHub';
    notification.error({ message });
  }, [query.error, debouncedUsername]);

  return query;
};
