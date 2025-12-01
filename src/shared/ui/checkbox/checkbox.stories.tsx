import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Checkbox from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof Checkbox> = {
  title: 'shared/ui/checkBox',
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Согласен с условиями',
    color: 'var(--color-accent)',
  },
};

export const Checked: Story = {
  args: {
    label: 'Отмеченный чекбокс',
    checked: true,
    color: 'var(--color-accent)',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенный чекбокс',
    disabled: true,
    color: 'var(--color-accent)',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Checkbox label="Extra small" size="xs" checked color="var(--color-accent)" />
      <Checkbox label="Small" size="sm" checked color="var(--color-accent)" />
      <Checkbox label="Medium" size="md" checked color="var(--color-accent)" />
      <Checkbox label="Large" size="lg" checked color="var(--color-accent)" />
      <Checkbox label="Extra large" size="xl" checked color="var(--color-accent)" />
    </div>
  ),
};
