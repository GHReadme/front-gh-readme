import React from 'react';

import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core';

export type CheckboxProps = MantineCheckboxProps & {
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ color = 'var(--color-accent)', className, ...props }) => {
  return <MantineCheckbox className={className} color={color} {...props} />;
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
