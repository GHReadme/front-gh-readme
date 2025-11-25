/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  const err = error as AxiosError<any>;

  const apiMessage =
    err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : undefined);

  return apiMessage || err.message || 'Unexpected error';
};
