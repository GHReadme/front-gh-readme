import React, { useEffect, useState } from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

import Selector from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof Selector> = {
  title: 'shared/ui/selector',
  component: Selector,
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

type Story = StoryFn<typeof Selector>;

const options = [
  { value: 'first', label: 'First option' },
  { value: 'second', label: 'Second option' },
  { value: 'third', label: 'Third option' },
];

export const Controlled: Story = (args) => {
  const [value, setValue] = useState<string | null>(args.value ?? null);

  useEffect(() => {
    if (typeof args.value === 'string' || args.value === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(args.value);
    }
  }, [args.value]);

  return <Selector {...args} value={value} onChange={setValue} data={options} />;
};

Controlled.args = {
  label: 'Controlled selector',
  value: 'second',
};

export const Uncontrolled: Story = (args) => <Selector {...args} data={options} />;

Uncontrolled.args = {
  label: 'Uncontrolled selector',
  defaultValue: 'first',
};

export const WithError: Story = (args) => <Selector {...args} data={options} />;

WithError.args = {
  label: 'Selector with error',
  error: 'Error message',
};

export const Disabled: Story = (args) => <Selector {...args} data={options} />;

Disabled.args = {
  label: 'Disabled selector',
  disabled: true,
};
