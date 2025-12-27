import React from 'react';

import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';

export type SelectProps = MantineSelectProps;

const Select: React.FC<SelectProps> = ({ ...props }) => {
  return <MantineSelect {...props} />;
};

export default Select;
