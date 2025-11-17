import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof Button> = {
  title: 'shared/ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name button',
    color: 'var(--btn-primary-bg)',
  },
};
