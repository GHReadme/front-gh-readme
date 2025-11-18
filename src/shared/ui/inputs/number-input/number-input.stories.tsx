import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

import NumberInput from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof NumberInput> = {
  title: 'shared/ui/inputs',
  component: NumberInput,
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

type Story = StoryFn<typeof NumberInput>;

export const Number: Story = (args) => {
  const [value, setValue] = React.useState<number | null>(null);

  return <NumberInput {...args} value={value} onChange={setValue} />;
};

Number.args = {
  label: 'Number input',
};
