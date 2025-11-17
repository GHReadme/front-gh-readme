import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Tabs from './index';

import '@mantine/core/styles.css';

// ---------- данные для сторис ----------

const tabs = [
  {
    title: 'tab 1',
    content: <div>content tab 1</div>,
  },
  {
    title: 'tab 2',
    content: <div>content tab 2</div>,
  },
  {
    title: 'tab 3',
    content: <div>content tab 3</div>,
  },
] as const;

type TabTitle = (typeof tabs)[number]['title'];

type TabsStoryArgs = {
  defaultValue: TabTitle;
  tabs: typeof tabs;
};

// ---------- Meta ----------

const meta: Meta<TabsStoryArgs> = {
  title: 'shared/ui/tabs',
  component: Tabs as React.ComponentType<TabsStoryArgs>,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <div className="h-screen w-screen">
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ---------- Stories ----------

export const Default: Story = {
  args: {
    defaultValue: 'tab 2', // тут уже строго 'tab 1' | 'tab 2' | 'tab 3'
    tabs,
  },
};
