import React, { useEffect, useState } from 'react';

import 'app/globals.css';

import { MantineProvider } from '@mantine/core';
import type { Meta, StoryFn } from '@storybook/nextjs-vite';

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
  const [checked, setChecked] = useState(args.checked ?? false);

  useEffect(() => {
    if (typeof args.checked === 'boolean') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChecked(args.checked);
    }
  }, [args.checked]);

  return (
    <CheckBox
      {...args}
      checked={checked}
      onChange={setChecked}
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
