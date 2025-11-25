import React, { ReactNode } from 'react';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import style from './layout.module.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GH Readme',
  description: 'GH Readme',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <title>GH Readme</title>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`} suppressHydrationWarning>
        <ReactQueryProvider>
          <MantineProvider>
            <Notifications />
            <h1 className={style.title}>GH Readme</h1>
            <div className="h-full w-full p-2">{children}</div>
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
