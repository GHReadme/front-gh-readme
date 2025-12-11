import React from 'react';

import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core';

type SwitchProps = Omit<MantineSwitchProps, 'checked' | 'defaultChecked' | 'onChange'> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ checked, defaultChecked, onChange, ...rest }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.currentTarget.checked);
  };

  return <MantineSwitch checked={checked} defaultChecked={defaultChecked} onChange={handleChange} {...rest} />;
};

export default Switch;
