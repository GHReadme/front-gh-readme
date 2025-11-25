/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from 'core/api';
import { notification } from 'core/notification';
import { useDebounce } from 'shared/hooks/useDebounce';

export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

const github = {
  getUser: async (username: string): Promise<GithubUser> => {
    const res = await api.get<GithubUser>(`https://api.github.com/users/${username}`);
    return res.data;
  },
};

export const useGithubUser = (rawUsername?: string) => {
  const username = rawUsername?.trim() || '';
  const debouncedUsername = useDebounce(username, 500);

  const query = useQuery<GithubUser, AxiosError>({
    queryKey: ['githubUser', debouncedUsername],
    queryFn: () => github.getUser(debouncedUsername),
    enabled: !!debouncedUsername, // запрос только если строка не пустая
    staleTime: 60_000,
  });

  // Обработка ошибок + notification
  useEffect(() => {
    if (!query.error || !debouncedUsername) return;

    const err = query.error;
    const status = err.response?.status;

    if (status === 404) {
      notification.error({ message: 'Пользователь не найден на GitHub' });
      return;
    }

    const message = (err.response?.data as any)?.message || err.message || 'Не удалось загрузить данные с GitHub';

    notification.error({ message });
  }, [query.error, debouncedUsername]);

  return query;
};
