import React from 'react';

import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';

type ButtonProps = MantineButtonProps & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label, color = 'var(--btn-primary-bg)', className, ...props }) => {
  return (
    <MantineButton className={className} color={color} {...props}>
      {label}
    </MantineButton>
  );
};

export default Button;
