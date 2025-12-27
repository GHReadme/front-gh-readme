import React, { ReactNode } from 'react';

import { Stack as MantineStack, StackProps as MantineStackProps } from '@mantine/core';

export type StackProps = MantineStackProps & {
  children?: ReactNode;
};

const Stack: React.FC<StackProps> = ({ children, gap = 'md', ...props }) => {
  return (
    <MantineStack gap={gap} {...props}>
      {children}
    </MantineStack>
  );
};

export default Stack;
