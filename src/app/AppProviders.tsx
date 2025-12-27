'use client';

import { ReactNode } from 'react';

import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import ThemeToggle from '@/shared/ui/theme-toggle';

import style from './layout.module.scss';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'gh-readme-color-scheme' });

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="auto" colorSchemeManager={colorSchemeManager}>
      <Notifications />
      <header className={style.header}>
        <h1 className={style.title}>GH Readme</h1>
        <ThemeToggle />
      </header>
      <div className="h-full w-full p-2">{children}</div>
    </MantineProvider>
  );
}
