import { api } from '@/core/api';

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

export const githubApi = {
  getUser: async (username: string): Promise<GithubUser> => {
    const res = await api.get<GithubUser>(`https://api.github.com/users/${username}`);
    return res.data;
  },
};
