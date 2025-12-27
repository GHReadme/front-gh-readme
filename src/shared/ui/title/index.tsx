import React, { ReactNode } from 'react';

import { Title as MantineTitle, TitleProps as MantineTitleProps } from '@mantine/core';

export type TitleProps = MantineTitleProps & {
  children?: ReactNode;
};

const Title: React.FC<TitleProps> = ({ children, order = 3, ...props }) => {
  return (
    <MantineTitle order={order} {...props}>
      {children}
    </MantineTitle>
  );
};

export default Title;
