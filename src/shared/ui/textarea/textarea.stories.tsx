import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

import Textarea from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof Textarea> = {
  title: 'shared/ui/textarea',
  component: Textarea,
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

type Story = StoryFn<typeof Textarea>;

export const Default: Story = (args) => {
  const [value, setValue] = React.useState<string>('');

  return <Textarea {...args} value={value} onChange={setValue} />;
};

Default.args = {
  label: 'Textarea input',
  minRows: 10,
};
