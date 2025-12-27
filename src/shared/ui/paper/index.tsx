import React, { ReactNode } from 'react';

import { Paper as MantinePaper, PaperProps as MantinePaperProps } from '@mantine/core';

export type PaperProps = MantinePaperProps & {
  children?: ReactNode;
};

const Paper: React.FC<PaperProps> = ({
  children,
  withBorder = true,
  radius = 'md',
  shadow = 'xs',
  p = 'md',
  ...props
}) => {
  return (
    <MantinePaper withBorder={withBorder} radius={radius} shadow={shadow} p={p} {...props}>
      {children}
    </MantinePaper>
  );
};

export default Paper;
