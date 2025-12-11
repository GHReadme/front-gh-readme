import React from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';
import { useArgs } from '@storybook/preview-api';

import CheckBox from './index';

import '@mantine/core/styles.css';

const meta: Meta<typeof CheckBox> = {
  title: 'shared/ui/checkbox',
  component: CheckBox,
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

type Story = StoryFn<typeof CheckBox>;

export const Controlled: Story = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <CheckBox
      {...args}
      checked={checked}
      onChange={(value) => updateArgs({ checked: value })}
    />
  );
};

Controlled.args = {
  label: 'Check box',
  description: 'Checkbox description',
  checked: true,
};

export const Uncontrolled: Story = (args) => <CheckBox {...args} />;

Uncontrolled.args = {
  label: 'Check box uncontrolled',
  description: 'Checkbox description',
  defaultChecked: true,
};

export const Disabled: Story = (args) => <CheckBox {...args} />;

Disabled.args = {
  label: 'Disabled checkbox',
  description: 'Checkbox description',
  defaultChecked: false,
  disabled: true,
};

export const WithError: Story = (args) => <CheckBox {...args} />;

WithError.args = {
  label: 'Checkbox with error',
  error: 'Error message',
};
