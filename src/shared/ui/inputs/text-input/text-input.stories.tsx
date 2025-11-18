import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

import TextInput from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof TextInput> = {
  title: 'shared/ui/inputs',
  component: TextInput,
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

type Story = StoryFn<typeof TextInput>;

export const Text: Story = (args) => {
  const [value, setValue] = React.useState<string>('');

  return <TextInput {...args} value={value} onChange={setValue} />;
};

Text.args = {
  label: 'Text input',
};
