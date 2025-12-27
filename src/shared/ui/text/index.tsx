import React, { ReactNode } from 'react';

import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';

export type TextProps = MantineTextProps & {
  children?: ReactNode;
};

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <MantineText {...props}>{children}</MantineText>;
};

export default Text;
