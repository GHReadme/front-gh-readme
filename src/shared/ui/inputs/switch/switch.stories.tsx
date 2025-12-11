import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

import Switch from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof Switch> = {
  title: 'shared/ui/inputs',
  component: Switch,
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

type Story = StoryFn<typeof Switch>;

export const Default: Story = (args) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return <Switch {...args} checked={checked} onChange={setChecked} />;
};

Default.args = {
  label: 'Switch',
};
